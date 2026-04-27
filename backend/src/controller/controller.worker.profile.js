import { pool } from "../db.js";
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

// Crearea profilului
export async function createProfile(req, res, next) {
  console.log(req.body);
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
    console.log(req.user.id);
    const category = ["Instalator", "Electrician"];

    // validare INAINTE de BEGIN (asta e bine deja)
    await profileSchema.validate(req.body, { abortEarly: false });

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

    // 🔹 FIX 1: corect array + push corect
    const categoriesId = [];

    for (let c of category) {
      const results_2 = await db.query(
        "INSERT INTO categories (slug, name) VALUES ($1, $2) RETURNING id",
        [c.toLowerCase(), c],
      );

      categoriesId.push(results_2.rows[0].id); // ← fix aici
    }

    // 🔹 FIX 2: verificare corectă categorie
    const cat_name = await db.query("SELECT name FROM categories");

    if (cat_name.rows.length === 0) {
      await db.query("ROLLBACK");
      return res.status(404).json({ message: "Nu exista nici o categorie" });
    }

    let exists = false;

    for (let cat of cat_name.rows) {
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

    // 🔹 FIX 3: verificare simplă
    if (categoriesId.length === 0) {
      await db.query("ROLLBACK");
      return res
        .status(404)
        .json({ message: "Nu ati selectat nici o categorie" });
    }

    // 🔹 FIX 4: inserezi pe fiecare categorie (nu array direct)
    for (let catId of categoriesId) {
      await db.query(
        "INSERT INTO worker_categories (worker_profile_id, category_id) VALUES ($1, $2)",
        [workerProfileId, catId],
      );
    }

    await db.query("COMMIT");

    return res.status(201).json({ message: "Profile creat cu succes" });
  } catch (error) {
    // 🔹 FIX 5: rollback pentru ORICE eroare dupa BEGIN
    await db.query("ROLLBACK");

    if (error instanceof yup.ValidationError) {
      return res.status(400).json({ message: error.errors });
    }

    return next(error); //
  } finally {
    db.release();
  }
}

// Afisam toti meseriasii in pagina
export async function getAllProfiles(req, res, next) {
  const db = await pool.connect();

  try {
    const profiles = await db.query(
      "SELECT wp.full_name, wp.phone, wp.description, wp.experience_years, wp.city, wp.county, wp.profile_image_url, wp.average_rating, wp.review_count, c.name AS name_category FROM worker_profiles wp JOIN worker_categories wc ON wp.id = wc.worker_profile_id JOIN categories c ON wc.category_id = c.id",
    );

    if (profiles.rows.length === 0) {
      return res.status(404).json({ message: "Nu exista rezultate" });
    }

    return res.status(201).json(profiles.rows);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  } finally {
    db.release();
  }
}

//Update la profile
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

export async function filterProfile(req, res, next) {
  const db = await pool.connect();

 const columnMap = {
  experience_years: "wp.experience_years",
  average_rating: "wp.average_rating",
  county: "wp.county",
  city: "wp.city",
  review_count: "wp.review_count",
  category_name: "c.name",
};//  => req.body

  const fieldsFilter = {};
  const conditions = [];
  const values = []
  const rangeFilters = ["average_rating", "experience_years", "review_count"];
  let index = 1;
  try {
    for (const field of Object.keys(columnMap)) {
      if (req.body[field] !== undefined) {
        fieldsFilter[field] = req.body[field];
      }
    }

    console.log("Debug_1")
    if (Object.keys(fieldsFilter).length === 0) {
      return res
        .status(400)
        .json({ message: "Va rog selectati cel putin un filtru" });
    } else {
      for (const key of Object.keys(fieldsFilter)) {
        if (rangeFilters.includes(key))
        {
           conditions.push(`${columnMap[key]} >= $${index}`)
        }
        else{ 
          conditions.push(`${columnMap[key]} = $${index}`);
        }   
        values.push(fieldsFilter[key])
        index++;
      }
    }

    console.log("Debug_2")

    const query = `
  SELECT wp.full_name, wp.phone, wp.description, wp.experience_years, wp.city, wp.county, wp.profile_image_url, wp.average_rating, wp.review_count, c.name AS name_category FROM worker_profiles wp JOIN worker_categories wc ON wp.id = wc.worker_profile_id JOIN categories c ON wc.category_id = c.id WHERE ${conditions.join(" AND ")}
  `;
  const filterProfile = await db.query(query, values);

  console.log("Debug_3")

  if (filterProfile.rows.length === 0)
  {
    return res.status(404).json(({message: "Nici un rezultat"}))
  }
  console.log("Debug_4")

  return res.status(200).json(filterProfile.rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  } finally {
    db.release();
  }
}
