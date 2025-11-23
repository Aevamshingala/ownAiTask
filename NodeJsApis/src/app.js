import express from "express";
import dotenv from "dotenv";
import { Connection } from "./db/connection.js";
import userRouter from "./routes/user.router.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("you are good to go"));

app.use("/api/v1/users", userRouter);


const PORT = process.env.PORT || 5000;
Connection.initialize()
  .then(() => {
    app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
  })
  .catch((err) => console.error("Database connection failed:", err));
