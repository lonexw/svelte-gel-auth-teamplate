import { createClient } from 'gel';

export const client = createClient({
    tlsSecurity: process.env.NODE_ENV === "development" ? "insecure" : undefined,
})