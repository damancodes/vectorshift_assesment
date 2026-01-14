import { create } from "zustand";
import { combine } from "zustand/middleware";

type StoreState = {
  nodeIDs: Record<string, number>;
};

type StoreActions = {
  getNodeID: (type: string) => string;
};

type WorkFlowStore = StoreState & StoreActions;

export const useWorkFlowStore = create<WorkFlowStore>()(
  combine<StoreState, StoreActions>(
    {
      nodeIDs: {},
    },
    (set, get) => ({
      getNodeID: (type: string) => {
        const newIDs = { ...get().nodeIDs };

        if (newIDs[type] === undefined) {
          newIDs[type] = 0;
        }

        newIDs[type] += 1;
        set({ nodeIDs: newIDs });

        return `${type}_${newIDs[type]}`;
      },
    })
  )
);
