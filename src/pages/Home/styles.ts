import styled from 'styled-components'

export const HomeContainer = styled.main`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  form {
    display: flex;
    gap: 3.5rem;
    flex-direction: column;
    align-items: center;
  }
`

export const FormContainer = styled.div`
  font-size: 1.125rem;
  font-weight: bold;
  color: ${(props) => props.theme.gray100};
  line-height: 1.6;

  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
`
const BaseInput = styled.input`
  background: transparent;
  height: 2.5rem;
  border: none;

  font-weight: bold;
  font-size: 1.125rem;
  border-bottom: 2px solid ${(props) => props.theme.gray500};
  padding: 0 0.5rem;
  color: ${(props) => props.theme.gray100};

  &:focus {
    box-shadow: none;
    border-bottom: 2px solid ${(props) => props.theme.green500};
  }

  &::placeholder {
    color: ${(props) => props.theme.gray500};
  }
`

export const TaskInput = styled(BaseInput)`
  flex: 1;
`

export const MinutesInput = styled(BaseInput)`
  width: 4rem;
`

export const CountdownContainer = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  font-weight: bold;
  line-height: 8rem;

  color: ${(props) => props.theme.gray100};
  display: flex;
  gap: 1rem;

  span {
    background-color: ${(props) => props.theme.gray700};
    padding: 3rem 2rem;
    border-radius: 8px;
  }
`

export const Separator = styled.div`
  color: ${(props) => props.theme.green500};
  padding: 2rem 0;

  width: 4rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
`

export const Button = styled.button`
  width: 90%;
  background-color: ${(props) => props.theme.green500};

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  font-weight: bold;
  line-height: 1.6;
  color: ${(props) => props.theme.gray100};

  padding: 1rem 0;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme.green700};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`
