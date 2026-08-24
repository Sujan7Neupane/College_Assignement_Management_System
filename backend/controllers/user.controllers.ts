import type { Request, Response } from "express";
import prisma from "../prisma/client.ts";
import bcrypt from "bcrypt";
import { clearCookie, setToken } from "../utils/createJwtToken.ts";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
      },
    });
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

const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch user",
    });
  }
};

const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    // console.log(role);

    if (!role) {
      return res.status(400).json({
        message: "Role is required",
      });
    }

    if (!["STUDENT", "TEACHER", "ADMIN"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });
    // console.log(updatedUser);

    res.json({
      message: "User role updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update user role",
    });
  }
};

const adminCreateUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        status: "ACTIVE",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create user",
    });
  }
};

const updateAdminProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    // console.log(req.user);

    // console.log(id);

    const { name, email, currentPassword, newPassword } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // no change password = old password
    let password = user.password;

    if (newPassword) {
      const isPasswordCorrect = await bcrypt.compare(
        currentPassword,
        user.password,
      );

      // console.log(isPasswordCorrect);

      if (!isPasswordCorrect) {
        return res.status(401).json({
          message: "Current password is incorrect",
        });
      }

      // change password =new password
      password = await bcrypt.hash(newPassword, 10);
    }

    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        password,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
      },
    });

    // console.log(updatedUser);

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to update profile",
    });
  }
};

const approveUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existingUser = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingUser) {
      return res.status(404).json({
        message: "User doesn't exist!",
      });
    }

    const approveUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        status: "ACTIVE",
      },
    });

    return res.status(200).json({
      message: "User approved successfully!",
      user: {
        id: approveUser.id,
        name: approveUser.name,
        role: approveUser.role,
        status: approveUser.status,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message || "Failed to approve user.",
    });
  }
};

const disableUserAccount = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existingUser = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingUser)
      return res.status(404).json({
        message: "User doesn't exists!",
      });

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        status: "DISABLED",
      },
    });

    return res.status(200).json({
      message: "User disabled successfully!",
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        role: updatedUser.role,
        status: updatedUser.status,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message || "Failed to disable user's account.",
    });
  }
};

const deleteUserAccount = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existingUser = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!existingUser)
      return res.status(404).json({
        message: "User doesn't exists!",
      });

    await prisma.user.delete({
      where: { id: Number(id) },
    });

    return res.json({
      message: "User deleted successfully!",
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message || "Failed to delete user.",
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
      return res
        .status(404)
        .json({ message: "No user found. Please Register." });

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

const userProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;

    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    res.json({
      message: "Fetched current logged in user",
      user: {
        id: user?.id,
        name: user?.name,
        email: user?.email,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message || "Internal server error",
    });
  }
};

const editProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const { name, email } = req.body;

    // console.log(name);

    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // user.name = name;
    // user.email = email;

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name,
        email,
      },
    });

    res.json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        status: updatedUser.status,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message || "Internal server error",
    });
  }
};

export {
  getAllUsers,
  getUserById,
  updateUserRole,
  adminCreateUser,
  updateAdminProfile,
  approveUser,
  disableUserAccount,
  deleteUserAccount,
  registerUser,
  userLogin,
  userLogout,
  userProfile,
  editProfile,
};
