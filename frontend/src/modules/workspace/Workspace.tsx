//# https://codesandbox.io/examples/package/react-beautiful-dnd
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { WorkspaceLayout } from '../../components/layout/WorkspaceLayout';
import { WorkspaceProvider } from './core/workspace-context';
import { Boards } from './components/Boards';
import { Suspense } from 'react';
import { GridLoader } from 'react-spinners';
import { useAppSelector } from '../../app/hooks';
import { selectWorkspaceById } from './core/workspace-slice';
import { SidebarMenuItems } from '../../lib/models';

export const Workspace = () => {
  const navigate = useNavigate();
  const { wsId, boardId } = useParams<{ wsId: string; boardId: string }>();
  const workspace = useAppSelector((state) => selectWorkspaceById(state, wsId));
  const menuItems: SidebarMenuItems[] = workspace
    ? workspace?.boards.map((board) => ({
        label: board.name,
        path: `/ws/${wsId}/b/${board._id}`,
        icon: 'icon',
        id: board._id.toString() as string,
      }))
    : [];

  return (
    <Suspense fallback={<GridLoader color="#36d7b7" />}>
      <WorkspaceProvider
        wsId={wsId as string}
        boardId={boardId as string}
        openTaskDialog={(listId: string, taskId: string) =>
          navigate(`/ws/${wsId}/b/${boardId}/t/${taskId}`, {
            state: { showTaskDialog: true, listId },
          })
        }
      >
        <WorkspaceLayout menuItems={menuItems}>
          {!boardId && <Boards />}
          {boardId && <Outlet context={[wsId, boardId]} />}
        </WorkspaceLayout>
      </WorkspaceProvider>
    </Suspense>
  );
};
