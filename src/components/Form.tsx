import React, { useState, useEffect, useRef } from "react";
import LabeledInput from "./LabeledInput";
import { Link } from "raviger";
import { formField, formData } from "../types/formTypes";
import { getLocalForms, saveLocalForms } from "../utils/storageUtils";

const initialState = (formID: number) => {
  const form = getFormByID(formID);
  return form ? form : getLocalForms()[0];
};

const saveFormData = (currentState: formData) => {
  const localForms = getLocalForms();
  const updatedLocalForms = localForms.map((form) =>
    form.id === currentState.id ? currentState : form
  );
  saveLocalForms(updatedLocalForms);
};

const getFormByID = (id: number) => {
  const localForms = getLocalForms();
  const currentForm = localForms.find((form) => form.id === id);
  return currentForm;
};

export default function Form(props: { formId: number }) {
  const [state, setState] = useState(() => initialState(props.formId));
  const [newField, setNewField] = useState({
    type: "text",
    value: "",
  });
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
          label: newField.value,
          type: newField.type,
          value: "",
        },
      ],
    });
    setNewField({
      type: "text",
      value: "",
    });
  };

  const removeField = (id: number) => {
    setState({
      ...state,
      formFields: state.formFields.filter((field) => field.id !== id),
    });
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

  const changeTitle = (title: string) => {
    const localForms = getLocalForms();
    const updatedForms = localForms.map((form) =>
      form.id === state.id ? { ...form, title } : form
    );
    saveLocalForms(updatedForms);
    setState({ ...state, title });
  };

  const changeLabel = (id: number, label: string) => {
    setState({
      ...state,
      formFields: state.formFields.map((field: formField) =>
        field.id === id ? { ...field, label } : field
      ),
    });
  };

  const changeType = (id: number, type: string) => {
    setState({
      ...state,
      formFields: state.formFields.map((field: formField) =>
        field.id === id
          ? {
              ...field,
              type,
            }
          : field
      ),
    });
  };

  return (
    <div>
      <div className=" gap-2 p-4 border-gray-500 divide-dotted">
        <div>
          <input
            type="text"
            className="border-2 border-gray-300 rounded-lg p-2 my-2 flex-1"
            value={state.title}
            onChange={(e) => {
              changeTitle(e.target.value);
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
            changeLabelCB={changeLabel}
            changeTypeCB={changeType}
          />
        ))}
        <div className="flex gap-2 ">
          <input
            type="text"
            className="border-2 justify-between items-center border-gray-300 rounded-lg p-2 my-2 flex-1"
            value={newField.value}
            onChange={(e) => {
              setNewField({
                ...newField,
                value: e.target.value,
              });
            }}
          />
          <select
            className="border-2 m-4 h-10 rounded-lg border-gray-300  focus:border-gray-500"
            onChange={(e) => {
              setNewField({
                ...newField,
                type: e.target.value,
              });
            }}
          >
            <option value="text">Text</option>
            <option value="email">Email</option>
            <option value="password">Password</option>
            <option value="date">Date</option>
            <option value="tel">Tel</option>
            <option value="file">File</option>
          </select>
          <button
            className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
            onClick={addField}
          >
            Add field
          </button>
        </div>
        <div className="flex gap-4">
          <button
            onClick={(_) => {
              saveFormData(state);
            }}
            className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 my-4 rounded-lg"
          >
            Save
          </button>
          <Link
            className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
            href="/"
          >
            Close Form
          </Link>
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
