import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { Board, Workspace } from '../../../lib/models';
import { workspaceApi } from './workspace-api';

export interface WorkspaceState {
  workspaces: Workspace[];
  boards: Board[];
  status: 'idle' | 'success' | 'failed';
  error: string | null | undefined;
}

const initialState: WorkspaceState = {
  workspaces: [] as Workspace[],
  boards: [] as Board[],
  status: 'idle',
  error: null,
};

export const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    getWorkspaces: (state) => {
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      workspaceApi.endpoints.getUserWorkspaces.matchFulfilled,
      (state, action) => {
        state.workspaces = action.payload;
      }
    );
  },
});

export const { getWorkspaces } = workspaceSlice.actions;

export const selectWorkspace = (state: RootState): WorkspaceState => state.workspace;
export const selectWorkspaceById = (state: RootState, wsId?: string): Workspace => {
  return state.workspace.workspaces.find((ws: Workspace) => ws._id === wsId);
};

export default workspaceSlice.reducer;
