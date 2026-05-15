import argon2 from "argon2";
import { pool } from "../db.js";
import * as yup from "yup";



const passRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,20}$/;


const adminSchema = yup.object({
  email: yup
    .string()
    .email("Email invalid")
    .required("Emailul este obligatoriu"),
  password: yup
    .string()
    .matches(passRegex, "Min 8 caractere, o literă mare, un simbol")
    .required("Parola este obligatorie"),
});



async function verifyAdmin(req, res, next)
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


async function createAdmin(req, res, next)
{

  const db = pool.connect();

  const {email, password} = req.body;

  const role = "Admin";
}
