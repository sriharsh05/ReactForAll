import React, { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { formField } from "../types/formTypes";
import { Link, navigate } from "raviger";
import { DropdownField } from "./formFields/DropdownField";
import { MultiSelectField } from "./formFields/MultiSelectField";
import { RadioButtonField } from "./formFields/RadioButtonField";
import { TextField } from "./formFields/TextField";
import {
  addField,
  fetchFormData,
  fetchFormFields,
} from "../utils/apiUtils";
import { FormAction, formReducer } from "../reducers/formReducer";
import ShareLink from "./ShareLink";

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

export default function Form(props: { id: number }) {
  const [fieldState, dispatch] = useReducer(formReducer, {
    id: props.id,
    title: "",
    formFields: [],
  });
  const [newLabel, setNewLabel] = useState("");
  const [kind, setKind] = useState<formField["kind"]>("TEXT");
  const [error, setError] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);

  const addFormField = (
    formID: number,
    label: string,
    kind: formField["kind"]
  ) => {
    addField(formID, {
      label: label,
      kind: kind,
      ...(kind === "TEXT" && {
        meta: {
          description: {
            fieldType: "text",
          },
        },
      }),
      ...((kind === "DROPDOWN" || kind === "GENERIC" || kind === "RADIO") && {
        options: [],
      }),
    }).then((data) =>
      dispatch({
        type: "add_field",
        label: newLabel,
        kind: kind,
        newField: data,
      })
    );
  };

  useEffect(() => {
    fetchForm(props.id, dispatch);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fieldState.id !== props.id && navigate(`/form/${fieldState.id}`);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldState.id]);

  const onKeyPressHandler = useCallback((event: KeyboardEvent) => {
    if (event.shiftKey === true) {
      if (event.key === "H") {
        navigate("/");
      }
      if (event.key === "A") {
        navigate("/about");
      }
      if (event.key === "L") {
        localStorage.removeItem("token");
        window.location.reload();
      }
    }
  },[]);

  useEffect(() => {
    document.addEventListener("keydown", onKeyPressHandler);
    document.addEventListener("keyup", onKeyPressHandler);
    return () => {
      document.removeEventListener("keydown", onKeyPressHandler);
      document.removeEventListener("keyup", onKeyPressHandler);
    };
  }, [onKeyPressHandler]);

  return (
    <div>
      <div className="border-gray-400 p-4">
        <div className="flex flex-col mt-2">
          <span className="font-semibold text-md">
            Title
          </span>
          <input
            type="text"
            id="form-title"
            ref={titleRef}
            value={fieldState.title}
            onChange={(e) =>
              dispatch({ type: "update_title", title: e.target.value })
            }
            className="border-2 justify-between items-center border-gray-300 rounded-lg p-2 my-2 flex-1"
            placeholder="Form title"
          />
        </div>
      </div>
      <ShareLink formID={fieldState.id} />

      {fieldState.formFields && (
        <div>
          {fieldState.formFields.length > 0 ? (
            <div className="flex flex-col">
              {
                // eslint-disable-next-line
                fieldState.formFields.map((field) => {
                  switch (field.kind) {
                    case "TEXT":
                      return (
                        <div className="my-1" key={field.id}>
                          <h3 className="text-md font-semibold">Text Field</h3>
                          {field.label === "" && (
                            <div className="bg-red-200 my-2 border border-red-600 px-2 rounded-md text-red-600">
                              Label cannot be empty.
                            </div>
                          )}
                          <TextField
                            key={field.id}
                            id={field.id}
                            label={field.label}
                            value={field.value}
                            updateLabelCB={(id, value) => {
                              if (value !== field.label)
                                dispatch({
                                  type: "update_label",
                                  id: String(id),
                                  value: value,
                                });
                            }}
                            removeFieldCB={(id) =>
                              dispatch({
                                type: "remove_field",
                                id: id,
                              })
                            }
                          />
                        </div>
                      );
                      case "RADIO":
                        return (
                          <div className="my-1" key={field.id}>
                            <h3 className="font-semibold text-md">
                              Radio button
                            </h3>
                            {field.label === "" && (
                              <div className="bg-red-200 my-2 border border-red-600 px-2 rounded-md text-red-600">
                                Label cannot be empty.
                              </div>
                            )}
                            <RadioButtonField
                              id={field.id}
                              label={field.label}
                              value={field.value}
                              options={field.options}
                              updateOptionsCB={(id, options) => {
                                if (options !== field.options)
                                  dispatch({
                                    type: "update_options",
                                    id: String(id),
                                    options: options,
                                  });
                              }}
                              updateLabelCB={(id, value) => {
                                if (value !== field.label)
                                  dispatch({
                                    type: "update_label",
                                    id: String(id),
                                    value: value,
                                  });
                              }}
                              removeFieldCB={(id) =>
                                dispatch({
                                  type: "remove_field",
                                  id: id,
                                })
                              }
                            />
                          </div>
                        );  
                    case "DROPDOWN":
                      return (
                        <div className="my-1" key={field.id}>
                          <h3 className="text-md font-semibold">Dropdown</h3>
                          {field.label === "" && (
                            <div className="bg-red-200 my-2 border border-red-600 px-2 rounded-md text-red-600">
                              Label cannot be empty.
                            </div>
                          )}
                          <DropdownField
                            id={field.id}
                            label={field.label}
                            value={field.value}
                            options={field.options}
                            updateOptionsCB={(id, options) => {
                              if (options !== field.options)
                                dispatch({
                                  type: "update_options",
                                  id: String(id),
                                  options: options,
                                });
                            }}
                            updateLabelCB={(id, value) => {
                              if (value !== field.label)
                                dispatch({
                                  type: "update_label",
                                  id: String(id),
                                  value: value,
                                });
                            }}
                            removeFieldCB={(id) =>
                              dispatch({
                                type: "remove_field",
                                id: id,
                              })
                            }
                          />
                        </div>
                      );
                      case "GENERIC":
                      return (
                        <div className="my-1" key={field.id}>
                          <h3 className=" font-semibold text-md">Multiselect</h3>
                          {field.label === "" && (
                            <div className="bg-red-200 my-2 border border-red-600 px-2 rounded-md text-red-600">
                              Label cannot be empty.
                            </div>
                          )}
                          <MultiSelectField
                            id={field.id}
                            label={field.label}
                            value={field.value}
                            options={field.options}
                            updateOptionsCB={(id, options) => {
                              if (options !== field.options)
                                dispatch({
                                  type: "update_options",
                                  id: String(id),
                                  options: options,
                                });
                            }}
                            updateLabelCB={(id, value) => {
                              if (value !== field.label)
                                dispatch({
                                  type: "update_label",
                                  id: String(id),
                                  value: value,
                                });
                            }}
                            removeFieldCB={(id) =>
                              dispatch({
                                type: "remove_field",
                                id: id,
                              })
                            }
                          />
                        </div>
                      );
                  }
                })
              }
            </div>
          ) : (
            <div>
              <h4 className="font-semibold text-xl m-1">
                There are no fields currently
              </h4>
            </div>
          )}
        </div>
      )}
      <div className="w-full pt-2">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative">
            {error}
          </div>
        )}
        <div className="flex mt-2 w-full">
          <input
            type="text"
            id="add-field"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            className="border-2 justify-between items-center border-gray-300 rounded-lg p-2 my-2 flex-1"
            placeholder="Enter field name"
          />
           <select
            value={kind}
            onChange={(e) => {
              setKind(e.target.value as formField["kind"]);
            }}
            className="border-2 m-4 h-10 rounded-lg border-gray-300  focus:border-gray-500"
          >
            <option value="TEXT">
              Text Field
            </option>
            <option value="DROPDOWN">
              Dropdown
            </option>
            <option value="RADIO">
              Radio button
            </option>
            <option value="GENERIC">
              Multi-Select
            </option>
          </select>
          <button
            onClick={(_) => {
              if (newLabel === "") {
                return setError("Label cannot be empty");
              }
              setError("");
              setKind("TEXT");
              setNewLabel("");
              addFormField(fieldState.id, newLabel, kind);
            }}
            className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
          >
            <span className="ml-2 font-semibold">Add field</span>
          </button>
        </div>
      </div>
      <div className="flex gap-4 mt-2">
        <Link
          href="/"
          className="w-full text-center rounded-lg bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 m-4 rounded-l"
        >
          Close Form
        </Link>
      </div>
    </div>
  );
}

