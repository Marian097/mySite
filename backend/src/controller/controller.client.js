import { pool } from "../db.js";


const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});


const providerSchema = yup.object({
  name: yup.string().required("Numele este obligatoriu"),
  email: yup
    .string()
    .email("Email invalid")
    .required("Emailul este obligatoriu"),
  password: yup
    .string()
    .matches(passRegex, "Min 8 caractere, o literă mare, un simbol")
    .required("Parola este obligatorie"),
  role: yup.string().required("Va rog alegeti un rol"),
}); 


export async function singUpClient(req, res, next) {
  const db = await pool.connect();

  try {
    const { name, password, email} = req.body;

    const role = "Client";

    await providerSchema.validate(req.body, { abortEarly: false });

    const password_hash = await argon2.hash(password);

    await db.query("BEGIN");

    const verified_email = await db.query("SELECT email FROM users");

    let existsEmail = false;

    for (let e of verified_email.rows)
    {
      if (email === e.email)
      {
        existsEmail = true
        break
      }
    }

    if (existsEmail)
    {
      await db.query("ROLLBACK")
      return res.status(500).json({message: "Sunteti deja inregistrat"})
    }

    const result = await db.query(
      "INSERT INTO users(name, email, password_hash) VALUES ($1, $2, $3) RETURNING name, id",
      [name, email, password_hash],
    );
   
    if (result.rows.length === 0) {
      await db.query("ROLLBACK");
      return res.status(500).json({ message: "A intervenit o eroare" });
    }
    const username = result.rows[0].name;
    const user_id = result.rows[0].id;

    const get_roles = await db.query("SELECT * FROM roles");

    
    if (get_roles.rows.length === 0)
    {
      await db.query("ROLLBACK");
      return res.status(500).json({ message: "Nu exista nici un rol" });
    }
    
    let exists = false;

    for (let r of get_roles.rows) {
      if (role === r.role_name) {
        exists = true;
        break;
      }
    }


    if (exists) {
      const role_id = get_roles.rows[0].id

      const user_roles = await db.query(
        "INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2) RETURNING *",
        [user_id, role_id]
      );

      console.log(user_roles.rows.length)

      if (user_roles.rows.length === 0) {
        await db.query("ROLLBACK");
        return res.status(500).json({ message: "A intervenit o eroare" });
      }
    }
    else{
      await db.query("ROLLBACK")
      return res.status(404).json({ message: "Va rog selectati un rol valid" });
    }

    await db.query("COMMIT");

    return res.status(201).json({
      message: `Salut ${username}! Te-ai inregistrat cu succes!`,
    });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      await db.query("ROLLBACK");
      return res.status(400).json({ message: error.errors });
    }
  } finally {
    db.release();
  }
}

export async function LoginClient(req, res) {
  const db = await pool.connect();

  try {
    const { email, password } = req.body;

    await loginSchema.validate(req.body, { abortEarly: false });

    const results = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);


    if (results.rows.length === 0)
      return res
        .status(401)
        .json({ message: "Email sau parola sunt incorecte" });

    const dbUser = results.rows[0];
    const pass_hash = dbUser.password_hash;

    const isValid = await argon2.verify(pass_hash, password);

    if (!isValid)
      return res
        .status(401)
        .json({ message: "Email sau parola sunt incorecte" });

    const user = {
      id: dbUser.id,
      email: dbUser.email,
    };

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET lipsește din variabilele de mediu");
    }

    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "15m" });

    return res.status(200).json({ token });
  } catch (error) {
    const errors = {};

    error.inner.forEach((err) => {
      if (err.path && !errors[err.path]) {
        errors[err.path] = err.message;
      }
    });

    return res.status(400).json({ errors });
  } finally {
    db.release();
  }
}


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

    console.log("Debug_3");

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