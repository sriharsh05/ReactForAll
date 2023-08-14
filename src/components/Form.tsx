import React, { useState } from "react";
import LabeledInput from "./LabeledInput";

const formFields = [
  { id: 1, label: "First Name", type: "text" },
  { id: 2, label: "Last Name", type: "text" },
  { id: 3, label: "Email", type: "text" },
  { id: 4, label: "Date of birth", type: "date" },
];

export default function Form(props : {closeFormCB: () => void}){

  const [state, setState] = useState(formFields);
  const addField = () => {
    setState([
      ...state,
      {
        id: Number(new Date()),
        label: "New Field",
        type: "text"
      },
    ])
  }
  const removeField = (id:number) => {
    setState(
      state.filter(field => field.id !== id)
    )
  }
    return(
        <div className="p-4">
        {state.map((field) => (
          <LabeledInput
            id = {field.id}
            label = {field.label}
            type = {field.type}
            removeFieldCB = {removeField} 
          />
        ))}
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
            onClick={addField}
          >
            Add field
          </button>
        </div>
      </div>
    );

}