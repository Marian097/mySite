import { pool } from "../../../db.js";

import { adminProfileSchema, verifiedEmail } from "./admin.validation.js";

import * as Yup from "yup";

export async function getAdminProfile(req, res, next) {
  const db = await pool.connect();
  const id = req.user.id;

  try {
    const results = await db.query(
      "SELECT ap.user_id AS id,  u.name AS username, r.role_name AS role, ap.ci_image_url AS profile_image FROM users u JOIN user_roles ur ON u.id = ur.user_id JOIN roles r ON r.id = ur.role_id JOIN admin_profiles ap ON u.id = ap.user_id WHERE u.id = $1",
      [id],
    );

  
    return res.status(200).json(results.rows);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  } finally {
    db.release();
  }
}
export async function createAdminProfile(req, res, next) {
  const db = await pool.connect();
  const user_id = req.user.id;
  const { phone, address, ci_image_url, number_contract } = req.body;
  const date = new Date().toISOString();

  try {
    await adminProfileSchema.validate(req.body, { abortEarly: false });

    await db.query("BEGIN");

    const result = await db.query("SELECT id FROM users WHERE id = $1", [
      user_id,
    ]);

    if (result.rows.length === 0) {
      await db.query("ROLLBACK");
      return res.status(404).json({ message: "Nu sunteti inregistrat" });
    }

    const adminProfiles = await db.query(
      "INSERT INTO admin_profiles (user_id, phone, address, ci_image_url, number_contract, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [user_id, phone, address, ci_image_url, number_contract, date],
    );

    if (adminProfiles.rows.length === 0) {
      await db.query("ROLLBACK");
      return res.status(500).json({ message: "Profilul nu a fost creat" });
    }

    await db.query("COMMIT");
    return res.status(200).json({ message: "Profilul creat cu succes" });
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      await db.query("ROLLBACK");
      return res.status(500).json({ message: err.errors });
    }
  } finally {
    db.release();
  }
}

export async function getWorkerPending(req, res, next) {
  const db = await pool.connect();

  try {
    const results = await db.query(
      "SELECT ud.id, wp.full_name AS username, u.email, ud.ci_image_url AS CI, ud.ci_expiration_date AS CI_expiration, ud.verification_status AS status FROM users u JOIN worker_profiles wp ON u.id = wp.user_id JOIN user_documents ud ON u.id = ud.user_id WHERE ud.verification_status = $1",
      ["Pending"],
    );

    return res.status(200).json(results.rows);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  } finally {
    db.release();
  }
}

export async function getWorkerRejected(req, res, next) {
  const db = await pool.connect();

  try {
    const results = await db.query(
      "SELECT ud.id, wp.full_name AS username, u.email, ud.ci_image_url AS CI, ud.ci_expiration_date AS CI_expiration, ud.verification_status AS status FROM users u JOIN worker_profiles wp ON u.id = wp.user_id JOIN user_documents ud ON u.id = ud.user_id WHERE ud.verification_status = $1",
      ["Rejected"],
    );

  
    return res.status(200).json(results.rows);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  } finally {
    db.release();
  }
}

export async function getWorker(req, res, next) {
  const db = await pool.connect();

  try {
    const results = await db.query(
      "SELECT ud.id, wp.full_name AS username, u.email, ud.ci_image_url AS CI, ud.ci_expiration_date AS CI_expiration, ud.verification_status AS status FROM users u JOIN worker_profiles wp ON u.id = wp.user_id JOIN user_documents ud ON u.id = ud.user_id",
    );


    return res.status(200).json(results.rows);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  } finally {
    db.release();
  }
}

export async function getWorkerApproved(req, res, next) {
  const db = await pool.connect();

  try {
    const results = await db.query(
      "SELECT ud.id, wp.full_name AS username, u.email, ud.ci_image_url AS CI, ud.ci_expiration_date AS CI_expiration, ud.verification_status AS status FROM users u JOIN worker_profiles wp ON u.id = wp.user_id JOIN user_documents ud ON u.id = ud.user_id WHERE ud.verification_status = $1",
      ["Success"],
    );

   
    return res.status(200).json(results.rows);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  } finally {
    db.release();
  }
}

