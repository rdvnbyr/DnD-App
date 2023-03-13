import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { BoardList, BoardTask } from '../../../lib/models';
import { Task } from './Task';
import { AddTaskForm } from './_partials/AddTaskForm';

interface ColumnProps {
  column: BoardList;
  children?: React.ReactNode;
  index: number;
  onCreate: (newTask: Omit<BoardTask, '_id'>, listId: string) => void;
  onUpdate: (task: Omit<BoardTask, '_id'>, listId: string, taskId: string) => void;
  onDelete: (listId: string, taskId: string) => void;
}

const Column: React.FC<ColumnProps> = ({
  column,
  index,
  onCreate,
  onDelete,
  onUpdate,
}) => {
  const { _id, tasks, name } = column;
  const [showForm, setShowForm] = React.useState<boolean>(false);

  const addTaskHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const taskName = (e.target as HTMLFormElement).addTaskInput.value as string;
    const newTask: Omit<BoardTask, '_id'> = {
      name: taskName,
      members: [],
      description: '',
      activities: [],
    };
    onCreate(newTask, _id.toString());
  };

  const updateTaskHandler = async (
    newTask: BoardTask,
    listId: string,
    taskId: string
  ) => {};

  const deleteTaskHandler = async (listId: string, taskId: string) => {};

  return (
    <Draggable draggableId={_id.toString()} index={index}>
      {(dragProvided) => (
        <StyledColumnContainer
          {...dragProvided.draggableProps}
          ref={dragProvided.innerRef}
        >
          <StyledColumnTitle {...dragProvided.dragHandleProps}>
            <span>{name}</span>
            <div className="dropdown list-action">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Action
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" role="button">
                    Join List
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" role="button">
                    Delete List
                  </a>
                </li>
              </ul>
            </div>
          </StyledColumnTitle>

          <Droppable droppableId={_id.toString()} type="TASK">
            {(provided, snapshot) => {
              return (
                <StyledColumnCard
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {tasks.map((task, index) => {
                    return <Task key={task._id} index={index} task={task} />;
                  })}
                  {provided.placeholder}
                </StyledColumnCard>
              );
            }}
          </Droppable>
          <div>
            <AddTaskForm
              onTaskHandler={addTaskHandler}
              toggleTaskForm={setShowForm}
              show={showForm}
            />
          </div>
        </StyledColumnContainer>
      )}
    </Draggable>
  );
};

const StyledColumnContainer = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  background: ${({ theme }) => theme.colors.secondary.light};
  min-width: 300px;
  display: flex;
  flex-direction: column;
  /* .list-action {
  } */
`;

const StyledColumnTitle = styled.h3`
  padding: 8px;
  background-color: ${({ theme }) => theme.colors.secondary.main};
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledColumnCard = styled.div<{ isDraggingOver: boolean }>`
  padding: 8px;
  flex: 1;
  min-height: 100px;
  transition: background-color 0.2s ease;
`;

const StyledList = styled.div({
  backgroundColor: '#ddd',
  borderRadius: 8,
  padding: 8,
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  marginTop: 8,
});

export default Column;
