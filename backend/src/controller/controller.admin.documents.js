import { pool } from "../db.js";


export async function getUserDocumentsUnverified(req, res,next)
{
    const db = await pool.connect()

    try{
        const results = await db.query("SELECT ud.id, wp.full_name AS username, u.email, ud.ci_image_url AS CI, ud.ci_expiration_date AS CI_expiration, ud.verification_status AS status FROM users u JOIN worker_profiles wp ON u.id = wp.user_id JOIN user_documents ud ON u.id = ud.user_id WHERE ud.verification_status = $1 OR ud.verification_status = $2", ["Pending", "Rejected"])

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


export async function getUserDocumentsVerified(req, res,next)
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

export async function hasVerifiedAcceptUserDocuments(req, res, next)
{
    const db = await pool.connect();
    const user_id = req.user.id;
    const {id} = req.body;
    const date_now = new Date().toISOString();

    try{
        await db.query("BEGIN");
        const agent = await db.query("SELECT u.name AS username, r.role_name AS role FROM users u JOIN user_roles ur ON u.id = ur.user_id JOIN roles r ON ur.role_id = r.id WHERE u.id = $1", [user_id])

        console.log("Dupa aflarea rolului")
        
        if (agent.rows.length === 0)
        {
            await db.query("ROLLBACK");
            return res.status(404).json({message: "Nici un rezultat"})
        }

        console.log("Dupa verificare existentei agentului")

        const role = await agent.rows[0].role;

        console.log("Asta este rolul", role)

        if (role !== "Admin")
        {
            await db.query("ROLLBACK")
            return res.status(403).json({message: "Nu puteti face aceste modificari"})
        }

        const results = db.query("SELECT * FROM user_documents WHERE user_id = $1", [id])

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


export async function hasVerifiedRejectedUserDocuments(req, res, next)
{
    const db = await pool.connect();
    const user_id = req.user.id;
    const {id} = req.body;
    const date_now = new Date().toISOString();

    try{
        await db.query("BEGIN");
        const agent = await db.query("SELECT u.name AS username, r.role_name AS role FROM users u JOIN user_roles ur ON u.id = ur.user_id JOIN roles r ON ur.role_id = r.id WHERE u.id = $1", [user_id])

        console.log("Dupa aflarea rolului")
        
        if (agent.rows.length === 0)
        {
            await db.query("ROLLBACK");
            return res.status(404).json({message: "Nici un rezultat"})
        }

        console.log("Dupa verificare existentei agentului")

        const role = await agent.rows[0].role;

        console.log("Asta este rolul", role)

        if (role !== "Admin")
        {
            await db.query("ROLLBACK")
            return res.status(403).json({message: "Nu puteti face aceste modificari"})
        }

        const results = db.query("SELECT * FROM user_documents WHERE user_id = $1", [id])

        if (results.rows.length === 0)
        {
            await db.query("ROLLBACK")
            return res.status(404).json({message: "Nu exista utilizatori"})
        }

        const documents_id = results.rows[0].id;


        const update_verified = await db.query("UPDATE user_documents SET is_verified = $1, verified_at = $2, verified_by = $3, verification_status = $4 WHERE id = $5 RETURNING *", [false, date_now, user_id, "Rejected", documents_id])

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