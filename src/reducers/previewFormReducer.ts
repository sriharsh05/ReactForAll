import { previewForm } from "../types/formTypes";

type UpdateAnswerAction = {
  type: "update_answer";
  id: number;
  value: string;
};

type UpdateCurrentIndexAction = {
  type: "update_current_index";
  idx: number;
};

type FormSubmitAction = {
  type: "form_submit";
}

type PreviewAction = UpdateAnswerAction | UpdateCurrentIndexAction | FormSubmitAction;

export const previewFormReducer = (
  state: previewForm,
  action: PreviewAction
): previewForm => {
  switch (action.type) {
    case "update_answer": {
      return {
        ...state,
        formAnswers: {
          ...state.formAnswers,
          formFields: state.formAnswers.formFields.map((field) => {
            if (field.id === Number(action.id))
              return {
                ...field,
                value: action.value,
              };
            return field;
          }),
        },
      };
    }

    case "update_current_index": {
      return {
        ...state,
        currentIndex: action.idx,
      };
    }

    case "form_submit" :{
      state.formAnswers.formFields.forEach((field) => {
        console.log(`${field.label}: ${field.value}\n`);
      });
      return state;
    }

  }
};
