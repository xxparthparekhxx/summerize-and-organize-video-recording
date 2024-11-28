import chokidar, { FSWatcher } from "chokidar";
import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";

import { spawn } from "child_process";
import { transcribeAudio } from "./transcription";
import { generateSummary } from "./summarization";
const prisma = new PrismaClient();

export class VideoWatcher {
  private watcher: FSWatcher;

  constructor(watchPath: string) {
    console.log("Starting watcher for directory:", watchPath);

    this.watcher = chokidar.watch(watchPath, {
      persistent: true,
      ignoreInitial: false,
      awaitWriteFinish: {
        stabilityThreshold: 2000,
        pollInterval: 100,
      },
    });

    // Add these event listeners
    this.watcher
      .on("ready", () => console.log("Initial scan complete"))
      .on("add", (path) => console.log(`File ${path} has been added`))
      .on("change", (path) => console.log(`File ${path} has been changed`))
      .on("unlink", (path) => console.log(`File ${path} has been removed`))
      .on("error", (error) => console.log(`Watcher error: ${error}`));

    this.setupEventHandlers();
  }

  private async extractAudio(videoPath: string): Promise<string> {
    const audioPath = videoPath.replace(/\.(mp4|mkv)$/, ".mp3");

    return new Promise((resolve, reject) => {
      const ffmpeg = spawn("ffmpeg", [
        "-i",
        videoPath,
        "-vn", // Disable video
        "-acodec",
        "libmp3lame",
        "-q:a",
        "4", // Quality setting
        audioPath,
      ]);

      ffmpeg.on("close", (code) => {
        if (code === 0) {
          console.log(`Audio extracted: ${audioPath}`);
          resolve(audioPath);
        } else {
          reject(new Error(`FFmpeg process exited with code ${code}`));
        }
      });
    });
  }

  private async processVideo(filePath: string) {
    console.log(`Processing started for: ${filePath}`);

    // Create initial record
    const recording = await prisma.recording.create({
      data: {
        fileName: path.basename(filePath),
        filePath: filePath,
        recordedAt: new Date(),
        fileSize: (await fs.promises.stat(filePath)).size,
        transcript: "",
        summary: "",
        duration: 0,
        status: "PROCESSING", // Add this status field to schema
      },
    });
    try {
      // Extract audio
      console.log("Extracting audio...");
      const audioPath = await this.extractAudio(filePath);

      // Get transcription
      console.log("Generating transcript...");
      const transcription = await transcribeAudio(audioPath);

      // Generate summary
      console.log("Generating summary...");
      const summary = await generateSummary(transcription.fullText);

      // Update record with results
      await prisma.recording.update({
        where: { id: recording.id },
        data: {
          audioPath,
          transcript: transcription.fullText,
          summary,
          status: "COMPLETED",
        },
      });

      console.log(`Processing completed for: ${filePath}`);
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error);
      await prisma.recording.update({
        where: { id: recording.id },
        data: { status: "ERROR" },
      });
    }
  }

  private setupEventHandlers() {
    this.watcher.on("add", async (filePath: string) => {
      if (
        path.extname(filePath).toLowerCase() === ".mp4" ||
        path.extname(filePath).toLowerCase() === ".mkv"
      ) {
        this.processVideo(filePath);
      }
    });
  }

  public stop() {
    this.watcher.close();
  }
}


