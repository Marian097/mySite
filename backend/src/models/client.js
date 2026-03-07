import argon2 from "argon2";
import { pool } from "../db";

export async function createClient(req, res, next) {
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
