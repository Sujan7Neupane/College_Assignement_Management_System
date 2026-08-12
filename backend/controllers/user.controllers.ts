import type { Request, Response } from "express";
import prisma from "../prisma/client.ts";
import bcrypt from "bcrypt";

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
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({
        error: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "STUDENT",
        status: "ACTIVE",
      },
    });

    res.status(201).json({
      message: "User Registered successfully!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message || "Internal server error",
    });
  }
};

export { getAllUsers, registerUser };
