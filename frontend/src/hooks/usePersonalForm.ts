import type { Identity } from "../types/AuthTypes/Identity";
import { useState } from "react";

import * as yup from "yup";

export type Touched = {
  ci_image: boolean;
  date: boolean;
  ci_selfie: boolean;
};

export type Error = {
  ci_image: string;
  date: string;
  ci_selfie: string;
};

const schema = yup.object({
  ci_image: yup.mixed<File>().required("Acest câmp este obligatoriu*"),
  date: yup.string().required("Acest câmp este obligatoriu*"),
  ci_selfie: yup.mixed<File>().required("Acest câmp este obligatoriu*"),
});

export default function useIdentityForm() {
  const [values, setValues] = useState<Identity>({
    ci_image: null,
    date: "",
    ci_selfie: null,
  });

  const [response, setResponse] = useState<string>("");

  const [isSubmmitPersonalForm, setIsSubmmitPersonalForm] =
    useState<boolean>(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === "file") {
      const file = e.target.files?.[0];
      setValues((prev) => ({
        ...prev,
        [name]: file,
      }));

      return;
    }

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmitIdentity(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData();

    try {
      await schema.validate(values, { abortEarly: false });

      const token = localStorage.getItem("token");

      if (!token) throw new Error("Token lipsă");

      if (values.ci_image && values.ci_selfie && values.date) {
        formData.append("ci_image", values.ci_image);
        formData.append("ci_selfie", values.ci_selfie);
        formData.append("date", values.date);
      }

      const response = await fetch(
        "http://localhost:4000/api/users/worker/documents",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      if (!response.ok)
        throw new Error("A intervenit o eroare la prelucrarea datelor");

      const res = await response.json();

      setResponse(res.message);
      setIsSubmmitPersonalForm(true);
    } catch (err) {
      if (err instanceof Error) setResponse(err.message);
    }
  }

  return {
    values,
    response,
    isSubmmitPersonalForm,
    handleSubmitIdentity,
    handleChange,
  };
}
