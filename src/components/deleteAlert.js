import React from "react";

export default function DeleteAlert({ onConfirm, onCancel }) {
    return (<div className="absolute mx-auto p-5 border w-96 shadow-lg rounded-md bg-white centerAbsolute">
        <p className="text-center">La suppression de l'utilisateur sera définitive</p>
        <div className="mt-10 flex justify-around">
            <button className="rounded-xl py-2 px-4 border-2 text-center" onClick={onCancel}>
                Annuler
            </button>

                <button
                    id="ok-btn"
                    className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                    onClick={onConfirm}
                >
                    Supprimer
                </button>
        </div>
    </div>);
}
