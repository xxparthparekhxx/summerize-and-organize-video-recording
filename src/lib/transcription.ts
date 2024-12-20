import fetch from 'node-fetch';
import FormData from 'form-data';
import fs from 'fs';

interface TranscriptionResponse {
  task: string;
  language: string;
  duration: number;
  text: string;
  segments: {
    id: number;
    seek: number;
    start: number;
    end: number;
    text: string;
    tokens: number[];
    temperature: number;
    avg_logprob: number;
    compression_ratio: number;
    no_speech_prob: number;
  }[];
  x_groq: {
    id: string;
  };
}

export async function transcribeAudio(audioPath: string) {
  const form = new FormData();
  form.append('model', 'whisper-large-v3');
  form.append('file', fs.createReadStream(audioPath));
  form.append('response_format', 'verbose_json');

  const response = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: form
  });

  const result = await response.json() as TranscriptionResponse;
  
  return {
    fullText: result.text,
    duration: result.duration,
    language: result.language,
    segments: result.segments.map(seg => ({
      start: seg.start,
      end: seg.end,
      text: seg.text
    }))
  };
}
