import axios from "axios";
import { devUrl } from "../utils/environment";
import config from "../utils/httpHeader";

async function fetchHistoryForUser(userId) {
  const response = await axios.get(`${devUrl}/users/${userId}/history`, config);
  return response.data;
}

export { fetchHistoryForUser };
