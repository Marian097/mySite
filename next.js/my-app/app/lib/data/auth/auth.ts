import postgres from "postgres";
import argon2 from "argon2"

const sql = postgres(process.env.DATABASE_URL!, { ssl: "require" });


import type { User } from "@/app/lib/definitions";

export async function findUserByEmail(email: string) {
  const user = await sql<User[]>`SELECT * FROM users WHERE email = ${email}`;

  return user[0] ?? null;
}


export async function createUser(data: User) {

  const password_hash = await argon2.hash(data.password)
  
  const users =
    await sql`INSERT INTO users (name, email, password_hash) VALUES (${data.name}, ${data.email}, ${password_hash}) returning id, name, email`;

  return users[0];
}


export async function findPasswordByEmail(email: string) {
  const data = await sql`
    SELECT u.id, u.password_hash, r.role_name as role
    FROM users u JOIN user_roles ur ON u.id = ur.user_id JOIN roles r ON ur.role_id = r.id 
    WHERE email = ${email}
  `;

  return data[0] ?? null;
}

export async function loginUser(password_hash: string, password:string){
  
  const verifyPassword = await argon2.verify(password_hash, password);
  
  return verifyPassword;
}




