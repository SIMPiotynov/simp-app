import React from "react";
import SideMenuItem from "./SideMenuItem";

export default function SideMenu() {
  return (
    <div className="w-1/6 h-full bg-slate-200 py-6">
      <h1 className="text-center font-bold text-3xl text-slate-700">SIMP</h1>
      <div className="flex flex-col h-full py-8">
        <SideMenuItem name="Accueil" route="/"/>
        <SideMenuItem name="Utilisateurs" route="/users"/>
        <SideMenuItem name="Sons" route="/sounds"/>
      </div>
    </div>
  );
}
