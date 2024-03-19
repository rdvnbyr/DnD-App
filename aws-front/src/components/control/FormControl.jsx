import PropTypes from 'prop-types';

const FormControl = ({ type = 'text', name, value, onChange }) => {
  return (
    <input
      className="block w-full border-2 border-gray-300 p-2 rounded-md"
      type={type}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};
FormControl.propTypes = {
  type: PropTypes.oneOf(['text', 'number', 'password', 'email', 'date']),
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const FormLabel = ({ label, ...props }) => {
  return <label {...props}>{label}</label>;
};
FormLabel.propTypes = {
  label: PropTypes.string.isRequired,
};

const FormControlContainer = ({ children }) => {
  return <div className="flex flex-col space-y-1">{children}</div>;
};
FormControlContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export { FormControl, FormControlContainer, FormLabel };
