import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { _classNames, _formatDate } from '../lib/utils';
import {
  useCreateBoardMutation,
  useCreateWorkspaceMutation,
  useDeleteWorkspaceMutation,
  useGetUserWorkspacesQuery,
} from '../modules/workspace/core/workspace-api';
import { Input } from '../components/partials/controls/FormControl';
import { useState } from 'react';
import { useAppSelector } from '../app/hooks';
import { selectAuth } from '../modules/auth/core/auth-slice';
import { Board } from '../lib/models';
import { toast, ToastContainer } from 'react-toastify';

const plusIcon = <i className="bi bi-asterisk"></i>;

export const Dashboard = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showBoardForm, setShowBoardForm] = useState<boolean>(false);
  const { user } = useAppSelector(selectAuth);

  const { data, refetch } = useGetUserWorkspacesQuery(user.id);

  const [createWorkspace, { isLoading }] = useCreateWorkspaceMutation();
  const [deleteWorkspace] = useDeleteWorkspaceMutation();
  const [createBoard] = useCreateBoardMutation();

  const createBoardHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = (e.target as HTMLFormElement).dnd_create_board.value;
    const wsId = (e.target as HTMLFormElement).dnd_create_board_ws_id.value;
    const board: Omit<Board, '_id'> = {
      name: name,
      workspaceId: wsId,
      lists: [],
      members: [
        {
          userId: user.id,
        },
      ],
      owner: user.id,
    };

    createBoard(board)
      .unwrap()
      .then(() => {
        toast.success('Board created successfully');
        refetch();
      })
      .catch((err) => {
        toast.error(err?.data?.message || 'Something went wrong');
      });
    setShowBoardForm(false);
  };

  const createWorkspaceHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = (e.target as HTMLFormElement).dnd_create_workspace.value;
    createWorkspace({
      name,
      boards: [],
      owner: user.id,
    })
      .unwrap()
      .then(() => refetch());
    setShowForm(false);
  };

  const deleteWorkspaceHandler = async (id: string) => {
    await deleteWorkspace(id);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <aside className="col-sm-3">
          <div className="d-flex flex-column">
            <Link to="/dashboard" className="btn btn-secondary my-2">
              Boards
            </Link>
            <div className="border-top border-1 border-secondary my-2"></div>
            <button className="btn btn-outline-secondary btn-sm mt-2" onClick={() => setShowBoardForm((prev) => !prev)}>
              <i className="bi bi-asterisk"></i> Create Board
            </button>
            {showBoardForm && (
              <form onSubmit={createBoardHandler}>
                <div className="my-2">
                  <Input
                    type="text"
                    id="dnd_create_board"
                    placeholder="Enter board name"
                    ref={(input) => input && input.focus()}
                  />
                </div>
                <div className="my-2">
                  <select className="form-select" id="dnd_create_board_ws_id">
                    <option value="0" style={{ display: 'none' }}>
                      Select workspace
                    </option>
                    {data?.map((ws) => (
                      <option key={`opt-${ws._id}`} value={ws._id}>
                        {ws.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                  {...{
                    disabled: isLoading,
                  }}
                >
                  Create Board
                </button>
              </form>
            )}
            <button className="btn btn-outline-secondary btn-sm mt-2" onClick={() => setShowForm((prev) => !prev)}>
              {plusIcon} Create Workspace
            </button>
            {showForm && (
              <form onSubmit={createWorkspaceHandler}>
                <div className="my-2">
                  <Input
                    type="text"
                    id="dnd_create_workspace"
                    placeholder="Please enter name"
                    ref={(input) => input && input.focus()}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                  {...{
                    disabled: isLoading,
                  }}
                >
                  Create
                </button>
              </form>
            )}
            <h5 className="text-muted mt-3">Workspaces</h5>
            <ul className="list-group list-group-flush">
              {
                <>
                  {data &&
                    data.length > 0 &&
                    data.map((workspace) => (
                      <li key={workspace._id} className="list-group-item list-group-item-action my-1 border-0 p-0">
                        <button
                          className="btn d-flex justify-content-between align-items-center w-100 px-1 py-2"
                          onClick={() => {
                            document.querySelector(`#workspace-actions-${workspace._id}`)?.classList.toggle('d-none');
                          }}
                        >
                          <span className="fw-semibold text-dark">{workspace.name}</span>
                          <span className="fw-semibold text-dark">
                            {<i className="bi bi-chevron-compact-down"></i>}
                          </span>
                        </button>
                        <ul id={`workspace-actions-${workspace._id}`} className="list-group list-group-flush d-none">
                          {/* some action buttons */}
                          <li className="list-group-item list-group-item-action">
                            <Link to={`/ws/${workspace._id}`} className="btn btn-sm btn-outline-secondary w-100 my-1">
                              {plusIcon} Boards
                            </Link>
                            <button
                              className="btn btn-sm btn-outline-danger w-100 my-1"
                              onClick={() => deleteWorkspaceHandler(workspace._id)}
                            >
                              {plusIcon} Delete
                            </button>
                          </li>
                        </ul>
                      </li>
                    ))}
                </>
              }
            </ul>
          </div>
        </aside>
        <main className="col-sm-9">
          <div className="d-flex flex-column flex-wrap">
            {data &&
              data.length > 0 &&
              data.map(
                (workspace) =>
                  workspace.boards &&
                  workspace.boards.length > 0 && (
                    <div className="w-100 mb-5" key={workspace._id}>
                      <div className="row">
                        <h3 className="col-12 text-muted">{workspace.name}</h3>
                        {workspace.boards.map((board) => (
                          <StyledLink
                            key={board._id}
                            className="col-sm-4 gx-3 gy-2"
                            to={`/ws/${workspace._id}/b/${board._id}`}
                          >
                            <div className={_classNames('card', 'bg-dark', 'text-white')}>
                              <div className="card-body">
                                <h5 className="card-title">{board.name}</h5>
                                <p className="card-text">{board.description}</p>
                                <p className="text-white m-0 fs-6 fst-italic">
                                  Created: {_formatDate(board.createdAt as string)}
                                </p>
                              </div>
                            </div>
                          </StyledLink>
                        ))}
                      </div>
                    </div>
                  )
              )}
          </div>
          <ToastContainer />
        </main>
      </div>
    </div>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
  transition: 0.2s ease-in-out;
  :hover {
    text-decoration: none;
    scale: 1.03;
    transition: 0.2s ease-in-out;
  }
`;
