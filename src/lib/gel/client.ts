import { createClient, type ConnectOptions } from 'gel';

let options: ConnectOptions = {
    tlsSecurity: process.env.NODE_ENV === "development" ? "insecure" : 'insecure',
}

// 1. Connect to instance on Gel Cloud 
if (process.env.GEL_INSTANCE) {
    options = {
        instanceName: process.env.GEL_INSTANCE,
        secretKey: process.env.GEL_SECRET_KEY,
        ...options
    }
}

// 2. Connect through the credentialsFile
if (process.env.GEL_CREDENTIALS_FILE) {
    options = {
        credentialsFile: process.env.GEL_CREDENTIALS_FILE,
        ...options
    }
}

// 3. Connect through the DSN string.
if (process.env.GEL_DSN) {
    options = {
        dsn: process.env.GEL_DSN,
        // tls config
        ...options
    }
}

export const client = createClient(options)