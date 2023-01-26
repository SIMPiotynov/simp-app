import { ClockCounterClockwise, PencilLine, Trash } from "phosphor-react";
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Tr from "../../components/Tr";
import { fetchUsers } from "../../repositories/UserRepository";
import { DeleteUser } from "./components/deleteUser";
import useMount from "../../hooks/useMount";
import useLayout from "../../hooks/useLayout";
import Badge from "../../components/Badge";
import { Audio } from "react-loader-spinner";

export default function Users() {
  const { setLayout } = useLayout();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const editModal = useRef();

  const fetchData = async () => {
    let response = await fetchUsers();
    if (response.code === 200) {
      setUsers(response.message);
      setLoading(false);
    } else {
      alert("Erreur API");
    }
  };

  useMount(() => {
    setLayout({
      title: "Utilisateurs",
      activeMenuKeys: ["Utilisateurs"],
    });
    fetchData();
  });

  return (
    <div className="w-full h-full p-6">
      <div className="text-3xl text-slate-700 text-right font-bold">
        Utilisateurs
      </div>
      <DeleteUser ref={editModal} reload={fetchData}></DeleteUser>
      <Link to={`/users/add`}>
        <div className="w-fit bg-blue-500 rounded-xl py-2 px-4 text-white hover:bg-blue-600">
          Ajouter un utilisateur
        </div>
      </Link>
      {!loading && (
        <table className="w-full mt-10 bg-slate-100">
          <thead>
            <tr className="bg-slate-300">
              <th className="text-left pl-6">Nom</th>
              <th className="text-left pl-6">Prénom</th>
              <th className="text-left pl-6">Son</th>
              <th className="text-left pl-6">Accès</th>
              <th className="text-right px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <Tr key={user.id}>
                  <td className="pl-6">{user.lastname}</td>
                  <td className="pl-6">{user.firstname}</td>
                  <td className="pl-6">{user.alarm?.name}</td>
                  <td className="pl-6">
                    {user.isAuthorized ? (
                      <Badge color="success" label="Authorisé" />
                    ) : (
                      <Badge color="danger" label="Non Authorisé" />
                    )}
                  </td>
                  <td className="flex px-6 justify-end space-x-2">
                    <Link to={`/users/${user.id}/history`}>
                      <ClockCounterClockwise
                        weight="bold"
                        size="20"
                        className="hover:cursor-pointer font-bold my-2 hover:text-blue-500"
                      />
                    </Link>
                    <Link to={`/users/${user.id}`}>
                      <PencilLine
                        weight="bold"
                        size="20"
                        className="hover:cursor-pointer font-bold my-2 hover:text-blue-500"
                      />
                    </Link>
                    <Trash
                      weight="bold"
                      size="20"
                      className="hover:cursor-pointer my-2 hover:text-red-500"
                      onClick={() => editModal?.current?.show(user)}
                    />
                  </td>
                </Tr>
              );
            })}
          </tbody>
        </table>
      )}

      {loading && (
        <div className="flex flex-col h-full items-center justify-center m-auto">
          <Audio
            height="80"
            width="80"
            radius="9"
            color="red"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
          />
          Chargement...
        </div>
      )}
    </div>
  );
}
