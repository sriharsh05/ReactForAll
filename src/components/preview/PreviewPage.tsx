import { useEffect, useState } from "react";
import { formData, formField } from "../../types/formTypes";
import { fetchFormData, fetchFormFields } from "../../utils/apiUtils";
import { QuestionCard } from "./QuestionCard";
import { ErrorPage } from "../ErrorPage";

const getFormData = (
  id: number,
  setFormCB: (formData: formData) => void
) => {
  fetchFormFields(id).then((fields) => {
    let validatedFields = fields.results.filter(
      (field: formField) =>
        field.label !== "" &&
        (field.kind === "DROPDOWN" ||
        field.kind === "RADIO" ||
        field.kind === "GENERIC"
          ? field.options.length !== 0
          : true)
    );
    fetchFormData(id).then((data) => {
      setFormCB({
        ...data,
        formFields: validatedFields,
      });
    });
  });
};

export function PreviewPage({ id }: { id: number }) {
  const [form, setForm] = useState<formData>();
  useEffect(() => getFormData(id, setForm), [id]);
  return (
    <div>
      {form ? (
        <QuestionCard currentForm={form} />
      ) : (
        <ErrorPage/>
      )}
    </div>
  );
}
