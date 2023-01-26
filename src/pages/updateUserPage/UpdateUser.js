import React, { useEffect, useState } from "react";
import { getUserById, updateUser } from "../../repositories/UserRepository";
import { Field, Form, Formik } from "formik";
import { fetchAlarms } from "../../repositories/AlarmRepository";
import { Switch } from "@headlessui/react";
import { useParams } from "react-router-dom";
import { Audio } from "react-loader-spinner";
import moment from "moment";
import "moment/locale/fr";
import { useNavigate } from "react-router-dom";

export default function UpdateUser() {
  const [user, setUser] = useState([]);
  const [alarms, setAlarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enabled, setEnabled] = useState(false);
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  });

  const loadData = async () => {
    let data = await Promise.all([getUserById(id), fetchAlarms()]).catch(
      (_) => {
        alert("Erreur API");
        return null;
      }
    );
    if (data) {
      setUser(data[0].message);
      setAlarms(data[1].message);
      setEnabled(data[0].message.isAuthorized);
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full p-6">
      <h1 className="text-3xl text-slate-700 text-center font-bold">
        Modification de l'utilisateur
      </h1>
      {!loading && (
        <div className="w-full h-full flex items-center justify-center">
          <Formik
            initialValues={{
              lastname: user.lastname,
              firstname: user.firstname,
              alarmId: user.alarm.id,
            }}
            validationSchema={null}
            onSubmit={async (values) => {
              values["isAuthorized"] = enabled;
              await updateUser(user.id, values).then((res) => {
                navigate("/users", {
                  replace: true,
                });
              });
            }}
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

              <p>
                Ajouté le :{" "}
                {moment
                  .unix(user.createdAt?.timestamp)
                  .locale("fr")
                  .format("LL")}
              </p>
              <button
                type="submit"
                className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
