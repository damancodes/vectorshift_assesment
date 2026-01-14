
import { Position, type NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";

export const LLMNode = ({ id }: NodeProps) => {
  const handles = [
    {
      type: "target" as const,
      position: Position.Left,
      id: `${id}-system`,
      style: { top: `${100 / 3}%` },
    },
    {
      type: "target" as const,
      position: Position.Left,
      id: `${id}-prompt`,
      style: { top: `${200 / 3}%` },
    },
    {
      type: "source" as const,
      position: Position.Right,
      id: `${id}-response`,
    },
  ];

  return (
    <BaseNode title="LLM" handles={handles}>
      <div className="flex flex-col gap-2">
        <span className="text-sm">This is a LLM.</span>
      </div>
    </BaseNode>
  );
};
