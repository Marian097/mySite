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


export async function addUserDocuments(req, res, next)
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

export async function hasVerifiedUserDocuments(req, res, next)
{
    const db = await pool.connect();
    const user_id = req.user.id;
    const { is_verified, verification_status, id} = req.body;
    const date_now = new Date().toISOString();

    try{
        console.log("Inainte begin")
        await db.query("BEGIN");
        const agent = await db.query("SELECT u.name AS username, r.role_name AS role FROM users u JOIN user_roles ur ON u.id = ur.user_id JOIN roles r ON ur.role_id = r.id WHERE u.id = $1", [user_id])

        console.log("Dupa aflarea rolului")
        
        if (agent.rows.length === 0)
        {
            await db.query("ROLLBACK");
            return res.status(404).json({message: "Nici un rezultat"})
        }

        console.log("Dupa verificare existentei agentului")

        const role = await agent.rows[0].role;

        console.log("Asta este rolul", role)

        if (role !== "Admin")
        {
            await db.query("ROLLBACK")
            return res.status(403).json({message: "Nu puteti face aceste modificari"})
        }

        console.log("Dupa verificarea rolului daca este admin")
        const username = await agent.rows[0].username;
        

        const results = await db.query("SELECT * FROM user_documents WHERE user_id = $1", [id])

        if (results.rows.length === 0)
        {
            await db.query("ROLLBACK")
            return res.status(404).json({message: "Nu exista utilizatori"})
        }

        const documents_id = results.rows[0].id;


        const update_verified = await db.query("UPDATE user_documents SET is_verified = $1, verified_at = $2, verified_by = $3, verification_status = $4 WHERE id = $5 RETURNING *", [is_verified, date_now, user_id, verification_status, documents_id])

        console.log("Dupa verificarea documentelor")

        if (update_verified.rows.length === 0)
        {
            await db.query("ROLLBACK")
            return res.status(500).json({message: "A intervenit o eroare"})
        }

        console.log("Rezultat dupa verificare")

        await db.query("COMMIT")

        return res.status(201).json({message: "Verificare cu succes"})

    }
    catch(err){
        await db.query("ROLLBACK")
        return res.status(500).json({message: err.message})
    }
    finally{
        db.release()
    }
}