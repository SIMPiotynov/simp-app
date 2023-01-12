import { PencilLine, Trash } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Tr from "../components/Tr";
import { fetchUsers } from "../repositories/UserRepository";

export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    let response = fetchUsers();
    if (response.statusCode === 200) {
      setUsers(response.data);
    } else {
      alert("Erreur API");
    }
  }, []);

  return (
    <div className="w-full h-full p-6">
      <div className="text-3xl text-slate-700 text-right font-bold">
        Utilisateurs
      </div>
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
