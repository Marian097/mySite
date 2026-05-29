
import * as yup from "yup";
import dotenv from "dotenv";
import { isValidPhoneNumber } from "libphonenumber-js";

dotenv.config();

let regex_date =
  "^(3[01]|[12][0-9]|0?[1-9])(\\/|-)(1[0-2]|0?[1-9])\\2(19|20)\\d{2}$";

export const documentsWorkerSchema = yup.object({
  ci_image_url: yup.string().required("Poza de buletin este obligatorie"),
  ci_expiration_date: yup.string().matches(regex_date, "Format data invalid" ),
  selfie_ci_person: yup.string().required("Va rog sa confirmati identitatea")});


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
