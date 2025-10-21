import express from "express";
const router = express.Router();
export default router;

import { createFile } from "./queries/files";
import { getFolderByIdIncludingFiles, getFolders } from "./queries/folders";

router.route("/").get(async (req, res) => {
  const folders = await getFolders();
  res.send(folders);
});

// This middleware runs for any route that contains ':id'. It fetches the folder by ID with the files in that folder, then checks if the folder requested exists in the DB but returns the error message if it does not exist. The next(); function is used to pass the route to the next matching middleware
router.param("id", async (req, res, next, id) => {
  const folder = await getFolderByIdIncludingFiles(id);
  if (!folder) return res.status(404).send("Folder not found");

  // This expression stashes the folder inside the request so that future middleware handlers can use the folder that was pulled
  req.folder = folder;
  next();
});

// This route will send the folder that was pulled with the param router above
router.route("/:id").get(async (req, res) => {
  res.send(req.folder);
});

//
router.route("/:id/files").post(async (req, res) => {
  if (!req.body) return res.status(400).send("Request body is required.");

  const { name, size } = req.body;
  if (!name || !size)
    return res.status(400).send("Request body requires: name, size");

  const file = await createFile(name, size, req.folder.id);
  res.status(201).send(file);
});
