import React from "react";
import { Link } from "raviger";
import { formData } from "../types/formTypes";


export const ListForms = (prop: {
  localForms: formData[];
  addFormCB: () => void;
  removeFormCB: (id: number) => void;
  search: string;
}) => {
  return (
    <div className="border bg-gray-300 border-gray-300 mb-3 p-4 rounded-lg">
      <div className="flex flex-col items-center">
        <div className="flex flex-wrap justify-center m-2 overflow-y-auto max-w-screen-lg mx-auto">
          {prop.localForms
            .filter((form) => {
              return form.title.toLowerCase().includes(prop.search?.toLowerCase() || "");
            })
            .map((form: formData) => (
              <div
                key={form.id}
                className="flex-col m-2 p-2 bg-cyan-500 text-black items-stretch rounded-xl"
              >
                <p className="text-l font-bold">{form.title}</p>
                <div className="flex justify-end items-center mt-2">
                  <Link
                      href={"/preview/" + form.id}
                      className="bg-sky-700 hover:bg-sky-900 text-white font-bold py-2 px-4 m-4 rounded-lg "
                    >
                      PREVIEW
                    </Link>
                  <Link
                    className="bg-sky-700 hover:bg-sky-900 text-white font-bold py-2 px-4 m-4 rounded-lg"
                    href={"/forms/" + form.id}
                  >
                    Edit
                  </Link>
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
          className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
        >
          Add Form
        </button>
      </div>
    </div>
  );
};





// return (
// 	<div className="flex flex-col">
// 		<div className="flex my-3 justify-between">
// 			<h2 className="text-3xl font-semibold">{form.title}</h2>
// 		</div>
// 		{form.formFields.length > 0 ? (
// 			form.formFields.map((question, index) => {
// 				return (
// 					<React.Fragment key={index}>
// 						{previewState.currentIndex === index && (
// 							<div className="flex flex-col">
// 								<div>
// 									<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
// 										{question?.label}
// 									</label>
// 									{question?.kind === "text" ? (
// 										<input
// 											className="border-2 w-full border-gray-300 rounded-lg p-2 my-2 flex-1"
// 											id={(question?.id).toString()}
// 											type="text"
// 											name={question?.label}
// 											placeholder={question?.label}
// 											value={question?.value}
// 											onChange={(e) => handleAnswer(question?.id, e.target.value)}
// 										/>
// 									) : question?.kind === "dropdown" ? (
// 										<select
// 											className="block w-full rounded-lg p-2 bg-slate-100 text-gray-700 border border-gray-200"
// 											name={question?.label}
// 											placeholder={question?.label}
// 											value={question?.value}
// 											onChange={(e) => handleAnswer(question?.id, e.target.value)}>
// 											<option value="">Select an option</option>
// 											{question?.options.map((option, index) => (
// 												<option key={index} value={option}>
// 													{option}
// 												</option>
// 											))}
// 										</select>
// 									) : question?.kind === "multi-select" ? (
// 										<>
// 											<div
// 												onClick={() => {
// 													setOpen((p) => !p);
// 												}}
// 												className="block w-full rounded-lg p-2 items-center hover:cursor-pointer bg-slate-100 text-gray-700 border border-gray-200 ">
// 												{selected.length > 0 ? (
// 													<div>{selected.join(",")}</div>
// 												) : (
// 													<div>Select</div>
// 												)}
// 												<span className="before:content-['▼']"></span>
// 											</div>
// 											{open && (
// 												<div>
// 													<div className="flex gap-2 items-center hover:text-white hover:bg-blue-500 hover:cursor-pointer">
// 														<input
// 															type="checkbox"
// 															name={"Select all"}
// 															className="p-2"
// 															onChange={(e) => {
// 																if (e.target.checked) {
// 																	setSelected(question?.options);
// 																} else setSelected([]);
// 															}}
// 														/>
// 														<label>Select all</label>
// 													</div>
// 													{question?.options.map((option, index) => {
// 														return (
// 															<div
// 																key={index}
// 																className="flex gap-2 items-center hover:text-white hover:bg-blue-500 hover:cursor-pointer">
// 																<input
// 																	type="checkbox"
// 																	id={(question?.id).toString()}
// 																	name={option}
// 																	value={option}
// 																	onChange={handleChange}
// 																	checked={selected.includes(option)}
// 																	className="p-2"
// 																/>
// 																<label>{option}</label>
// 															</div>
// 														);
// 													})}
// 												</div>
// 											)}
// 										</>
// 									) : (
// 										<div className="max-w-lg flex flex-wrap justify-start gap-x-4 gap-y-1">
// 											{question?.options.map((option, index) => (
// 												<div key={index} className="flex gap-2 items-center">
// 													<input
// 														className="w-4 h-4"
// 														type="radio"
// 														name={question?.label}
// 														checked={question?.value === option}
// 														value={option}
// 														onChange={(e) => handleAnswer(question?.id, e.target.value)}
// 													/>
// 													<label>{option}</label>
// 												</div>
// 											))}
// 										</div>
// 									) 
// 									}
// 								</div>
// 								<div className="flex justify-end w-full gap-2">
// 									{previewState.currentIndex > 0 && (
// 										<button
// 											type="button"
// 											className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
// 											onClick={previousQuestion}>
// 											 Previous
// 										</button>
// 									)}
// 									{previewState.currentIndex < form.formFields.length - 1 && (
// 										<button
// 											type="button"
// 											className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
// 											onClick={nextQuestion}>
// 											Next 
// 										</button>
// 									)}
// 									{previewState.currentIndex === form.formFields.length - 1 && (
// 										<button
// 											onClick={handleSubmit}
// 											className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 m-4 rounded-lg">
// 											Submit
// 										</button>
// 									)}
// 								</div>
// 							</div>
// 						)}
// 					</React.Fragment>
// 				);
// 			})
// 		) : (
// 			<span className="text-center text-lg font-bold">
// 				No question to preview
// 			</span>
// 		)}

// 		<div className="flex gap-4 justify-center mt-8">
// 			<Link
// 				href="/"
// 				className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 m-4 rounded-lg">
// 				Close form
// 			</Link>
// 		</div>
// 	</div>
// );
// }
