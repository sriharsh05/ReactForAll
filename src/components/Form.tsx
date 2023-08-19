import React, { useState, useEffect, useRef } from "react";
import LabeledInput from "./LabeledInput";
import { ListForms } from "./ListForms";

export interface formData {
  id: number;
  title: string;
  formFields: formField[];
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

const getLocalForms: () => formData[] = () => {
  const savedFormsJSON = localStorage.getItem("savedForms");
  const persistentFormFields = savedFormsJSON ? JSON.parse(savedFormsJSON) : [];
  return persistentFormFields;
};

const initialState: () => formData = () => {
  const localForms = getLocalForms();
  if (localForms.length > 0) {
    return localForms[0];
  }
  const newForm = {
    id: Number(new Date()),
    title: "Untitled form",
    formFields: initialFormFields,
  };
  saveLocalForms([...localForms, newForm]);
  return newForm;
};

const saveLocalForms = (localForms: formData[]) => {
  localStorage.setItem("savedForms", JSON.stringify(localForms));
};

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
    }, 500);
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
      ],
    });
    setNewField("");
  };

  const removeField = (id: number) => {
    setState({
      ...state,
      formFields: state.formFields.filter((field) => field.id !== id),
    });
  };

  const addForm = () => {
    const localForms = getLocalForms();
    const newForm = {
      id: Number(new Date()),
      title: "Untitled Form",
      formFields: initialFormFields,
    };
    saveLocalForms([...localForms, newForm]);
    setState(newForm);
  };

  const removeForm = (id: number) => {
    const localForms = getLocalForms();
    if (localForms.length > 1) {
      const updatedForms = localForms.filter((form) => form.id !== id);
      if (state.id === id) {
        setState(updatedForms[0]);
      } else {
        const FormIndex = updatedForms.findIndex(
          (form) => form.id === state.id
        );
        setState(updatedForms[FormIndex]);
      }
      saveLocalForms(updatedForms);
    }
  };

  const setValue = (id: number, value: string) => {
    setState({
      ...state,
      formFields: state.formFields.map((field) =>
        field.id === id ? { ...field, value } : field
      ),
    });
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
    <div>
      <ListForms
        localForms={getLocalForms()}
        addFormCB={addForm}
        removeFormCB={removeForm}
        selectedFormCB={(form: formData) => setState(form)}
      />
      <div className=" gap-2 p-4 border-gray-500 divide-dotted">
        <div>
          <input
            type="text"
            className="border-2 border-gray-300 rounded-lg p-2 my-2 flex-1"
            value={state.title}
            onChange={(e) => {
              setState({ ...state, title: e.target.value });
            }}
            ref={titleRef}
          />
        </div>
        {state.formFields.map((field) => (
          <LabeledInput
            id={field.id}
            key={field.id}
            label={field.label}
            type={field.type}
            value={field.value}
            removeFieldCB={removeField}
            setValueCB={setValue}
          />
        ))}
        <div className="flex gap-2 ">
          <input
            type="text"
            className="border-2 justify-between items-center border-gray-300 rounded-lg p-2 my-2 flex-1"
            value={newField}
            onChange={(e) => {
              setNewField(e.target.value);
            }}
          />
          <button
            className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
            onClick={addField}
          >
            Add field
          </button>
        </div>
        <div className="flex gap-4">
          <button
            onClick={(_) => saveFormData(state)}
            className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 my-4 rounded-lg"
          >
            Save
          </button>
          <button
            className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
            onClick={props.closeFormCB}
          >
            Close Form
          </button>
          <button
            className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
            onClick={clearForm}
          >
            Clear Form
          </button>
        </div>
      </div>
    </div>
  );
}
