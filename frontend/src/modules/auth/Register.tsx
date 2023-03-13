import { useForm, SubmitHandler } from 'react-hook-form';
import { FormControlWrapper } from '../../components/partials';
import { StyledForm } from './components/styled-form';
import { useRegisterMutation } from './core/auth-api';
import { UserCredentials } from '../../lib/models';
import { _classNames } from '../../lib/utils';
import { Link } from 'react-router-dom';

type FormValues = {
  email: string;
  password: string;
};

export const Register = () => {
  const [register, { isLoading, error, isSuccess }] = useRegisterMutation();
  const {
    register: _register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { email, password } = data;
    const username = data.email.split('@')[0].split('.')[0];
    const user: UserCredentials = {
      email,
      password,
      username,
      role: 'user',
    };
    await register(user);
  };

  if (isSuccess) {
    return (
      <div className="alert alert-success" role="alert">
        Registration successful!
      </div>
    );
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <div className="text-center mb-4">
        <h2 className="text-success-emphasis">Create your account</h2>
      </div>
      {error && (
        <div className="alert alert-danger" role="alert">
          {typeof error === 'string'
            ? error
            : 'Something went wrong. Please try again later.'}
        </div>
      )}
      <div className="w-100">
        <FormControlWrapper
          label="Email"
          error={formErrors.email?.message}
          {..._register('email', { required: true })}
        />
      </div>
      <div className="w-100">
        <FormControlWrapper
          type="password"
          label="Password"
          error={formErrors.password?.message}
          {..._register('password', { required: true })}
        />
      </div>

      <>
        <button
          type="submit"
          className={_classNames(
            'btn',
            'btn-success',
            'px-5',
            'mt-3',
            'w-100',
            'rounded-0',
            isLoading ? 'disabled' : ''
          )}
        >
          Save
          {isLoading && (
            <span
              className="spinner-border spinner-border-sm ms-2"
              role="status"
              aria-hidden="true"
            ></span>
          )}
        </button>
      </>
      <div className="mt-4">
        <p className="text-center">
          Already have an account?{' '}
          <Link className="brn btn-link text-primary" to="/login">
            Login
          </Link>
        </p>
      </div>
    </StyledForm>
  );
};
