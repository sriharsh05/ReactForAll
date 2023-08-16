import React from "react";

export default function LabeledInput(props: {
  id: number;
  label: string;
  type: string;
}) {
  return (
    <>
      <div key={props.id} className="mb-4">
        <label className="block mb-2">{props.label}</label>

        <input
          className="border-2 border-gray-300 rounded-lg p-2 m-2 w-full"
          type={props.type}
        />
      </div>
    </>
  );
}
