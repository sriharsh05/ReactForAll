import React, { useState } from "react";
import Header from "./components/Header";
import { Home } from "./components/Home";
import Form from "./components/Form";



function App() {
  const [state, setState] = useState("HOME");

  const openForm = () =>{
    setState("FORM");
  }
  
  const closeForm = () =>{
    setState("HOME");
  } 

  return ( state === "HOME" ? (
            <Home openFormCB={openForm} />
        ) : (
            <Form closeFormCB={closeForm} />
        )

  );
}  


export default App;
 