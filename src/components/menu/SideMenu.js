import React from "react";
import SideMenuItem from "./SideMenuItem";
import logo from "../../assets/SIMP.png";
import { ProvideLayout } from "../../hooks/useLayout";

export default function SideMenu() {
  return (
      <div className="w-1/6 h-full bg-slate-200 py-6 flex flex-col justify-between">
        <div>
          <h1 className="text-center font-bold text-3xl text-slate-700">
            Menu
          </h1>
          <div className="flex flex-col py-8">
            <SideMenuItem name="Accueil" route="/" />
            <SideMenuItem name="Utilisateurs" route="/users" />
            <SideMenuItem name="Sons" route="/sounds" />
          </div>
        </div>
        <div className="flex justify-center">
          <img src={logo} className="w-[70px]" alt="logo" />
        </div>
      </div>
  );
}
