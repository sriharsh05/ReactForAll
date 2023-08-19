import React from "react";
import { formData } from "./Form";

export const ListForms = (prop: {
  localForms: formData[];
  addFormCB: () => void;
  removeFormCB: (id: number) => void;
  selectedFormCB: (form: formData) => void;
}) => {
  return (
    <div className="p-4 border bg-gray-300 border-gray-300 mb-3 rounded-lg shadow-md max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-wrap justify-start m-2 overflow-y-auto max-h-40">
          {prop.localForms.map((form: formData) => (
            <div
              key={form.id}
              className="flex flex-col m-2 p-2  bg-cyan-500 text-black items-stretch rounded-xl"
            >
              <p className="text-l font-bold">{form.title}</p>
              <div className="flex justify-end items-center mt-2">
                <button
                  className="bg-sky-700 hover:bg-sky-900 text-white font-bold py-2 px-4 m-4 rounded-lg"
                  onClick={(_) => prop.selectedFormCB(form)}
                >
                  Edit
                </button>
                <button
                  className="bg-sky-700 hover:bg-sky-900 text-white font-bold py-2 px-4 m-4 rounded-lg"
                  onClick={(_) => prop.removeFormCB(form.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={(_) => prop.addFormCB()}
          className="relative justify-center items-center bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
        >
          Add Form
        </button>
      </div>
    </div>
  );
};
