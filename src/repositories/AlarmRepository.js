import axios from "axios";
import { devUrl } from "../utils/environment";

async function fetchAlarms() {
  axios.get(`${devUrl}/alarms`).then((res) => {
    return res.data;
  });
}

async function deleteAlarm(id) {
  axios.get(`${devUrl}/alarm/{id}`).then((res) => {
    return res.data;
  });
}

export { fetchAlarms, deleteAlarm };
