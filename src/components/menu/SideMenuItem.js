import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useLayout from "../../hooks/useLayout";

export default function SideMenuItem({ name, route }) {
  const {
    layout: { activeMenuKeys },
  } = useLayout();

  const [active, setActive] = useState(activeMenuKeys.includes(name));

  useEffect(() => {
    setActive(activeMenuKeys.includes(name));
  }, [activeMenuKeys, name]);

  return (
    <Link to={route}>
      <p
        className={`text-lg font-semibold text-slate-600 hover:bg-slate-300 px-6 py-2 hover:cursor-pointer ${
          active ? "bg-slate-300" : ""
        }`}
      >
        {name}
      </p>
    </Link>
  );
}
