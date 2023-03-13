import { useForm, SubmitHandler } from 'react-hook-form';
import { FormControlWrapper } from '../../components/partials';
import { _classNames } from '../../lib/utils';
import { useLoginMutation } from './core/auth-api';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserCredentials } from '../../lib/models';
import { StyledForm } from './components/styled-form';

type FormValues = {
  email: string;
  password: string;
};
export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [login, { isLoading, error, isSuccess }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { email, password } = data;
    const user: UserCredentials = {
      email,
      password,
    };
    await login(user);
  };

  if (isSuccess) {
    navigate(from, { replace: true });
  }

  return (
    <>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <div className="text-center mb-4">
          <h2 className="text-primary-emphasis">Login</h2>
        </div>
        {error && (
          <div className="w-100 alert alert-danger rounded-0" role="alert">
            <i className="bi bi-exclamation-triangle-fill"></i>{' '}
            {typeof error === 'string' ? error : 'Something went wrong.'}
          </div>
        )}
        <div className="w-100">
          <FormControlWrapper
            label="Email"
            error={errors.email?.message}
            {...register('email', { required: true })}
          />
        </div>
        <div className="w-100">
          <FormControlWrapper
            type="password"
            label="Password"
            error={errors.password?.message}
            {...register('password', { required: true })}
          />
        </div>
        <button
          type="submit"
          className={_classNames(
            'btn',
            'btn-primary',
            'px-5',
            'mt-3',
            'w-100',
            "rounded-0",
            isLoading ? 'disabled' : ''
          )}
        >
          {!isLoading && <span>Login</span>}
          {isLoading && (
            <span
              className="spinner-border spinner-border-sm ms-2"
              role="status"
              aria-hidden="true"
            ></span>
          )}
        </button>
        <div className="mt-4">
          <p className="text-center">
            Don't have an account?{' '}
            <Link className="text-success ml-2" to="/register">
              Register
            </Link>
          </p>
        </div>
      </StyledForm>
    </>
  );
};
