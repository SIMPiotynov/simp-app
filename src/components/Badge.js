import React from "react";

export default function Badge({ color, label }) {
  let className = "";

  switch (color) {
    case "success":
      className = "bg-green-200 border-green-300 border-2";
      break;
    case "danger":
      className = "bg-red-200 border-red-300 border-2";
      break;
    default:
      className = "bg-green-200 border-green-300 border-2";
  }

  return (
    <div className={`w-fit px-2 rounded-xl ${className}`}>{label}</div>
  );
}
