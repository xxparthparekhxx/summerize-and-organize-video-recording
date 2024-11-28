"use client";

import { useRecordings } from "@/hooks/useRecordings";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { RecordingDetail } from "./RecordingDetail";

export function RecordingsGrid() {
  const { data, isLoading } = useRecordings();
  const [selectedRecording, setSelectedRecording] = useState(null);

  if (isLoading) {
    return <div>Loading recordings...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {data?.recordings?.map((recording) => (
        <Card
          key={recording.id}
          onClick={() => setSelectedRecording(recording)}
        >
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="truncate">{recording.fileName}</span>
              <Badge
                variant={
                  recording.status === "COMPLETED" ? "default" : "secondary"
                }
              >
                {recording.status}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Duration:</span>
                <span>
                  {Math.floor(recording.duration / 60)}m{" "}
                  {Math.floor(recording.duration % 60)}s
                </span>
              </div>
              <div className="flex justify-between">
                <span>Recorded:</span>
                <span>{new Date(recording.recordedAt).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Size:</span>
                <span>
                  {(recording.fileSize / (1024 * 1024)).toFixed(2)} MB
                </span>
              </div>
              {recording.summary && (
                <div className="mt-4">
                  <p className="text-muted-foreground line-clamp-3">
                    {recording.summary}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex gap-2">
              <Badge variant="outline">{recording.language}</Badge>
              {recording.segments && (
                <Badge variant="outline">
                  {recording.segments.length} segments
                </Badge>
              )}
            </div>
          </CardFooter>
        </Card>
      ))}
      {selectedRecording && (
        <RecordingDetail
          recording={selectedRecording}
          open={!!selectedRecording}
          onOpenChange={(open) => !open && setSelectedRecording(null)}
        />
      )}
    </div>
  );
}
