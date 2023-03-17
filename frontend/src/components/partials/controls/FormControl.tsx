import React from 'react';
import styled from 'styled-components';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  type?: string;
};
type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

interface FormControlProps extends InputProps {
  label?: string;
  error?: string;
}
interface TextAreaControlProps extends TextAreaProps {
  label?: string;
  error?: string;
}

export const TextAreaInput = React.forwardRef((props: TextAreaProps, ref: React.Ref<HTMLTextAreaElement>) => {
  return <textarea className="form-control rounded-0 shadow-none m-0" ref={ref} {...props} />;
});

export const Input = React.forwardRef((props: InputProps, ref: React.Ref<HTMLInputElement>) => {
  const { type, ...restProps } = props;
  return <input className="form-control rounded-0 shadow-none m-0" type={type || 'text'} ref={ref} {...restProps} />;
});

export const FormControlWrapper = React.forwardRef((props: FormControlProps, ref: React.Ref<HTMLInputElement>) => {
  const { error, label, ...restProps } = props;
  return (
    <StyledFormControlWrapper>
      {label && <label className="form-label">{label}</label>}
      <Input {...restProps} ref={ref} />
      {error && <span>{error}</span>}
    </StyledFormControlWrapper>
  );
});

export const TextAreaControlWrapper = React.forwardRef(
  (props: TextAreaControlProps, ref: React.Ref<HTMLTextAreaElement>) => {
    const { error, label, ...restProps } = props;
    return (
      <StyledFormControlWrapper>
        {label && <label className="form-label">{label}</label>}
        <TextAreaInput {...restProps} ref={ref} />
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
