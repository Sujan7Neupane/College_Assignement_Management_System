import {
  BookOpen,
  ClipboardList,
  Send,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router";

const HomePage = () => {
  return (
    <div>
      <section className="hero min-h-[70vh] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-primary/10">
                <BookOpen size={42} className="text-primary" />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold">
              Manage Assignments
              <span className="text-primary block">Without the Hassle</span>
            </h1>

            <p className="py-6 text-base-content/70 text-lg">
              CourseDesk makes it simple for teachers to create and manage
              assignments while students can submit, track, and review their
              work.
            </p>

            <Link to="/login" className="btn btn-primary btn-lg">
              Get Started
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Everything You Need</h2>

            <p className="text-base-content/60 mt-2">
              A simple workflow for teachers and students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card bg-base-100 border border-base-300 shadow-sm">
              <div className="card-body items-center text-center">
                <div className="p-4 rounded-full bg-primary/10">
                  <ClipboardList size={30} className="text-primary" />
                </div>

                <h3 className="card-title mt-2">Create Assignments</h3>

                <p className="text-base-content/60">
                  Teachers can easily create and manage assignments for their
                  students.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 border border-base-300 shadow-sm">
              <div className="card-body items-center text-center">
                <div className="p-4 rounded-full bg-primary/10">
                  <Send size={30} className="text-primary" />
                </div>

                <h3 className="card-title mt-2">Submit Work</h3>

                <p className="text-base-content/60">
                  Students can submit their assignments and keep track of their
                  submissions.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 border border-base-300 shadow-sm">
              <div className="card-body items-center text-center">
                <div className="p-4 rounded-full bg-primary/10">
                  <BarChart3 size={30} className="text-primary" />
                </div>

                <h3 className="card-title mt-2">Track Progress</h3>

                <p className="text-base-content/60">
                  Teachers can review submissions, provide feedback, and grade
                  student work.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