export async function hasAcceptUserDocuments(req, res, next) {
  const db = await pool.connect();
  const user_id = req.user.id;
  const { id } = req.body;
  const date_now = new Date().toISOString();

  try {
    await db.query("BEGIN");

    const results = await db.query(
      "SELECT * FROM user_documents WHERE id = $1",
      [id],
    );

    if (results.rows.length === 0) {
      await db.query("ROLLBACK");
      return res.status(404).json({ message: "Nu exista utilizatori" });
    }

    const documents_id = results.rows[0].id;

    const update_verified = await db.query(
      "UPDATE user_documents SET is_verified = $1, verified_at = $2, verified_by = $3, verification_status = $4 WHERE id = $5 RETURNING *",
      [true, date_now, user_id, "Success", documents_id],
    );

    console.log("Dupa verificarea documentelor");

    if (update_verified.rows.length === 0) {
      await db.query("ROLLBACK");
      return res.status(500).json({ message: "A intervenit o eroare" });
    }

    await db.query("COMMIT");

    return res.status(200).json({ message: "Verificare cu succes" });
  } catch (err) {
    await db.query("ROLLBACK");
    return res.status(500).json({ message: err.message });
  } finally {
    db.release();
  }
}

export async function hasRejectedUserDocuments(req, res, next) {
  const db = await pool.connect();
  const user_id = req.user.id;
  const { id } = req.body;
  const date_now = new Date().toISOString();

  try {
    await db.query("BEGIN");
    const results = await db.query(
      "SELECT * FROM user_documents WHERE id = $1",
      [id],
    );

    if (results.rows.length === 0) {
      await db.query("ROLLBACK");
      return res.status(404).json({ message: "Nu exista utilizatori" });
    }

    const documents_id = results.rows[0].id;

    const update_verified = await db.query(
      "UPDATE user_documents SET is_verified = $1, verified_at = $2, verified_by = $3, verification_status = $4 WHERE id = $5 RETURNING *",
      [false, date_now, user_id, "Rejected", documents_id],
    );

    if (update_verified.rows.length === 0) {
      await db.query("ROLLBACK");
      return res.status(500).json({ message: "A intervenit o eroare" });
    }

    await db.query("COMMIT");

    return res.status(200).json({ message: "Ati respins documentele" });
  } catch (err) {
    await db.query("ROLLBACK");
    return res.status(500).json({ message: err.message });
  } finally {
    db.release();
  }
}

// async function getProfiles(req, res, next) {
//   const db = await pool.connect();
//   try {
//     const results = await db.query(
//       "SELECT wp.id, wp.full_name AS Nume, wp.phone AS telefon, u.email AS email, c.name AS calificare, wp.created_at AS data_inregistrare, wp.updated_at AS data_actualizare FROM users u JOIN worker_profiles wp ON u.id = wp.user_id JOIN worker_categories wc ON wp.id = wc.worker_profile_id JOIN categories c ON wc.category_id = c.id",
//     );


