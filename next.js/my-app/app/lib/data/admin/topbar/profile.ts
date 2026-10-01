import postgres from "postgres";
const sql = postgres(process.env.DATABASE_URL!, { ssl: "require" });
import type { Profile } from "@/app/lib/definitions";

export async function getProfile(id: string): Promise<Profile | null> {
  const profile =
    await sql`SELECT u.name AS username, r.role_name AS role, ap.ci_image_url AS profile_image FROM users u JOIN user_roles ur ON u.id = ur.user_id JOIN roles r ON r.id = ur.role_id JOIN admin_profiles ap ON u.id = ap.user_id WHERE u.
  id = ${id}`;

  const row = profile[0];

  if (!row){
    return null
  }

  
  return {
    username: row.username,
    role: row.role,
    image: row.profile_image,
  };
}
