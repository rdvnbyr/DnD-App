import styled from 'styled-components';

import { Draggable } from 'react-beautiful-dnd';
import { Task as TTask } from '../../../lib/models';

const Container = styled.div<{ isDragging: boolean }>`
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 2px;
  background-color: ${(props) => (props.isDragging ? 'lightgreen' : 'white')};
`;

type TaskProps = {
  task: TTask;
  index: number;
};
export const Task = ({ task, index }: TaskProps) => (
  <Draggable draggableId={task._id?.toString()} index={index}>
    {(provided, snapshot) => {
      return (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {task.name}
        </Container>
      );
    }}
  </Draggable>
);
