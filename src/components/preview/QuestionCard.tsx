import { Link } from "raviger";
import { fieldAnswer, formData } from "../../types/formTypes";
import { submitForm } from "../../utils/apiUtils";
import { useReducer, useState, useEffect } from "react";
import { MultiSelectField } from "./MultiSelectPreview";
import {
  answerReducer,
  questionReducer,
} from "../../reducers/previewFormReducer";
import { PreviewButtons } from "./previewButtons";

export function QuestionCard({ currentForm }: { currentForm: formData }) {
  const [currentQuestion, dispatchQuestion] = useReducer(questionReducer, {
    currentIndex: 0,
    currentQuestion: currentForm.formFields[0],
  });
  const [answers, dispatchAnswer] = useReducer(answerReducer, []);
  const [currentAnswer, setCurrentAnswer] = useState<string>(
    currentQuestion.currentIndex < currentForm.formFields.length
      ? currentQuestion.currentQuestion.value
      : ""
  );

  const getQuestionByIndex = (index: number) => currentForm.formFields[index];
  const [error, setError] = useState("");

  const prevQuestionCB = () => {
    setCurrentAnswer("");
    dispatchQuestion({
      type: "update_question",
      getIndexQuestionCB: getQuestionByIndex,
      kind: "prev",
    });
  };

  const nextQuestionCB = (questionID: number, answer: string) => {
    if (answer) {
      setError("");
      dispatchAnswer({
        type: "update_answer",
        id: questionID,
        value: answer,
      });
      setCurrentAnswer("");
      dispatchQuestion({
        type: "update_question",
        getIndexQuestionCB: getQuestionByIndex,
        kind: "next",
      });
    } else {
      setError("Please enter your answer");
    }
  };

  const setCurrentAnswerToString = (options: string[]) => {
    setCurrentAnswer(JSON.stringify(options));
  };

  useEffect(() => {
    if (currentQuestion.currentIndex === currentForm.formFields.length) {
      submitForm(currentForm.id, {
        answers: answers,
      }).then((data) =>
        data.answers.forEach((item: fieldAnswer, idx: number) => {
          console.log(`Question ${idx + 1}: ${item.value}`);
        })
      );
    }
  }, [answers]);

  useEffect(() => {
    let ans: fieldAnswer[] = [];
    if (currentForm.formFields[currentQuestion.currentIndex]) {
      ans = answers.filter(
        (answer) =>
          answer.form_field ===
          currentForm.formFields[currentQuestion.currentIndex].id
      );
    }
    ans.length > 0 && setCurrentAnswer(ans[0].value);
  }, [currentQuestion]);

  return (
    <div className="w-full text-gray-700">
      {currentForm.formFields.length !== 0 ? (
        <div>
          {currentQuestion.currentIndex < currentForm.formFields.length ? (
            <div>
              <h2 className=" text-3xl font-semibold">{currentForm.title}</h2>
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                {currentQuestion.currentQuestion.label}
              </label>
              {error && (
                <div className="bg-red-200 border border-red-600 px-2 rounded-md text-red-600">
                  {error}
                </div>
              )}
              <div className="flex flex-col gap-2 mt-2">
                {currentQuestion.currentQuestion.kind === "TEXT" && (
                  <input
                    type="text"
                    id={`q-${currentQuestion.currentQuestion.id}`}
                    value={currentAnswer ? currentAnswer : ""}
                    onChange={(event) => setCurrentAnswer(event.target.value)}
                    className="border-2 w-full border-gray-300 rounded-lg p-2 my-2 flex-1"
                    placeholder="Enter your answer"
                  />
                )}
                {currentQuestion.currentQuestion.kind === "DROPDOWN" && (
                  <select
                    id={`q-${currentQuestion.currentQuestion.id}`}
                    value={`option-${currentAnswer}`}
                    className="block w-full rounded-lg p-2 bg-slate-100 text-gray-700 border border-gray-200"
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                  >
                    <option value="">Select an option</option>
                    {currentQuestion.currentQuestion.options.map((option) => (
                      <option
                        key={option.id}
                        className="my-2 bg-sky-200 text-gray-500 border-gray-800"
                        value={option.option}
                      >
                        {option.option}
                      </option>
                    ))}
                  </select>
                )}
                {currentQuestion.currentQuestion.kind === "GENERIC" && (
                  <MultiSelectField
                    currentAnswer={
                      currentAnswer ? JSON.parse(currentAnswer) : []
                    }
                    currentQuestion={currentQuestion.currentQuestion}
                    setCurrentAnswerCB={setCurrentAnswerToString}
                  />
                )}
                {currentQuestion.currentQuestion.kind === "RADIO" && (
                  <div className="mb-2">
                    {currentQuestion.currentQuestion.options.map((option) => (
                      <div key={option.id} className="flex gap-2 items-center">
                        <label>{option.option}</label>
                        <input
                          type="radio"
                          className="w-4 h-4"
                          name={`${currentQuestion.currentQuestion.id}`}
                          value={option.option}
                          checked={currentAnswer === option.option}
                          onChange={(e) => setCurrentAnswer(e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                )}
                <PreviewButtons
                  currentIndex={currentQuestion.currentIndex}
                  formLength={currentForm.formFields.length - 1}
                  nextQuestion={() =>
                    nextQuestionCB(
                      currentQuestion.currentQuestion.id,
                      currentAnswer
                    )
                  }
                  prevQuestion={() => prevQuestionCB()}
                />
              </div>
            </div>
          ) : (
            <div>
              <div className="flex gap-2 items-center font-semibold text-3xl m-4">
                <span>Thank you!</span>
              </div>
              <Link
                href="/"
                className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 mx-4 my-6 rounded-lg"
              >
                Close
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="flex gap-2 items-center  font-semibold text-3xl m-4">
            <span>There are no questions to preview.</span>
          </div>
          <Link
            href="/"
            className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 mx-4 my-6 rounded-lg"
          >
            <span>Close</span>
          </Link>
        </div>
      )}
    </div>
  );
}
