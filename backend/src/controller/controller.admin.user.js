import { pool } from "../db.js";


export async function deleteUser(req, res) {
  const db = await pool.connect();
  const { id } = req.body;

  try {
    if (!id) {
      return res.status(400).json({
        message: "Id este necesar",
      });
    }

    const result = await db.query("DELETE FROM users WHERE id = $1", [id]);

    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  } finally {
    db.release();
  }
}

export async function findAllUsersUnblock(req, res) {
  const db = await pool.connect();

  try {
    const result = await db.query("SELECT * FROM users WHERE is_blocked = $1", [false]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Nici un rezultat gasit" });
    }

    return res.status(200).json({
      data: result.rows,
    });
  } catch (err) {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  } finally {
    db.release();
  }
}


export async function findAllUsersBlocked(req, res) {
  const db = await pool.connect();

  try {
    const result = await db.query("SELECT * FROM users WHERE is_blocked = $1", [true]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Nici un rezultat gasit" });
    }

    return res.status(200).json({
      data: result.rows,
    });
  } catch (err) {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  } finally {
    db.release();
  }
}



export async function hasBlockUser(res, req, next)
{
  const db = await pool.connect();

  const user_id = req.user.id;

  const { id } = req.body;


  try{
    const admin = await db.query("SELECT role_name FROM users u JOIN user_roles ur ON u.id = ur.user_id JOIN roles r ON ur.role_id = r.id WHERE u.id = $1", [user_id])

    if (admin.rows.length === 0)
    {
      return res.status(404).json({message: "Nici un rezultat"})
    }

    const role = admin.rows[0].role_name;
    if (role !== "Admin")
    {
      return res.status(401).json({message: "Nu ai permisiuni pentru a face modificari"})
    }

    await db.query("BEGIN")
    
    const is_Blocked = await db.query("UPDATE users SET is_blocked = $1 WHERE id = $2 RETURNING is_blocked", [true, id])

    if (!is_Blocked)
    {
      await db.query("ROLLBACK")
      return res.status(500).json({message: "Operatiune esuata"})
    }

    return res.status(201).json({message: "Ati blocat cu succes utilizatorul"})

  }
  catch(err){
    await db.query("ROLLBACK")
    return res.status(500).json({message: err.message})
  }
  finally{
    db.release()
  }
}


