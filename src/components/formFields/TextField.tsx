import React, { useEffect, useState } from "react";
export function TextField(props: {
  id: number;
  label: string;
  value: string;
  updateLabelCB: (id: number, value: string) => void;
  removeFieldCB: (id: number) => void;
}) {
  const [label, setLabel] = useState(props.label);

  useEffect(() => {
    let timeout = setTimeout(() => {
      props.updateLabelCB(props.id, label);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [label]);

  return (
    <div className="w-full">
      <div className="flex">
        <input
          type="text"
          id={`field-${props.id}`}
          value={label}
          onChange={(event) => setLabel(event.target.value)}
          className="border-2 justify-between items-center border-gray-300 rounded-lg p-2 my-2 flex-1"
          placeholder="Enter label"
        />
        <button
          onClick={() => props.removeFieldCB(props.id)}
          className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
