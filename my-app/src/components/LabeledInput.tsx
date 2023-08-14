import React from "react";

export default function LabeledInput(props : {key: number, label: string, type: string}){
    return (
        <div className="p-4">
            <React.Fragment key={props.key}>
                <label>{props.label}</label>
                <input
                  className="border-2 border-gray-300 rounded-lg p-2 m-2 w-full"
                  type={props.type}
                />
              </React.Fragment>
        </div>
    )
}

