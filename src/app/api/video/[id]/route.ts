import { NextResponse } from 'next/server';
import { createReadStream, statSync } from 'fs';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const recording = await prisma.recording.findUnique({
    where: { id: parseInt(params.id) }
  });

  if (!recording) {
    return new NextResponse('Not found', { status: 404 });
  }

  const stat = statSync(recording.filePath);
  const fileSize = stat.size;
  const range = request.headers.get('range');

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = (end - start) + 1;
    const stream = createReadStream(recording.filePath, { start, end });
    
    return new NextResponse(stream as any, {
      status: 206,
      headers: {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize.toString(),
        'Content-Type': 'video/mp4',
      },
    });
  }

  const stream = createReadStream(recording.filePath);
  return new NextResponse(stream as any, {
    headers: {
      'Content-Length': fileSize.toString(),
      'Content-Type': 'video/mp4',
    },
  });
}
