"use client";

import ReactFlow, { Background, Controls, MarkerType } from "reactflow";
import "reactflow/dist/style.css";
import { motion } from "framer-motion";
import { Handle, Position } from "reactflow";
import Link from "next/link";

const nodes = [
  {
    id: "1",
    type: "custom",
    position: { x: 50, y: 200 },
    data: {
      label: "Video Recording",
      subLabel: "OBS Studio Output",
      icon: "📹",
    },
    sourcePosition: Position.Right,
  },
  {
    id: "2",
    type: "custom",
    position: { x: 350, y: 200 },
    data: {
      label: "File Detection",
      subLabel: "Automatic Processing",
      icon: "⚡",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "3",
    type: "custom",
    position: { x: 650, y: 100 },
    data: {
      label: "Audio Extraction",
      subLabel: "FFmpeg Processing",
      icon: "🎵",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "4",
    type: "custom",
    position: { x: 650, y: 300 },
    data: {
      label: "Video Storage",
      subLabel: "Local Database",
      icon: "💾",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "5",
    type: "custom",
    position: { x: 950, y: 100 },
    data: {
      label: "Transcription",
      subLabel: "Groq API",
      icon: "📝",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "6",
    type: "custom",
    position: { x: 1250, y: 200 },
    data: {
      label: "Final Output",
      subLabel: "Interactive UI",
      icon: "✨",
    },
    targetPosition: Position.Left,
  },
];

const edges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
    style: { stroke: "#ffffff", strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#ffffff",
    },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    animated: true,
    style: { stroke: "#ffffff" },
    markerEnd: { type: MarkerType.Arrow },
  },
  {
    id: "e2-4",
    source: "2",
    target: "4",
    animated: true,
    style: { stroke: "#ffffff" },
    markerEnd: { type: MarkerType.Arrow },
  },
  {
    id: "e3-5",
    source: "3",
    target: "5",
    animated: true,
    style: { stroke: "#ffffff" },
    markerEnd: { type: MarkerType.Arrow },
  },
  {
    id: "e4-6",
    source: "4",
    target: "6",
    animated: true,
    style: { stroke: "#ffffff" },
    markerEnd: { type: MarkerType.Arrow },
  },
  {
    id: "e5-6",
    source: "5",
    target: "6",
    animated: true,
    style: { stroke: "#ffffff" },
    markerEnd: { type: MarkerType.Arrow },
  },
];
const nodeTypes = {
  custom: CustomFlowNode,
};
export function CustomFlowNode({ data }) {
  return (
    <div className="backdrop-blur-sm bg-black/50 p-6 rounded-xl border border-white/10 shadow-2xl min-w-[200px]">
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-white w-3 h-3"
      />

      <div className="text-4xl mb-3">{data.icon}</div>
      <div className="text-white font-bold mb-1">{data.label}</div>
      <div className="text-white/60 text-sm">{data.subLabel}</div>

      <Handle
        type="source"
        position={Position.Right}
        className="!bg-white w-3 h-3"
      />
    </div>
  );
}
export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h1  className="text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/50 block text-transparent bg-clip-text">RECAP</h1>
          <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-white/50 inline-block text-transparent bg-clip-text">
            Your self hosted Video Processing Pipeline
          </h3>
          <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
            Automated video processing system that transforms your recordings
            into searchable, summarized content with zero effort.
          </p>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl shadow-2xl max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Quick Setup</h2>
            <div className="space-y-4 text-left">
              <div className="bg-white/5 p-4 rounded-lg font-mono text-sm">
                <p className="text-white/60 mb-2">
                  # Clone .env file and configure
                </p>
                <p>cp .example.env .env</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg font-mono text-sm">
                <p className="text-white/60 mb-2">
                  # Required environment variables
                </p>
                <p>
                  WATCH_PATH=
                  <span className="text-white/60">
                    "path/to/obs/recordings"
                  </span>
                </p>
                <p>
                  GROQ_API_KEY=
                  <span className="text-white/60">"your-api-key"</span>
                </p>
              </div>
            </div>
          </div>
          <div className="h-5"></div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/dashboard"
              className="inline-flex items-center px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-colors"
            >
              Open Dashboard
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        <div className="h-[600px] rounded-2xl border border-white/10 shadow-2xl overflow-hidden bg-black/50 backdrop-blur-sm">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
            minZoom={0.5}
            maxZoom={1.5}
          >
            <Background color="#ffffff" style={{ backgroundColor: "black" }} />
            <Controls className="bg-black/50 backdrop-blur-sm border border-white/10" />
          </ReactFlow>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 grid md:grid-cols-3 gap-8"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl shadow-2xl">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-2">Instant Processing</h3>
            <p className="text-white/60">
              Automatic detection and processing of new recordings as they
              appear
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl shadow-2xl">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold mb-2">AI Powered</h3>
            <p className="text-white/60">
              Advanced transcription and summarization using Groq's LLM
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl shadow-2xl">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-2">Precise Navigation</h3>
            <p className="text-white/60">
              Jump to any moment using time-stamped, searchable transcripts
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
