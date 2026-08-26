import express from "express";
// import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRouter from "./routes/user.routes.ts";
import assignmentRouter from "./routes/assignment.routes.ts";
import submissionRouter from "./routes/submission.routes.ts";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.BASE_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", userRouter);
app.use("/api/assignments", assignmentRouter);
app.use("/api/submissions", submissionRouter);

app.get("/", (req, res) => {
  res.send("Welcome to college assignment management system");
});

app.listen(PORT, () => {
  console.log(`Server is running in ${PORT} port`);
});
