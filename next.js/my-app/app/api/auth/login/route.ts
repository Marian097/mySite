import {findPasswordByEmail, loginUser } from "@/app/lib/data/auth/auth";
import { loginSchema } from "@/app/lib/validation";

import jwt from "jsonwebtoken";

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    const validatedData =  await loginSchema.validate(body);

    const passwordRow = await findPasswordByEmail(validatedData.email);

    if (!passwordRow) {
      return Response.json({ error: "Email sau parolă incorectă" }, { status: 404 });
    }

    const password_hash = passwordRow.password ?? passwordRow["password"];

    const verifyPassword = await loginUser(password_hash, validatedData.password);

    if (!verifyPassword) throw new Error("Email sau parolă incorectă");

    const user = {
      email: validatedData.email
    }

     if (!process.env.JWT_SECRET) {
          throw new Error("JWT_SECRET lipsește din variabilele de mediu");
        }
    
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "15m" });

    
    return Response.json({ token }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    return Response.json({ error: "Înregistrarea a eșuat" }, { status: 500 });
  }
}


