import React from 'react';
import styled from 'styled-components';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  type?: string;
};
interface FormControlProps extends InputProps {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef(
  (props: InputProps, ref: React.Ref<HTMLInputElement>) => {
    const { type, ...restProps } = props;
    return (
      <input className="form-control rounded-0 shadow-none m-0" type={type || 'text'} ref={ref} {...restProps} />
    );
  }
);

export const FormControlWrapper = React.forwardRef(
  (props: FormControlProps, ref: React.Ref<HTMLInputElement>) => {
    const { error, label, ...restProps } = props;
    return (
      <StyledFormControlWrapper>
        {label && <label className="form-label">{label}</label>}
        <Input {...restProps} ref={ref} />
        {error && <span>{error}</span>}
      </StyledFormControlWrapper>
    );
  }
);

const StyledFormControlWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 100%;
  label {
    margin-bottom: 0.5rem;
  }
`;
