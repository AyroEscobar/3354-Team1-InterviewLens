import { PrismaClient } from "@prisma/client";

// Single shared Prisma client for the whole API.
export const prisma = new PrismaClient();
