import React from "react";
import logo from "../logo.svg";

export function Home() {
  return (
    <div className="flex">
      <img className="h-48" src={logo} />
      <div className="flex-1 flex justify-center items-center h-48">
        <p>Welcome to the Home page</p>
      </div>
    </div>
  );
}
