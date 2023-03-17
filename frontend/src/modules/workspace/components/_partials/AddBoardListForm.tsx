type AddBoardFormProps = {
  onListHandler: (e: React.FormEvent) => void;
  toggleListForm: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
};
export const AddBoardListForm = ({ onListHandler, toggleListForm, show }: AddBoardFormProps) => {
  return (
    <div className="mt-2 ">
      <button
        className="btn btn-outline-dark"
        onClick={() => toggleListForm((prev) => !prev)}
        style={{
          display: !show ? 'block' : 'none',
          minWidth: '10rem',
        }}
      >
        + Add Column
      </button>
      <form
        onSubmit={onListHandler}
        className="p-2 border-1 shadow-1"
        style={{
          display: show ? 'block' : 'none',
        }}
      >
        <input
          className="form-control mb-2"
          type="text"
          id="boardListName"
          name="boardListName"
          placeholder="Enter column name"
          ref={(input) => {
            if (input) input.focus();
          }}
        />
        <div className="row">
          <div className="col-auto">
            <button type="submit" className="btn btn-primary px-3 btn-sm">
              Add List
            </button>
          </div>
          <div className="col-auto">
            <button
              type="button"
              className="btn btn-link btn-sm text-dark"
              onClick={() => toggleListForm((prev) => !prev)}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
