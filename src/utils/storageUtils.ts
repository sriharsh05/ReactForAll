import { formData, formField } from "../types/formTypes";

export const initialFormFields: formField[] = [
    { kind: "text", id: 1, label: "First Name", type: "text", value: "" },
    { kind: "text", id: 2, label: "Last Name", type: "text", value: "" },
    { kind: "text",id: 3, label: "Email", type: "email", value: "" },
    { kind: "text",id: 4, label: "Date of birth", type: "date", value: "" },
  ];

export const saveLocalForms = (storageType: string, localForms: formData[]) => {
    localStorage.setItem(storageType, JSON.stringify(localForms));
  };

  export const getLocalForms = (storageType: string): formData[] => {
    const savedFormsJSON = localStorage.getItem(storageType);
    const persistentFormFields = savedFormsJSON ? JSON.parse(savedFormsJSON) : [];
    return persistentFormFields;
  };
    