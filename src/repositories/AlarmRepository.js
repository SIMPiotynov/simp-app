import axios from "axios";
import { devUrl } from "../utils/environment";
import config from "../utils/httpHeader";

async function fetchAlarms() {
  const response = await axios.get(`${devUrl}/alarms`, config);
  return response.data;
}

async function deleteAlarm(id) {
  const response = await axios.delete(`${devUrl}/alarms/${id}`)
  return response.data;
}

<<<<<<< Updated upstream
async function addAlarm(file) {
  console.log("Send", file);
  const response = await axios.post(`${devUrl}/alarms`, {music: file, name: "auto"})
  return response.data;
=======
async function addAlarm(data) {
  const response = await axios.post(`${devUrl}/alarms`, data)
    return response.data;
>>>>>>> Stashed changes
}

export { fetchAlarms, deleteAlarm, addAlarm };
