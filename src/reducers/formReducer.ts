import { fieldOption, formData, formField } from "../types/formTypes";
import { deleteField, updateField } from "../utils/apiUtils";

type AddAction = {
  type: "add_field";
  kind: formField["kind"];
  newField: formField;
  label: string;
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
  options: fieldOption[];
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
      return {
        ...state,
        formFields: [...state.formFields, action.newField],
      };
    }

    case "remove_field": {
      deleteField(state.id, action.id);
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
      const validatedOptions = action.options
        ? action.options.filter((opt) => opt.option !== "")
        : [];

      updateField(state.id, Number(action.id), { options: validatedOptions });
      return {
        ...state,
        formFields: state.formFields.map((field) => {
          if (
            action.id === String(field.id) &&
            (field.kind === "RADIO" ||
              field.kind === "DROPDOWN" ||
              field.kind === "GENERIC")
          ) {
            return {
              ...field,
              options: validatedOptions,
            };
          }
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
