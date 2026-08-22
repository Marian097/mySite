import { useState } from "react";
import type { User } from "../types/AuthTypes/User";
import * as yup from "yup";
import type { Touched } from "../types/AuthTypes/Touched";
import type { Errors } from "../types/AuthTypes/Errors";
import type { ErrorsLogin } from "../types/AuthTypes/ErrorsLogin";
import { useNavigate } from "react-router";
import {jwtDecode} from "jwt-decode";
import type { Admin } from "../types/AuthTypes/Admin";


const passRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,20}$/;

const singUpSchema = yup.object({
  name: yup.string().required("Numele este obligatoriu"),
  email: yup
    .string()
    .email("Email invalid")
    .required("Emailul este obligatoriu"),
  password: yup
    .string()
    .matches(passRegex, "Min 8 caractere, o literă mare, un simbol")
    .required("Parola este obligatorie"),
});

const loginSchema = yup.object({
  email: yup.string().required("Emailul este obligatoriu"),
  password: yup.string().required("Parola este obligatorie"),
});

interface JwtPayload {
  id: string;
  email: string;
  role: string;
  username:string;
  profile_image:string;
  iat: number;
  exp: number;
  step: string;
}

export default function useAuthForm() {

  const navigate = useNavigate()

  const [message, setMessage] = useState("")
  
  const [isSteps, setIsSteps] = useState<string>("")

  const [values, setValues] = useState<User>({
    name: "",
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState<Touched>({
    name: false,
    email: false,
    password: false,
  });

  const [errors, setErrors] = useState<Errors>({
    name: "",
    email: "",
    password: "",
  });

  const [errorsLogin, setErrorsLogin] = useState<ErrorsLogin>({
    email: "",
    password: "",
  });


  const [isLoggedForm, setIsLoggedForm] = useState<boolean>(false);

  const [admin, setAdmin] = useState<Admin[]>([])


  // 🔹 CHANGE
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // 🔹 BLUR
  async function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const activateSchema = isLoggedForm ? loginSchema : singUpSchema;

    try {
      await activateSchema.validateAt(name, values);

      if (singUpSchema) {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      } else if (loginSchema) {
        setErrorsLogin((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setErrors((prev) => ({
          ...prev,
          [name]: err.message,
        }));
         setErrorsLogin((prev) => ({
          ...prev,
          [name]: err.message,
        }));
      }
    }
  }

  // 🔹 SIGN UP
  async function signUpProvider(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await singUpSchema.validate(values, { abortEarly: false });

      setErrors({
        name: "",
        email: "",
        password: "",
      });

      const response = await fetch("http://localhost:4000/api/users/sign-up/provider", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });


      const data = await response.json()

      console.log(data.message)
      
      if (!response.ok)
      {
        setMessage(Array.isArray(data.message) ? data.message.join(", "): data.message)
        return
      }

      setMessage(Array.isArray(data.message) ? data.message.join(", "): data.message)

      localStorage.setItem("token", data.token)

    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const newErrors: Errors = {
          name: "",
          email: "",
          password: "",
        };

        err.inner.forEach((error) => {
          const field = error.path as keyof Errors;

          if (field && !newErrors[field]) {
            newErrors[field] = error.message;
          }
        });

        setErrors(newErrors);

        setTouched({
          name: true,
          email: true,
          password: true,
        });
      }
    }
  }

  // 🔹 LOGIN
  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const user = {
        email: values.email,
        password: values.password,
      };

      await loginSchema.validate(user, { abortEarly: false });
      setErrorsLogin({
        email: "",
        password: "",
      });



      const response = await fetch("http://localhost:4000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });


    
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Eroare la login");
      }

      localStorage.setItem("token", data.token);

      const decoded = jwtDecode<JwtPayload>(data.token)


      console.log(decoded.role)

      if (decoded.role == "Admin")
      {
        const {id, username, role, profile_image} = decoded;
        setAdmin(prev => [
          ...prev,
          { id, username, role, profile_image }
        ])

        navigate("/panou-administrare")
      }

       if (decoded.role == "Prestator")
      {
         setIsSteps(decoded.step)
         navigate("/verificare-informații") 
      }

     

    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors: ErrorsLogin = {
          email: "",
          password: "",
        };
        error.inner.forEach((err) => {
          const fields = error.path as keyof ErrorsLogin;
          if (fields && !newErrors[fields]) {
            newErrors[fields] = err.message;
          }
        });
        setErrorsLogin(newErrors);
        setTouched({
          name: true,
          email: true,
          password: true,
        });
      }
    }
  }

   async function updateStep(step: string) {
        try {
  
          const token = localStorage.getItem("token");
  
          if (!token) throw new Error("Token lipsă");
  
  
          const response = await fetch(
            "http://localhost:4000/api/users/worker/documents/step",
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({step}),
            },
          );
  
  
          if (!response.ok) throw new Error("Progresul nu a fost înrtegistrat");
         
          const res = await response.json();
          
          setIsSteps(res)
        } catch (err) {
          console.log(err)
        }
      }

  return {
    values,
    errors,
    errorsLogin,
    touched,
    isLoggedForm,
    message,
    admin,
    isSteps,
    updateStep, 
    setIsSteps,
    setIsLoggedForm,
    handleChange,
    handleBlur,
    signUpProvider,
    login,
  };
}
