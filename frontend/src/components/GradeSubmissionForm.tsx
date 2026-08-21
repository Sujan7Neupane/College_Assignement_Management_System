import { useForm, type SubmitHandler } from "react-hook-form";
import { useGradeStudentAssignmentMutation } from "../redux/slices/submissionApiSlice";
import type { GradeSubmission } from "../types/submission.types";
import toast from "react-hot-toast";

interface GradeSubmissionFormProps {
  submissionId: number;
}

const GradeSubmissionForm = ({ submissionId }: GradeSubmissionFormProps) => {
  //   console.log(submissionId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GradeSubmission>();

  const [gradeStudentAssignment, { isLoading, isError }] =
    useGradeStudentAssignmentMutation();

  const handleGradeSubmit: SubmitHandler<GradeSubmission> = async (data) => {
    // console.log(data);

    try {
      const response = await gradeStudentAssignment({
        submissionId,
        data,
      }).unwrap();
      //   console.log(response);
      toast.success(response.message || "Assignment graded");
    } catch (error: any) {
      //   console.log(error);
      toast.error(error.message || "Faied to grade assignment");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleGradeSubmit)}>
        <h3 className="font-semibold">Grade Submission</h3>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label ml-2 mb-2">
              <span className="label-text">Grade</span>
            </label>

            <input
              {...register("grade", {
                required: "Grade is required.",
                valueAsNumber: true,
                min: {
                  value: 0,
                  message: "Grade cannot be less than 0.",
                },
                max: {
                  value: 100,
                  message: "Grade cannot be greater than 100.",
                },
              })}
              type="number"
              placeholder="Enter grade"
              className="input w-full"
            />

            {errors.grade && (
              <p className="mt-1 text-sm text-error">{errors.grade.message}</p>
            )}
          </div>

          <div>
            <label className="label">
              <span className="label-text ml-2 mb-2">Feedback</span>
            </label>

            <input
              {...register("feedback", {
                required: "Feedback is required.",
              })}
              type="text"
              placeholder="Enter feedback"
              className="input w-full"
            />

            {errors.feedback && (
              <p className="mt-1 text-sm text-error">
                {errors.feedback.message}
              </p>
            )}
          </div>
        </div>

        {isError && (
          <p className="mt-4 text-sm text-error">Failed to grade submission.</p>
        )}

        <button
          disabled={isLoading}
          type="submit"
          className="btn btn-primary mt-4"
        >
          {isLoading ? "Saving..." : "Submit Grade"}
        </button>
      </form>
    </div>
  );
};

export default GradeSubmissionForm;
