import argon2 from "argon2";
import { pool } from "../db";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function singUp(req, res, next) {
  const client = await pool.connect();

  try {
    const { username, password, email, phone_number } = req.body;
    if (!username || !password || !email || phone_number) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const password_hash = await argon2.hash(password);

    await client.query("BEGIN");

    const result = await client.query(
      "INSERT INTO client(username, password_hash, email, phone_number) VALUES ($1, $2, $3, $4) RETURNING username",
      [username, password_hash, email, phone_number],
    );
    const clientName = (await result).rows[0].username;
    client.query("COMMIT");
    res.status(201).json({
      message: `Hello ${clientName}! 
      You have registered successfully`,
    });
  } catch (error) {
    console.error("An error occured" + error);
    await client.query("ROLLBACK");
    next(error);
  } finally {
    client.release();
  }
}

export async function Login(req, res) {
  const client = await pool.connect();

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email și parola sunt obligatorii" });
    }

    const results = await client.query(
      "SELECT * FROM  client WHERE email = $1",
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
    console.error("Eroare de login: " + error);
    return res.status(500).json({ message: "Eroare internă de server" });
  } finally {
    client.release();
  }
}
