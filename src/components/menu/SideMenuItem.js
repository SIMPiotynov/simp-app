import React from "react";
import { Link } from "react-router-dom";

export default function SideMenuItem({ name, route }) {
  return (
    <Link to={route}>
      <p className="text-lg font-semibold text-slate-600 hover:bg-slate-300 px-6 py-2 hover:cursor-pointer">
        {name}
      </p>
    </Link>
  );
}
