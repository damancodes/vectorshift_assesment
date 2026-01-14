import { type Edge, type Node } from "@xyflow/react";
export interface PipelineResult {
  num_nodes: number;
  num_edges: number;
  is_dag: boolean;
}

export const parsePipeline = async (
  nodes: Node[],
  edges: Edge[]
): Promise<PipelineResult> => {
  const response = await fetch("http://127.0.0.1:8000/pipelines/parse", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nodes, edges }),
  });

  if (!response.ok) {
    throw new Error(`Analysis failed: ${response.statusText}`);
  }

  return response.json();
};
