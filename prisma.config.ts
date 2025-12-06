import type { PrismaConfig } from "prisma";
import { env } from "prisma/config";
import dotenv from "dotenv";

dotenv.config();

const prismaConfig: PrismaConfig = {
  datasource: {
    url: env("DATABASE_URL"),
  },
};

export default prismaConfig;
