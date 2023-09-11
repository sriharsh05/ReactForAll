import React from "react";
import Header from "./Header";
import { User } from "../types/userTypes";
import { KeyboardShortcuts } from "./shortcuts/KeyBoardShortcuts";

export default function AppContainer(props: { currentUser:User, children: React.ReactNode }) {
  return (
    <div className="flex flex-col bg-gray-100 items-center">
      <div className="p-4 mx-auto bg-white shadow-lg rounded-xl">
        <Header
          title={"Welcome to Lesson 8 of $react-typescript with #tailwindcss"}
          currentUser={props.currentUser}
        />
        {props.children}
      </div>
      <div className="px-4 mx-4 my-2 bg-white border border-gray-300 w-[50%] rounded-l">
          <span className="font-extrabold text-gray-800 text-xl mt-4">
            Keyboard Shortcuts
          </span>
       <KeyboardShortcuts />
      </div>
    </div>
  );
}
