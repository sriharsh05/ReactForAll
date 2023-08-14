import React, { useState } from "react";
import Header from "./components/Header";
import AppContainer from "./components/AppContainer";
import { Home } from "./components/Home";
import LabeledInput from "./components/LabeledInput";

const formFields = [
  { id: 1, label: "First Name", type: "text" },
  { id: 2, label: "Last Name", type: "text" },
  { id: 3, label: "Email", type: "text" },
  { id: 4, label: "Date of birth", type: "date" },
];

function App() {
  const [state, setState] = useState("HOME");
  
  const closeForm = () =>{
    setState("HOME");
  } 

  return (
    <AppContainer>
      <div className="p-4 mx-auto bg-white shadow-lg rounded-xl">
        <Header
          title={"Welcome to Lesson 5 of $react-typescript with #tailwindcss"}
        />
        {state === "HOME" ? (
          <div className="flex flex-col justify-center">
            <Home />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg"
              onClick={() => {
                setState("FORM");
              }}
            >
              Open Form
            </button>
          </div>
        ) : (
          <div className="p-4">
            {formFields.map((field) => (
              <LabeledInput
                key = {field.id}
                label = {field.label}
                type = {field.type}
              />
            ))}
            <div className="flex gap-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg">
                Submit
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
                onClick={closeForm}
              >
                Close Form
              </button>
            </div>
          </div>
        )}
      </div>
    </AppContainer>
  );
}

export default App;
 