import express from "express";
import { config } from "dotenv";
import userRouter from "./routes";

config();

const app = express();

app.use(express.json());

const router = userRouter();

app.use("/", router);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is running on ${PORT} port!`));
