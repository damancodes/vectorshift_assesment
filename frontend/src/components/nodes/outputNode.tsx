
import { useState } from "react";
import { Position, type NodeProps } from "@xyflow/react"; // Removed Handle import
import { BaseNode } from "./BaseNode";

export const OutputNode = ({ id, data }: NodeProps) => {
  const [currName, setCurrName] = useState(
    (data?.outputName as string) || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState(
    (data.outputType as string) || "Text"
  );

  const handles = [
    { type: "target" as const, position: Position.Left, id: `${id}-value` },
  ];

  return (
    <BaseNode title="Output" handles={handles}>
      <div className="flex flex-col gap-2">
        <label className="flex flex-col gap-1 text-xs font-medium">
          Name:
          <input
            className="rounded border bg-background px-2 py-1"
            type="text"
            value={currName}
            onChange={(e) => {
              setCurrName(e.target.value);
            }}
          />
        </label>
        <label className="flex flex-col gap-1 text-xs font-medium">
          Type:
          <select
            className="rounded border bg-background px-2 py-1"
            value={outputType}
            onChange={(e) => {
              setOutputType(e.target.value);
            }}
          >
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
