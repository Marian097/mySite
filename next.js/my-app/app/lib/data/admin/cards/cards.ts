import postgres from "postgres";


const sql = postgres(process.env.DATABASE_URL!, { ssl: "require" });


export async function countWorkers(){

    const rejected = await sql`SELECT COUNT(*) FROM user_documents WHERE verification_status = 'Rejected';`
    const approve = await sql`SELECT COUNT(*) FROM user_documents WHERE verification_status = 'Success';`
    const pending = await sql`SELECT COUNT(*) FROM user_documents WHERE verification_status = 'Pending';`
    const total = await sql`SELECT COUNT(*) FROM user_documents;`;

    return {
        rejected: Number(rejected[0].count ?? 0),
        approve: Number(approve[0].count ?? 0),
        pending: Number(pending[0].count ?? 0),
        total: Number(total[0].count ?? 0)
    }
}






