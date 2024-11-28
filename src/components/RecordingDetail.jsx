'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function RecordingDetail({ recording, open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl h-[90vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">{recording.fileName}</DialogTitle>
            <Badge variant={recording.status === 'COMPLETED' ? 'success' : 'secondary'}>
              {recording.status}
            </Badge>
          </div>
          <div className="flex gap-2 text-sm text-muted-foreground">
            <span>{new Date(recording.recordedAt).toLocaleString()}</span>
            <span>•</span>
            <span>{Math.floor(recording.duration / 60)}m {Math.floor(recording.duration % 60)}s</span>
            <span>•</span>
            <span>{(recording.fileSize / (1024 * 1024)).toFixed(2)} MB</span>
          </div>
        </DialogHeader>

        <Tabs defaultValue="video" className="h-full">
          <TabsList>
            <TabsTrigger value="video">Video & Transcript</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="metadata">Metadata</TabsTrigger>
          </TabsList>

          <TabsContent value="video" className="h-[calc(100%-2rem)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <video 
                  src={`/api/video/${recording.id}`}
                  controls 
                  className="w-full h-full"
                />
              </div>
              
              <ScrollArea className="h-[500px] rounded-md border">
                <div className="space-y-2 p-4">
                  {recording.segments.map((segment, index) => (
                    <div 
                      key={index}
                      className="p-3 hover:bg-accent rounded-md cursor-pointer transition-colors"
                      onClick={() => {
                        const video = document.querySelector('video');
                        if (video) video.currentTime = segment.startTime;
                      }}
                    >
                      <div className="text-xs font-mono text-muted-foreground">
                        {new Date(segment.startTime * 1000).toISOString().substr(11, 8)} → 
                        {new Date(segment.endTime * 1000).toISOString().substr(11, 8)}
                      </div>
                      <p className="mt-1">{segment.text}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="summary">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">AI Generated Summary</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">{recording.summary}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metadata">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Recording Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">File Name</span>
                        <span>{recording.fileName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Language</span>
                        <span>{recording.language}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration</span>
                        <span>{Math.floor(recording.duration / 60)}m {Math.floor(recording.duration % 60)}s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">File Size</span>
                        <span>{(recording.fileSize / (1024 * 1024)).toFixed(2)} MB</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Transcript Info</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Segments</span>
                        <span>{recording.segments.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Word Count</span>
                        <span>{recording.transcript.split(' ').length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
