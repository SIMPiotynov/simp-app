import * as React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Sounds from "../pages/Sounds";
import Users from "../pages/Users";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<Users />} />
      <Route path="/sounds" element={<Sounds />} />
    </Routes>
  );
}

export default AppRouter;
