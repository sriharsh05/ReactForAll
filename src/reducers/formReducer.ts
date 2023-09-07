import { formData, formField } from "../types/formTypes";
import { createFormField } from "../utils/formFields";

type AddAction = {
  type: "add_field";
  kind: string;
  label: string;
  callback: () => void;
};

type RemoveAction = {
  type: "remove_field";
  id: number;
};

type UpdateTitleAction = {
  type: "update_title";
  title: string;
};

type UpdateLabelAction = {
  type: "update_label";
  id: string;
  value: string;
};

type UpdateOptionsAction = {
  type: "update_options";
  id: string;
  options: string;
};

type SetFields = {
  type: "set_fields";
  fields: formField[];
};

type SetFormData = {
  type: "set_form_data";
  id: number;
  title: string;
  description: string;
};

export type FormAction =
  | AddAction
  | RemoveAction
  | UpdateTitleAction
  | UpdateLabelAction
  | UpdateOptionsAction
  | SetFields
  | SetFormData;

export const formReducer = (state: formData, action: FormAction): formData => {
  switch (action.type) {
    case "add_field": {
      const { kind, label } = action;

      if (createFormField(kind, label)) {
        const newField = createFormField(kind, label);
        action.callback();
        return {
          ...state,
          formFields: [...state.formFields, newField],
        };
      }
      return state;
    }
    case "remove_field": {
      return {
        ...state,
        formFields: state.formFields.filter((field) => field.id !== action.id),
      };
    }
    case "update_title": {
      return {
        ...state,
        title: action.title,
      };
    }

    case "update_label": {
      const { id, value } = action;
      return {
        ...state,
        formFields: state.formFields.map((field) => {
          if (field.id === Number(id))
            return { ...field, label: value, value: value };
          return field;
        }),
      };
    }

    case "update_options": {
      const { id, options } = action;
      const fieldOptions = options.split(",");
      return {
        ...state,
        formFields: state.formFields.map((field) => {
          if (field.id === Number(id))
            return { ...field, options: fieldOptions };
          return field;
        }),
      };
    }

    case "set_fields": {
      return {
        ...state,
        formFields: action.fields,
      };
    }
    case "set_form_data": {
      return {
        ...state,
        id: action.id,
        title: action.title,
      };
    }

    default:
      return state;
  }
};
