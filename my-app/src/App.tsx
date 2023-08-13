import React from 'react';
import Header from './Header';
import AppContainer from './AppContainer';

const formFildes = [
  { id:1, label:"First Name"},
  { id:2, label:"Last Name"},
  { id:3, label:"Email"}
]

function App() {
  return (
   <AppContainer>
   <div className="p-4 mx-auto bg-white shadow-lg rounded-xl">
    <Header title ={"Welcome to React using Typescript!"}/> 
    {
      formFildes.map(field =>(
        <React.Fragment key={field.id}>
          <label>{field.label}</label>
          <input className="border-2 border-gray-300 rounded-lg p-2 m-2 w-full" type="text"/>
        </React.Fragment>
      )) 
    }
   </div>

   </AppContainer>
  );
}

export default App;
