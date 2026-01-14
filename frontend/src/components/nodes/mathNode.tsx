
import { useState } from "react";
import { Position, type NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";

export const MathNode = ({ id }: NodeProps) => {
  const [operation, setOperation] = useState("add");

  const handles = [
    { type: "target" as const, position: Position.Left, id: `${id}-a`, style: { top: "33%" } },
    { type: "target" as const, position: Position.Left, id: `${id}-b`, style: { top: "66%" } },
    { type: "source" as const, position: Position.Right, id: `${id}-result` },
  ];

  return (
    <BaseNode title="Math" handles={handles}>
      <div className="flex flex-col gap-2">
        <label className="flex flex-col gap-1 text-xs font-medium">
          Operation:
          <select
            className="rounded border bg-background px-2 py-1"
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
          >
            <option value="add">Add</option>
            <option value="subtract">Subtract</option>
            <option value="multiply">Multiply</option>
            <option value="divide">Divide</option>
          </select>
        </label>
        <div className="text-xs text-muted-foreground">
          Input A & B on left
        </div>
      </div>
    </BaseNode>
  );
};
