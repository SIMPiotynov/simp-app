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

export { fetchAlarms, deleteAlarm };
