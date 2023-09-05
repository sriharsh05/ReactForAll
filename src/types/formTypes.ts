export type formData = {
  id: number;
  title: string;
  formFields: formField[];
};

export type Form = {
  id: number;
  title: string;
  description?: string;
  is_public?: boolean;
}

export type Errors<T> = Partial<Record<keyof T,string>>

export const validateForm = (form: Form) => {
  const errors: Errors<Form> = {}
  if(form.title.length < 1){
     errors.title = "Title is required";
  }
  if(form.title.length > 100){
    errors.title = "Title length must be less than 100 characters";
 }
 return errors;
}

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