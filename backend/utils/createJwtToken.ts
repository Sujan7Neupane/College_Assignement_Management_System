import jwt from "jsonwebtoken";
import type { Response } from "express";

interface setTokenProps {
  id: number;
  role: string;
  res: Response;
}

export function setToken({ id, role, res }: setTokenProps) {
  //   console.log("env secret key: ", process.env.JWT_SECRET_KEY);
  const token = jwt.sign(
    {
      id,
      role,
    },
    process.env.JWT_SECRET_KEY!,
    {
      expiresIn: "1d",
    },
  );

  res.cookie("jwtToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
}

export const clearCookie = (res: Response) => {
  res.clearCookie("jwtToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "lax",
  });
};
