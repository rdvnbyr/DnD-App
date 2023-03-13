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
  <>
    <button
      style={{
        display: !show ? 'block' : 'none',
      }}
      className="btn w-100 rounded-0 btn-sm"
      onClick={() => toggleTaskForm(true)}
    >
      Add Task
    </button>
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
  </>
);

const StyledContainer = styled.div`
  min-width: 240px;
`;
