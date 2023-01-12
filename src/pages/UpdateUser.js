import React, {useEffect, useState} from "react";
import {getUserById} from "../repositories/UserRepository";
import {Field, Form, Formik} from "formik";
import {fetchAlarms} from "../repositories/AlarmRepository";
import { Switch } from '@headlessui/react'

export default function UpdateUser() {
  const [user, setUser] = useState([]);
  const [alarms, setAlarms] = useState([]);
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    let data = await Promise.all([getUserById(), fetchAlarms()]).catch((_) => {
      alert("Erreur API");
      return null;
    })
    if(data){
      setUser(data[0]);
      setUser(data[1]);
    }
  }


  return <div className="w-full h-full p-6">
    <h1 className="mt-16 text-3xl text-slate-700 text-center font-bold">Modification de l'utilisateur</h1>
    <div className="w-full h-full flex items-center justify-center">
      <Formik
          initialValues={{ name: "", email: "" }}
          onSubmit={async (values) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            alert(JSON.stringify(values, null, 2));
          }}
      >
        <Form className="flex flex-col w-1/2 bg-gray-100 py-16 px-40 rounded-xl -mt-40">
          <div className="flex justify-between mb-6">
            <label>Nom :</label>
            <Field name="lastName" className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" />
          </div>
          <div className="flex justify-between mb-6">
            <label>Prénom :</label>
            <Field name="firstName" className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" />
          </div>
          <div className="flex justify-between">
            <label>Son :</label>
            <Field
                component="select"
                id="soundsSelect"
                name="soundsSelect"
                className="w-60 bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                multiple={false}
            >
              <option value="s1">Son1</option>
              <option value="s2">Son2</option>
              <option value="s3">Son3</option>
              <option value="s4">Son4</option>
            </Field>
          </div>

          <div className="flex justify-between mb-6">
            <label>Accès :</label>
            <Switch
                checked={enabled}
                onChange={setEnabled}
                className={`${
                    enabled ? 'bg-blue-600' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Enable notifications</span>
              <span
                  className={`${
                      enabled ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>

          <p>Ajouté le : XX/XX/XXXX</p>
          <button type="submit" className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
        </Form>

      </Formik>
    </div>
  </div>;
}
