import { pool } from "../../../db.js";
import * as yup from "yup";
import dotenv from "dotenv";
import {
  workerProfileSchema,
  documentsWorkerSchema,
  bussinesSchema,
} from "./worker.validation.js";

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

export async function addDocuments(req, res, next) {
  const db = await pool.connect();

  const date = req.body.date;

  const ci_image = req.files.ci_image[0].path;
  const ci_selfie = req.files.ci_selfie[0].path;
  const user_id = req.user.id;

  const documentIdentity = {
    ci_image,
    ci_selfie,
    date,
  };

  try {
    console.log("eroare inainte de validare backend");
    await documentsWorkerSchema.validate(documentIdentity, {
      abortEarly: false,
    });

    await db.query("BEGIN");

    console.log("ianainte de baza de date");
    const user_documents = await db.query(
      "INSERT INTO user_documents (user_id, ci_image_url, ci_expiration_date, selfie_ci_person) VALUES ($1, $2, $3, $4) RETURNING *",
      [user_id, ci_image, date, ci_selfie],
    );

    console.log("Dupa ce am incarcat datele in baza de date");

    if (user_documents.rows.length === 0) {
      await db.query("ROLLBACK");
      return res
        .status(500)
        .json({ message: "Documentele nu au fost incarcate" });
    }

    await db.query("COMMIT");

    return res.status(200).json(user_documents);
  } catch (error) {
    await db.query("ROLLBACK");

    console.error(error);

    return next(error);
  } finally {
    db.release();
  }
}

export async function registerBussines(req, res, next) {
  const db = await pool.connect();

  console.log("sunt in backend")

  try {
    const name_bussines = req.body.name_bussines;
    const certificate_registration = req.files[0].path;
    const type_bussines = req.body.type_bussines;
    const cif = req.body.cif;
    const address = req.body.address;
    const postal_code = req.body.postal_code;

    const country = req.body.country;
    const county = req.body.county;
    const city = req.body.city;

    const user_id = req.user.id;
    await bussinesSchema.validate(req.body, { abortEarly: false });

    console.log("sunt in backend in try")

    const bussinesType = await db.query("SELECT * FROM type_bussines");

    if (bussinesType.rows.length === 0)
      return res.status(404).json({ message: "Nici un rezultat." });

    let exists = false;

    for (const b of bussinesType.rows) {
      if (type_bussines === b.type_name) {
        exists = true;
        break;
      }
    }

    if (!exists) {
      return res
        .status(404)
        .json({ message: "Va rog alegeti o forma de lucru" });
    }

    const user_documents_id = await db.query(
      "SELECT id FROM user_documents WHERE user_id = $1",
      [user_id],
    );

    if (user_documents_id.rows.length === 0)
      return res.status(404).json({ message: "Creati mai intai profilul!" });

    await db.query("BEGIN");

    const bussines_documents = await db.query(
      "INSERT INTO bussines_documents (user_id, user_documents_id, name_bussines, registration_certificate_image_url, cif, address, postal_code, country, county, city,  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id ",
      [
        user_id,
        user_documents_id.rows[0].id,
        name_bussines,
        certificate_registration,
        cif,
        address,
        postal_code,
        country,
        county,
        city,
      ],
    );

    if (bussines_documents.rows.length === 0) {
      await db.query("ROLLBACK");
      return res.status(500).json({ message: "Operatiunea nu a reusit" });
    }

    const worker_type_bussines = await db.query(
      "INSERT INTO worker_type_bussines (user_id, bussines_id, type_id) VALUES ($1, $2, $3) RETURNING *",
      [user_id, bussines_documents.rows[0].id, bussinesType.rows[0].id],
    );

    if (worker_type_bussines.rows.length === 0) {
      await db.query("ROLLBACK");
      return res.status(500).json({ message: "Operatiunea nu a reusit" });
    }

    await db.query("COMMIT");

    return res
      .status(200)
      .json({ message: "Ati inregistrat cu succes firma." });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      await db.query("ROLLBACK");
      return res.status(500).json({ message: error.message });
    }
  } finally {
    db.release();
  }
}

export async function updateStep(req, res) {
  const db = await pool.connect();

  try {
    const { step } = req.body;
    const user_id = req.user.id;

    if (!step) {
      return res
        .status(500)
        .json({ message: "A intervenit o eroare la înregistrare" });
    }

    await db.query("BEGIN");

    const isStep = await db.query(
      "UPDATE verification_progress SET verification_step = $1 WHERE user_id = $2 RETURNING verification_step",
      [step, user_id],
    );

    if (isStep.rows.length === 0) {
      await db.query("ROLLBACK");
      return res
        .status(500)
        .json({ message: "Progresul nu a fost înregistrat" });
    }

    await db.query("COMMIT");

    return res.status(200).json(isStep.rows[0].verification_step);
  } catch (err) {
    console.log(err.message);
    await db.query("ROLLBACK");
    return res.status(500).json({ message: err.message });
  } finally {
    db.release();
  }
}
