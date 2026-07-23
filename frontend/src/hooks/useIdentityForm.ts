import type { Identity } from "../types/AuthTypes/Identity";
import {useState} from "react";


import * as yup from "yup";

export type Touched = {
    ci_image: boolean,
    date: boolean,
    ci_selfie: boolean, 
}

export type Error = {
    ci_image: string,
    date: string,
    ci_selfie: string, 
}

const schema = yup.object({
    ci_image: yup.mixed<File>().required("Acest câmp este obligatoriu"),
    date: yup.string().required("Acest câmp este obligatoriu"),
    ci_selfie: yup.mixed<File>().required("Acest câmp este obligatoriu")
})

export default function useIdentityForm() {
    

  const [values, setValues] = useState<Identity>({
    ci_image: null,
    date: "",
    ci_selfie: null,
  });

  const [errors, setErrors] = useState<Error>({
    ci_image: "",
    date: "",
    ci_selfie: ""
  })

  const [touched, setTouched] = useState<Touched>({
    ci_image: false,
    date: false,
    ci_selfie: false,
  })

  const [response, setResponse] = useState<string>("")


  const [isSteps, setIsSteps] = useState<number>(0)


  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {

    const { name, value, type, files } = e.target;

    console.log("CHANGE:", {
    name,
    file: files?.[0]?.name,
    value,
  });


    setValues((prev) => ({
      ...prev,
      [name]: type === "file" ? files?.[0] ?? null : value,
    }));

  }

  async function handleBlur(e: React.FocusEvent<HTMLInputElement>){
    const { name } = e.target;

    setTouched((prev) => ({
        ...prev,
        [name]: true
    }))

    try{
        await schema.validateAt(name, values)

        if (schema){
            setErrors((prev) => ({
                ...prev,
                [name]: ""
            }))
        }
    }
    catch(err){
        if (err instanceof yup.ValidationError)
        {
            setErrors((prev) => ({
                ...prev,
                [name]: err.message,
            }))
        }
    }
  }


  async function handleSubmitIdentity(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()

    console.log(values)
    const formData = new FormData()

    console.log("1. A intrat în submit");

    console.log("SUBMIT VALUES", {
  ci_image: values.ci_image?.name,
  date: values.date,
  ci_selfie: values.ci_selfie?.name,
});

    try{
         console.log("2. Values:", values);
         console.log("same object?", values);
        await schema.validate(values, {abortEarly: false})
        console.log("after validate");

        console.log("3. Validarea a trecut");
        const token = localStorage.getItem("token");
         console.log("4. Token:", token);
        if (!token) throw new Error ("Token lipsă");

        if (values.ci_image && values.ci_selfie && values.date)
        {
            formData.append("ci_image", values.ci_image)
            formData.append("ci_selfie", values.ci_selfie)
            formData.append("date", values.date)
        }
     
        console.log(Array.from(formData.entries()))
        console.log("asmdoimasa")

        const response = await fetch("http://localhost:4000/api/users/worker/documents", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData  
        })

        console.log("5. Trimit request-ul");
        if (!response.ok) throw new Error ("A intervenit o eroare la prelucrarea datelor")
        
        const res = await response.json();

        setResponse(res.message)
    }
    catch(err){
          console.error("EROARE:", err);
        if (err instanceof Error) setResponse(err.message)
            
    }
  }


  return {
    values,
    errors,
    touched,
    response,
    isSteps, 
    setIsSteps,
    handleSubmitIdentity,
    handleChange,
    handleBlur,
  };
}
