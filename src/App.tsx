import React from "react";
import Header from "./Header";
import AppContainer from "./AppContainer";

const formFildes = [
  { id: 1, label: "First Name", type: "text" },
  { id: 2, label: "Last Name", type: "text" },
  { id: 3, label: "Email", type: "text" },
  { id: 3, label: "Date of Birth", type: "date" },
  { id: 3, label: "Phone Number", type: "tel" },
];

function App() {
  return (
    <AppContainer>
      <div className="p-4 mx-auto bg-stone-200 shadow-lg rounded-xl">
        <Header
          title={"Welcome to Lesson 5 of $react-typescript with #tailwindcss"}
        />
        {formFildes.map((field) => (
          <React.Fragment key={field.id}>
            <label>{field.label}</label>
            <input
              className="block text-gray-500 border-2 border-gray-300 rounded-lg p-2 m-2 w-full"
              type={field.type}
            />
          </React.Fragment>
        ))}
        <button className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-full">
          Submit
        </button>
      </div>
    </AppContainer>
  );
}

export default App;
