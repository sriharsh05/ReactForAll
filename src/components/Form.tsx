import React, { useState, useEffect, useRef } from "react";
import { Link } from "raviger";
import { getLocalForms, saveFormData } from "../utils/storageUtils";
import { FormAction, formReducer } from "../reducers/formReducer";
import { NewFieldReducer } from "../reducers/fieldReducer";
import { ErrorPage } from "./ErrorPage";
import {  fetchFormData, fetchFormFields } from "../utils/apiUtils";
import { formField } from "../types/formTypes";

const initialState = (formID: number) => {
  const form = getFormByID(formID);
  return form
    ? form
    : {
        id: 404,
        title: "Error Form",
        formFields: [],
      };
};

const getFormByID = (id: number) => {
  const localForms = getLocalForms("formData");
  const currentForm = localForms.find((form) => form.id === id);
  return currentForm;
};

const fetchForm = (formID: number, dispatch: React.Dispatch<FormAction>) => {
  fetchFormData(formID).then((data) => {
    dispatch({
      type: "set_form_data",
      id: formID,
      title: data.title,
      description: data.description,
    });
  });
  fetchFormFields(formID).then((data) => {
    dispatch({
      type: "set_fields",
      fields: data.results,
    });
  });
};

export default function Form(props: { formId: number }) {
  const [state, dispatch] = React.useReducer(formReducer, null,() => initialState(props.formId));
  const [newField, dispatchField] = React.useReducer(
		NewFieldReducer,{
    label: "",
    kind: "",
    type: "text",
    options: "" 
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
      saveFormData("formData", state);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [state]);

  // if (!state || state.id === 404) {
  //   return <ErrorPage />;
  // }

  useEffect(() => {
    fetchForm(props.formId, dispatch);
    titleRef.current?.focus();
  }, []);



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
            value={newField.label}
            onChange={(e) =>
              dispatchField({
                type: "update_label",
                value: e.target.value,
              })
            }
          />
          <select
            className="border-2 m-4 h-10 rounded-lg border-gray-300  focus:border-gray-500"
            onChange={(e) =>
              dispatchField({
                 type: "update_kind", 
                 value: e.target.value 
                })
            }
            value = {newField.type}
          >
            <option disabled value="">
								Select  kind
						</option>
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
                label: newField.label,
                kind: newField.type,
                callback: () => {
                  dispatchField({
                    type: "clear_field",
                  });
                },
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
