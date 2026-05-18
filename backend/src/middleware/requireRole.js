import { pool } from "../db.js";


export async function verifyAdmin(req, res, next)
{
  const db = await pool.connect()
  const user_id = req.user.id;

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

    next()
  }
  catch(err){
    return res.status(403).json({message: err.message})
  }
  finally{
    db.release()
  }
}