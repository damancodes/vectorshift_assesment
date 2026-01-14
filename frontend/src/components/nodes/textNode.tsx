import React, { useState, useRef } from "react";
import {
  Handle,
  Position,
  useReactFlow,
  useUpdateNodeInternals,
  type HandleProps,
  type NodeProps,
} from "@xyflow/react";
import { BaseNode } from "./BaseNode";

const VARIABLE_REGEX = /{{([a-zA-Z_$][a-zA-Z0-9_$]*)}}/g;
const getVariables = (val: string) =>
  Array.from(new Set([...val.matchAll(VARIABLE_REGEX)].map((m) => m[1])));

export const TextNode = ({ id, data }: NodeProps) => {
  const [text, setText] = useState((data?.text as string) || "{{input}}");

  const [variables, setVariables] = useState<string[]>(() =>
    getVariables(text)
  );

  const { setEdges, getNodes } = useReactFlow();
  const updateNodeInternals = useUpdateNodeInternals();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    //auto resizing
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }

    const nextVariables = getVariables(newText);
    setVariables(nextVariables);

    //required for reactflow
    requestAnimationFrame(() => updateNodeInternals(id));

    const allNodes = getNodes();

    setEdges((prevEdges) => {
      const remainingEdges = prevEdges.filter((edge) => {
        if (edge.target !== id) return true;
        return nextVariables.includes(edge.targetHandle || "");
      });

      const updatedEdges = [...remainingEdges];

      nextVariables.forEach((variable) => {
        const isAlreadyConnected = remainingEdges.some(
          (edge) => edge.target === id && edge.targetHandle === variable
        );

        if (!isAlreadyConnected) {
          const matchingInputNode = allNodes.find(
            (node) =>
              node.type === "customInput" && node.data?.name === variable
          );

          if (matchingInputNode) {
            updatedEdges.push({
              id: `auto-${matchingInputNode.id}-${id}-${variable}`,
              source: matchingInputNode.id,
              sourceHandle: `${matchingInputNode.id}-value`,
              target: id,
              targetHandle: variable,
            });
          }
        }
      });

      return updatedEdges;
    });
  };

  const sourceHandles: HandleProps[] = [
    { type: "source", position: Position.Right, id: `${id}-output` },
  ];

  return (
    <BaseNode handles={sourceHandles} className="h-auto" title={`Node: ${id}`}>
      <div className="flex flex-col gap-4 relative -left-3 mb-2">
        {variables.map((variable) => (
          <Handle
            key={variable}
            type="target"
            position={Position.Left}
            id={variable}
            style={{
              background: "oklch(0.488 0.243 264.376)",
              border: "2px solid white",
              position: "relative",
              top: "auto",
              transform: "none",
            }}
          >
            <div className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] font-bold  tracking-wider text-muted-foreground pointer-events-none">
              {variable}
            </div>
          </Handle>
        ))}
      </div>

      {/* Textarea Input */}
      <div className="flex flex-col gap-2 p-1">
        <label className="flex flex-col gap-1 text-xs font-semibold text-muted-foreground">
          Content
          <textarea
            ref={textareaRef}
            className="w-full max-w-50 resize-none overflow-hidden rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            rows={1}
            value={text}
            onChange={onTextChange}
            placeholder="Use {{variable}}..."
          />
        </label>
      </div>
    </BaseNode>
  );
};
