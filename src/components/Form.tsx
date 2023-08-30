import React, { useState, useEffect, useRef } from "react";
import { Link } from "raviger";
import { formData } from "../types/formTypes";
import { getLocalForms, saveLocalForms } from "../utils/storageUtils";
import { formReducer } from "../reducers/formReducer";

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
  const [state, dispatch] = React.useReducer(formReducer, null,() => initialState(props.formId));
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

  return (
    <div>
      <div className="border-gray-500 p-4">
        <div>
          <input
            type="text"
            className="border-2 border-gray-300 rounded-lg p-2 my-2 flex-1"
            value={state.title}
            onChange={(e) => dispatch({ 
              type: "update_title",
               title: e.target.value 
              }
              )}
            ref={titleRef}
          />
        </div>
        {state.formFields.map((field) => (
          <div key={field.id} className="w-full">
            <span className="text-lg font-semibold px-2">{field.label}</span>
            <div className="flex gap-4">
              <input
                id={field.id.toString()}
                value={field.value}
                className="border-2 justify-between items-center border-gray-300 rounded-lg p-2 my-2 flex-1"
                onChange={(e) =>
									dispatch({
										type: "update_label",
										id: (field.id).toString(),
										value: e.target.value,
									})
								}
                placeholder={field.label}
              />
              {(field.kind === "dropdown" ||
                field.kind === "radio" ||
                field.kind === "multi-select") && (
                <input
                  id={(field.id+1).toString()}
                  value={field.options.join(",")}
                  className="border-2 justify-between items-center border-gray-300 rounded-lg p-2 my-2 flex-1"
                  placeholder="Enter options seperated by commas(,)"
                  onChange={(e) =>
										dispatch({
											type: "update_options",
											id: (field.id).toString(),
											options: e.target.value,
										})
									}
                />
              )}
              <button
                type="button"
                onClick={() =>
                  dispatch({
                    type: "remove_field",
                    id: field.id,
                  })
                }
                className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
              >
                Remove
              </button>
            </div>
          </div>
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
            <option value="dropdown">Dropdown</option>
            <option value="radio">Radio</option>
            <option value="multiselect">MultiSelect</option>
          </select>
          <button
            className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
            onClick={(_) =>
              dispatch({
                type: "add_field",
                label: newField.value,
                kind: newField.type,
                callback: () => setNewField({
                      type: "",
                      value: "",
                    })
              })
            }
          >
            Add field
          </button>
        </div>
        <div className="flex gap-4">
          <Link
            className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
            href="/"
          >
            Close Form
          </Link>
        </div>
      </div>
    </div>
  );
}
