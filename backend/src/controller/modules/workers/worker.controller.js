import { pool } from "../../../db.js";
import * as yup from "yup";
import dotenv from "dotenv";
import {workerProfileSchema, documentsWorkerSchema} from "./worker.validation.js"


dotenv.config();


// Crearea profilului
export async function createProfile(req, res, next) {
  const db = await pool.connect();

  try {
    const {
      full_name,
      phone,
      description,
      experience_years,
      city,
      county,
      address_text,
      profile_image_url,
      category_name,
    } = req.body;
    const user_id = req.user.id;

    // validare INAINTE de BEGIN
    await workerProfileSchema.validate(req.body, { abortEarly: false });

    await db.query("BEGIN");

    const results_1 = await db.query(
      "INSERT INTO worker_profiles (user_id, full_name, phone, description, experience_years, city, county, address_text, profile_image_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id",
      [
        user_id,
        full_name,
        phone,
        description,
        experience_years,
        city,
        county,
        address_text,
        profile_image_url,
      ],
    );

    const workerProfileId = results_1.rows[0].id;

    //verificare categorie
    const categories = await db.query("SELECT * FROM categories");

    if (categories.rows.length === 0) {
      await db.query("ROLLBACK");
      return res.status(404).json({ message: "Nu exista nici o categorie" });
    }

    let exists = false;

    for (let cat of categories.rows) {
      if (category_name === cat.name) // ← fix aici
      {
        exists = true;
        break;
      }
    }

    if (!exists) {
      await db.query("ROLLBACK");
      return res.status(404).json({ message: "Categoria selectata nu exista" });
    }

    const result_category = await db.query(
      "SELECT id FROM categories WHERE name = $1",
      [category_name],
    );

    if (result_category.rows.length === 0) {
      await db.query("ROLLBACK");
      return res.status(404).json({ message: "Nu exista categorii" });
    }

    const catId = result_category.rows[0].id;

    if (!catId) {
      await db.query("ROLLBACK");
      return res.status(500).json({ message: "Eroare la server" });
    }

    const user_cat = await db.query(
      "INSERT INTO worker_categories (worker_profile_id, category_id) VALUES ($1, $2) RETURNING * ",
      [workerProfileId, catId],
    );

    if (user_cat.rows.length === 0) {
      await db.query("ROLLBACK");
      return res.status(500).json({ message: "Nu a fost adaugat rolul" });
    }

    await db.query("COMMIT");

    return res.status(201).json({ message: "Profile creat cu succes" });
  } catch (error) {
    await db.query("ROLLBACK");

    if (error instanceof yup.ValidationError) {
      return res.status(400).json({ message: error.errors });
    }

    return next(error); //
  } finally {
    db.release();
  }
}
export async function updateProfile(req, res, next) {
  console.log(req.body);
  const db = await pool.connect();

  try {
    const user_id = req.user.id;

    const allowedFields = [
      "full_name",
      "phone",
      "description",
      "experience_years",
      "city",
      "county",
      "address_text",
      "profile_image_url",
    ];

    const { category_name } = req.body;

    const dataToUpdate = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        dataToUpdate[field] = req.body[field];
      }
    }

    if (Object.keys(dataToUpdate).length === 0 && category_name === undefined) {
      return res.status(400).json({
        message: "Nu ai trimis niciun camp pentru actualizare",
      });
    }

    await db.query("BEGIN");

    let worker_profile_id;

    if (Object.keys(dataToUpdate).length > 0) {
      const fields = [];
      const values = [];
      let index = 1;

      for (const key of Object.keys(dataToUpdate)) {
        fields.push(`${key} = $${index}`);
        values.push(dataToUpdate[key]);
        index++;
      }

      values.push(user_id);

      const query = `
        UPDATE worker_profiles
        SET ${fields.join(", ")}
        WHERE user_id = $${index}
        RETURNING id
      `;

      const worker_profile = await db.query(query, values);

      if (worker_profile.rows.length === 0) {
        await db.query("ROLLBACK");
        return res.status(404).json({
          message: "Profilul nu a fost gasit",
        });
      }

      worker_profile_id = worker_profile.rows[0].id;
    } else {
      const worker_profile = await db.query(
        "SELECT id FROM worker_profiles WHERE user_id = $1",
        [user_id],
      );

      if (worker_profile.rows.length === 0) {
        await db.query("ROLLBACK");
        return res.status(404).json({
          message: "Profilul nu a fost gasit",
        });
      }

      worker_profile_id = worker_profile.rows[0].id;
    }

    if (category_name !== undefined) {
      const category = await db.query(
        "SELECT id FROM categories WHERE name = $1",
        [category_name],
      );

      if (category.rows.length === 0) {
        await db.query("ROLLBACK");
        return res.status(404).json({
          message: "Categoria nu a fost gasita",
        });
      }

      const category_id = category.rows[0].id;

      await db.query(
        `
        UPDATE worker_category
        SET category_id = $1
        WHERE worker_profile_id = $2
        `,
        [category_id, worker_profile_id],
      );
    }

    await db.query("COMMIT");

    return res.status(200).json({
      message: "Ati actualizat datele cu succes",
    });
  } catch (error) {
    await db.query("ROLLBACK");
    next(error);
  } finally {
    db.release();
  }
}

export async function deleteProfile(req, res, next) {
  const db = await pool.connect();

  const user_id = req.user.id;

  try {
    if (!user_id) {
      return res.status(401).json({ message: "Nu esti inregistrat" });
    }

    await db.query("DELETE FROM worker_profiles WHERE user_id = $1", [user_id]);

    return res.send();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  } finally {
    db.release();
  }
}

export async function addDocuments(req, res, next)
{
    const db = await pool.connect()

    const {ci_image_url, ci_expiration_date, selfie_ci_person} = req.body

    const user_id = req.user.id;

    try{
        
        await documentsWorkerSchema.validate(req.body, {abortEarly: false})

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
            return res.status(500).json({message: error.message})
        }
    }
    finally{
        db.release()
    }
}
