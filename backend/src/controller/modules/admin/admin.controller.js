import { pool } from "../../../db.js";

import { adminProfileSchema } from "./admin.validation.js"

import * as yup from "yup";


export async function createAdminProfile(req, res, next)
{
    const db = await pool.connect();
    const user_id = req.user.id;
    const {phone, address, ci_image_url, number_contract} = req.body;
    const date = new Date().toISOString();

    try{
        await adminProfileSchema.validate(req.body, {abortEarly: false});

        await db.query("BEGIN");

        const result = await db.query("SELECT id FROM users WHERE id = $1", [user_id]);

        console.log("Dupa ce am luat id-ul userului")
        
        if (result.rows.length === 0)
        {
            await db.query("ROLLBACK");
            return res.status(404).json({message: "Nu sunteti inregistrat"})
        }

        const adminProfiles = await db.query("INSERT INTO admin_profiles (user_id, phone, address, ci_image_url, number_contract, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [result.rows[0].id, phone, address, ci_image_url, number_contract, date]);


        if (adminProfiles.rows.length === 0)
        {
            await db.query("ROLLBACK")
            return res.status(500).json({message: "Profilul nu a fost creat"})
        }

        await db.query("COMMIT");
        return res.status(200).json({message: "Profilul creat cu succes"})
    }
    catch(err){
        if (err instanceof yup.ValidationError)
        {
            await db.query("ROLLBACK");
            return res.status(500).json({message: err.errors})
        }
    }
    finally{
        db.release()
    }
}


export async function getWorkerPending(req, res,next)
{
    const db = await pool.connect()

    try{
        const results = await db.query("SELECT ud.id, wp.full_name AS username, u.email, ud.ci_image_url AS CI, ud.ci_expiration_date AS CI_expiration, ud.verification_status AS status FROM users u JOIN worker_profiles wp ON u.id = wp.user_id JOIN user_documents ud ON u.id = ud.user_id WHERE ud.verification_status = $1 OR ud.verification_status = $2", ["Pending"])

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

export async function getWorkerRejected(req, res,next)
{
    const db = await pool.connect()

    try{
        const results = await db.query("SELECT ud.id, wp.full_name AS username, u.email, ud.ci_image_url AS CI, ud.ci_expiration_date AS CI_expiration, ud.verification_status AS status FROM users u JOIN worker_profiles wp ON u.id = wp.user_id JOIN user_documents ud ON u.id = ud.user_id WHERE ud.verification_status = $1 OR ud.verification_status = $2", ["Rejected"])

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

export async function getWorker(req, res,next)
{
    const db = await pool.connect()

    try{
        const results = await db.query("SELECT ud.id, wp.full_name AS username, u.email, ud.ci_image_url AS CI, ud.ci_expiration_date AS CI_expiration FROM users u JOIN worker_profiles wp ON u.id = wp.user_id JOIN user_documents ud ON u.id = ud.user_id")

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


export async function getWorkerApproved(req, res, next)
{
      const db = await pool.connect()

    try{
        const results = await db.query("SELECT ud.id, wp.full_name AS username, u.email, ud.ci_image_url AS CI, ud.ci_expiration_date AS CI_expiration, ud.verification_status AS status FROM users u JOIN worker_profiles wp ON u.id = wp.user_id JOIN user_documents ud ON u.id = ud.user_id WHERE ud.verification_status = $1", ["Success"])

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

export async function hasAcceptUserDocuments(req, res, next)
{
    const db = await pool.connect();
    const user_id = req.user.id;
    const {id} = req.body;
    const date_now = new Date().toISOString();

    try{
        await db.query("BEGIN");

        const results = await db.query("SELECT * FROM user_documents WHERE id = $1", [id])

        if (results.rows.length === 0)
        {
            await db.query("ROLLBACK")
            return res.status(404).json({message: "Nu exista utilizatori"})
        }

        const documents_id = results.rows[0].id;


        const update_verified = await db.query("UPDATE user_documents SET is_verified = $1, verified_at = $2, verified_by = $3, verification_status = $4 WHERE id = $5 RETURNING *", [true, date_now, user_id, "Success", documents_id])

        console.log("Dupa verificarea documentelor")

        if (update_verified.rows.length === 0)
        {
            await db.query("ROLLBACK")
            return res.status(500).json({message: "A intervenit o eroare"})
        }

        console.log("Rezultat dupa verificare")

        await db.query("COMMIT")

        return res.status(200).json({message: "Verificare cu succes"})

    }
    catch(err){
        await db.query("ROLLBACK")
        return res.status(500).json({message: err.message})
    }
    finally{
        db.release()
    }
}


export async function hasRejectedUserDocuments(req, res, next)
{
    const db = await pool.connect();
    const user_id = req.user.id;
    const { id } = req.body;
    const date_now = new Date().toISOString();

    try{
        await db.query("BEGIN");
        const results = await db.query("SELECT * FROM user_documents WHERE id = $1", [id])

        if (results.rows.length === 0)
        {
            await db.query("ROLLBACK")
            return res.status(404).json({message: "Nu exista utilizatori"})
        }

        const documents_id = results.rows[0].id;


        const update_verified = await db.query("UPDATE user_documents SET is_verified = $1, verified_at = $2, verified_by = $3, verification_status = $4 WHERE id = $5 RETURNING *", [false, date_now, user_id, "Rejected", documents_id])


        if (update_verified.rows.length === 0)
        {
            await db.query("ROLLBACK")
            return res.status(500).json({message: "A intervenit o eroare"})
        }

        console.log("Rezultat dupa verificare")

        await db.query("COMMIT")

        return res.status(200).json({message: "Ati respins documentele"})

    }
    catch(err){
        await db.query("ROLLBACK")
        return res.status(500).json({message: err.message})
    }
    finally{
        db.release()
    }
}


async function getProfiles(req, res, next)
{
  const db = await pool.connect();
  try{
    const results = await db.query("SELECT wp.id, wp.full_name AS Nume, wp.phone AS telefon, u.email AS email, c.name AS calificare, wp.created_at AS data_inregistrare, wp.updated_at AS data_actualizare FROM users u JOIN worker_profiles wp ON u.id = wp.user_id JOIN worker_categories wc ON wp.id = wc.worker_profile_id JOIN categories c ON wc.category_id = c.id")

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
 
 
export async function hasProfileApproved(req, res, next) //=> Pending 
{
  const db = await pool.connect()
  const user_id = req.user.id;
  const { id } = req.body;

  try{

    await db.query("BEGIN")

    const update_profile = await db.query("UPDATE worker_profiles SET is_verified = $1, is_approved = $2 WHERE id = $3 RETURNING *", [true, true, id])

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


export async function hasProfileRejected(req, res, next) // => Pending
{
  const db = await pool.connect()
  const user_id = req.user.id;
  const { id } = req.body;

  try{
    await db.query("BEGIN")

    const update_profile = await db.query("UPDATE worker_profiles SET is_verified = $1, is_approved = $2 WHERE id = $3 RETURNING *", [false, false, id])

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



export async function hasBlockUser(req, res, next)
{
  const db = await pool.connect();

  const user_id = req.user.id;

  const { id } = req.body;


  try{
  
    await db.query("BEGIN")
    
    const is_Blocked = await db.query("UPDATE users SET is_blocked = $1 WHERE id = $2 RETURNING is_blocked", [true, id])

    if (is_Blocked.rows.length === 0)
    {
      await db.query("ROLLBACK")
      return res.status(500).json({message: "Operatiune esuata"})
    }


    await db.query("COMMIT")
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


export async function hasUnblockUser(req, res, next)
{
  const db = await pool.connect();

  const user_id = req.user.id;

  const { id } = req.body;


  try{
  
    await db.query("BEGIN")
    
    const is_Blocked = await db.query("UPDATE users SET is_blocked = $1 WHERE id = $2 RETURNING is_blocked", [false, id])

    if (is_Blocked.rows.length === 0)
    {
      await db.query("ROLLBACK")
      return res.status(500).json({message: "Operatiune esuata"})
    }


    await db.query("COMMIT")
    return res.status(201).json({message: "Ati deblocat cu succes utilizatorul"})

  }
  catch(err){
    await db.query("ROLLBACK")
    return res.status(500).json({message: err.message})
  }
  finally{
    db.release()
  }
}


