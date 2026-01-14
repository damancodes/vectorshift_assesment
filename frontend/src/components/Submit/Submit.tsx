// src/components/Submit.tsx
import { useEdges, useNodes } from "@xyflow/react";
import {
  Loader2,
  CheckCircle2,
  AlertCircle,
  Network,
  Share2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { usePipelineAnalysis } from "@/hooks/usePipelineAnalysis";

export const Submit = () => {
  const nodes = useNodes();
  const edges = useEdges();
  const { analyze, isLoading, result, reset } = usePipelineAnalysis();

  return (
    <>
      <Button
        onClick={() => analyze(nodes, edges)}
        disabled={isLoading}
        size="lg"
        className="fixed bottom-10 left-1/2 -translate-x-1/2 rounded-full px-8 shadow-xl transition-all active:scale-95"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
          </>
        ) : (
          "Run Analysis"
        )}
      </Button>

      <Dialog open={!!result} onOpenChange={reset}>
        <DialogContent className="sm:max-w-sm overflow-hidden border-none shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Analysis Results</DialogTitle>
            <DialogDescription>
              Structure summary for your workflow.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Minimal Stat Display */}
            <div className="flex gap-2">
              <StatItem
                icon={<Network />}
                label="Nodes"
                value={result?.num_nodes}
              />
              <StatItem
                icon={<Share2 />}
                label="Edges"
                value={result?.num_edges}
              />
            </div>

            {/* Visual Status Indicator */}
            <div
              className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed transition-colors ${
                result?.is_dag
                  ? "bg-green-50/50 border-green-100"
                  : "bg-red-50/50 border-red-100"
              }`}
            >
              {result?.is_dag ? (
                <CheckCircle2 className="h-10 w-10 text-green-600 mb-2" />
              ) : (
                <AlertCircle className="h-10 w-10 text-red-600 mb-2" />
              )}
              <h4
                className={`font-bold ${
                  result?.is_dag ? "text-green-700" : "text-red-700"
                }`}
              >
                {result?.is_dag ? "Valid DAG" : "Cyclic Detected"}
              </h4>
              <p className="text-xs text-center text-muted-foreground mt-1">
                {result?.is_dag
                  ? "Your pipeline is ready for execution."
                  : "Please remove cycles to ensure proper data flow."}
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={reset} className="w-full" variant="outline">
              Dismiss
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

/* --- Internal Helper Components --- */

const StatItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: number;
}) => (
  <Card className="flex-1 bg-muted/20 border-none shadow-none text-center p-3">
    <div className="flex justify-center text-muted-foreground scale-75 mb-1">
      {icon}
    </div>
    <div className="text-xl font-bold leading-none">{value ?? 0}</div>
    <div className="text-[10px] uppercase font-bold text-muted-foreground mt-1">
      {label}
    </div>
  </Card>
);

export default Submit;
