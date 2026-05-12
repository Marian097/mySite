import { pool } from "../db.js";
import * as yup from "yup";
import dotenv from "dotenv";

dotenv.config();

let regex_date =
  "^(3[01]|[12][0-9]|0?[1-9])(\\/|-)(1[0-2]|0?[1-9])\\2(19|20)\\d{2}$";

  const documentsUserSchema = yup.object({
  ci_image_url: yup.string().required("Poza de buletin este obligatorie"),
  ci_expiration_date: yup.string().matches(regex_date, "Format data invalid" ),
  selfie_ci_person: yup.string().required("Va rog sa confirmati identitatea")

  // certificate_calification_url: yup
  //   .string()
  //   .required("Certificatul de calificare este obligatoriu"),

  // // ANRE devine CONDITIONAL
  // autorizatie_anre_gaze_image_url: yup.string().when("job", {
  //   is: (val) => val === "instalator_gaze",
  //   then: (schema) => schema.required("Autorizatia ANRE este obligatorie"),
  //   otherwise: (schema) => schema.notRequired(),
  // }),

  // autorizatie_anre_gaze_expiration_date: yup.string().when("job", {
  //   is: (val) =>val === "instalator_gaze",
  //   then: (schema) =>
  //     schema.required("Data expirarii este obligatorie").matches(regex_date),
  //   otherwise: (schema) => schema.notRequired(),
  // }),

  // autorizatie_anre_electrician_image_url: yup.string().when("job", {
  //   is: (val) => val === "electrician",
  //   then: (schema) => schema.required("Autorizatia ANRE este obligatorie"),
  //   otherwise: (schema) => schema.notRequired(),
  // }),

  // autorizatie_anre_electrician_expiration_date: yup.string().when("job", {
  //   is: (val) => val === "electrician",
  //   then: (schema) =>
  //     schema.required("Data expirarii este obligatorie").matches(regex_date),
  //   otherwise: (schema) => schema.notRequired(),
  // }),

  // autorizatie_iscir_termic_image_url: yup.string().when("job", {
  //   is: (val) => val === "instalator_termic",
  //   then: (schema) => schema.required("Autorizatie ISCIR obligatorie"),
  //   otherwise: (schema) => schema.notRequired(),
  // }),

  //  autorizatie_iscir_termic_expiration_date: yup.string().when("job", {
  //   is: (val) => val === "instalator_termic",
  //   then: (schema) => schema.required("Data expirarii este obligatorie").matches(regex_date),
  //   otherwise: (schema) => schema.notRequired(),
  // })
});


export async function addDocuments(req, res, next)
{
    const db = await pool.connect()

    const {ci_image_url, ci_expiration_date, selfie_ci_person} = req.body

    const user_id = req.user.id;

    try{
        
        await documentsUserSchema.validate(req.body, {abortEarly: false})

        await db.query("BEGIN")

        const user_documents = await db.query("INSERT INTO user_documents  (user_id, ci_image_url, ci_expiration_date, selfie_ci_person) VALUES ($1, $2, $3, $4) RETURNING *", [user_id, ci_image_url, ci_expiration_date, selfie_ci_person])

        if (user_documents.rows.length === 0)
        {
            await db.query("ROLLBACK")
            return res.status(500).json({message: "Documentele nu au fost incarcate"})
        }

        await db.query("COMMIT")
        
        return res.status(200).json(user_documents)
    }
    catch(error){
        if (error instanceof yup.ValidationError)
        {
            await db.query("ROLLBACK")
            return res.status(500).json({message: error.errors})
        }
    }
    finally{
        db.release()
    }
}
