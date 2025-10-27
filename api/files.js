import express from "express";
const router = express.Router();
export default router;

import { getFilesIncludingFolderName } from "../queries/files.js";

// uses the querey from the imported fuction to fetch an array of all files with names
router.route("/").get(async (req, res) => {
  const files = await getFilesIncludingFolderName();
  res.send(files);
});
