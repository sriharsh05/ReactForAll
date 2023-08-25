import React, { useState } from "react";
import { getLocalForms, initialFormFields, saveLocalForms } from "./Form";
import { navigate, useQueryParams } from "raviger";
import { ListForms } from "./ListForms";

const getAllForms = () => {
  const localForms = getLocalForms();
  return localForms.map((form) => {
    return {
      id: form.id,
      title: form.title,
      fields: form.formFields.length,
    };
  });
};

export function Home() {
  const [state, setState] = useState(() => getAllForms());
  const [{ search }, setQuery] = useQueryParams();
  const [searchString, setSearchString] = useState("");

  const addForm = () => {
    const localForms = getLocalForms();
    const formID = Number(new Date());
    const newForm = {
      id: formID,
      title: "Untitled Form",
      formFields: initialFormFields,
    };
    saveLocalForms([...localForms, newForm]);
    setState(getAllForms());
    navigate("/forms/" + formID);
  };

  const removeForm = (id: number) => {
    const localForms = getLocalForms();
    const newLocalForms = localForms.filter((form) => form.id !== id);
    saveLocalForms(newLocalForms);
    setState(getAllForms());
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="flex">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setQuery({ search: searchString });
          }}
        >
          <label className="mr-2">Search</label>
          <input
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-1 rounded-lg text-m focus:outline-none m-2"
            type="search"
            name="search"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
          />
        </form>
      </div>

      <ListForms
        localForms={state}
        addFormCB={addForm}
        removeFormCB={removeForm}
        search={search}
      />
    </div>
  );
}
