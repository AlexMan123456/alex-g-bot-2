import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "generated/prisma/client";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 10000,
  max: 10,
});

const adapter = new PrismaPg(pool);
const database = new PrismaClient({ adapter, log: ["error", "warn"] });

export default database;
