import express from "express";
import {
  approveUser,
  deleteUserAccount,
  disableUserAccount,
  editProfile,
  getAllUsers,
  registerUser,
  userLogin,
  userLogout,
  userProfile,
} from "../controllers/user.controllers.ts";
import { checkAuth, isAdmin } from "../middlewares/userAuth.ts";

const router = express.Router();

// admin
router.get("/users", checkAuth, isAdmin, getAllUsers);
router.put("/:id/approve", checkAuth, isAdmin, approveUser);
router.put("/:id/disable", checkAuth, isAdmin, disableUserAccount);
router.delete("/:id/delete", checkAuth, isAdmin, deleteUserAccount);

router.post("/register", registerUser);
router.post("/login", userLogin);
router.post("/logout", userLogout);

router.get("/me", checkAuth, userProfile);
router.put("/me", checkAuth, editProfile);

export default router;
