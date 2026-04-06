import { pool } from "../db.js";

export async function addComment(req, res) {
  const db = await pool.connect();

  const { id, comment, rating } = req.body;

  try {
    if (!id) {
      return res.status(400).json({
        message: "Va rog sa va înregistrati",
      });
    }

    await db.query("BEGIN");

    const result = await db.query("SELECT clientId AS clientId FROM client WHERE clientId = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Clientul nu exista",
      });
    }
    const clientId = result.rows[0].clientId;

    const resultComment = await db.query(
      "INSERT INTO review (comment, rating, clientid) VALUES ($1, $2) RETURNING",
      [comment, rating, clientId],
    );
    const textComment = resultComment.rows[0];

    await db.query("COMMIT");

    if (textComment.rows.length === 0) {
      return res.status(500).json({
        message: "Comentariu nu a fost adaugat",
      });
    }

    return res.status(201).json(textComment);
  } catch (err) {
    await db.query("ROLLBACK");
    return res.status(500).json({
      message: err.message,
    });
  } finally {
    db.release();
  }
}

