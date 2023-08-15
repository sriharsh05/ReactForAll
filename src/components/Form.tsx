import React, { useState } from "react";
import LabeledInput from "./LabeledInput";

const formFields = [
  { id: 1, label: "First Name", type: "text", value: "" },
  { id: 2, label: "Last Name", type: "text", value: "" },
  { id: 3, label: "Email", type: "text", value: "" },
  { id: 4, label: "Date of birth", type: "date", value: "" },
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
        value: "",
      },
    ]);
    setNewField("New Value");
  };

  const removeField = (id: number) => {
    setState(
      state.filter(
        (field) => field.id !== id
        )
      );
  };
  const setValue = (id: number, value: string) => {
    setState(
      state.map((field) => {
        if (field.id === id) {
          return {
            ...field,
            value,
          };
        }
        return field;
      })
    );
  };
  const clearForm = () => {
    setState(
      state.map(
        (field) => ({ ...field, value: "" })
        )
      );
  };
  return (
    <div className="flex flex-col gap-2 p-4 divide-y divide-dotted">
      <div>
        {state.map((field) => (
          <LabeledInput
            id={field.id}
            label={field.label}
            type={field.type}
            value={field.value}
            removeFieldCB={removeField}
            setValueCB={setValue}
          />
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="border-2 border-gray-300 rounded-lg p-2 my-2 flex-1"
          value={newField}
          onChange={(e) => {
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
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
          onClick={clearForm}
        >
          Clear Form
        </button>
      </div>
    </div>
  );
}
