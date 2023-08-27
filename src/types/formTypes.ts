export interface formStructure {
  id: number;
  title: string;
  fields: number;
}

export interface formData {
  id: number;
  title: string;
  formFields: formField[];
}

export interface formField {
  id: number;
  label: string;
  type: string;
  value: string;
}
