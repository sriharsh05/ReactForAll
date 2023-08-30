import { initialFormField, formData } from "../types/formTypes";
import { createFormField } from "../utils/formFields";

type AddAction = {
  type: "add_field";
  kind: string;
  label: string;
};

type RemoveAction = {
  type: "remove_field";
  id: number;
};

export type FormAction = AddAction | RemoveAction;

export const formReducer = (state: formData, action: FormAction): formData => {
  switch (action.type) {
    case "add_field": {
      const { kind, label } = action;

      if (createFormField(kind, label)) {
        const newField = createFormField(kind, label);
        return {
          ...state,
          formFields: [...state.formFields, newField],
        };
      }
      return state;
    }
    case "remove_field": {
        return{
            ...state,
            formFields: state.formFields.filter((field) => field.id !== action.id)
        }
    }
  }
};
