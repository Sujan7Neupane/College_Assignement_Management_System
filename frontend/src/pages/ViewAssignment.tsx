import { Link, useNavigate, useParams } from "react-router";
import Spinner from "../components/Spinner";
import {
  useDeleteAssignmentMutation,
  useGetAssignmentByIdQuery,
  useUpdateAssignmentMutation,
} from "../redux/slices/assignmentApiSlice";
import Message from "../components/Message";
import { ArrowLeft, Download, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import Modal from "../components/Modal";
import { useState } from "react";
import { useForm } from "react-hook-form";

type UpdateInputs = {
  title: string;
  description: string;
  dueDate: string;
};

const ViewAssignment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const {
    data: assignments,
    isLoading,
    isError,
  } = useGetAssignmentByIdQuery(id!);

  const [deleteAssignment, { isLoading: isDeleteLoading }] =
    useDeleteAssignmentMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateInputs>();

  const [updateAssignment, { isLoading: isUpdateLoading }] =
    useUpdateAssignmentMutation();

  //   console.log(assignments);

  const handleDelete = async (id: number) => {
    try {
      const response = await deleteAssignment(id).unwrap();
      toast.success(response.message);

      navigate("/teacher/assignments");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete assignment");
    }
  };

  const handleUpdate = async (data: UpdateInputs) => {
    // console.log(data);
    reset();
    try {
      const response = await updateAssignment({
        id: assignments?.assignment.id,
        ...data,
      }).unwrap();
      // console.log(response);
      setShowUpdateModal(false);
      toast.success(response.message);
    } catch (error: any) {
      // console.log(error);
      toast.error(error.message || "Failed to update assignment.");
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || !assignments?.assignment) {
    return <Message message="Failed to load assignment." />;
  }

  return (
    <div className="py-6">
      <div className="mx-auto max-w-4xl">
        <Link to="/teacher/assignments" className="btn btn-ghost btn-sm mb-4">
          <ArrowLeft size={16} />
          Back to Assignments
        </Link>

        <div className="card bg-base-100 border border-base-300 shadow-sm">
          <div className="card-body">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold">
                  {assignments?.assignment.title}
                </h1>
                <p className="mt-2 text-sm text-base-content/60">
                  Assignment #{assignments?.assignment.id}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowUpdateModal(true)}
                  className="btn btn-primary btn-sm"
                >
                  <Pencil size={16} />
                  Update
                </button>

                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="btn btn-error btn-sm"
                >
                  <Trash2 size={16} />
                  {isDeleteLoading ? "Deleting..." : "Delete"}
                </button>

                {/* DELETE MODAL */}
                <Modal
                  open={showDeleteModal}
                  onClose={() => setShowDeleteModal(false)}
                  title="Delete Assignment"
                >
                  <p>Are you sure you want to delete this assignment?</p>

                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="btn btn-ghost"
                    >
                      Cancel
                    </button>

                    <button
                      disabled={isDeleteLoading}
                      onClick={() => handleDelete(assignments.assignment.id)}
                      className="btn btn-error"
                    >
                      {isDeleteLoading ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </Modal>
                {/* DELETE MODAL */}

                {/* Update Modal */}
                <Modal
                  open={showUpdateModal}
                  onClose={() => setShowUpdateModal(false)}
                  title="Update Assignment"
                >
                  <form
                    onSubmit={handleSubmit(handleUpdate)}
                    className="space-y-4"
                  >
                    <div>
                      <label className="label">
                        <span className="label-text font-medium mb-1 ml-2">
                          Title
                        </span>
                      </label>

                      <input
                        {...register("title", {
                          required: "Title is required.",
                          minLength: {
                            value: 3,
                            message: "Titl must be at least 3 characters.",
                          },
                          maxLength: {
                            value: 100,
                            message: "Title cannot exceed 100 characters.",
                          },
                        })}
                        type="text"
                        className="input input-bordered w-full"
                        defaultValue={assignments?.assignment.title}
                      />

                      {errors.title && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.title.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="label">
                        <span className="label-text font-medium mb-1 ml-2">
                          Description
                        </span>
                      </label>

                      <textarea
                        {...register("description", {
                          required: "Descrition is required.",
                          minLength: {
                            value: 10,
                            message:
                              "Description must be at least 10 characters.",
                          },
                          maxLength: {
                            value: 1000,
                            message:
                              "Description cannot exceed 1000 characters.",
                          },
                        })}
                        className="textarea textarea-bordered w-full"
                        rows={4}
                        defaultValue={assignments?.assignment.description}
                      />

                      {errors.description && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.description.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="label">
                        <span className="label-text font-medium mb-1 ml-2">
                          Due Date
                        </span>
                      </label>

                      <input
                        {...register("dueDate", {
                          required: "Due date is required.",
                          validate: (value) =>
                            new Date(value) > new Date() ||
                            "Due date must be in the future.",
                        })}
                        type="datetime-local"
                        className="input input-bordered w-full"
                        defaultValue={new Date(assignments.assignment.dueDate)
                          .toISOString()
                          .slice(0, 16)}
                      />

                      {errors.dueDate && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.dueDate.message}
                        </p>
                      )}
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowUpdateModal(false)}
                        className="btn btn-ghost"
                      >
                        Cancel
                      </button>

                      <button
                        disabled={isUpdateLoading}
                        type="submit"
                        className="btn btn-primary"
                      >
                        <Pencil size={16} />
                        {isUpdateLoading ? "Updating" : "Update"}
                      </button>
                    </div>
                  </form>
                </Modal>
                {/* Update Modal */}
              </div>
            </div>

            <div className="divider" />

            <div>
              <h2 className="text-lg font-semibold">Description</h2>

              <p className="mt-2 text-base-content/70">
                {assignments?.assignment.description}
              </p>
            </div>

            <div className="divider" />

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-sm text-base-content/60">Due Date</p>

                <p className="font-medium">
                  {new Date(assignments?.assignment.dueDate).toLocaleString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    },
                  )}
                </p>
              </div>

              <div>
                <p className="text-sm text-base-content/60">File Type</p>

                <p className="font-medium">
                  {assignments?.assignment.fileType}
                </p>
              </div>
              <div>
                <p className="text-sm text-base-content/60">Created</p>

                <p className="font-medium">
                  {new Date(
                    assignments?.assignment.createdAt,
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div>
                <p className="text-sm text-base-content/60">Last Updated</p>

                <p className="font-medium">
                  {new Date(
                    assignments?.assignment.updatedAt,
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Attachment */}
            <div className="divider" />

            <div>
              <h2 className="text-lg font-semibold">Attachment</h2>

              <div className="mt-3 flex items-center justify-between rounded-lg border border-base-300 p-4">
                <div>
                  <p className="font-medium">
                    {assignments?.assignment.fileName}
                  </p>
                  <p className="text-sm text-base-content/60">
                    {assignments?.assignment.fileType}
                  </p>
                </div>
                <a
                  href={assignments.assignment.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={assignments.assignment.fileName}
                  className="btn btn-outline btn-sm"
                >
                  <Download size={16} />
                  Download File
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAssignment;
