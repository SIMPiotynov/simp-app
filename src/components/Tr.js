import React from "react";

export default function Tr({ children }) {
  return <tr className="hover:bg-slate-200 border-b-2">{children}</tr>;
}
