import { useState } from "react";
import * as yup from "yup";

export type Fiscal = {
  name_bussines: string;
  certificate_registration: File | null;
  type_bussines: string;
  cif: string;
  address: string;
  country: string;
  county: string;
  postal_code: string;
  city: string;
};

export type TouchedBussines = {
  name_bussines: boolean;
  certificate_registration: boolean;
  type_bussines: boolean;
  cif: boolean;
  address: boolean;
  country: boolean;
  county: boolean;
  postal_code: boolean;
  city: boolean;
};

export type Errors = {
  name_bussines: string;
  certificate_registration: string;
  type_bussines: string;
  cif: string;
  address: string;
  country: string;
  county: string;
  postal_code: string;
  city: string;
};

export type Counties = {
  nameCounties: [];
  limit: string;
  offset: string;
  totalCount: string;
};

const fiscalSchema = yup.object({
  name_bussines: yup.string().required("Acest câmp este obligatoriu*"),
  certificate_registration: yup
    .mixed()
    .required("Acest câmp este obligatoriu*"),
  type_bussines: yup.string().required("Acest câmp este obligatoriu*"),
  cif: yup.string().required("Acest câmp este obligatoriu*"),
  address: yup.string().required("Acest câmp este obligatoriu*"),
  country: yup.string().required("Acest câmp este obligatoriu*"),
  county: yup.string().required("Acest câmp este obligatoriu*"),
  postal_code: yup.string().required("Acest câmp este obligatoriu*"),
  city: yup.string().required("Acest câmp este obligatoriu city*"),
});

export default function useBussinesForm() {
  const [response, setResponse] = useState<string>("");

  const [counties, setCounties] = useState<Counties>({
    nameCounties: [],
    limit: "",
    offset: "",
    totalCount: "",
  });

  const [isSubmmitFiscalForm, setIsSubmmitFiscalForm] =
    useState<boolean>(false);

  const [values, setValues] = useState<Fiscal>({
    name_bussines: "",
    certificate_registration: null,
    type_bussines: "SRL",
    cif: "",
    address: "",
    country: "RO",
    county: "Brașov",
    postal_code: "",
    city: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    e.preventDefault();
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

  async function getCounties() {
    try {
      const token = localStorage.getItem("token");

      if (!token) throw new Error("Token lipsă");

      const response = await fetch("https://api.datero.ro/v1/counties", {
        headers: {
          Authorization: `Bearear ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok)
        throw new Error("Eroare la încarcarea listei de județe");

      const data = await response.json();

      const nameCounties = data.items.map((c: { name: string }) => c.name);

      setCounties((prev) => ({
        ...prev,
        nameCounties: nameCounties,
        limit: data.limit,
        offset: data.offset,
        totalCount: data.totalCount,
      }));
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
    }
  }

  async function handleSubmitFiscalData(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData();

    try {
      await fiscalSchema.validate(values);

      const token = localStorage.getItem("token");

      if (!token) throw new Error("Token lipsă");

      if (values.certificate_registration) {
        formData.append("name_bussines", values.name_bussines);
        formData.append(
          "certificate_registration",
          values.certificate_registration,
        );
        formData.append("type_bussines", values.type_bussines);
        formData.append("cif", values.cif);
        formData.append("address", values.address);
        formData.append("country", values.country);
        formData.append("county", values.county);
        formData.append("postal_code", values.postal_code);
        formData.append("city", values.city);
      }

      const response = await fetch(
        "http://localhost:4000/api/users/fiscal/documents",
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
      setIsSubmmitFiscalForm(true);
    } catch (err) {
      if (err instanceof Error) setResponse(err.message);
      console.log(err);
    }
  }

  return {
    response,

    values,
    counties,
    isSubmmitFiscalForm,
    getCounties,
    handleChange,
    handleSubmitFiscalData,
  };
}
