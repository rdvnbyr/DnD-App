import styled from 'styled-components';

type AddTaskFormProps = {
  onTaskHandler: (e: React.FormEvent) => void;
  toggleTaskForm: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
};

export const AddTaskForm = ({
  onTaskHandler,
  toggleTaskForm,
  show,
}: AddTaskFormProps) => (
  <div className="py-1 px-2">
    <div className="d-flex flex-row justify-between gap-2">
      <StyledButton onClick={() => toggleTaskForm(true)} isHidden={show}>
        <span>+</span>
        <span>Create new task</span>
      </StyledButton>
      <button
        className="btn btn-sm"
        style={{
          display: show ? 'none' : 'block',
        }}
      >
        ...
      </button>
    </div>

    <form
      onSubmit={onTaskHandler}
      className="p-2 border-1 shadow-1"
      style={{
        display: show ? 'block' : 'none',
      }}
    >
      <input
        className="form-control mb-2"
        type="text"
        id="addTaskInput"
        name="addTaskInput"
        placeholder="Enter column name"
        ref={(input) => {
          if (input) input.focus();
        }}
      />
      <div className="row">
        <div className="col-auto">
          <button type="submit" className="btn btn-primary px-3 btn-sm">
            Create Task
          </button>
        </div>
        <div className="col-auto">
          <button
            type="button"
            className="btn btn-link btn-sm text-dark"
            onClick={() => toggleTaskForm((prev) => !prev)}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  </div>
);

const StyledContainer = styled.div`
  min-width: 240px;
`;

const StyledButton = styled.a<{ isHidden: boolean }>`
  cursor: pointer;
  width: 100%;
  display: ${({ isHidden }) => (isHidden ? 'none' : 'flex')};
  align-items: center;
  justify-content: flex-start;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  line-height: 1.5;
  color: #495057;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.base.radius};
  &:hover {
    color: #495057;
    text-decoration: none;
    background-color: #f8f9fa;
  }
`;
