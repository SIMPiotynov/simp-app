import { Switch } from "@headlessui/react";
import { Field, Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { fetchAlarms } from "../../repositories/AlarmRepository";
import { addUser } from "../../repositories/UserRepository";

export default function AddUser() {
  const [alarms, setAlarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enabled, setEnabled] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    let data = await fetchAlarms().catch((error) => {
      alert(error);
      return null;
    });
    if (data) {
      setAlarms(data.message);
      setLoading(false);
    }
  };

  const onSubmit = async (values) => {
    if (!confirm) {
      setConfirm(!confirm);
      values["isAuthorized"] = enabled;
      await addUser(values).then((res) => {
        navigate("/users", {
          replace: true,
        });
      });
      setConfirm(!confirm);
    }
  };

  return (
    <div className="w-full h-full p-6">
      <h1 className="text-3xl text-slate-700 text-center font-bold">
        Ajout d'un utilisateur
      </h1>
      {!loading && (
        <div className="w-full h-full flex items-center justify-center">
          <Formik
            initialValues={{}}
            validationSchema={null}
            onSubmit={onSubmit}
          >
            <Form className="flex flex-col w-1/2 bg-gray-100 py-8 lg-py-16 px-8 lg-px-40 rounded-xl">
              <div className="flex flex-col mb-6">
                <label className="mb-2">Nom :</label>
                <Field
                  name="lastname"
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                />
              </div>
              <div className="flex flex-col mb-6">
                <label className="mb-2">Prénom :</label>
                <Field
                  name="firstname"
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2">Son :</label>
                <Field
                  component="select"
                  id="soundsSelect"
                  name="alarmId"
                  className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                  multiple={false}
                >
                  {alarms.map((alarm) => {
                    return (
                      <option key={alarm.id} value={alarm.id}>
                        {alarm.name}
                      </option>
                    );
                  })}
                </Field>
              </div>

              <div className="flex flex-col mb-6">
                <label className="mb-2">Accès :</label>
                <Switch
                  name="access"
                  checked={enabled}
                  onChange={setEnabled}
                  className={`${
                    enabled ? "bg-blue-600" : "bg-gray-200"
                  } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                  <span className="sr-only">Enable notifications</span>
                  <span
                    className={`${
                      enabled ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  />
                </Switch>
              </div>
              <button
                type="submit"
                className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Enregistrer
              </button>
            </Form>
          </Formik>
        </div>
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
