import db from "#db/client";

import { createFile } from "#queries/files";
import { createFolder } from "#queries/folders";

await db.connect(); // open DB connection for the whole script
await seed(); // run seeding logic (below)
await db.end(); // close the DB connection
console.log("🌱 Database seeded.");

async function seed() {
  for (let i = 1; i <= 3; i++) {
    const folder = await createFolder("Folder " + i); // Creates a folder name that is named after the numbered loop that it's on
    for (let j = 1; j <= 5; j++) {
      await createFile("File " + j, 1000 * j, folder.id); // The parentheses includes the table columns that are being generated (fileName, size, folder_id)
    }
  }
}
