import React from "react";

import { useLocation } from "react-router-dom";

export default function UpdateUser() {
  const location = useLocation();
  const user = location.state;
  console.log(location.state);
  return <div className="w-full h-full p-6">{user.name}{user.lastName}</div>;
}
