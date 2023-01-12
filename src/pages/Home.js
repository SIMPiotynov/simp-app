import React from "react";
import logo from "../assets/SIMP.png";

export default function Home() {
  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      <p className="text-8xl font-bold text-slate-700 text-center">SIMP</p>
      <p className="text-3xl font-semibold text-blue-500 text-center">
        Sonnette Intelligente Musicalement Personnalisable
      </p>
      <img src={logo} className="w-[200px]" alt="logo" />
    </div>
  );
}
