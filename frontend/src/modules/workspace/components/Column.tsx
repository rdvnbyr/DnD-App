import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { BoardList, BoardTask } from '../../../lib/models';
import { Task } from './Task';
import { AddTaskForm } from './_partials/AddTaskForm';
import { Button, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useWorkspaceContext } from '../core/workspace-context';

interface ColumnProps {
  column: BoardList;
  children?: React.ReactNode;
  index: number;
  onCreate: (newTask: Omit<BoardTask, '_id'>, listId: string) => void;
  onUpdateTask: (task: Omit<BoardTask, '_id'>, listId: string, taskId: string) => void;
  onDeleteTask: (listId: string, taskId: string) => void;
  onDeleteList: (listId: string) => void;
}

const Column: React.FC<ColumnProps> = ({ column, index, onCreate, onDeleteTask, onUpdateTask, onDeleteList }) => {
  const workspaceCtx = useWorkspaceContext();
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

  const updateTaskHandler = async (newTask: BoardTask, listId: string, taskId: string) => {};

  const deleteTaskHandler = async (listId: string, taskId: string) => {};

  const openTaskDialog = (taskId: string) => workspaceCtx.openTaskDialog(_id.toString(), taskId);

  return (
    <Draggable draggableId={_id.toString()} index={index}>
      {(dragProvided) => (
        <StyledColumnContainer {...dragProvided.draggableProps} ref={dragProvided.innerRef}>
          <StyledColumnTitle {...dragProvided.dragHandleProps}>
            <span>{name}</span>
            <Dropdown className="column-actions">
              <Dropdown.Toggle split variant="dark" id="dropdown-split-basic" />

              <Dropdown.Menu>
                <Dropdown.Item role="button">Join</Dropdown.Item>
                <Dropdown.Item role="button" onClick={() => onDeleteList(_id.toString())}>
                  Delete List
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
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
                    return <Task key={task._id} index={index} task={task} openTaskDialog={openTaskDialog} />;
                  })}
                  {provided.placeholder}
                </StyledColumnCard>
              );
            }}
          </Droppable>
          <AddTaskForm onTaskHandler={addTaskHandler} toggleTaskForm={setShowForm} show={showForm} />
        </StyledColumnContainer>
      )}
    </Draggable>
  );
};

const StyledColumnContainer = styled.div`
  margin: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.grayscale[300]};
  border-radius: ${({ theme }) => theme.base.radius};
  background: ${({ theme }) => theme.grayscale[300]};
  min-width: 300px;
  display: flex;
  flex-direction: column;
`;

const StyledColumnTitle = styled.h4`
  padding: 8px;
  background-color: ${({ theme }) => theme.grayscale[100]};
  color: ${({ theme }) => theme.base.textColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
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
