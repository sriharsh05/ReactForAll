import React, { useEffect, useState } from "react";
import { navigate } from "raviger";
import { formData } from "../types/formTypes";
import { getLocalForms } from "../utils/storageUtils";

const getCurrentForm = (formId:number) : formData => {
      const currentForm = getLocalForms().filter((form) => form.id === formId)[0];
      return currentForm;
  }
  

export default function CustomPreviewComponent(props: { formId: number }) {
  const [currentForm] = useState(() =>getCurrentForm(props.formId));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [formValues, setFormValues] = useState<string[]>([]);

  useEffect(() => {
    setFormValues((form) => {
      const newForm = [...form];
      newForm[currentIndex] = inputValue;
      return newForm;
    });
    return () => {};
  }, [currentIndex, inputValue]);

  return (
    <div className="flex flex-col items-center">
      <div className="text-center font-bold text-3xl ">{currentForm.title}</div>
      <div className="flex flex-col items-center m-4 p-4 border-2 border-gray-500 rounded-lg">
        <label className="text-center text-xl font-bold">
          {currentForm.formFields[currentIndex].label}
        </label>
        <input
          className="border-2 justify-between items-center border-gray-300 rounded-lg p-2 my-2 flex-1"
          type={currentForm.formFields[currentIndex].kind}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          autoFocus
        />
      </div>
      <div className="flex flex-row items-center">
        <button
          className="bg-sky-700 hover:bg-sky-900 text-white font-bold py-2 px-4 m-4 rounded-lg"
          onClick={() => {
            if(currentIndex === 0) { navigate("/"); }
            setCurrentIndex(currentIndex - 1);
            if (formValues[currentIndex - 1]) setInputValue(formValues[currentIndex - 1]);
            else setInputValue("");
          }}
        >
          Back
        </button>
        <button
          className="bg-sky-700 hover:bg-sky-900 text-white font-bold py-2 px-4 m-4 rounded-lg disabled:hidden"
          value = "Next"
          disabled={currentIndex === currentForm.formFields.length - 1}
          onClick={() => {
            setCurrentIndex(currentIndex + 1);
            if (formValues[currentIndex + 1]) setInputValue(formValues[currentIndex + 1]);
            else setInputValue("");
          }}
        >
          Next
          </button>
        <button
          className="bg-sky-700 hover:bg-sky-900 text-white font-bold py-2 px-4 m-4 rounded-lg disabled:hidden"
          disabled={currentIndex !== currentForm.formFields.length - 1}
          onClick={() => {
            setCurrentIndex(currentIndex + 1);
            console.log(formValues);
            navigate("/");
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
