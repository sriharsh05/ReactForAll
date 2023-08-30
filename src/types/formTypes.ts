export type formData = {
  id: number;
  title: string;
  formFields: formField[];
};

type TextField = {
  kind: "text"
  id: number
  label:string
  type: string
  value: string
}

type DropdownField = {
  kind: "dropdown"
  id: number
  label:string
  options: string[]
  value: string
}

type MultiSelectionField = {
  kind: "multi-select"
  id: number
  label:string
  options: string[]
  value: string
}

type RadioButtonField = {
  kind : "radio"
  id: number
  label:string
  options: string[]
  value: string
}

export type initialFormField = {
	label: string
	kind: string
	type: string
	options: string
};

export type formField = TextField | DropdownField | MultiSelectionField | RadioButtonField

export type previewForm = {
  currentIndex: number
  formAnswers: formData
}