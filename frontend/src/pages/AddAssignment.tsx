import { ArrowLeft, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useAddAssignmentMutation } from "../redux/slices/assignmentApiSlice";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import toast from "react-hot-toast";

type AssignmentInputs = {
  title: string;
  description: string;
  dueDate: string;
  file: FileList;
};

const AddAssignment = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AssignmentInputs>();

  const [addAssignment, { isLoading, isError }] = useAddAssignmentMutation();

  const handleAddAssignment = async (data: AssignmentInputs) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("dueDate", data.dueDate);
      formData.append("file", data.file[0]);

      const response = await addAssignment(formData).unwrap();

      toast.success(response.message);
      reset();
      navigate("/teacher/assignments");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to add assignment");
    }
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Message message="Failed to load add assignment" />
      ) : (
        <div className="py-6">
          <div className="mx-auto max-w-3xl">
            <Link
              to="/teacher/assignments"
              className="btn btn-ghost btn-sm mb-4"
            >
              <ArrowLeft size={16} />
              Back to Assignments
            </Link>

            <div className="card bg-base-100 border border-base-300 shadow-sm">
              <div className="card-body">
                <div className="mb-2">
                  <h1 className="text-3xl font-bold">Add New Assignment</h1>

                  <p className="mt-1 text-sm text-base-content/60">
                    Create a new assignment for your students.
                  </p>
                </div>

                <div className="divider" />

                {/* Add form here */}
                <form
                  onSubmit={handleSubmit(handleAddAssignment)}
                  className="space-y-5"
                >
                  <div>
                    <label className="label">
                      <span className="label-text font-medium ml-2 mb-2">
                        Assignment Title
                      </span>
                    </label>

                    <input
                      {...register("title", {
                        required: "Assignment title is required.",
                        minLength: {
                          value: 3,
                          message: "Title must be at least 3 characters.",
                        },
                        maxLength: {
                          value: 100,
                          message: "Title cannot exceed 100 characters.",
                        },
                      })}
                      type="text"
                      placeholder="Enter assignment title"
                      className="input input-bordered w-full"
                    />

                    {errors.title && (
                      <p className="text-red-500 text-sm mt-1 ml-2">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text font-medium ml-2 mb-2">
                        Description
                      </span>
                    </label>

                    <textarea
                      {...register("description", {
                        required: "Description is required.",
                        minLength: {
                          value: 10,
                          message:
                            "Description must be at least 10 characters.",
                        },
                        maxLength: {
                          value: 1000,
                          message: "Description cannot exceed 1000 characters.",
                        },
                      })}
                      placeholder="Enter assignment description"
                      rows={6}
                      className="textarea textarea-bordered w-full"
                    />

                    {errors.description && (
                      <p className="text-red-500 text-sm mt-1 ml-2">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text font-medium ml-2 mb-2">
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
                    />

                    {errors.dueDate && (
                      <p className="text-red-500 text-sm mt-1 ml-2">
                        {errors.dueDate.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text font-medium ml-2 mb-2">
                        Assignment File
                      </span>
                    </label>

                    <div className="rounded-lg border border-dashed border-base-300 p-6 text-center">
                      <Upload
                        size={28}
                        className="mx-auto mb-2 text-base-content/50"
                      />

                      <p className="text-sm font-medium">
                        Upload assignment file
                      </p>

                      <p className="mt-1 text-xs text-base-content/60">
                        Select the file you want students to download.
                      </p>

                      <input
                        {...register("file", {
                          required: "Please select an assignment file.",
                        })}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="file-input file-input-bordered mt-4 w-full"
                      />
                    </div>

                    {errors.file && (
                      <p className="text-red-500 text-sm mt-1 ml-2">
                        {errors.file.message}
                      </p>
                    )}
                  </div>

                  <div className="divider" />

                  <div className="flex justify-end gap-2">
                    <Link to="/teacher/assignments" className="btn btn-ghost">
                      Cancel
                    </Link>

                    <button
                      disabled={isLoading}
                      type="submit"
                      className="btn btn-primary"
                    >
                      {isLoading ? "Adding..." : "Add Assignment"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddAssignment;
