import { Trash } from "phosphor-react";
import React, { useState, useRef } from "react";
import { useFilePicker } from "use-file-picker";
import Tr from "../../components/Tr";
import useLayout from "../../hooks/useLayout";
import useMount from "../../hooks/useMount";
import { addAlarm, fetchAlarms } from "../../repositories/AlarmRepository";
import { Audio } from "react-loader-spinner";
import { DeleteSound } from "./components/deleteSound";

export default function Sounds() {
  const [confirm, setConfirm] = useState(false);
  const { setLayout } = useLayout();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState('');
  const [openFileSelector, { filesContent }] = useFilePicker({
<<<<<<< Updated upstream
    accept: ".midi",
=======
    accept: [".mid", ".midi"],
>>>>>>> Stashed changes
  });

  const fileInput = useRef();

  const [alarms, setAlarms] = useState([]);

  const editModal = useRef();

  const fetchData = async () => {
    let response = await fetchAlarms();
    if (response.code === 200) {
      setAlarms(response.message);
      setLoading(false);
    } else {
      alert("Erreur API");
    }
  };

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const handleChangeFile = event => {
    console.log(event.target.files, event.target.files[0]);
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    console.log(file);
    await addAlarm(await toBase64(file))
      .then((res) => { }) // Handle the response from backend here
      .catch((err) => { }); // Catch errors if any
  }

  useMount(() => {
    setLayout({
      title: "Sons",
      activeMenuKeys: ["Sons"],
    });
    fetchData();
  });

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const saveFile = async () => {
<<<<<<< Updated upstream
    await addAlarm(file)
=======
    if (!confirm) {
      setConfirm(!confirm);
      await addAlarm(filesContent[0]).catch((e) => alert(e));
      setConfirm(!confirm);
    }
>>>>>>> Stashed changes
    toggleModal();
  };

  return (
    <div className="w-full h-full p-6 flex flex-col">
      <DeleteSound ref={editModal} reload={fetchData}></DeleteSound>
      <div className="text-3xl text-slate-700 text-right font-bold">Sons</div>
      {showModal && (
        <div className="absolute mx-auto p-5 border w-96 shadow-lg rounded-md bg-white centerAbsolute">
          <div className="mt-3 text-center">
<<<<<<< Updated upstream
            <input type={"file"} onChange={e => handleChangeFile(e)} className="bg-green-500 rounded-xl py-2 px-4 text-white hover:bg-green-600"/>
=======
            <div
              onClick={() => {
                openFileSelector();
              }}
              className="bg-green-500 rounded-xl py-2 px-4 text-white hover:bg-green-600 hover:cursor-pointer"
            >
              Parcourir
            </div>
>>>>>>> Stashed changes
            {filesContent.length === 0 && (
              <h3 className="text-lg leading-6 font-medium text-gray-800 my-4">
                Aucun fichier sélectionné
              </h3>
            )}
            {filesContent.map((file) => {
              return <div key={filesContent.name}>{file.name}</div>;
            })}
            <div className="items-center px-4 py-3">
              <button
                id="ok-btn"
                className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                onClick={handleUpload}
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}

      {!loading && (
        <>
          <button
            onClick={toggleModal}
            className="w-fit bg-blue-500 rounded-xl py-2 px-4 text-white hover:bg-blue-600"
          >
            Ajouter un son
          </button>
          <table className="w-full mt-10 bg-slate-100">
            <tbody>
              {alarms.map((alarm) => {
                return (
                  <Tr key={alarm.id}>
                    <td className="pl-6">{alarm.name}</td>
                    <td className="flex px-6 justify-end">
                      {!alarm.isDefault && (
                        <Trash
                          weight="bold"
                          size="20"
                          className="hover:cursor-pointer my-2 hover:text-red-500"
                          onClick={() => editModal?.current?.show(alarm)}
                        />
                      )}
                    </td>
                  </Tr>
                );
              })}
            </tbody>
          </table>
        </>
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
