import React, { useState } from "react";
import LabeledInput from "./LabeledInput";

const formFields = [
  { id: 1, label: "First Name", type: "text" },
  { id: 2, label: "Last Name", type: "text" },
  { id: 3, label: "Email", type: "text" },
  { id: 4, label: "Date of birth", type: "date" },
];

export default function Form(props: { closeFormCB: () => void }) {
  const [state, setState] = useState(formFields);
  const [newField, setNewField] = useState("");
  const addField = () => {
    setState([
      ...state,
      {
        id: Number(new Date()),
        label: newField,
        type: "text",
      },
    ]);
    setNewField("New Value");
  };
  const removeField = (id: number) => {
    setState(state.filter((field) => field.id !== id));
  };
  return (
    <div className="flex flex-col gap-2 p-4 divide-y divide-dotted">
      <div>
        {state.map((field) => (
          <LabeledInput
            id={field.id}
            label={field.label}
            type={field.type}
            removeFieldCB={removeField}
          />
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="border-2 border-gray-300 rounded-lg p-2 my-2 flex-1"
          value = {newField}
          onChange={e=> {
            setNewField(e.target.value);
          }}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
          onClick={addField}
        >
          Add field
        </button>
      </div>
      <div className="flex gap-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg">
          Submit
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
          onClick={props.closeFormCB}
        >
          Close Form
        </button>
      </div>
    </div>
  );
}
