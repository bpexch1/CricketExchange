import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import bcrypt from "bcrypt";
import { z } from "zod";
import { storage } from "./storage";
import { insertUserSchema } from "@shared/schema";

declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

const amountSchema = z.object({
  amount: z.number().int().positive(),
});

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/register", async (req: Request, res: Response) => {
    const parsed = insertUserSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const { username, password } = parsed.data;

    const existing = await storage.getUserByUsername(username);
    if (existing) {
      return res.status(409).json({ message: "Username already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await storage.createUser({ username, password: hashedPassword });

    req.session.userId = user.id;
    return res.status(201).json({ id: user.id, username: user.username, balance: user.balance });
  });

  app.post("/api/login", async (req: Request, res: Response) => {
    const parsed = insertUserSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const { username, password } = parsed.data;

    const user = await storage.getUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    req.session.userId = user.id;
    return res.json({ id: user.id, username: user.username, balance: user.balance });
  });

  app.post("/api/logout", (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.clearCookie("connect.sid");
      return res.json({ message: "Logged out" });
    });
  });

  app.get("/api/user", async (req: Request, res: Response) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await storage.getUser(req.session.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    return res.json({ id: user.id, username: user.username, balance: user.balance });
  });

  app.post("/api/wallet/deposit", async (req: Request, res: Response) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const parsed = amountSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const user = await storage.getUser(req.session.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const newBalance = user.balance + parsed.data.amount;
    const updated = await storage.updateUserBalance(user.id, newBalance);
    await storage.createTransaction({
      userId: user.id,
      type: "deposit",
      amount: parsed.data.amount,
      balanceAfter: newBalance,
    });

    return res.json({ balance: updated!.balance });
  });

  app.post("/api/wallet/withdraw", async (req: Request, res: Response) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const parsed = amountSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const user = await storage.getUser(req.session.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (parsed.data.amount > user.balance) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    const newBalance = user.balance - parsed.data.amount;
    const updated = await storage.updateUserBalance(user.id, newBalance);
    await storage.createTransaction({
      userId: user.id,
      type: "withdrawal",
      amount: parsed.data.amount,
      balanceAfter: newBalance,
    });

    return res.json({ balance: updated!.balance });
  });

  app.get("/api/wallet/transactions", async (req: Request, res: Response) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const txns = await storage.getTransactionsByUser(req.session.userId);
    return res.json(txns);
  });

  const httpServer = createServer(app);
  return httpServer;
}