//     return res.status(200).json(results.rows);
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   } finally {
//     db.release();
//   }
// }

// export async function getProfilesUnverified(req, res, next) {
//   const db = await pool.connect();
//   try {
//     const results = await db.query(
//       "SELECT wp.id, wp.full_name AS Nume, wp.phone AS telefon, u.email AS email, c.name AS calificare, wp.created_at AS data_inregistrare, wp.updated_at AS data_actualizare, wp.is_verified AS verified, wp.is_approved AS approved FROM users u JOIN worker_profiles wp ON u.id = wp.user_id JOIN worker_categories wc ON wp.id = wc.worker_profile_id JOIN categories c ON wc.category_id = c.id WHERE wp.is_verified = $1 OR wp.is_approved = $2",
//       [false, false],
//     );

  
//     return res.status(200).json(results.rows);
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   } finally {
//     db.release();
//   }
// }

// export async function getProfilesVerified(req, res, next) {
//   const db = await pool.connect();
//   try {
//     const results = await db.query(
//       "SELECT wp.id, wp.full_name AS Nume, wp.phone AS telefon, u.email AS email, c.name AS calificare, wp.created_at AS data_inregistrare, wp.updated_at AS data_actualizare, wp.is_verified AS verified, wp.is_approved AS approved FROM users u JOIN worker_profiles wp ON u.id = wp.user_id JOIN worker_categories wc ON wp.id = wc.worker_profile_id JOIN categories c ON wc.category_id = c.id WHERE wp.is_verified = $1 OR wp.is_approved = $2",
//       [true, true],
//     );


//     return res.status(200).json(results.rows);
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   } finally {
//     db.release();
//   }
// }

export async function hasProfileApproved(req, res, next) {
  //=> Pending
  const db = await pool.connect();
  const user_id = req.user.id;
  const { id } = req.body;

  try {
    await db.query("BEGIN");

    const update_profile = await db.query(
      "UPDATE worker_profiles SET is_verified = $1, is_approved = $2 WHERE id = $3 RETURNING *",
      [true, true, id],
    );

    console.log(update_profile.rows);

    if (update_profile.rows.length === 0) {
      await db.query("ROLLBACK");
      return res.status(500).json({ message: "Operatiunea a esuat" });
    }

    await db.query("COMMIT");
    return res.status(200).json({ message: "Aprobare cu succes" });
  } catch (err) {
    await db.query("ROLLBACK");
    return res.status(500).json({ message: err.message });
  } finally {
    db.release();
  }
}

export async function hasProfileRejected(req, res, next) {
  // => Pending
  const db = await pool.connect();
  const user_id = req.user.id;
  const { id } = req.body;

  try {
    await db.query("BEGIN");

    const update_profile = await db.query(
      "UPDATE worker_profiles SET is_verified = $1, is_approved = $2 WHERE id = $3 RETURNING *",
      [false, false, id],
    );

    if (update_profile.rows.length === 0) {
      await db.query("ROLLBACK");
      return res.status(500).json({ message: "Operatiunea a esuat" });
    }

    await db.query("COMMIT");
    return res.status(200).json({ message: "Aprobare cu succes" });
  } catch (err) {
    await db.query("ROLLBACK");
    return res.status(500).json({ message: err.message });
  } finally {
    db.release();
  }
}

export async function deleteProfile(req, res) {
  const db = await pool.connect();
  const { id } = req.body;

  try {
    if (!id) {
      return res.status(400).json({
        message: "Id este necesar",
      });
    }

    const result = await db.query("DELETE FROM user_documents WHERE id = $1", [id]);

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
    const result = await db.query("SELECT * FROM users WHERE is_blocked = $1", [
      false,
    ]);
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
    const result = await db.query("SELECT * FROM users WHERE is_blocked = $1", [
      true,
    ]);
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

export async function hasBlockUser(req, res, next) {
  const db = await pool.connect();

  const user_id = req.user.id;

  const { id } = req.body;

  try {
    await db.query("BEGIN");

    const is_Blocked = await db.query(
      "UPDATE users SET is_blocked = $1 WHERE id = $2 RETURNING is_blocked",
      [true, id],
    );

    if (is_Blocked.rows.length === 0) {
      await db.query("ROLLBACK");
      return res.status(500).json({ message: "Operatiune esuata" });
    }

    await db.query("COMMIT");
    return res
      .status(201)
      .json({ message: "Ati blocat cu succes utilizatorul" });
  } catch (err) {
    await db.query("ROLLBACK");
    return res.status(500).json({ message: err.message });
  } finally {
    db.release();
  }
}

export async function hasUnblockUser(req, res, next) {
  const db = await pool.connect();

  const user_id = req.user.id;

  const { id } = req.body;

  try {
    await db.query("BEGIN");

    const is_Blocked = await db.query(
      "UPDATE users SET is_blocked = $1 WHERE id = $2 RETURNING is_blocked",
      [false, id],
    );

    if (is_Blocked.rows.length === 0) {
      await db.query("ROLLBACK");
      return res.status(500).json({ message: "Operatiune esuata" });
    }

    await db.query("COMMIT");
    return res
      .status(201)
      .json({ message: "Ati deblocat cu succes utilizatorul" });
  } catch (err) {
    await db.query("ROLLBACK");
    return res.status(500).json({ message: err.message });
  } finally {
    db.release();
  }
}

export async function getProfileByEmail(req, res, next) {
  const db = await pool.connect();

  const { email } = req.body;

  try {
    await verifiedEmail.validate(req.body);

    const results = await db.query(
      "SELECT ud.id, wp.full_name AS username, u.email, ud.ci_image_url AS CI, ud.ci_expiration_date AS CI_expiration, ud.verification_status AS status FROM users u JOIN worker_profiles wp ON u.id = wp.user_id JOIN user_documents ud ON u.id = ud.user_id WHERE u.email = $1",
      [email],
    );


    if (results.rows.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(results.rows);
  } catch (err) {
    if (err instanceof Yup.ValidationError)
      return res.status(500).json({ message: err.errors });
  }
}

export async function filterByExpiringCI(req, res, next) {
  const db = await pool.connect();

  try {
    const results = await db.query(
      "SELECT ud.id, wp.full_name AS username, u.email, ud.ci_image_url AS CI, ud.ci_expiration_date AS CI_expiration, ud.verification_status AS status FROM users u JOIN worker_profiles wp ON u.id = wp.user_id JOIN user_documents ud ON u.id = ud.user_id WHERE ud.ci_expiration_date >= CURRENT_DATE AND ud.ci_expiration_date <= CURRENT_DATE + INTERVAL '2 months'",
    );

    if (results.rows.length === 0) {
      return res.status(404).json({ message: "Nici un rezultat" });
    }

    return res.status(200).json(results.rows);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  } finally {
    db.release();
  }
}

export async function totalWorker(req, res, next) {
  const db = await pool.connect();

  try {
    const totalWorkers = await db.query("SELECT COUNT(*) FROM user_documents");
    if (totalWorkers.rows.length === 0)
      return res.status(500).json({ message: "Ceva nu a mers cum trebuie" });

    return res.status(200).json(totalWorkers.rows);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  } finally {
    db.release();
  }
}

export async function calculateProcentTotalWorkers(req, res, next) {
  const db = await pool.connect();

  const { initialValue } = req.body;

  try {
    const initial = Number(initialValue);

    if (!initial || initial <= 0) {
      return res.status(400).json({
        message: "Nu se poate calcula procentul",
      });
    }

    const currentValue = await db.query("SELECT COUNT(*) FROM user_documents");
    
    if (currentValue.rows.length === 0)
      return res.status(500).json({ message: "Ceva nu a mers cum trebuie" });

    const current = Number(currentValue.rows[0].count);

    const procent = ((current - initial) / initial) * 100;

    if (Number.isNaN(procent)) return res.status(500).json({ message: "NaN" });


   return res.status(200).json(procent);
  } 
  catch (err) {
    return res.status(500).json({ message: err.message });
  } finally {
    db.release();
  }
}


export async function totalWorkerApproved(req, res, next) {
  const db = await pool.connect();

  try {
    const approvedWorkers = await db.query("SELECT COUNT(*) FROM user_documents WHERE verification_status = $1", ["Success"]);
    if (approvedWorkers.rows.length === 0)
      return res.status(500).json({ message: "Ceva nu a mers cum trebuie" });

    return res.status(200).json(approvedWorkers.rows);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  } finally {
    db.release();
  }
}

export async function calculateProcentWorkersApproved(req, res, next) {
  const db = await pool.connect();

  const { initialValueApproved } = req.body;


  try {
    const initialApproved = Number(initialValueApproved);

    if (!initialApproved || initialApproved <= 0) {
      return res.status(400).json({
        message: "Nu se poate calcula procentul",
      });
    }

    const currentValue = await db.query("SELECT COUNT(*) FROM user_documents");
    

    const current = Number(currentValue.rows[0].count);

    console.log(current)

    const procent = current > 0 ? Math.floor((initialApproved / current) * 1000) / 10 : 0;

    console.log(procent)

    if (Number.isNaN(procent)) return res.status(500).json({ message: "NaN"});


    return res.status(200).json(procent);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  } finally {
    db.release();
  }
}

export async function totalWorkerRejected(req, res, next) {
  const db = await pool.connect();

  try {
    const rejectedWorkers = await db.query("SELECT COUNT(*) FROM user_documents WHERE verification_status = $1", ["Rejected"]);
    if (rejectedWorkers.rows.length === 0)
      return res.status(500).json({ message: "Ceva nu a mers cum trebuie" });

    return res.status(200).json(rejectedWorkers.rows);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  } finally {
    db.release();
  }
}

export async function calculateProcentWorkersRejected(req, res, next) {
  const db = await pool.connect();

  const { initialValueRejected } = req.body;

  try {
    const initialRejected = Number(initialValueRejected);

    if (!initialRejected  || initialRejected  <= 0) {
      return res.status(400).json({
        message: "Nu se poate calcula procentul",
      });
    }

    const currentValue = await db.query("SELECT COUNT(*) FROM user_documents");

    
    
    if (currentValue.rows.length === 0)
      return res.status(500).json({ message: "Ceva nu a mers cum trebuie" });

    const current = Number(currentValue.rows[0].count);

    console.log("Count dupa modificare " + current)

    const procent = current > 0 ? Math.floor((initialRejected / current) * 1000) / 10 : 0;

    if (Number.isNaN(procent)) return res.status(500).json({ message: "NaN" });


    return res.status(200).json(procent);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  } finally {
    db.release();
  }
}


export async function totalWorkersPending(req, res, next) {
  const db = await pool.connect();

  try {
    const pendingWorkers = await db.query("SELECT COUNT(*) FROM user_documents WHERE verification_status = $1", ["Pending"]);
    if (pendingWorkers.rows.length === 0)
      return res.status(500).json({ message: "Ceva nu a mers cum trebuie" });

    return res.status(200).json(pendingWorkers.rows);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  } finally {
    db.release();
  }
}

export async function calculateProcentWorkersPending(req, res, next) {
  const db = await pool.connect();

  const { initialValuePending } = req.body;

  try {
    const initialPending = Number(initialValuePending);

    if (!initialPending || initialPending <= 0) {
      return res.status(400).json({
        message: "Nu se poate calcula procentul",
      });
    }

    const currentValue = await db.query("SELECT COUNT(*) FROM user_documents");
    
    if (currentValue.rows.length === 0)
      return res.status(500).json({ message: "Ceva nu a mers cum trebuie" });

    const current = Number(currentValue.rows[0].count);

    const procent = current > 0 ? (initialPending / currentValue) * 100 : 0;

    if (Number.isNaN(procent)) return res.status(500).json({ message: "NaN" });


    return res.status(200).json(procent);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  } finally {
    db.release();
  }
}


export async function getStatistic(req, res, next)
{
  const db = await pool.connect();
  
  try{
    const statistic = await db.query("SELECT  TO_CHAR(wp.created_at, 'DD.MM.YYYY') AS date, COUNT(*) AS profiles FROM users u JOIN worker_profiles wp ON u.id = wp.user_id GROUP BY date ORDER BY date");
    
    if (statistic.rows.length === 0)
    {
      return res.status(500).json({message: "Eroare de server"})
    }

    return res.status(200).json(statistic.rows)
  }
  catch(err){
    return res.status(500).json({message: err.message})
  }
  finally{
    db.release()
  }
} 

