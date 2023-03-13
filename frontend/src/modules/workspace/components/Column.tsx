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
      {(provided) => (
        <StyledColumnContainer {...provided.draggableProps} ref={provided.innerRef}>
          <StyledColumnTitle {...provided.dragHandleProps}>{name}</StyledColumnTitle>

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
          <AddTaskForm
            onTaskHandler={addTaskHandler}
            toggleTaskForm={setShowForm}
            show={showForm}
          />
        </StyledColumnContainer>
      )}
    </Draggable>
  );
};

const StyledColumnContainer = styled.div`
  margin: 8px;
  border: 1px solid crimson;
  border-radius: 2px;
  background: white;
  min-width: 300px;
  display: flex;
  flex-direction: column;
`;

const StyledColumnTitle = styled.h3`
  padding: 8px;
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: white;
`;

const StyledColumnCard = styled.div<{ isDraggingOver: boolean }>`
  padding: 8px;
  flex: 1;
  min-height: 100px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? 'skyblue' : 'white')};
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
