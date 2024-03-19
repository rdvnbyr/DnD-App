import { useReducer } from 'react';
import { FormControl, FormControlContainer, FormLabel } from './components/control/FormControl';

function App() {
  const [aState, aDispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'onChange': {
          const { name, value } = action.payload;
          return { ...state, [name]: value };
        }
        default:
          return state;
      }
    },
    { asin: '' }
  );

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    aDispatch({ type: 'onChange', payload: { name, value } });
  };

  return (
    <>
      <div className="w-1/3 mx-auto my-4">
        <h2 className="text-xl font-bold mb-4">Create a new listing</h2>
        <form className="flex flex-col space-y-4">
          <FormControlContainer>
            <FormLabel label="ASIN" htmlFor="name" />
            <div className={`flex space-x-2 items-center`}>
              <FormControl type="text" name="asin" value={aState.asin} onChange={handleChange} />
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Search</button>
            </div>
          </FormControlContainer>
        </form>
      </div>
    </>
  );
}

export default App;
