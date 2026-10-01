import { findUserByEmail, createUser, } from "@/app/lib/data/auth/auth";
import { registerSchema,  } from "@/app/lib/validation";

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    const validatedData =  await registerSchema.validate(body);

    const existingUser = await findUserByEmail(validatedData.email);

    if (existingUser) {
      return Response.json({ error: "Utilizatorul există deja" }, { status: 409 });
    }

    const user = await createUser(validatedData);

    

    return Response.json({ user }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    return Response.json({ error: "Înregistrarea a eșuat" }, { status: 500 });
  }
}


