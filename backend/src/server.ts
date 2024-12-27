import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import videoRouter from "./routes/videoRouter";

dotenv.config();

const app: Application = express();
const PORT: number = 9000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use("/api/video", videoRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
