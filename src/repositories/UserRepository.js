import axios from "axios";
import { devUrl } from "../utils/environment";
import config from "../utils/httpHeader";

async function fetchUsers() {
  const response = await axios.get(`${devUrl}/users`, config);
  return response.data;
}

async function getUserById(id, data) {
  const response = await axios.get(`${devUrl}/users/${id}`)
  return response.data;
}

async function updateUser(id, data) {
  const response = await axios.put(`${devUrl}/users/${id}`, data)
    return response.data;
}

async function deleteUser(id) {
  const response = await axios.delete(`${devUrl}/users/${id}`)
  return response.data;
}

export { fetchUsers, getUserById, updateUser, deleteUser };
