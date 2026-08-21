import type { Request, Response } from "express";
import prisma from "../prisma/client.ts";
import { uploadOnCloudinary } from "../utils/cloudinary.ts";

const createSubmission = async (req: Request, res: Response) => {
  try {
    const { assignmentId } = req.params;
    const { id: studentId } = req.user;
    // console.log(studentId);

    // Student check
    const loggedInStudent = await prisma.user.findUnique({
      where: {
        id: Number(studentId),
      },
    });

    // console.log(loggedInStudent);

    if (!loggedInStudent) {
      return res.status(401).json({
        message: "Not authorized. Please login with your student email.",
      });
    }

    // Assignment check
    const assignment = await prisma.assignment.findUnique({
      where: {
        id: Number(assignmentId),
      },
    });
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    // deadline check
    if (new Date() > assignment.dueDate) {
      return res.status(400).json({
        message: "Submission deadline has passed.",
      });
    }

    // file required check
    if (!req.file) {
      return res.status(400).json({
        message: "Submission file is required",
      });
    }

    // Duplicate submission check
    const duplicateSubmissionCheck = await prisma.submission.findFirst({
      where: {
        studentId: Number(studentId),
        assignmentId: Number(assignmentId),
      },
    });
    if (duplicateSubmissionCheck) {
      return res.status(409).json({
        message: "You have already submitted this assignment",
      });
    }

    const uploadFile = await uploadOnCloudinary(req.file.path);
    if (!uploadFile) {
      return res.status(400).json({ message: "File upload failed." });
    }

    const submission = await prisma.submission.create({
      data: {
        studentId: Number(studentId),
        assignmentId: Number(assignmentId),
        fileUrl: uploadFile.secure_url,
        fileName: req?.file.originalname,
        fileType: req?.file.mimetype,
        filePublicId: uploadFile.public_id,
        status: "PENDING",
      },
    });

    return res
      .status(201)
      .json({ message: "Assignment submitted successfully!", submission });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message || "Internal server error",
    });
  }
};

const getMySubmissions = async (req: Request, res: Response) => {
  try {
    const { id: studentId } = req.user;

    const submissions = await prisma.submission.findMany({
      where: {
        studentId: Number(studentId),
      },
      include: {
        assignment: {
          select: {
            id: true,
            title: true,
            description: true,
            dueDate: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      message: "Submissions fetched successfully!",
      submissions,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message || "Internal server error",
    });
  }
};

const getAssignmentSubmissions = async (req: Request, res: Response) => {
  try {
    const { assignmentId } = req.params;
    const { id: teacherId } = req.user;

    // console.log(assignmentId);
    // console.log(teacherId);

    const assignment = await prisma.assignment.findFirst({
      where: {
        id: Number(assignmentId),
        teacherId: Number(teacherId),
      },
    });

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    const submissions = await prisma.submission.findMany({
      where: {
        assignmentId: Number(assignmentId),
      },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      message: "Assignment submissions fetched successfully!",
      submissions,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message || "Internal server error",
    });
  }
};

const getTeacherSubmissions = async (req: Request, res: Response) => {
  try {
    const { id: teacherId } = req.user;

    const submissions = await prisma.submission.findMany({
      where: {
        assignment: {
          teacherId: Number(teacherId),
        },
      },

      select: {
        id: true,
        assignmentId: true,
        status: true,
        grade: true,
        submittedAt: true,

        student: {
          select: {
            name: true,
            email: true,
          },
        },

        assignment: {
          select: {
            id: true,
            title: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      message: "Teacher submissions fetched successfully!",
      submissions,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message || "Internal server error",
    });
  }
};

const getSubmissionById = async (req: Request, res: Response) => {
  try {
    const { submissionId } = req.params;
    const { id: teacherId } = req.user;

    const submission = await prisma.submission.findFirst({
      where: {
        id: Number(submissionId),
        assignment: {
          teacherId: Number(teacherId),
        },
      },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        assignment: {
          select: {
            id: true,
            title: true,
            description: true,
            dueDate: true,
          },
        },
      },
    });

    if (!submission) {
      return res.status(404).json({
        message: "Submission not found",
      });
    }

    return res.status(200).json({
      message: "Submission fetched successfully!",
      submission,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message || "Internal server error",
    });
  }
};

const gradeStudentAssignments = async (req: Request, res: Response) => {
  try {
    const { id: teacherId } = req.user;
    // console.log("TeacherId:", teacherId);

    const { submissionId } = req.params;
    // console.log(submissionId);
    // console.log(typeof submissionId);
    // console.log(Number(submissionId));

    const { grade, feedback } = req.body;
    if (grade < 0 || grade > 100) {
      return res.status(400).json({
        message: "Grade must be between 0 and 100.",
      });
    }

    const loggedInTeacher = await prisma.user.findUnique({
      where: {
        id: Number(teacherId),
      },
    });
    if (!loggedInTeacher) {
      return res.status(404).json({
        message: "Please login and try again.",
      });
    }

    // console.log(loggedInTeacher);

    const existingSubmission = await prisma.submission.findUnique({
      where: {
        id: Number(submissionId),
      },
      include: {
        assignment: true,
      },
    });

    // console.log("Existing Submission", existingSubmission);

    if (
      !existingSubmission ||
      existingSubmission?.assignment?.teacherId !== Number(teacherId)
    ) {
      return res.status(404).json({
        message: "Assignment Submission not found or does not belong to you",
      });
    }

    // NOTE: THIS DID NOT STORES IN DB
    // existingSubmission.grade = grade ?? existingSubmission?.grade;
    // existingSubmission.feedback = feedback ?? existingSubmission?.feedback;
    // existingSubmission.status = "GRADED";

    const updatedSubmission = await prisma.submission.update({
      where: {
        id: existingSubmission.id,
      },
      data: {
        grade,
        feedback,
        status: "GRADED",
      },
      select: {
        id: true,
        grade: true,
        feedback: true,
        status: true,
        updatedAt: true,
      },
    });

    // console.log("updatedSubmission:", updatedSubmission);

    return res.json({
      message: "Assignment graded successfully!",
      updatedSubmission,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message || "Internal server error",
    });
  }
};

export {
  createSubmission,
  getMySubmissions,
  getAssignmentSubmissions,
  getSubmissionById,
  gradeStudentAssignments,
  getTeacherSubmissions,
};
