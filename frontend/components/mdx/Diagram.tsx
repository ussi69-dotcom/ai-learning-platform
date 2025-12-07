"use client";

import React from 'react';
import DiagramHistory from './diagrams/DiagramHistory';
import DiagramTraining from './diagrams/DiagramTraining';
import DiagramConcepts from './diagrams/DiagramConcepts';
import DiagramPrompting from './diagrams/DiagramPrompting';
import DiagramUI from './diagrams/DiagramUI';
import DiagramEvaluation from './diagrams/DiagramEvaluation';

interface DiagramProps {
  type: 'neural-network' | 'training-loop' | 'black-box' | 'learning-types-overview' | 'supervised-learning-flow' | 'clustering-visualization' | 'reinforcement-learning-loop' | 'llm-next-token' | 'context-window' | 'tokenization-viz' | 'temperature-scale' | 'training-pipeline' | 'bias-in-data' | 'rag-architecture' | 'meeting-timeline' | 'ai-timeline' | 'few-shot-learning' | 'chain-of-thought' | 'dashboard-ui' | 'data-analysis-chart' | 'ai-history-timeline' | 'transformer-architecture-simplified' | 'prompt-structure-pyramid' | 'alignment-misalignment' | 'human-in-the-loop' | 'prompt-cheat-sheet' | 'traditional-vs-ml' | 'system-prompt-flow' | 'regression-matrix' | 'tradeoff-radar' | 'aim-framework' | 'map-framework' | 'prompt-stack';
}

export default function Diagram({ type }: DiagramProps) {
  // History & Timeline
  if (['traditional-vs-ml', 'ai-timeline', 'ai-history-timeline'].includes(type)) {
    return <DiagramHistory type={type} />;
  }

  // Training & Learning Processes
  if (['training-loop', 'training-pipeline'].includes(type)) {
    return <DiagramTraining type={type} />;
  }

  // Core Concepts & Architectures
  if (['tokenization-viz', 'llm-next-token', 'context-window', 'temperature-scale', 'bias-in-data', 'rag-architecture', 'black-box', 'transformer-architecture-simplified', 'alignment-misalignment', 'human-in-the-loop'].includes(type)) {
    return <DiagramConcepts type={type} />;
  }

  // Prompting & Interaction (UPDATED: added aim-framework, map-framework, prompt-stack)
  if (['few-shot-learning', 'chain-of-thought', 'prompt-structure-pyramid', 'prompt-cheat-sheet', 'system-prompt-flow', 'aim-framework', 'map-framework', 'prompt-stack'].includes(type)) {
    return <DiagramPrompting type={type} />;
  }

  // UI & Visualization
  if (['meeting-timeline', 'dashboard-ui', 'data-analysis-chart'].includes(type)) {
    return <DiagramUI type={type} />;
  }

  // Evaluation & Debugging
  if (['regression-matrix', 'tradeoff-radar'].includes(type)) {
    return <DiagramEvaluation type={type} />;
  }

  // Missing implementations (placeholder or null)
  return null;
}