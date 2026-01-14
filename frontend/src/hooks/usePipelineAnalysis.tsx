// src/hooks/use-pipeline-analysis.ts
import { useState, useCallback } from "react";

import { parsePipeline, type PipelineResult } from "@/services/api";
import { toast } from "sonner";

import type { Edge, Node } from "@xyflow/react";
export const usePipelineAnalysis = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PipelineResult | null>(null);

  const analyze = useCallback(async (nodes: Node[], edges: Edge[]) => {
    setIsLoading(true);
    try {
      const data = await parsePipeline(nodes, edges);
      setResult(data);
    } catch {
      toast.error("Failed to analyze the pipeline.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = () => setResult(null);

  return { analyze, isLoading, result, reset };
};
