
import { useState } from "react";
import { Position, type NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";

export const TransformNode = ({ id }: NodeProps) => {
  const [transformType, setTransformType] = useState("uppercase");

  const handles = [
    { type: "target" as const, position: Position.Left, id: `${id}-input` },
    { type: "source" as const, position: Position.Right, id: `${id}-output` },
  ];

  return (
    <BaseNode title="Transform String" handles={handles}>
      <div className="flex flex-col gap-2">
        <label className="flex flex-col gap-1 text-xs font-medium">
          Type:
          <select
            className="rounded border bg-background px-2 py-1"
            value={transformType}
            onChange={(e) => setTransformType(e.target.value)}
          >
            <option value="uppercase">Uppercase</option>
            <option value="lowercase">Lowercase</option>
            <option value="capitalize">Capitalize</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
