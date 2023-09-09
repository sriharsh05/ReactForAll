import {
	previewQuestion,
	fieldAnswer,
	formField,
  } from "../types/formTypes";

  type updateQuestion = {
	type: "update_question";
	kind: "next" | "prev";
	getIndexQuestionCB: (idx: number) => formField;
  };
  
  type UpdateAnswerAction = {
	type: "update_answer";
	id: number
	value: string
  };

  type questionActions = updateQuestion; 
  type answerActions = UpdateAnswerAction;

  export function questionReducer(
	state: previewQuestion,
	action: questionActions
  ): previewQuestion {
	switch (action.type) {
	  case "update_question":
		switch (action.kind) {
		   case "prev": {
				return (
				  state && {
					currentIndex: state.currentIndex - 1,
					currentQuestion: action.getIndexQuestionCB(state.currentIndex - 1),
				  }
				);
				}		
		  case "next": {
			return (
			  state && {
				currentIndex: state.currentIndex + 1,
				currentQuestion: action.getIndexQuestionCB(state.currentIndex + 1),
			  }
			);
		  }
		}
	}
  }

  export function answerReducer(
	state: fieldAnswer[],
	action: answerActions
  ): fieldAnswer[] {
	switch (action.type) {
	  case "update_answer": {
		let newState = [...state];
		let alreadyAnswered = false;
		state.forEach((answer) => {
		  if (answer.form_field === action.id) {
			alreadyAnswered = true;
			if (answer.value !== action.value) {
			  newState = state.map((answer) => ({
				...answer,
				ans:
				  answer.form_field === action.id
					? action.value
					: answer.value,
			  }));
			}
		  }
		});
		if (!alreadyAnswered) {
		  newState = [
			...newState,
			{
			  form_field: action.id,
			  value: action.value,
			},
		  ];
		}
		return newState;
	   }
	}
  }
  