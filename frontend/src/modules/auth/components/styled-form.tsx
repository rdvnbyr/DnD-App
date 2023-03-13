import styled, { css } from 'styled-components';

type Props = {
  onSubmit: (data: any) => void;
  children: React.ReactNode;
};
export const StyledForm = ({ onSubmit, children }: Props) => {
  return <StyledFormWrapper onSubmit={onSubmit}>{children}</StyledFormWrapper>;
};
const StyledFormWrapper = styled.form<Partial<Props>>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #fff;
  max-width: 420px;
  margin: 2rem auto;
  padding: 1.825rem;
  border-radius: 0.1rem;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`;
