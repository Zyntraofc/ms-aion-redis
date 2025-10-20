import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const {
    REDIS_HOST,
    REDIS_PORT,
    REDIS_PASSWORD,
    REDIS_USE_TLS,
} = process.env;

const redis = new Redis({
    host: REDIS_HOST,
    port: Number(REDIS_PORT),
    password: REDIS_PASSWORD,
    tls: REDIS_USE_TLS === "true" ? {} : undefined,
});

redis.on("connect", () => console.log("✅ Conectado ao Redis Aiven"));
redis.on("error", (err) => console.error("❌ Erro Redis:", err));

export default redis;
