import { PrismaClient } from "@prisma/client";
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');
  const status = searchParams.get('status');
  const tag = searchParams.get('tag');

  const recordings = await prisma.recording.findMany({
    where: {
      ...(date && {
        recordedAt: {
          gte: new Date(date),
          lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)),
        },
      }),
      ...(status && { status }),
      // Add tag filtering when we implement tags
    },
    include: {
      segments: true,
    },
    orderBy: {
      recordedAt: 'desc',
    },
  });

  return NextResponse.json({
    recordings: recordings.map(recording => ({
      id: recording.id,
      fileName: recording.fileName,
      recordedAt: recording.recordedAt,
      duration: recording.duration,
      status: recording.status,
      transcript: recording.transcript,
      summary: recording.summary,
      segments: recording.segments,
      language: recording.language,
      fileSize: recording.fileSize,
    }))
  });
}
