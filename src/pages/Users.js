import { PencilLine, Trash } from "phosphor-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Tr from "../components/Tr";
import { fetchUsers } from "../repositories/UserRepository";
import DeleteAlert from "../components/deleteAlert";
import useMount from "../hooks/useMount";
import useLayout from "../hooks/useLayout";

export default function Users() {
  const { setLayout } = useLayout();
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useMount(() => {
    setLayout({
      title: "Utilisateurs",
      activeMenuKeys: ["Utilisateurs"],
    });

    let response = fetchUsers();
    if (response.statusCode === 200) {
      setUsers(response.data);
    } else {
      alert("Erreur API");
    }
  });

  const handleDelete = () => {
    // TODO : delete user
    setShowModal(!showModal);
  };

  return (
    <div className="w-full h-full p-6">
      <div className="text-3xl text-slate-700 text-right font-bold">
        Utilisateurs
      </div>
      {showModal && (
        <DeleteAlert
          onConfirm={handleDelete}
          onCancel={() => setShowModal(!showModal)}
        />
      )}
      <table className="w-full mt-10 bg-slate-100">
        <thead>
          <tr className="bg-slate-300">
            <th className="text-left pl-6">Nom</th>
            <th className="text-left pl-6">Son</th>
            <th className="text-left pl-6">Accès</th>
            <th className="text-right px-6">Actions</th>
          </tr>
        </thead>
        <tbody>
          <Tr>
            <td className="pl-6">Nicolas Mary</td>
            <td className="pl-6">welcome.mp4</td>
            <td className="pl-6">Autorisé</td>
            <td className="flex px-6 justify-end">
              <Link to="/users/1" state={{ name: "Nicolas", lastName: "Mary" }}>
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
                onClick={() => setShowModal(!showModal)}
              />
            </td>
          </Tr>
          <Tr>
            <td className="pl-6">Nicolas Mary</td>
            <td className="pl-6">welcome.mp4</td>
            <td className="pl-6">Autorisé</td>
            <td className="flex px-6 justify-end">
              <PencilLine
                weight="bold"
                size="20"
                className="hover:cursor-pointer font-bold mx-2 my-2 hover:text-blue-500"
              />
              <Trash
                weight="bold"
                size="20"
                className="hover:cursor-pointer my-2 hover:text-red-500"
              />
            </td>
          </Tr>
          <Tr>
            <td className="pl-6">Nicolas Mary</td>
            <td className="pl-6">welcome.mp4</td>
            <td className="pl-6">Autorisé</td>
            <td className="flex px-6 justify-end">
              <PencilLine
                weight="bold"
                size="20"
                className="hover:cursor-pointer font-bold mx-2 my-2 hover:text-blue-500"
              />
              <Trash
                weight="bold"
                size="20"
                className="hover:cursor-pointer my-2 hover:text-red-500"
              />
            </td>
          </Tr>
        </tbody>
      </table>
    </div>
  );
}
