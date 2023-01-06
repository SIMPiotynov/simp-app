import { PlayCircle, Trash } from "phosphor-react";
import React, { useState, useEffect } from "react";
import { useFilePicker } from "use-file-picker";
import audio from "../assets/sonFusil.mp3";
import { fetchAlarms } from "../repositories/AlarmRepository";

export default function Sounds() {
  const [showModal, setShowModal] = useState(false);
  const [openFileSelector, { filesContent }] = useFilePicker({
    accept: ".mp3",
  });

  const [alarms, setAlarms] = useState([]);
  useEffect(() => {
    let response = fetchAlarms();
    if (response.statusCode === 200) {
      setAlarms(response.data);
    } else {
      alert("Erreur API");
    }
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const saveFile = () => {
    toggleModal();
  };

  const playSound = () => {
    let audioTemp = new Audio(audio);
    audioTemp.play();
  };


  return (
    <div className="w-full h-full p-6">
      <div className="text-3xl text-slate-700 text-right font-bold">Sons</div>
      <button
        onClick={toggleModal}
        className="bg-blue-500 rounded-xl py-2 px-4 text-white hover:bg-blue-600"
      >
        Ajouter un son
      </button>

      {showModal && (
        <div className="absolute mx-auto p-5 border w-96 shadow-lg rounded-md bg-white centerAbsolute">
          <div className="mt-3 text-center">
            <button
              onClick={() => {
                openFileSelector();
              }}
              className="bg-green-500 rounded-xl py-2 px-4 text-white hover:bg-green-600"
            >
              Parcourir
            </button>
            {filesContent.length === 0 && (
              <h3 className="text-lg leading-6 font-medium text-gray-800 my-4">
                Aucun fichier selectionné
              </h3>
            )}
            {filesContent.map((file) => {
              return <div key={filesContent.name}>{file.name}</div>;
            })}
            <div className="items-center px-4 py-3">
              <button
                id="ok-btn"
                className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                onClick={saveFile}
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}

      <table className="w-full mt-10 bg-slate-100">
        <tbody>
          <tr className="hover:bg-slate-200">
            <td className="pl-6">welcome.mp4</td>
            <td className="flex px-6 justify-end">
              <PlayCircle
                onClick={playSound}
                weight="bold"
                size="20"
                className="hover:cursor-pointer mx-2 my-2 hover:text-blue-500"
              />
              <Trash
                weight="bold"
                size="20"
                className="hover:cursor-pointer my-2 hover:text-red-500"
              />
            </td>
          </tr>
          <tr className="hover:bg-slate-200">
            <td className="pl-6">sonnerie.mp4</td>
            <td className="flex px-6 justify-end">
              <PlayCircle
                weight="bold"
                size="20"
                className="hover:cursor-pointer mx-2 my-2 hover:text-blue-500"
              />
              <Trash
                weight="bold"
                size="20"
                className="hover:cursor-pointer my-2 hover:text-red-500"
              />
            </td>
          </tr>
          <tr className="hover:bg-slate-200">
            <td className="pl-6">denied.mp4</td>
            <td className="flex px-6 justify-end">
              <PlayCircle
                weight="bold"
                size="20"
                className="hover:cursor-pointer mx-2 my-2 hover:text-blue-500"
              />
              <Trash
                weight="bold"
                size="20"
                className="hover:cursor-pointer my-2 hover:text-red-500"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
