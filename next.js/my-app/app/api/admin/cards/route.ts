import { countWorkers } from "@/app/lib/data/admin/cards/cards";
import type { Count, Procent } from "@/app/lib/definitions";



export async function GET(): Promise<Response>{
    try{
        const total:Count = await countWorkers();
        return Response.json(total, { status: 200 })

    }
    catch(err){
        if (err instanceof Error) return Response.json({message: "Eroare server"}, {status: 500})
        
        return Response.json({ err: "Eroare server" }, { status: 500 })
    }
}



export async function POST(request: Request):Promise<Response>{
    try{
        const total: Count = await request.json()

        const procent: Procent  = {
            approve: total.total > 0 ? Math.floor((total.approve / total.total) * 1000) / 10 : 0,
            pending: total.total > 0 ? Math.floor((total.pending / total.total) * 1000) / 10 : 0,
            rejected: total.total > 0 ? Math.floor((total.rejected / total.total) * 1000) / 10 : 0,
        }

        return Response.json(procent, {status: 200})
    }
    catch (error){
        if (error instanceof Error) return Response.json({error: "Eroare server"}, {status: 500})
            return Response.json({ err: "Eroare server" }, { status: 500 })
    }
}








