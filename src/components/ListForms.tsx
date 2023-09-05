import React from "react";
import { Link } from "raviger";
import { Form, formData } from "../types/formTypes";
import Modal from "./common/modal";
import CreateForm from "./CreateForm";


export const ListForms = (prop: {
  localForms: Form[];
  addFormCB: () => void;
  removeFormCB: (id: number) => void;
  search: string;
}) => {

  const [openForm, setOpenForm] = React.useState<boolean>(false);

  return (
    <div className="border bg-gray-300 border-gray-300 mb-3 p-4 rounded-lg">
      <div className="flex flex-col items-center">
        <div className="flex flex-wrap justify-center m-2 overflow-y-auto max-w-screen-lg mx-auto">
          {prop.localForms
            .filter((form) => {
              return form.title.toLowerCase().includes(prop.search?.toLowerCase() || "");
            })
            .map((form: Form) => (
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

      <div className="flex justify-center">
				<button
					type="button"
					onClick={(_) => setOpenForm(true)}
					className="bg-sky-700 hover:bg-sky-900 text-white font-bold py-2 px-4 m-4 rounded-lg">
					Add new form
				</button>
				<Modal Open={openForm} closeCB={() => setOpenForm(false)}>
					<CreateForm />
				</Modal>
			</div>

    </div>
  );
};
