import express from "express";
import {
  getAllUsers,
  registerUser,
  userLogin,
  userLogout,
} from "../controllers/user.controllers.ts";

const router = express.Router();

// admin
router.get("/users", getAllUsers);

router.post("/register", registerUser);
router.post("/login", userLogin);
router.post("/logout", userLogout);

export default router;
