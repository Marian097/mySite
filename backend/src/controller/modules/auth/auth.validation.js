import * as yup from "yup";




const passRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,20}$/;


export const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});


export const userSchema = yup.object({
  name: yup.string().required("Va rog adaugati un nume"),
  email: yup
    .string()
    .email("Email invalid")
    .required("Emailul este obligatoriu"),
  password: yup
    .string()
    .matches(passRegex, "Min 8 caractere, o literă mare, un simbol")
    .required("Parola este obligatorie"),
});


