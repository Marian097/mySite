import argon2 from "argon2";
import { pool } from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as yup from "yup";

dotenv.config();

const passRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,20}$/;

const userSchema = yup.object({
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

const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

// export async function deleteUser(req, res) {
//   const db = await pool.connect();
//   const { id } = req.body;

//   try {
//     if (!id) {
//       return res.status(400).json({
//         message: "Id este necesar",
//       });
//     }

//     const result = await db.query("DELETE FROM users WHERE id = $1", [id]);

//     return res.status(204).send();
//   } catch (err) {
//     return res.status(500).json({
//       message: err.message,
//     });
//   } finally {
//     db.release();
//   }
// }

// export async function findAllUsers(req, res) {
//   const db = await pool.connect();

//   try {
//     const result = await db.query("SELECT * FROM users");
//     if (result.rows.length === 0) {
//       return res.status(404).json({ message: "Nici un rezultat gasit" });
//     }

//     return res.status(200).json({
//       data: result.rows,
//     });
//   } catch (err) {
//     if (err) {
//       return res.status(500).json({
//         message: err.message,
//       });
//     }
//   } finally {
//     db.release();
//   }
// }


export async function singUpProvider(req, res, next) {
  const db = await pool.connect();

  try {
    const { name, password, email} = req.body;


    const role = "Prestator";

    await userSchema.validate(req.body, { abortEarly: false });

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

export async function LoginProvider(req, res) {
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
