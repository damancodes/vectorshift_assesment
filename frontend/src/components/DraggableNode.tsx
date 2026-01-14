import { useCallback } from "react";

interface IDraggableNode {
  type: string;
  label: string;
}
export const DraggableNode = ({ type, label }: IDraggableNode) => {
  const onDragStart = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      (event.target as HTMLDivElement).style.cursor = "grabbing";
      event.dataTransfer.setData(
        "application/reactflow",
        JSON.stringify({ type })
      );
      event.dataTransfer.effectAllowed = "move";
    },
    [type]
  );

  return (
    <div
      className={type}
      onDragStart={onDragStart}
      onDragEnd={(event) =>
        ((event.target as HTMLDivElement).style.cursor = "grab")
      }
      style={{
        cursor: "grab",
        minWidth: "80px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        borderRadius: "8px",
        backgroundColor: "#1C2536",
        justifyContent: "center",
        flexDirection: "column",
      }}
      draggable
    >
      <span style={{ color: "#fff" }}>{label}</span>
    </div>
  );
};
