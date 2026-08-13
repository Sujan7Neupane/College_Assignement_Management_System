import type { Request, Response } from "express";
import prisma from "../prisma/client.ts";
import bcrypt from "bcrypt";
import { clearCookie, setToken } from "../utils/createJwtToken.ts";

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
      },
    });

    const token = setToken({
      id: user.id,
      role: user.role,
      res,
    });

    // console.log(token);

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

const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // console.log(email);

    const loggedInUser = await prisma.user.findUnique({ where: { email } });
    // console.log(loggedInUser);

    if (!loggedInUser)
      return res.status(404).json({ message: "Invalid email or password" });

    const isPasswordMatching = await bcrypt.compare(
      password,
      loggedInUser.password,
    );

    // console.log(isPasswordMatching);

    if (!isPasswordMatching) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    if (loggedInUser.status === "PENDING") {
      return res.status(403).json({
        message: "Your account is waiting for admin approval",
      });
    }

    if (loggedInUser.status === "DISABLED") {
      return res.status(403).json({
        message:
          "Your account has been disabled. Please contact administrator.",
      });
    }

    setToken({ id: loggedInUser.id, role: loggedInUser.role, res });

    res.json({
      message: "User logged in successfully!",
      user: {
        id: loggedInUser.id,
        name: loggedInUser.name,
        email: loggedInUser.email,
        role: loggedInUser.role,
        status: loggedInUser.status,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message || "Internal server error",
    });
  }
};

const userLogout = async (req: Request, res: Response) => {
  try {
    clearCookie(res);

    res.status(200).json({
      message: "User logged out successfully.",
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message || "Internal server error",
    });
  }
};

export { getAllUsers, registerUser, userLogin, userLogout };
