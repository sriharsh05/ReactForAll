import React, { useEffect, useState } from "react";
import { fieldOption } from "../../types/formTypes";

export function RadioButtonField(props: {
  id: number;
  label: string;
  value: string;
  options: fieldOption[];
  updateLabelCB: (id: number, value: string) => void;
  updateOptionsCB: (id: number, options: fieldOption[]) => void;
  removeFieldCB: (id: number) => void;
}) {
  const [label, setLabel] = useState(props.label);
  const [options, setOptions] = useState<fieldOption[]>(props.options);

  const addOption = () => {
    const option: fieldOption = {
      id: Number(new Date()),
      option: "",
    };
    setOptions([...options, option]);
  };

  const updateOption = (id: number, newOption: string) => {
    setOptions(
      options.map((option) =>
        option.id === id ? { ...option, option: newOption } : option
      )
    );
  };

  const removeOption = (id: number) => {
    setOptions(options.filter((option) => option.id !== id));
  };

  useEffect(() => {
    let timeout = setTimeout(() => {
      props.updateLabelCB(props.id, label);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [label]);

  useEffect(() => {
    let timeout = setTimeout(() => {
      props.updateOptionsCB(props.id, options);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [options]);

  return (
    <div className="flex flex-col items-end">
      <div className="w-full flex">
        <input
          type="text"
          id={`field-${props.id}`}
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="border-2 justify-between items-center border-gray-300 rounded-lg p-2 my-2 flex-1"
          placeholder="Enter label"
        />
        <button
          onClick={() => props.removeFieldCB(props.id)}
          className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
        >
          Remove
        </button>
      </div>
      <div className="flex flex-col w-[75%]">
        <div className="mt-2">
          <div className="flex justify-between items-center">
            <label className="block mb-1 text-md font-medium text-gray-700">
              Options:
            </label>
            <button
              onClick={() => addOption()}
              className="inline-flex items-center px-2 h-fit text-sm bg-sky-500 hover:bg-sky-700 text-white font-bold py-1  rounded-md"
            >
              Add option
            </button>
          </div>

          {options.length > 0 ? (
            <div>
              {options.map((option) => (
                <div className="w-full flex my-1" key={option.id}>
                  <input
                    type="text"
                    value={option.option}
                    onChange={(e) => updateOption(option.id, e.target.value)}
                    className="rounded-md border block flex-1 min-w-0 w-full text-sm p-1 bg-sky-100 border-sky-500 placeholder-sky-400 text-gray-900 focus:border-gray-500"
                    placeholder="Enter a option"
                  />
                  <button
                    onClick={() => removeOption(option.id)}
                    className="px-3 text-sm border bg-sky-500 hover:bg-sky-700 text-white font-bold py-1 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-black flex flex-col">
              <span>Please add atleast one option.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
