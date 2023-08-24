import React from "react";

export default function LabeledInput(props: {
  id: number;
  label: string;
  type: string;
  removeFieldCB: (id: number) => void;
  value: string;
  setValueCB: (id: number, value: string) => void;
  changeLabelCB: (id: number, value: string) => void;
  changeTypeCB: (id: number, value: string) => void;
}) {
  return (
    <div key={props.id} className="mb-4">
      <div className="flex flex-row p-2 m-2 justify-evenly rounded-lg border-2 border-stone-400">
        <div className="flex flex-row">
          <label className="m-4 font-bold">Field :</label>
          <input
            className="border-2 border-gray-300 rounded-lg p-2 my-2 flex"
            type="text"
            name="label"
            value={props.label}
            onChange={(e) =>
              props.changeLabelCB(props.id, e.target.value)
            }
          />
        </div>
        <div className="flex flex-row">
          <label className="m-4 font-bold">Type :</label>
          <select
            className="border-2 mt-2 border-gray-300 h-10 rounded-lg  focus:border-gray-500"
            value={props.type}
            name="type"
            onChange={(e) =>
              props.changeTypeCB(props.id, e.target.value)
            }
          >
            <option value="text">Text</option>
            <option value="email">Email</option>
            <option value="password">Password</option>
            <option value="date">Date</option>
            <option value="tel">Tel</option>
            <option value="file">File</option>
          </select>
        </div>
        <button
          className="bg-sky-500 hover:bg-sky-700 text-white font-bold px-4 m-2  rounded-lg"
          onClick={(_) => props.removeFieldCB(props.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
