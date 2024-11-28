'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export function RecordingDetail({ recording, open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>{recording.fileName}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
          {/* Video Player */}
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            <video src={`/api/video/${recording.id}`} controls className="w-full h-full" />
          </div>
          
          {/* Transcript Segments */}
          <ScrollArea className="h-[500px]">
            <div className="space-y-2">
              {recording.segments.map((segment, index) => (
                <div 
                  key={index}
                  className="p-2 hover:bg-accent rounded-md cursor-pointer"
                  onClick={() => {
                    const video = document.querySelector('video');
                    if (video) video.currentTime = segment.startTime;
                  }}
                >
                  <div className="text-xs text-muted-foreground">
                    {new Date(segment.startTime * 1000).toISOString().substr(11, 8)}
                  </div>
                  <p>{segment.text}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
