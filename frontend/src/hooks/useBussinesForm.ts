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
  nameCounties: [],
  limit: string,
  offset: string,
  totalCount: string,

}



const fiscalSchema = yup.object({
  name_bussines: yup.string().required("Acest câmp este obligatoriu nume societate"),
  certificate_registration: yup.mixed().required("Acest câmp este obligatoriu ceritificat inregistrare"),
  type_bussines: yup.string().required("Acest câmp este obligatoriu forma de lucru"),
  cif: yup.string().required("Acest câmp este obligatoriu cif"),
  address: yup.string().required("Acest câmp este obligatoriu address"),
  country: yup.string().required("Acest câmp este obligatoriu country"),
  county: yup.string().required("Acest câmp este obligatoriu county"),
  postal_code: yup.string().required("Acest câmp este obligatoriu postalcode"),
  city: yup.string().required("Acest câmp este obligatoriu city"),
});

export default function useBussinesForm() {
  const [response, setResponse] = useState<string>("");

  const [counties, setCounties] = useState<Counties>({
    nameCounties: [],
    limit: "",
    offset: "",
    totalCount: "",
  })

  const [values, setValues] = useState<Fiscal>({
    name_bussines: "",
    certificate_registration: null,
    type_bussines: "",
    cif: "",
    address: "",
    country: "",
    county: "",
    postal_code: "",
    city: "",
  });

  const [touched, setTouched] = useState<TouchedBussines>({
    name_bussines: false,
    certificate_registration: false,
    type_bussines: false,
    cif: false,
    address: false,
    country: false,
    county: false,
    postal_code: false,
    city: false,
  });

  const [error, setError] = useState<Errors>({
    name_bussines: "",
    certificate_registration: "",
    type_bussines: "",
    cif: "",
    address: "",
    country: "",
    county: "",
    postal_code: "",
    city: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    e.preventDefault();
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  

   async function handleBlur(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
      const { name } = e.target;

      setTouched((prev) => ({
        ...prev,
        [name]: true,
      }));

      try {
        await fiscalSchema.validate(e.target, { abortEarly: false });

        if (fiscalSchema) {
          setError((prev) => ({
            ...prev,
            [name]: "",
          }));
        }
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          setError((prev) => ({
            ...prev,
            [name]: err.message,
          }));
        }
      }
    }

    async function getCounties(){
      try{
        const token = localStorage.getItem("token");

        if (!token) throw new Error("Token lipsă");
        
        const response = await fetch("https://api.datero.ro/v1/counties", {
          headers: {
            Authorization: `Bearear ${token}`,
            "Content-Type": "application/json" 
          }
        })

        if (!response.ok) throw new Error("Eroare la încarcarea listei de județe");

        const data = await response.json();


        const nameCounties = data.items.map((c: { name: string }) => c.name);

        setCounties(prev => ({
          ...prev,
          nameCounties: nameCounties,
          limit: data.limit,
          offset: data.offset,
          totalCount: data.totalCount
        }))

      }
      catch(err){
        if (err instanceof Error) console.log(err.message)
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
          "http://localhost:4000/api/users/bussines/documents",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json" 
            },
            body: formData,
          },
        );

      
        if (!response.ok) throw new Error("A intervenit o eroare la prelucrarea datelor");
        const res = await response.json();
        
        
        setResponse(res.message);
      } catch (err) {
        if (err instanceof Error) setResponse(err.message); console.log(err);
      }
    }

    

  return {
    response,
    touched,
    error,
    values,
    counties,
    getCounties,
    handleChange,
    handleBlur,
    handleSubmitFiscalData,
  };
}
