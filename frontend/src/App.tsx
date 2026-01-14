import { ReactFlowProvider } from "@xyflow/react";
import { PipelineToolbar } from "./components/ToolBar";
import WorkFlowUI from "./components/WorkFlowUI";
import "@xyflow/react/dist/style.css";
import Submit from "./components/Submit/Submit";
import { Toaster } from "./components/ui/sonner";

const App = () => {
  return (
    <div>
      <ReactFlowProvider>
        <Toaster />

        <PipelineToolbar />
        <WorkFlowUI />
        <Submit />
      </ReactFlowProvider>
    </div>
  );
};

export default App;
