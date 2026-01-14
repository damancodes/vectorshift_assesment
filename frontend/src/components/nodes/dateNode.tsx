import { useState } from "react";
import { Position, type NodeProps } from "@xyflow/react";
import { BaseNode } from "./BaseNode";

export const DateNode = ({ id }: NodeProps) => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handles = [
    { type: "source" as const, position: Position.Right, id: `${id}-date` },
  ];

  return (
    <BaseNode title="Date" handles={handles}>
      <div className="flex flex-col gap-2">
        <label className="flex flex-col gap-1 text-xs font-medium">
          Select Date:
          <input
            className="rounded border bg-background px-2 py-1"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
      </div>
    </BaseNode>
  );
};
