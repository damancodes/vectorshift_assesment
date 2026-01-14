
import { Position, type NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";

export const LogNode = ({ id }: NodeProps) => {
  const handles = [
    { type: "target" as const, position: Position.Left, id: `${id}-message` },
  ];

  return (
    <BaseNode title="Console Log" handles={handles}>
      <div className="flex flex-col gap-2">
        <span className="text-xs text-muted-foreground">
          Logs input to console
        </span>
      </div>
    </BaseNode>
  );
};
