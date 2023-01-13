import { PencilLine, Trash } from "phosphor-react";
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Tr from "../components/Tr";
import { fetchUsers } from "../repositories/UserRepository";
import { DeleteAlert } from "../components/deleteAlert";
import useMount from "../hooks/useMount";
import useLayout from "../hooks/useLayout";
import Badge from "../components/Badge";
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
      <DeleteAlert ref={editModal} reload={fetchData}></DeleteAlert>
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
                  <td className="flex px-6 justify-end">
                    <Link
                      to="/users/1"
                      state={{ name: "Nicolas", lastName: "Mary" }}
                    >
                      <PencilLine
                        weight="bold"
                        size="20"
                        className="hover:cursor-pointer font-bold mx-2 my-2 hover:text-blue-500"
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
