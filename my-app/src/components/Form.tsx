import React from "react";
import LabeledInput from "./LabeledInput";

export default function Form(props : {closeFormCB: () => void; formFields:any[] }){
    return(
        <div className="p-4">
        {props.formFields.map((field) => (
          <LabeledInput
            key = {field.id}
            label = {field.label}
            type = {field.type}
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
        </div>
      </div>
    );

}