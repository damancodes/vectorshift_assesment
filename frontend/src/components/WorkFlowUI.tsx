import {
  addEdge,
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
  type Connection,
  type Node,
  type Edge,
} from "@xyflow/react";

import { useWorkFlowStore } from "./../store";
import { useCallback, useRef } from "react";
import { InputNode } from "./nodes/inputNode";
import { LLMNode } from "./nodes/llmNode";
import { OutputNode } from "./nodes/outputNode";
import { TextNode } from "./nodes/textNode";

import { DateNode } from "./nodes/dateNode";
import { MathNode } from "./nodes/mathNode";
import { LogNode } from "./nodes/logNode";
import { TransformNode } from "./nodes/transformNode";
import { ColorNode } from "./nodes/colorNode";

const CustomNodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  date: DateNode,
  math: MathNode,
  log: LogNode,
  transform: TransformNode,
  color: ColorNode,
};

export default function WorkFlowUI() {
  const { getNodeID } = useWorkFlowStore();
  const [nodes, setNodes, onNodesChange] = useNodesState([] as Node[]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([] as Edge[]);

  const onConnect = useCallback(
    (connection: Connection) =>
      setEdges((edgesSnapshot) => addEdge(connection, edgesSnapshot)),
    [setEdges]
  );

  const reactFlowWrapper = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;
  const { screenToFlowPosition } = useReactFlow();
  const getInitNodeData = (nodeID: string, type: string) => {
    return { id: nodeID, nodeType: `${type}` };
  };

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);
  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData("application/reactflow")) {
        const appData = JSON.parse(
          event.dataTransfer.getData("application/reactflow")
        );

        const { type }: { type: string } = appData;

        // check if the dropped element is valid
        if (typeof type === "undefined" || !type) {
          return;
        }

        const position = screenToFlowPosition({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);

        const newNode: Node = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };
        if (type === "customInput") {
          newNode.data = { ...newNode.data, name: newNode.data.id };
        }
        setNodes((a) => {
          return [...a, newNode];
        });
      }
    },
    [getNodeID, screenToFlowPosition, setNodes]
  );

  return (
    <div ref={reactFlowWrapper} className="w-full h-[70vh]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={CustomNodeTypes}
        fitView
      >
        <Background color="#aaa" gap={20} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
