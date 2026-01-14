import { useCallback } from "react";
import {
  Position,
  type NodeProps,
  type Node,
  useReactFlow,
  type HandleProps,
  useUpdateNodeInternals,
} from "@xyflow/react";
import { BaseNode } from "./BaseNode";

type IInputNode = Node<Record<string, unknown>, "CustomInput">;

export const InputNode = (props: NodeProps<IInputNode>) => {
  const { id } = props;
  const inputVariableName = props.data.name as string;
  const updateNodeInternals = useUpdateNodeInternals();
  const { setNodes } = useReactFlow();
  const handleInputVariableChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      updateNodeInternals(id);
      setNodes((nodes) => {
        return nodes.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              data: {
                ...node.data,
                name: newValue,
              },
            };
          } else return node;
        });
      });
    },
    [updateNodeInternals, id, setNodes]
  );

  const handles: HandleProps[] = [
    { type: "source", position: Position.Right, id: `${id}-value` },
  ];

  return (
    <BaseNode title="Input" handles={handles}>
      <div className="flex flex-col gap-2">
        <label className="flex flex-col gap-1 text-xs font-medium">
          Name:
          <input
            className="rounded border bg-background px-2 py-1"
            type="text"
            value={inputVariableName}
            onChange={handleInputVariableChange}
          />
        </label>
      </div>
    </BaseNode>
  );
};
