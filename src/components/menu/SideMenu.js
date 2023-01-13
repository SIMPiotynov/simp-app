import React, { useEffect, useState } from "react";
import SideMenuItem from "./SideMenuItem";
import logo from "../../assets/SIMP.png";

export default function SideMenu() {
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  const [open, setOpen] = useState(false);
  const [absoluteMenu, setAbsoluteMenu] = useState(false);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  const handleOpen = () => {
    setOpen(!open);
    setAbsoluteMenu(!absoluteMenu);
  };

  return (
    <>
      {windowSize[0] >= 1000 || open ? (
        <div
          className={`w-[230px] h-full bg-slate-200 py-6 flex flex-col justify-between ${
            absoluteMenu && windowSize[0] < 1000 ? "absolute" : ""
          }`}
        >
          <div>
            {windowSize[0] < 1000 && (
              <h1
                className="pl-6 text-2xl text-gray-600 hover:cursor-pointer"
                onClick={handleOpen}
              >
                X
              </h1>
            )}
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
      ) : (
        <div
          className="absolute m-6 space-y-2 overflow-x-hidden hover:cursor-pointer h-fit"
          onClick={handleOpen}
        >
          <div className="w-8 h-0.5 bg-gray-600"></div>
          <div className="w-8 h-0.5 bg-gray-600"></div>
          <div className="w-8 h-0.5 bg-gray-600"></div>
        </div>
      )}
    </>
  );
}
