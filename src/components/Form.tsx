import React, { useState, useEffect } from "react";
import LabeledInput from "./LabeledInput";

interface formField {
  id: number;
  label: string;
  type: string;
  value: string;
}

const initialFormFields: formField[] = [
  { id: 1, label: "First Name", type: "text", value: "" },
  { id: 2, label: "Last Name", type: "text", value: "" },
  { id: 3, label: "Email", type: "text", value: "" },
  { id: 4, label: "Date of birth", type: "date", value: "" },
];

const initialState: () => formField[] = () => {
  const formFieldsJSON = localStorage.getItem("formFields");
  const persistantFormFields = formFieldsJSON
    ? JSON.parse(formFieldsJSON)
    : initialFormFields;
  return persistantFormFields;
};

const saveFormData = (currentState: formField[]) => {
  localStorage.setItem("formFields", JSON.stringify(currentState));
};

export default function Form(props: { closeFormCB: () => void }) {
  const [state, setState] = useState(initialState());
  const [newField, setNewField] = useState("");
  useEffect(() => {
    console.log("Component Mounted");
    document.title = "Form Editor";

    return () => {
      document.title = "React App";
    };
  }, []);

  useEffect(() => {
    let timeout = setTimeout(() => {
      saveFormData(state);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [state]);

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
    setState(state.filter((field) => field.id !== id));
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
    setState(state.map((field) => ({ ...field, value: "" })));
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
        <button
          onClick={(_) => saveFormData(state)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg"
        >
          Save
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
