import React, { useState } from "react";
import Header from "./components/Header";
import AppContainer from "./components/AppContainer";
import { Home } from "./components/Home";
import Form from "./components/Form";

const formFields = [
  { id: 1, label: "First Name", type: "text" },
  { id: 2, label: "Last Name", type: "text" },
  { id: 3, label: "Email", type: "text" },
  { id: 4, label: "Date of birth", type: "date" },
];

function App() {
  const [state, setState] = useState("HOME");

  const openForm = () =>{
    setState("FORM");
  }
  
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
            <Home openFormCB={openForm} />
        ) : (
          <Form formFields = {formFields} closeFormCB={closeForm} />
        )}
      </div>
    </AppContainer>
  );
}

export default App;
 