import postgres from "postgres";


const sql = postgres(process.env.DATABASE_URL!, { ssl: "require" });
import type { Table } from "@/app/lib/definitions"




export async function getWorker():Promise<Table>
{
    const role = "Prestator"
    const result = await sql`SELECT ud.id, wp.full_name AS username, u.email, ud.ci_image_url AS ci_image, ud.ci_expiration_date AS ci_expiration_date, r.role_name AS calification, ud.verification_status AS status FROM users u JOIN worker_profiles wp ON u.id = wp.user_id JOIN user_documents ud ON u.id = ud.user_id JOIN user_roles ur ON u.id = ur.user_id JOIN roles r ON ur.role_id = r.id WHERE r.role_name =${role}`;

    const worker =result[0];
   
 
    return {
         id: worker.id, 
         username: worker.username,
         email: worker.email,
         ci_image: worker.ci_image,
         ci_expiration_date: worker.ci_expiration_date,
         calification: worker.calification,
         status: worker.status
    }
}
