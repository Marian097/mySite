import type { StaticImageData } from "next/image";

export type User = {
    name: string,
    email:string,
    password: string;
}


export type Count = {
    total: number,
    rejected: number,
    approve: number,
    pending: number;

}

export type Card = {
    titlu: string,
    total: number,
    image: StaticImageData,
    procent: number,
}


export type Procent = {
    approve: number,
    pending: number,
    rejected: number;
}

export type Profile = {
    username: string,
    role: string,
    image: StaticImageData;
}

export type Table = {
    id: string,
    username: string,
    email: string,
    ci_image: StaticImageData,
    ci_expiration_date: string,
    status: string, 
}