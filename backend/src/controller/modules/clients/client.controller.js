import { pool } from "../db.js";



export async function getAllProfiles(req, res, next) {
  const db = await pool.connect();

  try {
    const profiles = await db.query(
      "SELECT wp.full_name, wp.phone, wp.description, wp.experience_years, wp.city, wp.county, wp.profile_image_url, wp.average_rating, wp.review_count, c.name AS name_category FROM worker_profiles wp JOIN worker_categories wc ON wp.id = wc.worker_profile_id JOIN categories c ON wc.category_id = c.id WHERE is_approved = $1 ORDER BY wp.is_featured DESC, wp.full_name ASC",[true]
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

export async function filterProfile(req, res, next) {
  const db = await pool.connect();

  const columnMap = {
    experience_years: "wp.experience_years",
    average_rating: "wp.average_rating",
    county: "wp.county",
    city: "wp.city",
    review_count: "wp.review_count",
    category_name: "c.name",
  }; //  => req.body

  const fieldsFilter = {};
  const conditions = [];
  const values = [];
  const rangeFilters = ["average_rating", "experience_years", "review_count"];
  let index = 1;
  try {
    for (const field of Object.keys(columnMap)) {
      if (req.body[field] !== undefined) {
        fieldsFilter[field] = req.body[field];
      }
    }

    if (Object.keys(fieldsFilter).length === 0) {
      return res
        .status(400)
        .json({ message: "Va rog selectati cel putin un filtru" });
    } else {
      for (const key of Object.keys(fieldsFilter)) {
        if (rangeFilters.includes(key)) {
          conditions.push(`${columnMap[key]} >= $${index}`);
        } else {
          conditions.push(`${columnMap[key]} = $${index}`);
        }
        values.push(fieldsFilter[key]);
        index++;
      }
    }

    const query = `
  SELECT wp.full_name, wp.phone, wp.description, wp.experience_years, wp.city, wp.county, wp.profile_image_url, wp.average_rating, wp.review_count, c.name AS name_category FROM worker_profiles wp JOIN worker_categories wc ON wp.id = wc.worker_profile_id JOIN categories c ON wc.category_id = c.id WHERE ${conditions.join(" AND ")}
  `;
    const filterProfile = await db.query(query, values);


    if (filterProfile.rows.length === 0) {
      return res.status(404).json({ message: "Nici un rezultat" });
    }
    console.log("Debug_4");

    return res.status(200).json(filterProfile.rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  } finally {
    db.release();
  }
}