import * as yup from "yup";

export const adminProfileSchema = yup.object({
  phone: yup.string().required("Va rog adaugati nmarul de telefon"),
  address: yup
    .string()
    .required("Adresa este obligatorie"),
  ci_image_url: yup
    .string()
    .required("Va rog adaugati buletinul"),
  number_contract: yup.string().required("Introduceti numarul de contract")
});



export const verifiedEmail = yup.object({
    email: yup
      .string()
      .email("Email invalid")
      .required("Emailul este obligatoriu"),
})