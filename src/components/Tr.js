import React from "react";

export default function Tr({ children }) {
  return <tr className="hover:bg-slate-300 border-b-2 odd:bg-slate-100 even:bg-slate-200 h-10">{children}</tr>;
}
