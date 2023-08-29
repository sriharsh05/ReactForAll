import React, { useState, useEffect, useRef } from "react";
import { Link } from "raviger";
import { formField, formData } from "../types/formTypes";
import { getLocalForms, saveLocalForms } from "../utils/storageUtils";
import { createFormField } from "../utils/formFields";


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

type RemoveAction = {
  type: "remove_field",
  id: number
}

type AddAction = {
  type: "add_field",
  kind: string,
  label: string
}

type FormAction = AddAction | RemoveAction

const reducer = (state: formData, action: FormAction) => {
  switch(action.type){
    case "add_field" :{
      const newField = createFormField(action.kind, action.label);
        return{
          ...state,
			   formFields: [...state.formFields, newField]
        };
    }
    case "remove_field":{
      return{
        ...state,
        formFields: state.formFields.filter(
          (field) => field.id !== action.id
        )
      }
    }  
  }
}

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

  const dispatchAction = (action: FormAction) => {
    setState((prevState) =>{
      return reducer(prevState, action);
    })
  }

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


  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setState((form) => {
			const updatedFormFields = form.formFields.map((field) => 
        field.id === Number(e.target.id) 
        ? {
            ...field,
            label: e.target.value,
            value: e.target.value,
          }
        : field
      );
			return {
				...form,
				formFields: updatedFormFields,
			};
		});
	};
  
  const addOptionsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const options = e.target.value.split(",");
		setState((form) => {
			const updatedFormFields = form.formFields.map((field) => 
        field.id === Number(e.target.id)
        ? {
            ...field,
            options: options,
          }
        : field
      );
			return {
				...form,
				formFields: updatedFormFields,
			};
		});
	};

  return (
    <div>
      <div className="border-gray-500 p-4">
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
            <div key={field.id} className="w-full">
						<span className="text-lg font-semibold px-2">{field.label}</span>
						<div className="flex gap-4">
							<input
								id={(field.id).toString()}
								value={field.value}
								className="border-2 justify-between items-center border-gray-300 rounded-lg p-2 my-2 flex-1"
								onChange={inputHandler}
								placeholder={field.label}
							/>
							{(field.kind === "dropdown" ||
								field.kind === "radio" ||
								field.kind === "multi-select") && (
								<input
									id={(field.id).toString()}
									value={field.options.join(",")}
									className="border-2 justify-between items-center border-gray-300 rounded-lg p-2 my-2 flex-1"
									placeholder="Enter options seperated by commas(,)"
									onChange={addOptionsHandler}
								/>
							)}
							<button
								type="button"
								onClick={() => dispatchAction({type: "remove_field", id: field.id})}
								className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 m-4 rounded-lg">
								Remove
							</button>
						</div>
					</div>
         ))
        }
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
            onClick={(_)=>dispatchAction({
              type: "add_field",
              label: newField.value,
              kind:newField.type,
            })}
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
