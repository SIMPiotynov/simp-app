import * as React from "react";
import { Route, Routes } from "react-router-dom";
import AddUser from "../pages/addUserPage/AddUser";
import Home from "../pages/homePage/Home";
import Sounds from "../pages/soundsPage/Sounds";
import UpdateUser from "../pages/updateUserPage/UpdateUser";
import UserHistory from "../pages/userHistoryPage/UserHistory";
import Users from "../pages/usersPage/Users";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<Users />} />
      <Route path="/sounds" element={<Sounds />} />
      <Route path="/users/:id" element={<UpdateUser />} />
      <Route path="/users/add" element={<AddUser />} />
      <Route path="/users/:id/history" element={<UserHistory />} />
    </Routes>
  );
}

export default AppRouter;
