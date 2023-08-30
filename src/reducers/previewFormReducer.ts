import { previewForm } from "../types/formTypes"

type UpdateAnswerAction = {
    type: "update_answer"
    id: string
    value: string
}

type UpdateCurrentIndexAction = {
    type: "update_current_index"
    idx: number
}

type PreviewAction = UpdateAnswerAction | UpdateCurrentIndexAction

export const previewReducer = ( state: previewForm, action: PreviewAction) : previewForm =>{
    switch(action.type){
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
    }
}