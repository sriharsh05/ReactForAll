import { initialFormField } from "../types/formTypes";

type UpdateLabelAction = {
  type: "update_label";
  value: string;
};

type UpdateKindAction = {
  type: "update_kind";
  value: string;
};

type ClearFieldAction = {
  type: "clear_field";
};

type NewFieldAction = UpdateLabelAction | UpdateKindAction | ClearFieldAction;

export const NewFieldReducer = (
  state: initialFormField,
  action: NewFieldAction
) => {
  switch (action.type) {
    case "update_label": {
      return {
        ...state,
        label: action.value,
      };
    }

    case "update_kind": {
      return {
        ...state,
        type: action.value,
      };
    }

    case "clear_field": {
      return {
        label: "",
        kind: "",
        type: "text",
        options: "",
      };
    }
    default: {
      return state;
    }
  }
};
