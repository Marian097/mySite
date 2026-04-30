import { pool } from "../db.js";
import * as yup from "yup";
import dotenv from "dotenv";

dotenv.config();


let regex_date = "^(3[01]|[12][0-9]|0?[1-9])(\\/|-)( 1[0-2]|0?[1-9])\\2(19|20)\\d{2}$"
const documentsSchema = yup.object({
    ci_image_url: yup.string().required("Poza de buletin este obligatorie"),
    ci_expiration_date: yup.string().required().matches('^(0[1-9]|[12][0-9]|3[01])(\\/|-)(0[1-9]|1[0-2])\\2(19|20)\\d{2}$')
  document_type: yup.string().required("Numele este obligatoriu"),
  document_image_url: yup.string().required()
});
