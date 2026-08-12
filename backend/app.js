import express from "express";
import "dotenv/config";

import userRouter from "./routes/user.routes.ts";

const app = express();
app.use(express.json());
const PORT = process.env.PORT;

app.use("/api/auth", userRouter);

app.get("/", (req, res) => {
  res.send("Welcome to college assignment management system");
});

app.listen(PORT, () => {
  console.log(`Server is running in ${PORT} port`);
});
