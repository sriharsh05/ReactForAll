import React, { useEffect, useState } from "react";
import { Link, navigate } from "raviger";
import { formData } from "../types/formTypes";
import { getLocalForms } from "../utils/storageUtils";

type CustomField = {
  id: string;
  label: string;
  value: string;
};

const fetchFormData = (formId: string): formData => {
  const forms = getLocalForms();
  const form = forms.find((form) => form.id === Number(formId));
  if (!form || form === undefined) {
    navigate("/");
  } else {
    return form;
  }
  return forms[0];
};

const getInitialState = (formId: string, questionNumber: number) => {
  const form = fetchFormData(formId);
  let question;
  if (questionNumber && form.formFields.length > questionNumber) {
    question = form.formFields[questionNumber];
  } else {
    question = form.formFields[0];
  }
  return {
    form,
    questionNumber,
    question,
  };
};

const getInitialAnswerState = (form: formData) => {
  const answers: CustomField[] = [];
  form.formFields.forEach((field, idx) => {
    answers[idx] = {
      id: field.id.toString(),
      label: field.label,
      value: "",
    };
  });
  return answers;
};

export default function PreviewPage(props: { formId: string }) {
  const [state, setState] = useState(() => getInitialState(props.formId, 0));
  const { form, question } = state;
  const [questionNumber, setQuestionNumber] = useState(state.questionNumber);
  const [answers, setAnswers] = useState(() => getInitialAnswerState(form));
  const [open, setOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string[]>(() => {
    if (question?.value === "") return [];
    return question?.value.split(",");
  });

  useEffect(() => {
    setState(getInitialState(props.formId, questionNumber));
  }, [props.formId, questionNumber]);

  useEffect(() => {
    updateAnswer(selectedOption.join(","));
  }, [selectedOption]);

  const updateAnswer = (value: string) => {
    setAnswers((answers) => {
      const updatedAnswers = answers.map((answer) => {
        if (answer.id === (question?.id).toString()) {
          return {
            ...answer,
            value: value,
          };
        }
        return answer;
      });
      return updatedAnswers;
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const item = e.target.value;
    if (e.target.checked) {
      setSelectedOption((p) => {
        return [...p, item];
      });
    } else {
      setSelectedOption((p) => {
        return [...p.filter((i) => i !== item)];
      });
    }
  };

  const handleFormSubmit = () => {
    navigate('/');
    answers.forEach((answer) => {
      console.log(`${answer.label}: ${answer.value}\n`);
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col p-4">
        <div className="p-2 m-2">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            {question?.label}
          </label>
          {(() => {
            switch (question?.kind) {
              case "text":
                return (
                  <input
                    id={(question?.id).toString()}
                    className="border-2 w-full border-gray-300 rounded-lg p-2 my-2 flex-1"
                    type="text"
                    name={question?.label}
                    placeholder={question?.label}
                    value={answers[questionNumber].value}
                    onChange={(e) => updateAnswer(e.target.value)}
                  />
                );
              case "dropdown":
                return (
                  <select
                    className="block w-full rounded-lg p-2 bg-slate-100 text-gray-700 border border-gray-200"
                    name={question?.label}
                    placeholder={question?.label}
                    value={answers[questionNumber].value}
                    onChange={(e) => updateAnswer(e.target.value)}
                  >
                    <option disabled value="">
                      Select an option
                    </option>
                    {question?.options.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                );
              case "multi-select":
                return (
                  <>
                    <div
                      onClick={() => {
                        setOpen((b) => !b);
                      }}
                      className="block w-full rounded-lg p-2 items-center hover:cursor-pointer bg-slate-100 text-gray-700 border border-gray-200 "
                    >
                      {selectedOption.length > 0 ? (
                        <div>{selectedOption.join(",")}</div>
                      ) : (
                        <div>Select</div>
                      )}
                    </div>
                    {open && (
                      <div>
                        <div className="flex gap-2 items-center hover:text-white hover:bg-blue-500 hover:cursor-pointer">
                          <input
                            className="p-2"
                            type="checkbox"
                            name={"Select all"}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedOption(question?.options);
                              } else setSelectedOption([]);
                            }}
                          />
                          <label>Select all</label>
                        </div>
                        {question?.options.map((option, index) => {
                          return (
                            <div
                              key={index}
                              className="flex gap-2 items-center hover:text-white hover:bg-blue-500 hover:cursor-pointer"
                            >
                              <input
                                id={(question?.id).toString()}
                                className="p-2"
                                type="checkbox"
                                name={option}
                                value={option}
                                onChange={handleCheckboxChange}
                                checked={selectedOption.includes(option)}
                              />
                              <label>{option}</label>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </>
                );
              default:
                return (
                  <div className="max-w-lg p-2 flex flex-wrap justify-start gap-x-4 gap-y-1">
                    {question?.options.map((option, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <input
                          className="w-4 h-4"
                          type="radio"
                          name={question?.label}
                          checked={answers[questionNumber].value === option}
                          value={option}
                          onChange={(e) => updateAnswer(e.target.value)}
                        />
                        <label>{option}</label>
                      </div>
                    ))}
                  </div>
                );
            }
          })()}
        </div>
        <div className="flex justify-end w-full gap-2">
          {questionNumber > 0 && (
            <button
              className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
              onClick={() =>
                questionNumber > 0 &&
                setQuestionNumber((questionNumber) => questionNumber - 1)
              }
            >
              Previous
            </button>
          )}
          {questionNumber < form.formFields.length - 1 && (
            <button
              onClick={() =>
                questionNumber < form.formFields.length - 1 &&
                setQuestionNumber((questionNumber) => questionNumber + 1)
              }
              className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
            >
              Next
            </button>
          )}
          {questionNumber === form.formFields.length - 1 && (
            <button
              className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
              onClick={handleFormSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </div>
      <div className="flex gap-4 justify-center mt-8">
        <Link
          href="/"
          className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
        >
          Close form
        </Link>
      </div>
    </div>
  );
}
