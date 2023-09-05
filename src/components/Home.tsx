import React, { useEffect, useState } from "react";
import { navigate, useQueryParams } from "raviger";
import { ListForms } from "./ListForms";
import {initialFormFields, getLocalForms, saveLocalForms } from "../utils/storageUtils";
import { Form, formData } from "../types/formTypes";

const getAllForms = () => {
  const localForms = getLocalForms("formData");
  return localForms.map((form) => {
    return {
      id: form.id,
      title: form.title,
      formFields: form.formFields
    };
  });
};

const fetchForms = async (setStateCB: (value: Form[]) => void) => {
  const response = await fetch("https://tsapi.coronasafe.live/api/mock_test/")
  const jsonData = await response.json();
  setStateCB(jsonData);
}


export function Home() {
  const [state, setState] = useState<Form[]>(() => getAllForms());
  const [{ search }, setQuery] = useQueryParams();
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    fetchForms(setState);
  }, []);

  const addForm = () => {
    const localForms = getLocalForms("formData");
    const formID = Number(new Date());
    const newForm = {
      id: formID,
      title: "Untitled Form",
      formFields: initialFormFields,
    };
    saveLocalForms("formData", [...localForms, newForm]);
    setState(getAllForms());
    navigate("/forms/" + formID);
  };

  const removeForm = (id: number) => {
    const localForms = getLocalForms("formData");
    const newLocalForms = localForms.filter((form) => form.id !== id);
    saveLocalForms("formData", newLocalForms);
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
