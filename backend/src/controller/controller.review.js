import { pool } from "../db.js";

export async function addReview(req, res) {
  const db = await pool.connect();

  const { comment, rating } = req.body;
  const id = req.user.clientid;

  try {
    if (!id || !rating) {
      return res.status(400).json({
        message: "Acordati un rating",
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
      "INSERT INTO review (comment, rating, clientid) VALUES ($1, $2, $3) RETURNING *",
      [comment, rating, clientId],
    );
    const textComment = resultComment.rows[0];

    await db.query("COMMIT");

    if (!textComment) {
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

export async function getReview(req, res){
  const db = await pool.connect()

  try{
    const results = await db.query("SELECT c.username AS name, r.rating AS rating, r.comment AS comment FROM client c JOIN review r ON c.clientid = r.clientid");

    if (results.rows.length === 0 )
    {
      return res.status(404).json({
        message: "Nu exista review-uri"
      })
    }

    return res.status(200).json(results.rows)

  }
  catch (err){
    return res.status(500).json({
      message: err.message
    })
  }
  finally{
    db.release()
  }
}


export async function deleteReview(req, res)
{
  const db = await pool.connect();

  const clientId  = req.user.clientid;

  try{
    if (!clientId)
    {
      return res.status(400).json({
        message: "Trebuie sa creezi cont"
      })
    }
    await db.query("BEGIN")
    const result = await db.query(
      "DELETE FROM review WHERE clientid = $1 RETURNING *",
      [clientId])
    await db.query("COMMIT")


    if (result.rows.length === 0)
    {
      return res.status(404).json({message: "Nu ai review-uri"})
    }
    return res.status(200).json({
      message: "Sters cu succes"
    })
  }
  catch (err){
    return res.status(500).json({
      message: err.message
    })

  }
  finally{
    db.release()
  }
}

