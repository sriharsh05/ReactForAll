import React from "react";

export default function LabeledInput(props: {
  id: number;
  label: string;
  type: string;
  removeFieldCB: (id: number) => void;
  value: string;
  setValueCB: (id: number, value: string) => void;
}) {
  return (
    <div key={props.id} className="flex">
      <label>{props.label}</label>
        <input
          className="border-2 border-gray-300 rounded-lg p-2 m-2 w-full"
          type={props.type}
          value={props.value}
          onChange={(e) => props.setValueCB(props.id, e.target.value)}
        />
        <button
          onClick={(_) => props.removeFieldCB(props.id)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
        >
          remove
        </button>
    </div>
  );
}
