import React, {forwardRef, useImperativeHandle, useState} from "react";
import {deleteUser} from "../repositories/UserRepository";

export const DeleteAlert = forwardRef(({ reload }, ref) => {
    useImperativeHandle(ref, () => ({
        show: (user) => {
            setUser(user);
            setVisible(true)
            console.log(user.id)
        }
    }))

    const [user, setUser] = useState();
    const [visible, setVisible] = useState(true);

    const handleDelete = async () => {
        let response = await deleteUser(user.id);
        if (response.code === 200) {
            reload()
        } else {
            alert("Erreur API");
        }
        setVisible(!visible);
    };

    return (<> {visible && user && (<div className="absolute mx-auto p-5 border w-96 shadow-lg rounded-md bg-white centerAbsolute">
        <p className="text-center">La suppression de l'utilisateur {user.lastname} {user.firsname} sera définitive</p>
        <div className="mt-10 flex justify-around">
            <button className="rounded-xl py-2 px-4 border-2 text-center" onClick={() => setVisible(!visible)}>
                Annuler
            </button>

            <button
                id="ok-btn"
                className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                onClick={handleDelete}
            >
                Supprimer
            </button>
        </div>
    </div>)}</>);
});
