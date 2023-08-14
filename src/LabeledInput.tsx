import React from "react";

export default function LabeledInput(props : {id: number, label: string, type: string}){
    return (
      <>
                <label>{props.label}</label>
                <div className="flex">
                <input
                  className="border-2 border-gray-300 rounded-lg p-2 m-2 w-full"
                  type={props.type}
                />
                </div>
      </>         
            
    )
}
