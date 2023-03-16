import React, { createContext, useState, useContext, useCallback } from 'react';

interface WorkspaceContextProps {
  children: React.ReactNode;
  wsId: string;
  boardId: string;
  openTaskDialog: (listId: string, taskId: string) => void;
}
export const WorkspaceContext = (createContext({}) as unknown) as React.Context<
  WorkspaceContextProps
>;

export const useWorkspaceContext = () => useContext(WorkspaceContext);

export const WorkspaceProvider = ({ children, ...ctxEvents }: WorkspaceContextProps) => {
  const ctxValue = {
    ...ctxEvents,
  } as WorkspaceContextProps;
  return (
    <WorkspaceContext.Provider value={ctxValue}>{children}</WorkspaceContext.Provider>
  );
};
