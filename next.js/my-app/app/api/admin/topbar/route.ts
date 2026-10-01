import { getProfile } from "@/app/lib/data/admin/topbar/profile";
import { jwtVerify } from "jose/jwt/verify";

export async function POST(request: Request): Promise<Response | null> {
  try {
    const auth = request.headers.get("authorization");

    if (!auth?.startsWith("Bearer ")) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = auth.split(" ")[1];

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const id = payload.id;

    if (typeof id !== "string")
      return Response.json("Eroare de server", { status: 404 });

    const profile = await getProfile(id);

    if (!profile) {
      return null;
    }

    return Response.json(profile, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return Response.json("Profilul nu s-a incarcat", { status: 500 });
    return Response.json("Profilul nu s-a incarcat", { status: 500 });
  }
}
