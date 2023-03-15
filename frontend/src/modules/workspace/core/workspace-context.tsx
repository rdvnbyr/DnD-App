import React, { createContext, useState, useContext, useCallback } from 'react';

interface WorkspaceContextProps {
  showTaskDialog: boolean;
  closeTaskDialog: () => void;
  openTaskDialog: (id: string) => void;
  wsId: string;
  boardId: string;
  taskId: string | undefined;
  children: React.ReactNode;
  ctxEvents: Partial<WorkspaceContextProps>;
}
export const WorkspaceContext = createContext({}) as unknown as React.Context<WorkspaceContextProps>;

export const useWorkspaceContext = () => useContext(WorkspaceContext);

export const WorkspaceProvider = ({ children, ctxEvents }: WorkspaceContextProps) => {
  const [taskId, setTaskId] = useState<string | undefined>();
  const [showTaskDialog, setShowTaskDialog] = useState<boolean>(false);

  const closeTaskDialog = useCallback(() => {
    setShowTaskDialog(false);
    setTaskId(undefined);
  }, []);
  const openTaskDialog = useCallback((id: string) => {
    setShowTaskDialog(true);
    setTaskId(id);
  }, []);

  const ctxValue = {
    taskId,
    showTaskDialog,
    closeTaskDialog,
    openTaskDialog,
    ...ctxEvents,
  } as WorkspaceContextProps;
  return (
    <WorkspaceContext.Provider value={ctxValue}>{children}</WorkspaceContext.Provider>
  );
};
