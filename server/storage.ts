import { eq, desc } from "drizzle-orm";
import { db } from "./db";
import { users, transactions } from "@shared/schema";
import { type User, type InsertUser, type Transaction, type InsertTransaction } from "@shared/schema";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserBalance(id: string, newBalance: number): Promise<User | undefined>;
  createTransaction(tx: InsertTransaction): Promise<Transaction>;
  getTransactionsByUser(userId: string): Promise<Transaction[]>;
}

export class DbStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async updateUserBalance(id: string, newBalance: number): Promise<User | undefined> {
    const result = await db.update(users).set({ balance: newBalance }).where(eq(users.id, id)).returning();
    return result[0];
  }

  async createTransaction(tx: InsertTransaction): Promise<Transaction> {
    const result = await db.insert(transactions).values(tx).returning();
    return result[0];
  }

  async getTransactionsByUser(userId: string): Promise<Transaction[]> {
    return db
      .select()
      .from(transactions)
      .where(eq(transactions.userId, userId))
      .orderBy(desc(transactions.createdAt));
  }
}

export const storage = new DbStorage();
