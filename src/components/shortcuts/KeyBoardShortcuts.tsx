import React from "react";
import { KeyboardKeyIcon } from "./KeyIcons";

export function KeyboardShortcuts() {
  return (
    <div className="flex flex-col py-2">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold text-gray-700">Home Page</h3>
        <div className="flex justify-between items-center">
          <span>Home Page</span>
          <KeyboardKeyIcon isShiftClicked={true} keyPressed={"H"} />
        </div>
        <div className="flex justify-between items-center">
          <span>About Page</span>
          <KeyboardKeyIcon isShiftClicked={true} keyPressed={"A"} />
        </div>
        <div className="flex justify-between items-center">
          <span>Search</span>
          <KeyboardKeyIcon isShiftClicked={true} keyPressed={"S"} />
        </div>
        <div className="flex justify-between items-center">
          <span>Create New Form</span>
          <KeyboardKeyIcon isShiftClicked={true} keyPressed={"N"} />
        </div>
        <div className="flex justify-between items-center">
          <span>Logout</span>
          <KeyboardKeyIcon isShiftClicked={true} keyPressed={"L"} />
        </div>
        <div className="flex justify-between items-center">
          <span>Next page</span>
          <KeyboardKeyIcon isShiftClicked={false} keyPressed={">"} />
        </div>
        <div className="flex justify-between items-center">
          <span>Previous page</span>
          <KeyboardKeyIcon isShiftClicked={false} keyPressed={"<"} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold text-gray-700">
          Create form Page 
        </h3>
        <div className="flex justify-between items-center">
          <span>Cancel</span>
          <KeyboardKeyIcon isShiftClicked={false} keyPressed={"Esc"} />
        </div>
        <div className="flex justify-between items-center">
          <span>Create</span>
          <KeyboardKeyIcon isShiftClicked={false} keyPressed={"Enter"} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold text-gray-700">
          Preview page
        </h3>
        <div className="flex justify-between items-center">
          <span>Next question</span>
          <KeyboardKeyIcon isShiftClicked={false} keyPressed={">"} />
        </div>
        <div className="flex justify-between items-center">
          <span>Previous question</span>
          <KeyboardKeyIcon isShiftClicked={false} keyPressed={"<"} />
        </div>
      </div>
    </div>
  );
}
