import { pool } from "../db.js";


export async function getProfilesUnverified(req, res, next)
{
  const db = await pool.connect();
  try{
    const results = await db.query("SELECT wp.id, wp.full_name AS Nume, wp.phone AS telefon, u.email AS email, c.name AS calificare, wp.created_at AS data_inregistrare, wp.updated_at AS data_actualizare, wp.is_verified AS verified, wp.is_approved AS approved FROM users u JOIN worker_profiles wp ON u.id = wp.user_id JOIN worker_categories wc ON wp.id = wc.worker_profile_id JOIN categories c ON wc.category_id = c.id WHERE wp.is_verified = $1 OR wp.is_approved = $2", [false, false])

    if (results.rows.length === 0)
    {
      return res.status(404).json({message: "Nici un rezultat"})
    }

    return res.status(200).json(results.rows)
  }
  catch(err){
    return res.status(500).json({message: err.message})
  }
  finally{
    db.release()
  }
}



export async function getProfilesVerified(req, res, next)
{
  const db = await pool.connect();
  try{
    const results = await db.query("SELECT wp.id, wp.full_name AS Nume, wp.phone AS telefon, u.email AS email, c.name AS calificare, wp.created_at AS data_inregistrare, wp.updated_at AS data_actualizare, wp.is_verified AS verified, wp.is_approved AS approved FROM users u JOIN worker_profiles wp ON u.id = wp.user_id JOIN worker_categories wc ON wp.id = wc.worker_profile_id JOIN categories c ON wc.category_id = c.id WHERE wp.is_verified = $1 OR wp.is_approved = $2", [true, true])

    if (results.rows.length === 0)
    {
      return res.status(404).json({message: "Nici un rezultat"})
    }

    return res.status(200).json(results.rows)
  }
  catch(err){
    return res.status(500).json({message: err.message})
  }
  finally{
    db.release()
  }
}
 
 
export async function hasProfileApproved(req, res, next)
{
  const db = await pool.connect()
  const user_id = req.user.id;
  const { id } = req.body;

  try{
    const result = await db.query("SELECT ur.role_id, r.role_name AS role FROM user_roles ur JOIN roles r ON ur.role_id = r.id WHERE user_id = $1", [user_id])


    if (result.rows.length === 0)
    {
      return res.status(404).json({message: "Userul nu a fost gasit."})
    }

    const role_name = result.rows[0].role;

    console.log("Rol:", role_name)
   
    if (role_name !== "Admin")
    {
      return res.status(403).json({message: "Nu puteti face aceste modficari"})
    }

    console.log("Dupa verificarea rolului")

    await db.query("BEGIN")

    const update_profile = await db.query("UPDATE worker_profiles SET is_verified = $1, is_approved = $2 WHERE id = $4 RETURNING *", [true, true, id])

    console.log(update_profile.rows)

    if (update_profile.rows.length === 0)
    {
      await db.query("ROLLBACK");
      return res.status(500).json({message: "Operatiunea a esuat"})
    }

    await db.query("COMMIT");
    return res.status(200).json({message: "Aprobare cu succes"})
  }
  catch(err){
    await db.query("ROLLBACK");
    return res.status(500).json({message: err.message})
  }
  finally{
    db.release()
  }
}


export async function hasProfileRejected(req, res, next)
{
  const db = await pool.connect()
  const user_id = req.user.id;
  const { id } = req.body;

  try{
    const result = await db.query("SELECT ur.role_id, r.role_name AS role FROM user_roles ur JOIN roles r ON ur.role_id = r.id WHERE user_id = $1", [user_id])


    if (result.rows.length === 0)
    {
      return res.status(404).json({message: "Userul nu a fost gasit."})
    }

    const role_name = result.rows[0].role;

    console.log("Rol:", role_name)
   
    if (role_name !== "Admin")
    {
      return res.status(403).json({message: "Nu puteti face aceste modficari"})
    }

    console.log("Dupa verificarea rolului")

    await db.query("BEGIN")

    const update_profile = await db.query("UPDATE worker_profiles SET is_verified = $1, is_approved = $2 WHERE id = $4 RETURNING *", [false, false, id])

    console.log(update_profile.rows)

    if (update_profile.rows.length === 0)
    {
      await db.query("ROLLBACK");
      return res.status(500).json({message: "Operatiunea a esuat"})
    }

    await db.query("COMMIT");
    return res.status(200).json({message: "Aprobare cu succes"})
  }
  catch(err){
    await db.query("ROLLBACK");
    return res.status(500).json({message: err.message})
  }
  finally{
    db.release()
  }
}

