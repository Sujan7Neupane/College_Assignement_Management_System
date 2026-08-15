import express from "express";
import { checkAuth, isTeacher } from "../middlewares/userAuth.ts";
import {
  createAssignment,
  deleteAssignment,
  getAllAssignments,
  getAssignmentById,
  updateAssignment,
} from "../controllers/assignement.controllers.ts";
import upload from "../middlewares/multer-middleware.ts";

const router = express.Router();

router.get("/all", checkAuth, getAllAssignments);
router.get("/:id", checkAuth, getAssignmentById);

router.post(
  "/add",
  checkAuth,
  isTeacher,
  upload.single("file"),
  createAssignment,
);

router.put(
  "/:id/update",
  checkAuth,
  isTeacher,
  upload.single("file"),
  updateAssignment,
);

router.delete("/:id/delete", checkAuth, isTeacher, deleteAssignment);

export default router;
