import express from "express";
import { checkAuth, isStudent, isTeacher } from "../middlewares/userAuth.ts";
import upload from "../middlewares/multer-middleware.ts";
import {
  createSubmission,
  getAssignmentSubmissions,
  getMySubmissions,
  getSubmissionById,
  getTeacherSubmissions,
  gradeStudentAssignments,
} from "../controllers/submission.controllers.ts";

const router = express.Router();

// student submit
router.post(
  "/submit/assignment/:assignmentId",
  checkAuth,
  isStudent,
  upload.single("file"),
  createSubmission,
);

// for student get all assignment
router.get("/my", checkAuth, isStudent, getMySubmissions);

// for teacher -> all submissions per assignment
router.get("/teacher", checkAuth, isTeacher, getTeacherSubmissions);

// For individual assignment
router.get(
  "/assignment/:assignmentId",
  checkAuth,
  isTeacher,
  getAssignmentSubmissions,
);

// teacher grade the assignment
router.put(
  "/:submissionId/grade",
  checkAuth,
  isTeacher,
  gradeStudentAssignments,
);

// details about specific assignment
router.get("/:submissionId", checkAuth, isTeacher, getSubmissionById);

export default router;
