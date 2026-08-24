import express from "express";
import {
  adminCreateUser,
  approveUser,
  deleteUserAccount,
  disableUserAccount,
  editProfile,
  getAllUsers,
  getUserById,
  registerUser,
  updateAdminProfile,
  updateUserRole,
  userLogin,
  userLogout,
  userProfile,
} from "../controllers/user.controllers.ts";
import { checkAuth, isAdmin } from "../middlewares/userAuth.ts";

const router = express.Router();

// admin
router.get("/users", checkAuth, isAdmin, getAllUsers);
router.get("/users/:id", checkAuth, isAdmin, getUserById);
router.put("/users/:id/role", checkAuth, isAdmin, updateUserRole);
router.post("/users/add", checkAuth, isAdmin, adminCreateUser);
router.put("/admin/profile/update", checkAuth, isAdmin, updateAdminProfile);

router.put("/:id/approve", checkAuth, isAdmin, approveUser);
router.put("/:id/disable", checkAuth, isAdmin, disableUserAccount);
router.delete("/:id/delete", checkAuth, isAdmin, deleteUserAccount);

router.post("/register", registerUser);
router.post("/login", userLogin);
router.post("/logout", userLogout);

router.get("/me", checkAuth, userProfile);
router.put("/profile/update", checkAuth, editProfile);

export default router;
