import express from "express";
const app = express();
export default app;

import foldersRouter from "#api/folders";
import filesRouter from "#api/files";

app.use(express.json());

app.use("/files", filesRouter);
app.use("/folders", foldersRouter);
