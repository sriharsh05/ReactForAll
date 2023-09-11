import React from "react";

export function KeyboardKeyIcon(props: {
  isShiftClicked: boolean;
  keyPressed: string;
}) {
  return (
    <div className="flex gap-2 h-fit font-bold">
      {props.isShiftClicked && (
        <div className="px-2 bg-sky-200 items-center border border-sky-800">
          Shift
        </div>
      )}
      {props.isShiftClicked && <span className="text-gray-600 mx-1">+</span>}
      <div className="bg-sky-200 text-black rounded-md px-3 py-1">
        {props.keyPressed}
      </div>
    </div>
  );
}
