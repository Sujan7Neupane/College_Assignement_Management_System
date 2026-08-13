import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import prisma from "../prisma/client.ts";

interface JwtPayload {
  id: number;
  role: string;
}

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { jwtToken: token } = req.cookies;
  // console.log(token);

  if (!token) {
    return res.status(401).json({
      message: "Authentication required",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY!,
    ) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "User not found. Please login again.",
      });
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error: any) {
    res.json({ message: error.message });
  }
};

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { role } = req.user;

    if (role !== "ADMIN") {
      return res.status(403).json({ message: "Authorized access." });
    }

    next();
  } catch (error: any) {
    res.json({ message: error.message });
  }
};

export { checkAuth, isAdmin };
