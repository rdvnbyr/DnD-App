import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { Task as TTask } from '../../../lib/models';
import { _formatDate } from '../../../lib/utils';
import { v4 as uuidv4 } from 'uuid';

type TaskProps = {
  task: TTask;
  index: number;
  openTaskDialog: (taskId: string) => void;
};
export const Task = ({ task, index, openTaskDialog }: TaskProps) => (
  <Draggable draggableId={task._id?.toString()} index={index}>
    {(provided, snapshot) => {
      return (
        <StyledContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          onClick={() => openTaskDialog(task._id)}
        >
          {task?.labels && task?.labels.length > 0 && (
            <StyledContainerInner>
              {task.labels.map((label) => (
                <span key={uuidv4()} className={`task-label-span task-${label}`}></span>
              ))}
            </StyledContainerInner>
          )}
          <StyledContainerInner>
            <span className={`task-label-span task-bug`}></span>
            <span className={`task-label-span task-bug`}></span>
          </StyledContainerInner>
          <StyledContainerInner> {task.name}</StyledContainerInner>
          <StyledContainerInner>
            {task.createdAt && <span className="task-action-span task-date">{_formatDate(task.createdAt)}</span>}
          </StyledContainerInner>
        </StyledContainer>
      );
    }}
  </Draggable>
);

const StyledContainer = styled.div<{ isDragging: boolean }>`
  border: 1px solid lightgrey;
  border-color: ${(props) => props.isDragging && 'darkgrey'};
  rotate: ${(props) => props.isDragging && '2deg'};
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 2px;
  background-color: white;
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
`;

const StyledContainerInner = styled.div`
  font-size: inherit;
  display: flex;
  flex-direction: row;
  align-items: center;
  &:not(:last-child) {
    margin-bottom: 4px;
  }
  .task-label-span {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 8px;
    &.task-bug {
      background-color: ${({ theme }) => theme.colors.danger.main};
    }
  }

  .task-action-span {
    font-size: 0.8rem;
    &.task-date {
      padding: 4px 8px;
      border-radius: 2px;
      background-color: ${({ theme }) => theme.colors.info.main};
      color: white;
    }
  }
`;
