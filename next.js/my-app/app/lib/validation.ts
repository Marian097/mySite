import * as yup from "yup";


export const userSchema = yup.object({
  name: yup.string().required("Va rog adaugati un nume"),
  email: yup
    .string()
    .email("Email invalid")
    .required("Emailul este obligatoriu"),
  password: yup
    .string()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,20}$/, "Min 8 caractere, o literă mare, un simbol")
    .required("Parola este obligatorie"),
});

