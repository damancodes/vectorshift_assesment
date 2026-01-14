import { Handle, type HandleProps } from "@xyflow/react";
import type { ReactNode } from "react";

import {
  BaseNode as BaseNodeUI,
  BaseNodeContent,
  BaseNodeHeader,
  BaseNodeHeaderTitle,
} from "../base-node";

interface BaseNodeProps {
  id?: string;
  title: string;
  children?: ReactNode;
  handles?: HandleProps[];
  className?: string
}

export const BaseNode = ({
  title,
  children,
  handles = [],
  className,
  ...props
}: BaseNodeProps) => {
  return (
    <BaseNodeUI className={className} {...props}>
      <BaseNodeHeader className="border-b border-muted">
        <BaseNodeHeaderTitle>{title}</BaseNodeHeaderTitle>
      </BaseNodeHeader>
      <BaseNodeContent>{children}</BaseNodeContent>

      {handles.map((handle) => (
        <Handle key={handle.id} {...handle} />
      ))}
    </BaseNodeUI>
  );
};
