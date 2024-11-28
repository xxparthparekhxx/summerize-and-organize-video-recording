
# RECAP - Self-hosted Video Processing Pipeline

A powerful automated system that transforms your video recordings into searchable, summarized content with zero effort.

## Features

- ⚡ **Instant Processing**: Automatic detection and processing of new recordings
- 🤖 **AI Powered**: Advanced transcription and summarization using Groq's LLM
- 🎯 **Precise Navigation**: Time-stamped, searchable transcripts
- 📹 **OBS Studio Integration**: Direct processing of OBS recordings
- 🎵 **Audio Extraction**: Automated FFmpeg processing
- 💾 **Local Storage**: Secure database for video management
- ✨ **Interactive UI**: Modern, responsive dashboard interface

## Quick Setup

1. Clone the environment configuration file:

cp .example.env .env


2. Configure the required environment variables:

WATCH_PATH="path/to/obs/recordings"  # Directory path for OBS recordings
GROQ_API_KEY="your-api-key"         # Your Groq API key


## System Architecture

The application follows a streamlined processing pipeline:

1. Video Recording (OBS Studio Output)
2. File Detection (Automatic Processing)
3. Parallel Processing:
   - Audio Extraction (FFmpeg)
   - Video Storage (Local Database)
4. Transcription (Groq API)
5. Final Output (Interactive UI)

## Tech Stack

- Next.js for the frontend framework
- React Flow for pipeline visualization
- Framer Motion for animations
- Tailwind CSS for styling
- FFmpeg for audio processing
- Groq API for AI transcription

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Configure environment variables
4. Run the development server: `npm run dev`
5. Open the dashboard at `http://localhost:3000/dashboard`
