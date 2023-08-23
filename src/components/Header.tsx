import React from "react";
import logo from "../logo.svg";
import { ActiveLink } from "raviger";

export default function Header(props: { title: String }) {
  return (
    <div className="flex gap-2 items-center">
      <img
        src={logo}
        className="animate-spin h-16 w-16"
        alt="logo"
        style={{ animation: "spin 3s linear infinite" }}
      />
      <div className="flex gap-2 items-center">
        {[
          { page: "Home", url: "/"},
          { page: "About", url: "/about"}
        ].map((link) => (
          <ActiveLink
          key={link.url}
          href={link.url}
          className="text-gray-800 p-2 m-2 uppercase"
          exactActiveClass="blue-500 border-b-2 border-blue-500"
          >{link.page}</ActiveLink>
        ))}
      </div>
      <h1 className="text-center text-xl">{props.title} </h1>
    </div>
  );
}
