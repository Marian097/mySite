
import * as yup from "yup";
import dotenv from "dotenv";
import { isValidPhoneNumber } from "libphonenumber-js";

dotenv.config();

const regex_date =
  /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

export const documentsWorkerSchema = yup.object({
  ci_image: yup.mixed().required("Poza de buletin este obligatorie"),
  date: yup.string().matches(regex_date, "Format data invalid" ),
  ci_selfie: yup.mixed().required("Va rog sa confirmati identitatea")});


export const workerProfileSchema = yup.object({
  full_name: yup.string().required("Numele este obligatoriu"),
  phone: yup
    .string()
    .required("Telefon obligatoriu")
    .test("phone", "Numar invalid", (value) =>
      value ? isValidPhoneNumber(value, "RO") : false,
    ),
  description: yup.string().required(),
  experience_years: yup.number().required().min(1, "Minim un an experienta"),
  category_name: yup.string().required(),
  city: yup.string().required(),
  county: yup.string().required(),
  address_text: yup.string().required(),
  profile_image_url: yup.string().required(),
});


export const bussinesSchema = yup.object({
  name_bussines: yup.string().required("Va rog adaugati un nume"),
  type_bussines: yup
    .string()
    .required("Alege-ti forma de lucru."),
  cif: yup
  .string()
  .required("Codul fiscal este obligatoriu."),
  address: yup
  .string()
  .required("Va rugam introduceti sediului social")
});
