import { useEffect, Suspense, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useOutletContext } from 'react-router-dom';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import {
  useCreateBoardListMutation,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useGetBoardByIdQuery,
  useUpdateBoardListMutation,
  useUpdateTaskMutation,
} from '../core/workspace-api';
import { BoardList, BoardTask } from '../../../lib/models';
import Column from './Column';
import { _isArray, _uuid } from '../../../lib/utils';
import { AddBoardListForm } from './_partials/AddBoardListForm';

// const plusIcon = <i className="bi bi-plus fs-5"></i>;

const LoadingCOmponent = () => (
  <div className="d-flex justify-content-center align-items-center">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

interface KanbanProps {}
function Kanban(props: KanbanProps) {
  const [wsId, boardId] = useOutletContext() as string[];

  // queries and mutations < start >
  const [updateBoardLists] = useUpdateBoardListMutation();
  const [createBoardList] = useCreateBoardListMutation();
  const [createListTask] = useCreateTaskMutation();
  const [UpdateListTask] = useUpdateTaskMutation();
  const [DeleteListTask] = useDeleteTaskMutation();
  const { isSuccess, data: board, refetch, isError } = useGetBoardByIdQuery({
    boardId,
  });

  const [showAddBoardListForm, setShowAddBoardListForm] = useState<boolean>(false);
  const [columns, setColumns] = useState<BoardList[]>(board?.lists || []);

  useEffect(() => {
    if (board && _isArray(board?.lists)) {
      setColumns(board.lists);
    }
  }, [board]);

  const addBoardListHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const boardListName = (e.target as HTMLFormElement).boardListName.value as string;
    const createList: Omit<BoardList, '_id'> = {
      tasks: [],
      name: boardListName,
      members: [],
    };
    createBoardList({
      boardId: boardId,
      list: createList,
    })
      .unwrap()
      .then(() => {
        refetch();
        setShowAddBoardListForm(false);
      });
  };

  const addTaskHandler = useCallback(
    async (newTask: Omit<BoardTask, '_id'>, listId: string) => {
      createListTask({
        boardId: boardId,
        listId: listId,
        task: newTask,
      })
        .unwrap()
        .then((res) => {
          setColumns(res.lists);
        });
    },
    []
  );

  const updateTaskHandler = useCallback(
    async (newTask: Omit<BoardTask, '_id'>, listId: string, taskId: string) => {},
    []
  );

  const deleteTaskHandler = useCallback(async (listId: string, taskId: string) => {}, []);

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    const currentColumns = JSON.parse(JSON.stringify(columns)) as BoardList[];

    if (type === 'COLUMN') {
      const start = source.index;
      const finish = destination.index;
      const [removed] = currentColumns.splice(start, 1);
      currentColumns.splice(finish, 0, removed);
    } else if (type === 'TASK') {
      const start = currentColumns.find(
        (col) => col._id.toString() === source.droppableId
      )!;
      const finish = currentColumns.find(
        (col) => col._id.toString() === destination.droppableId
      )!;
      if (start?._id.toString() === finish?._id.toString()) {
        const currentTasks = JSON.parse(JSON.stringify(start?.tasks)) || [];
        const [removed] = currentTasks.splice(source.index, 1);
        currentTasks.splice(destination.index, 0, removed);
        const colIndex = currentColumns.findIndex(
          (col) => col._id.toString() === start?._id.toString()
        );
        currentColumns[colIndex].tasks = currentTasks;
      } else {
        const [removed] = start?.tasks.splice(source.index, 1) || [];
        finish?.tasks.splice(destination.index, 0, removed);
      }
    }

    updateBoardLists({
      boardId: boardId,
      lists: currentColumns,
    })
      .unwrap()
      .then((res) => {
        refetch();
      });
    return setColumns(currentColumns);
  };

  return (
    <Suspense fallback={<LoadingCOmponent />}>
      <>
        {!isSuccess || isError ? (
          <div>Board not found</div>
        ) : (
          <>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable
                droppableId={boardId.toString()}
                type="COLUMN"
                direction="horizontal"
                ignoreContainerClipping={false}
                isCombineEnabled={false}
              >
                {(provided, snapshot) => (
                  <StyledKanban ref={provided.innerRef} {...provided.droppableProps}>
                    {columns.map((column, i) => {
                      if (!column._id) return null;
                      return (
                        <Column
                          key={column._id}
                          column={column}
                          index={i}
                          onCreate={addTaskHandler}
                          onUpdate={updateTaskHandler}
                          onDelete={deleteTaskHandler}
                        />
                      );
                    })}
                    {provided.placeholder}
                    <AddBoardListForm
                      onListHandler={addBoardListHandler}
                      toggleListForm={setShowAddBoardListForm}
                      show={showAddBoardListForm}
                    />
                  </StyledKanban>
                )}
              </Droppable>
            </DragDropContext>
          </>
        )}
      </>
    </Suspense>
  );
}

const StyledKanban = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: nowrap;
  margin: 1rem auto;
  min-width: calc(50vw);
  /* max-height: 80vh; */
`;

export default Kanban;
