import React, { forwardRef, useImperativeHandle, useState } from "react";
import { deleteAlarm } from "../../../repositories/AlarmRepository";

export const DeleteSound = forwardRef(({ reload }, ref) => {
  useImperativeHandle(ref, () => ({
    show: (alarm) => {
      setAlarm(alarm);
      setVisible(true);
    },
  }));

  const [alarm, setAlarm] = useState();
  const [visible, setVisible] = useState(true);

  const handleDelete = async () => {
    let response = await deleteAlarm(alarm.id);
    if (response.code === 200) {
      reload();
    } else {
      alert("Erreur API");
    }
    setVisible(!visible);
  };

  return (
    <>
      {" "}
      {visible && alarm && (
        <div className="absolute mx-auto p-5 border w-96 shadow-lg rounded-md bg-white centerAbsolute">
          <p className="text-center">
            La suppression du son {alarm.name} sera définitive
          </p>
          <div className="mt-10 flex justify-around">
            <button
              className="rounded-xl py-2 px-4 border-2 text-center"
              onClick={() => setVisible(!visible)}
            >
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
        </div>
      )}
    </>
  );
});
