import { configDotenv } from "dotenv"

configDotenv()

 const _config={
    port:process.env.PORT|| 3000,
    mongo_url:process.env.MONGO_URL,
    env:process.env.NODE_ENV,
    jwtSecret:process.env.JWT_SECRET_KEY,
    jwtExpire:process.env.JWT_EXPIRE,
    authorEmail:process.env.NODE_MAILER_EMAIL,
    authorPassword:process.env.NODE_MAILER_PASSWORD,
    BACKEND_URL:process.env.BACKEND_URL
}

export const config=Object.freeze(_config)