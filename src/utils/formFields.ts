import { formField } from "../types/formTypes";

const textFormField = (label: string): formField => {
  return {
    kind: "text",
    id: Number(new Date()),
    label: label,
    type: "text",
    value: "",
  };
};

const dropdownFormField = (label: string): formField => {
  return {
    kind: "dropdown",
    id: Number(new Date()),
    label: label,
    options: [],
    value: "",
  };
};

const multiselectFormField = (label: string): formField => {
    return {
      kind: "multi-select",
      id: Number(new Date()),
      label: label,
      options: [],
      value: "",
    };
  };

const radioFormField = (label: string): formField => {
  return {
    kind: "radio",
    id: Number(new Date()),
    label: label,
    options: [],
    value: "",
  };
};


export const createFormField = (kind: string, label: string): formField => {
  switch (kind) {
    case "dropdown":
      return dropdownFormField(label);
    case "multiselect":
      return multiselectFormField(label);
    case "radio":
      return radioFormField(label);
    default:
        return textFormField(label);  
  }
};
