export type formData = {
  id: number;
  title: string;
  formFields: formField[];
};

type textFieldTypes = "text" | "email" | "date" | "password" | "tel" | "file";

type TextField = {
  kind: "text"
  id: number
  label:string
  type: textFieldTypes
  value: string
}

type DropdownField = {
  kind: "dropdown"
  id: number
  label:string
  options: string[]
  value: string
}

export type formField = TextField | DropdownField