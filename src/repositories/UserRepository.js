import axios from "axios";
import { devUrl } from "../utils/environment";

async function fetchUsers() {
  axios.get(`${devUrl}/users`).then((res) => {
    return res.data;
  });
}

async function getUserById(id, data) {
  axios.get(`${devUrl}/user/${id}`).then((res) => {
    return res.data;
  });
}

async function updateUser(id, data) {
  axios.put(`${devUrl}/user/${id}`).then((res) => {
    return res.data;
  });
}

async function deleteUser(id) {
  axios.delete(`${devUrl}/user/{id}`).then((res) => {
    return res.data;
  });
}

export { fetchUsers, getUserById, updateUser, deleteUser };
