import React from "react";
import { Link, navigate } from "raviger";
import { formData, previewForm } from "../types/formTypes";
import { previewFormReducer } from "../reducers/previewFormReducer";

// const initialPreviewState = (
//   fromStorageType: string,
//   toStorageType: string,
//   id: string
// ): previewForm => {
//   const formData = getLocalForms(fromStorageType);
//   const form = formData.find((form) => form.id === Number(id));
//   const newForm = {
//     id: Number(new Date()),
//     title: form ? form.title : "",
//     formFields: form ? form.formFields : [],
//   };
//   const answerForm = getLocalForms(toStorageType);
//   saveLocalForms(toStorageType, [...answerForm, newForm]);
//   return {
//     formAnswers: newForm,
//     currentIndex: 0,
//   };
// };

export default function PreviewPage(props: { formId: string }) {
  // const [previewState, dispatch] = React.useReducer(
  //   previewFormReducer,
  //   null,
  //   () => initialPreviewState("formData", "answerData", props.formId)
  // );
  // const form: formData = previewState.formAnswers;
  // const [selectedOption, setSelectedOption] = React.useState<string[]>([]);
  // const [open, setOpen] = React.useState<boolean>(false);

  // React.useEffect(() => {
  //   let timeout = setTimeout(() => {
  //     saveFormData("answerData", form);
  //   }, 100);
  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // }, [form]);

  // const submitForm = () => {
  //   navigate("/");
  //   form.formFields.forEach((field) => {
  //     console.log(`${field.label}: ${field.value}\n`);
  //   });
  // };

  // const nextQuestion = () => {
  //   let currentIndex = previewState.currentIndex;
  //   const formLength = form.formFields.length;
  //   currentIndex =
  //     currentIndex === formLength - 2 ? formLength - 1 : currentIndex + 1;
  //   dispatch({
  //     type: "update_current_index",
  //     idx: currentIndex,
  //   });
  // };

  // const previousQuestion = () => {
  //   let currentIndex = previewState.currentIndex;
  //   currentIndex = currentIndex === 1 ? 0 : currentIndex - 1;
  //   dispatch({
  //     type: "update_current_index",
  //     idx: currentIndex,
  //   });
  // };

  // const handleAnswer = (id: number, value: string) => {
  //   dispatch({
  //     type: "update_answer",
  //     id,
  //     value,
  //   });
  // };

  // const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const item = e.target.value;
  //   setSelectedOption((prevOptions) => {
  //     if (e.target.checked) {
  //       return [...prevOptions, item];
  //     } else {
  //       return prevOptions.filter((option) => option !== item);
  //     }
  //   });
  //   dispatch({
  //     type: "update_answer",
  //     id: Number(e.target.id),
  //     value: selectedOption.join(","),
  //   });
  // };

  return (
  //   <div className="flex flex-col">
  //     <div className="flex my-3 justify-between">
  //       <h2 className="text-3xl font-semibold">{form.title}</h2>
  //     </div>
  //     {form.formFields.length > 0 ? (
  //       form.formFields.map((question, index) => {
  //         switch (question?.kind) {
  //           case "text":
  //             return (
  //               <React.Fragment key={index}>
  //                 {previewState.currentIndex === index && (
  //                   <div className="flex flex-col">
  //                     <div>
  //                       <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
  //                         {question?.label}
  //                       </label>
  //                       <input
  //                         className="border-2 w-full border-gray-300 rounded-lg p-2 my-2 flex-1"
  //                         id={(question?.id).toString()}
  //                         type="text"
  //                         name={question?.label}
  //                         placeholder={question?.label}
  //                         value={question?.value}
  //                         onChange={(e) =>
  //                           handleAnswer(question?.id, e.target.value)
  //                         }
  //                       />
  //                     </div>
  //                     <div className="flex justify-end w-full gap-2">
  //                       {previewState.currentIndex > 0 && (
  //                         <button
  //                           type="button"
  //                           className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
  //                           onClick={previousQuestion}
  //                         >
  //                           Previous
  //                         </button>
  //                       )}
  //                       {previewState.currentIndex <
  //                         form.formFields.length - 1 && (
  //                         <button
  //                           type="button"
  //                           className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
  //                           onClick={nextQuestion}
  //                         >
  //                           Next
  //                         </button>
  //                       )}
  //                       {previewState.currentIndex ===
  //                         form.formFields.length - 1 && (
  //                         <button
  //                           onClick={submitForm}
  //                           className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
  //                         >
  //                           Submit
  //                         </button>
  //                       )}
  //                     </div>
  //                   </div>
  //                 )}
  //               </React.Fragment>
  //             );
  //           case "dropdown":
  //             return (
  //               <React.Fragment key={index}>
  //                 {previewState.currentIndex === index && (
  //                   <div className="flex flex-col">
  //                     <div>
  //                       <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
  //                         {question?.label}
  //                       </label>
  //                       <select
  //                         className="block w-full rounded-lg p-2 bg-slate-100 text-gray-700 border border-gray-200"
  //                         name={question?.label}
  //                         placeholder={question?.label}
  //                         value={question?.value}
  //                         onChange={(e) =>
  //                           handleAnswer(question?.id, e.target.value)
  //                         }
  //                       >
  //                         <option value="">Select an option</option>
  //                         {question?.options.map((option, index) => (
  //                           <option key={index} value={option}>
  //                             {option}
  //                           </option>
  //                         ))}
  //                       </select>
  //                     </div>
  //                     <div className="flex justify-end w-full gap-2">
  //                       {previewState.currentIndex > 0 && (
  //                         <button
  //                           type="button"
  //                           className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
  //                           onClick={previousQuestion}
  //                         >
  //                           Previous
  //                         </button>
  //                       )}
  //                       {previewState.currentIndex <
  //                         form.formFields.length - 1 && (
  //                         <button
  //                           type="button"
  //                           className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
  //                           onClick={nextQuestion}
  //                         >
  //                           Next
  //                         </button>
  //                       )}
  //                       {previewState.currentIndex ===
  //                         form.formFields.length - 1 && (
  //                         <button
  //                           onClick={submitForm}
  //                           className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
  //                         >
  //                           Submit
  //                         </button>
  //                       )}
  //                     </div>
  //                   </div>
  //                 )}
  //               </React.Fragment>
  //             );
  //           case "multi-select":
  //             return (
  //               <React.Fragment key={index}>
  //                 {previewState.currentIndex === index && (
  //                   <div className="flex flex-col">
  //                     <div>
  //                       <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
  //                         {question?.label}
  //                       </label>
  //                       <div
  //                         onClick={() => {
  //                           setOpen((p) => !p);
  //                         }}
  //                         className="block w-full rounded-lg p-2 items-center hover:cursor-pointer bg-slate-100 text-gray-700 border border-gray-200 "
  //                       >
  //                         {selectedOption.length > 0 ? (
  //                           <div>{selectedOption.join(",")}</div>
  //                         ) : (
  //                           <div>Select</div>
  //                         )}
  //                       </div>
  //                       {open && (
  //                         <div>
  //                           <div className="flex gap-2 items-center hover:text-white hover:bg-blue-500 hover:cursor-pointer">
  //                             <input
  //                               type="checkbox"
  //                               name={"Select all"}
  //                               className="p-2"
  //                               onChange={(e) => {
  //                                 if (e.target.checked) {
  //                                   setSelectedOption(question?.options);
  //                                 } else setSelectedOption([]);
  //                               }}
  //                             />
  //                             <label>Select all</label>
  //                           </div>
  //                           {question?.options.map((option, index) => {
  //                             return (
  //                               <div
  //                                 key={index}
  //                                 className="flex gap-2 items-center hover:text-white hover:bg-blue-500 hover:cursor-pointer"
  //                               >
  //                                 <input
  //                                   type="checkbox"
  //                                   id={(question?.id).toString()}
  //                                   name={option}
  //                                   value={option}
  //                                   onChange={handleCheckBoxChange}
  //                                   checked={selectedOption.includes(option)}
  //                                   className="p-2"
  //                                 />
  //                                 <label>{option}</label>
  //                               </div>
  //                             );
  //                           })}
  //                         </div>
  //                       )}
  //                     </div>
  //                     <div className="flex justify-end w-full gap-2">
  //                       {previewState.currentIndex > 0 && (
  //                         <button
  //                           type="button"
  //                           className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
  //                           onClick={previousQuestion}
  //                         >
  //                           Previous
  //                         </button>
  //                       )}
  //                       {previewState.currentIndex <
  //                         form.formFields.length - 1 && (
  //                         <button
  //                           type="button"
  //                           className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
  //                           onClick={nextQuestion}
  //                         >
  //                           Next
  //                         </button>
  //                       )}
  //                       {previewState.currentIndex ===
  //                         form.formFields.length - 1 && (
  //                         <button
  //                           onClick={submitForm}
  //                           className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
  //                         >
  //                           Submit
  //                         </button>
  //                       )}
  //                     </div>
  //                   </div>
  //                 )}
  //               </React.Fragment>
  //             );
  //           default:
  //             return (
  //               <React.Fragment key={index}>
  //                 {previewState.currentIndex === index && (
  //                   <div className="flex flex-col">
  //                     <div>
  //                       <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
  //                         {question?.label}
  //                       </label>
  //                       {question?.options.map((option, index) => (
  //                         <div key={index} className="flex gap-2 items-center">
  //                           <input
  //                             className="w-4 h-4"
  //                             type="radio"
  //                             name={question?.label}
  //                             checked={question?.value === option}
  //                             value={option}
  //                             onChange={(e) =>
  //                               handleAnswer(question?.id, e.target.value)
  //                             }
  //                           />
  //                           <label>{option}</label>
  //                         </div>
  //                       ))}
  //                     </div>
  //                     <div className="flex justify-end w-full gap-2">
  //                       {previewState.currentIndex > 0 && (
  //                         <button
  //                           type="button"
  //                           className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
  //                           onClick={previousQuestion}
  //                         >
  //                           Previous
  //                         </button>
  //                       )}
  //                       {previewState.currentIndex <
  //                         form.formFields.length - 1 && (
  //                         <button
  //                           type="button"
  //                           className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
  //                           onClick={nextQuestion}
  //                         >
  //                           Next
  //                         </button>
  //                       )}
  //                       {previewState.currentIndex ===
  //                         form.formFields.length - 1 && (
  //                         <button
  //                           onClick={submitForm}
  //                           className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
  //                         >
  //                           Submit
  //                         </button>
  //                       )}
  //                     </div>
  //                   </div>
  //                 )}
  //               </React.Fragment>
  //             );
  //         }
  //       })
  //     ) : (
  //       <span className="text-center text-lg font-bold">
  //         No question to preview
  //       </span>
  //     )}

  //     <div className="flex gap-4 justify-center mt-8">
  //       <Link
  //         href="/"
  //         className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
  //       >
  //         Close form
  //       </Link>
  //     </div>
  //   </div>
  // );
  <div>hi</div> );
}
