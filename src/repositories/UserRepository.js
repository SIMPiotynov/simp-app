import axios from "axios";
import { devUrl } from "../utils/environment";

async function fetchUsers() {
  axios.get(`${devUrl}/users`).then((res) => {
    return res.data;
  });
}

async function updateUser(id, data) {
  axios.get(`${devUrl}/user/${id}`).then((res) => {
    return res.data;
  });
}

async function deleteUser(id) {
  axios.get(`${devUrl}/user/{id}`).then((res) => {
    return res.data;
  });
}

export { fetchUsers, updateUser, deleteUser };
