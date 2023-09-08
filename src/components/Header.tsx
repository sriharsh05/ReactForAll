import React from "react";
import logo from "../logo.svg";
import { ActiveLink } from "raviger";
import { User } from "../types/userTypes";

export default function Header(props: { title: String; currentUser: User }) {
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
          { page: "Home", url: "/" },
          { page: "About", url: "/about" },
          ...(props.currentUser.username && props.currentUser?.username.length > 0
            ? [
                {
                  page: "Logout",
                  onClick: () => {localStorage.removeItem("token"); window.location.reload();},
                },
              ]
            : [{ page: "Login", url: "/login" }]),
        ].map((link) =>
          link.url ? (
            <ActiveLink
              key={link.url}
              href={link.url}
              className="text-gray-800 p-2 m-2 uppercase"
              exactActiveClass="text-blue-500"
            >
              {link.page}
            </ActiveLink>
          ) : (
            <button
              key={link.page}
              onClick={link.onClick}
              className="text-gray-800 p-2 m-2 uppercase"
            >
              {link.page}
            </button>
          )
        )}
      </div>
      <h1 className="text-center text-xl font-bold">{props.title} </h1>
    </div>
  );
}
