import type { Table } from "@/app/lib/definitions";

import { getWorker } from "@/app/lib/data/admin/table/table";
import { jwtVerify } from "jose/jwt/verify";

export async function GET(request: Request): Promise<Response> {
  try {
    const auth = request.headers.get("authorization");

    if (!auth?.startsWith("Bearer ")) {
      return Response.json({ error: "Neautorizat" }, { status: 401 });
    }

    const token = auth.split(" ")[1];

    if (!process.env.JWT_SECRET)
      return Response.json({ error: "JWT invalid" }, { status: 401 });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const { payload } = await jwtVerify(token, secret);

    const role = payload.role;

    if (role !== "Admin")
      return Response.json(
        { error: "Nu poti face această acțiune" },
        { status: 403 },
      );

    const workers: Table = await getWorker();

    if (!workers)
      return Response.json({ error: "Nici un rezultat" }, { status: 404 });

    return Response.json(workers, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return Response.json("Eroare de server", { status: 500 });
    return Response.json("Eroare de serve", { status: 500 });
  }
}
