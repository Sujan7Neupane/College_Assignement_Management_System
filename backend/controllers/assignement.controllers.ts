import type { Request, Response } from "express";
import prisma from "../prisma/client.ts";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.ts";

const createAssignment = async (req: Request, res: Response) => {
  try {
    const { title, description, dueDate } = req.body;

    const assignmentDueDate = new Date(dueDate.trim());

    const { id: teacherId } = req.user;

    let uploadFile;
    // File is optional
    if (req.file) {
      const fileLocalPath = req.file.path;
      // console.log(fileLocalPath);

      uploadFile = await uploadOnCloudinary(fileLocalPath);

      // console.log(uploadFile);

      if (!uploadFile) {
        return res.status(400).json({
          message: "Failed to upload file.",
        });
      }
    }

    const assignment = await prisma.assignment.create({
      data: {
        title: title.trim(),
        description: description.trim(),
        dueDate: assignmentDueDate,

        fileUrl: uploadFile?.secure_url,
        fileName: req.file?.originalname,
        fileType: req.file?.mimetype,
        filePublicId: uploadFile?.public_id,

        teacherId,
      },
    });

    return res.status(201).json({
      message: "Assignment created successfully!",
      assignment,
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(409).json({
        message: "You already have an assignment with this title.",
      });
    }

    return res.status(500).json({
      message: "Failed to create assignment.",
    });
  }
};

const getTeachersAssignment = async (req: Request, res: Response) => {
  try {
    const { id: teacherId } = req.user;
    // console.log(teacherId);

    const assignments = await prisma.assignment.findMany({
      where: {
        teacherId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // console.log(assignments);

    if (!assignments) {
      return res.status(404).json({
        message: "Assignments not found.",
      });
    }

    return res.json({
      message: "Fetched teacher assignment successfully.",
      assignments,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Failed to fetch assignments.",
    });
  }
};

const getAllAssignments = async (req: Request, res: Response) => {
  try {
    const { id: studentId } = req.user;
    const assignments = await prisma.assignment.findMany({
      //adding teacher name and email like populate in mongodb
      include: {
        teacher: {
          select: {
            name: true,
            email: true,
          },
        },
        submissions: {
          where: {
            studentId,
          },
          select: {
            status: true,
          },
        },
      },
    });
    if (!assignments) {
      return res.status(404).json({
        message: "No assignments",
      });
    }

    res.json({ message: "All assignments fetched successfully", assignments });
  } catch (error: any) {
    res.status(500).json({
      error: error.message || "Internal server error",
    });
  }
};

const getAssignmentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { id: studentId } = req.user;

    const assignment = await prisma.assignment.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        teacher: {
          select: {
            name: true,
            email: true,
          },
        },
        submissions: {
          where: {
            studentId,
          },
        },
      },
    });

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    return res.status(200).json({
      message: "Assignment fetched successfully!",
      assignment,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message || "Internal server error",
    });
  }
};

const updateAssignment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate } = req.body;
    // console.log(title);
    const { id: teacherId } = req.user;
    // console.log(teacherId);

    const existingAssignment = await prisma.assignment.findFirst({
      where: {
        id: Number(id),
        teacherId,
      },
    });
    if (!existingAssignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    if (dueDate) {
      existingAssignment.dueDate = new Date(dueDate);
    }
    // TO delete the old file after dlete
    const oldFilePublicId = existingAssignment.filePublicId;
    if (req.file && oldFilePublicId) {
      await deleteFromCloudinary(oldFilePublicId);
    }

    // Upload new file if provided
    let uploadFile;

    if (req.file) {
      uploadFile = await uploadOnCloudinary(req.file.path);

      if (!uploadFile) {
        return res.status(400).json({
          message: "File upload failed",
        });
      }

      existingAssignment.fileName = req.file.originalname;
      existingAssignment.fileUrl = uploadFile.secure_url;
      existingAssignment.fileType = req.file.mimetype;

      existingAssignment.filePublicId = uploadFile.public_id;
    }

    existingAssignment.title = title?.trim() || existingAssignment.title;
    existingAssignment.description =
      description?.trim() || existingAssignment.description;

    const updatedAssignment = await prisma.assignment.update({
      where: {
        id: existingAssignment.id,
      },
      data: {
        title: existingAssignment.title,
        description: existingAssignment.description,
        dueDate: existingAssignment.dueDate,
        fileName: existingAssignment.fileName,
        fileUrl: existingAssignment.fileUrl,
        fileType: existingAssignment.fileType,
        filePublicId: existingAssignment.filePublicId,
      },
    });

    return res.status(200).json({
      message: "Assignment updated successfully!",
      assignment: updatedAssignment,
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(409).json({
        message: "You already have an assignment with this title.",
      });
    }

    return res.status(500).json({
      error: error.message || "Internal server error",
    });
  }
};

const deleteAssignment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // console.log(id);

    const { id: teacherId } = req.user;
    // console.log(teacherId);

    const assignment = await prisma.assignment.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found.",
      });
    }

    if (assignment.teacherId !== teacherId) {
      return res.status(403).json({
        message:
          "You cannot delete this assignment because it does not belong to you.",
      });
    }

    await prisma.assignment.delete({
      where: {
        id: assignment?.id,
      },
    });

    if (assignment.filePublicId) {
      await deleteFromCloudinary(assignment.filePublicId);
    }

    return res.json({
      message: "Assignment deleted successfully.",
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message || "Internal server error",
    });
  }
};

export {
  getAllAssignments,
  getTeachersAssignment,
  createAssignment,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
};
