import React, { useEffect, useState } from "react";
import { MultiSelectionField } from "../../types/formTypes";

export function MultiSelectField({
  currentAnswer,
  currentQuestion,
  setCurrentAnswerCB,
}: {
  currentAnswer: string[];
  currentQuestion: MultiSelectionField;
  setCurrentAnswerCB: (options: string[]) => void;
}) {
  const [Open, setOpen] = useState(false);

  const updateOption = (option: string) => {
    if (Array.isArray(currentAnswer)) {
      if (!currentAnswer.includes(option))
        setCurrentAnswerCB([...currentAnswer, option]);
      else setCurrentAnswerCB(currentAnswer.filter((answer) => answer !== option));
    }
  };


  const isOptionSelected = (option: string) => {
    if (Array.isArray(currentAnswer)) {
      return currentAnswer.includes(option);
    }
  };

  const isAllSelected = () => { 
    return (
      currentQuestion.kind === "GENERIC" &&
      Array.isArray(currentAnswer) &&
        JSON.stringify(currentQuestion.options.map((opt) => opt.option).sort()) === JSON.stringify(currentAnswer.sort()) 
    );
  };

  useEffect(() => {
    if (!Array.isArray(currentAnswer)) setCurrentAnswerCB([]);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="block w-full rounded-lg p-2 items-center hover:cursor-pointer bg-slate-100 text-gray-700 border border-gray-200">
      <button
        className="w-full flex justify-between"
        onClick={() => setOpen((Open) => !Open)}
      >
        <span>Select options</span>
      </button>
      <div
        id={`q-${currentQuestion.id}`}
        className={`py-2 flex-col gap-2 ${Open ? "flex" : "hidden"}`}
      >
        <button
          onClick={() =>
            !isAllSelected()
              ? setCurrentAnswerCB(
                  currentQuestion.options.map((option) => option.option)
                )
              : setCurrentAnswerCB([])
          }
          className={`text-start border-2 rounded-md px-2 py-1 ${
            isAllSelected()
              ? "bg-sky-200 text-gray-500 border-gray-800"
              : "border-gray-600"
          }`}
        >
          Select all
        </button>
        {currentQuestion.options.map((option) => (
          <div
            key={option.id}
            onClick={() => updateOption(option.option)}
            className={`cursor-pointer border-2 rounded-md px-2 py-1 ${
              isOptionSelected(option.option)
                ? "bg-sky-200 text-gray-500 border-gray-800"
                : "border-gray-600"
            }`}
          >
            <label>{option.option}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
