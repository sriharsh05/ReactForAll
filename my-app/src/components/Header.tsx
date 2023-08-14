import React from "react";
import logo from "../logo.svg";

export default function Header(props: { title: String }) {
  return (
    <div className="flex gap-2 items-center">
      <img
        src={logo}
        className="animate-spin h-16 w-16"
        alt="logo"
        style={{ animation: "spin 3s linear infinite" }}
      />
      <h1 className="text-center text-xl">{props.title} </h1>
    </div>
  );
}
