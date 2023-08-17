import React, { useState, useEffect, useRef } from "react";
import LabeledInput from "./LabeledInput";

interface formData {
  id : number;
  title: string;
  formFields : formField[];
}

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

const getLocalForms: () => formData[] = () =>{
  const savedFormsJSON = localStorage.getItem("savedForms");
  const persistentFormFields = savedFormsJSON ? JSON.parse(savedFormsJSON) : [];
  return persistentFormFields;
} 

const initialState: () => formData = () => {
  const localForms = getLocalForms(); 
  if(localForms.length > 0) {
    return localForms[0];
  }
  const newForm = {
        id : Number(new Date()),
        title : "Untitled form",
        formFields :initialFormFields
      };
  saveLocalForms([...localForms, newForm]);    
  return newForm;
};

const saveLocalForms = (localForms: formData[]) => {
  localStorage.setItem("savedForms", JSON.stringify(localForms)); 
}

const saveFormData = (currentState: formData) => {
  const localForms = getLocalForms();
  const updatedLocalForms = localForms.map((form) =>
    form.id === currentState.id ? currentState : form
  );
  saveLocalForms(updatedLocalForms);
};

export default function Form(props: { closeFormCB: () => void }) {
  const [state, setState] = useState(() => initialState());
  const [newField, setNewField] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    console.log("Component Mounted");
    document.title = "Form Editor";
    titleRef.current?.focus();
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
    setState({
      ...state,
      formFields: [
        ...state.formFields,
        {
          id: Number(new Date()),
          label: newField,
          type: "text",
          value: "",
        },
      ]
    });
    setNewField("");
  };

  const removeField = (id: number) => {
    setState({
      ...state,
      formFields : state.formFields.filter((field) => field.id !== id)
    });
  };
  const setValue = (id: number, value: string) => {
    setState({
      ...state,
      formFields: state.formFields.map((field) => {
        if (field.id === id) {
          return {
            ...field,
            value,
          };
        }
        return field;
      })
    }   
    );
  };
  const clearForm = () => {
    setState({
      ...state,
      formFields: state.formFields.map((field) => ({
        ...field,
        value: "",
      })),
    });
  };
  return (
    <div className="flex flex-col gap-2 p-4 divide-y divide-dotted">
      <input
          type="text"
          className="border-2 border-gray-300 rounded-lg p-2 my-2 flex-1"
          value={state.title}
          onChange={(e) => {
            setState({...state, title: e.target.value });
          }}
          ref = {titleRef}
        />
      <div>
        {state.formFields.map((field) => (
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
