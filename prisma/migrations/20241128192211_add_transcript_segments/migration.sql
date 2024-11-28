/*
  Warnings:

  - You are about to alter the column `duration` on the `Recording` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- CreateTable
CREATE TABLE "TranscriptSegment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "recordingId" INTEGER NOT NULL,
    "startTime" REAL NOT NULL,
    "endTime" REAL NOT NULL,
    "text" TEXT NOT NULL,
    CONSTRAINT "TranscriptSegment_recordingId_fkey" FOREIGN KEY ("recordingId") REFERENCES "Recording" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Recording" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fileName" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "audioPath" TEXT,
    "recordedAt" DATETIME NOT NULL,
    "duration" REAL NOT NULL DEFAULT 0,
    "fileSize" INTEGER NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'English',
    "transcript" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Recording" ("audioPath", "createdAt", "duration", "fileName", "filePath", "fileSize", "id", "recordedAt", "status", "summary", "transcript", "updatedAt") SELECT "audioPath", "createdAt", "duration", "fileName", "filePath", "fileSize", "id", "recordedAt", "status", "summary", "transcript", "updatedAt" FROM "Recording";
DROP TABLE "Recording";
ALTER TABLE "new_Recording" RENAME TO "Recording";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
