import type { PrismaClient, User } from "@prisma/client";
import { prisma } from "../db.js";

export interface NewUser {
  name: string;
  email: string;
  passwordHash: string;
  role: "student" | "admin";
}

// Data-layer access for the users table. The controller calls these
// functions; it never touches Prisma directly. The client argument lets
// tests inject a fake client, which keeps the unit tests database-free.
export const userRepository = {
  // Look up a single user by email (used for login and duplicate checks, FR-1).
  async findByEmail(
    email: string,
    client: PrismaClient = prisma,
  ): Promise<User | null> {
    return client.user.findUnique({ where: { email } });
  },

  // Create a new account. The password must already be hashed (NFR-5).
  async createUser(data: NewUser, client: PrismaClient = prisma): Promise<User> {
    return client.user.create({ data });
  },
};
