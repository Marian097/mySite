import argon2 from "argon2";
import { pool } from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as yup from "yup";
import { isValidPhoneNumber } from "libphonenumber-js";

dotenv.config();

const passRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,20}$/;

const userSchema = yup.object({
  name: yup.string().required("Numele este obligatoriu"),
  email: yup
    .string()
    .email("Email invalid")
    .required("Emailul este obligatoriu"),
  phone: yup
    .string()
    .required("Telefon obligatoriu")
    .test("phone", "Numar invalid", (value) =>
      value ? isValidPhoneNumber(value, "RO") : false,
    ),
  password: yup
    .string()
    .matches(passRegex, "Min 8 caractere, o literă mare, un simbol")
    .required("Parola este obligatorie"),
});

const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export async function singUp(req, res, next) {
  const client = await pool.connect();

  try {
    const { name, password, email, phone } = req.body;

    await userSchema.validate(req.body, { abortEarly: false });

    const password_hash = await argon2.hash(password);

    await client.query("BEGIN");

    const result = await client.query(
      "INSERT INTO client(username, password_hash, email, phone_number) VALUES ($1, $2, $3, $4) RETURNING username",
      [name, password_hash, email, phone],
    );

    const clientName = result.rows[0].username;

    await client.query("COMMIT");

    return res.status(201).json({
      message: `Salut ${clientName}! Te-ai inregistrat cu succes!`,
    });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      await client.query("ROLLBACK");
      return res.json(400).json({ message: error.errors });
    }
  } finally {
    client.release();
  }
}
export async function Login(req, res) {
  const client = await pool.connect();

  try {
    const { email, password } = req.body;

    await loginSchema.validate(req.body, { abortEarly: false });

    const results = await client.query(
      "SELECT * FROM client WHERE email = $1",
      [email],
    );

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
    client.release();
  }
}
