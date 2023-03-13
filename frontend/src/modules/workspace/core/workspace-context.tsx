import React, { createContext } from 'react';

interface WorkspaceContextProps {
  wsId?: string;
  boardId?: string;
  children?: React.ReactNode;
  ctxEvents?: Partial<WorkspaceContextProps>;
}
export const WorkspaceContext = createContext({}) as React.Context<WorkspaceContextProps>;

export const WorkspaceProvider = ({ children, ctxEvents }: WorkspaceContextProps) => {
  const ctxValue: WorkspaceContextProps = {
    ...ctxEvents,
  };
  return (
    <WorkspaceContext.Provider value={ctxValue}>{children}</WorkspaceContext.Provider>
  );
};
