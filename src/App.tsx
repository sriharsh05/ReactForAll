import React from "react";
import Header from "./Header";
import AppContainer from "./AppContainer";
import LabeledInput from "./LabeledInput";

const formFields = [
  { id: 1, label: "First Name", type: "text" },
  { id: 2, label: "Last Name", type: "text" },
  { id: 3, label: "Email", type: "email" },
  { id: 4, label: "Date of Birth", type: "date" },
  { id: 5, label: "Phone Number", type: "tel" },
];

function App() {
  return (
    <AppContainer>
      <div className="p-4 mx-auto bg-stone-200 shadow-lg rounded-xl">
        <Header
          title={"Welcome to Lesson 5 of $react-typescript with #tailwindcss"}
        />
        {formFields.map((field) => (
          <LabeledInput
            key={field.id}
            id={field.id}
            label={field.label}
            type={field.type}
          />
        ))}
        <button className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-full">
          Submit
        </button>
      </div>
    </AppContainer>
  );
}

export default App;
