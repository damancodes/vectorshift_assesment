
import { useState } from "react";
import { Position, type NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";

export const ColorNode = ({ id }: NodeProps) => {
  const [color, setColor] = useState("#000000");

  const handles = [
    { type: "source" as const, position: Position.Right, id: `${id}-color` },
  ];

  return (
    <BaseNode title="Color Picker" handles={handles}>
      <div className="flex flex-col gap-2">
        <label className="flex flex-col gap-1 text-xs font-medium">
          Pick Color:
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="h-8 w-16 cursor-pointer rounded border p-0"
            />
            <span className="text-xs">{color}</span>
          </div>
        </label>
      </div>
    </BaseNode>
  );
};
