import { describe, it, expect, jest } from "@jest/globals";
import { userRepository } from "../src/repositories/userRepository.js";

// A minimal fake Prisma client so these are true unit tests with no database.
function fakeClient(userMethods: Record<string, unknown>) {
  return { user: userMethods } as any;
}

describe("userRepository", () => {
  it("findByEmail returns the matching user", async () => {
    const fake = fakeClient({
      findUnique: jest.fn().mockResolvedValue({ id: 1n, email: "ada@utd.edu", name: "Ada" }),
    });
    const user = await userRepository.findByEmail("ada@utd.edu", fake);
    expect(fake.user.findUnique).toHaveBeenCalledWith({ where: { email: "ada@utd.edu" } });
    expect(user?.email).toBe("ada@utd.edu");
  });

  it("findByEmail returns null when no user exists", async () => {
    const fake = fakeClient({ findUnique: jest.fn().mockResolvedValue(null) });
    const user = await userRepository.findByEmail("missing@utd.edu", fake);
    expect(user).toBeNull();
  });

  it("createUser forwards the new account to the data layer", async () => {
    const newUser = {
      name: "Grace",
      email: "grace@utd.edu",
      passwordHash: "hash",
      role: "student" as const,
    };
    const fake = fakeClient({
      create: jest.fn().mockResolvedValue({ id: 2n, ...newUser }),
    });
    const created = await userRepository.createUser(newUser, fake);
    expect(fake.user.create).toHaveBeenCalledWith({ data: newUser });
    expect(created.id).toBe(2n);
  });
});
