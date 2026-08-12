import type { Request, Response } from "express";
import prisma from "../prisma/client.ts";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json({
      message: "Users fetched successfully!",
      users,
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message || "Internal server error",
    });
  }
};

const registerUser = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    res.status(500).json({
      error: error.message || "Internal server error",
    });
  }
};

export { getAllUsers, registerUser };
