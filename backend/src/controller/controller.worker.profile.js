import { pool } from "../db.js"
import * as yup from "yup";
import dotenv from "dotenv";
import { isValidPhoneNumber } from "libphonenumber-js";


dotenv.config();

const profileSchema = yup.object({
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


export async function createProfile(req, res, next){
  const db = await pool.connect()

  try{
     const {full_name, phone, description, experience_years, city, county, address_text, profile_image_url, category_name} = req.body;
     const user_id  = req.user.id;
     const category = ["Instalator", "Electrician"]

     await profileSchema.validate(req.body, {abortEarly: false})

     await db.query("BEGIN")

     const results_1 = await db.query("INSERT INTO worker_profiles (user_id, full_name, phone, description, experience_years, city, county, address_text, profile_image_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id", [user_id, full_name, phone, description, experience_years, city, county, address_text, profile_image_url])

     if (results_1.rows.length === 0)
     {
      return res.status(404).json({message: 'Crearea profilului a esuat'})
     }
    
     const workerProfileId = results_1.rows[0].id

     
     const results_2 = await db.query("INSERT INTO categories (slug, name) VALUES ($1, $2) RETURNING id", [category_name.toLowerCase(), category_name])

      if (results_2.rows.length === 0)
     {
      return res.status(404).json({message: 'Nu ati selectat nici o categorie'})
     }

     const  categoriesId = results_2.rows[0].id;

     await db.query("INSERT INTO worker_categories (worker_profile_id, category_id) VALUES ($1, $2)", [workerProfileId, categoriesId])

     await db.query("COMMIT")

     return res.status(201).json({message: "Profile creat cu succes"})

  }catch(error){
     if (error instanceof yup.ValidationError) {
          await db.query("ROLLBACK");
          return res.status(400).json({ message: error.errors });
        }

  }finally{
    db.release()
  }
}
 