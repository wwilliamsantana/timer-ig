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

export const BaseCountdownButton = styled.button`
  width: 90%;

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

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const StartCountdownButton = styled(BaseCountdownButton)`
  background-color: ${(props) => props.theme.green500};

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme.green700};
  }
`
export const StopCountdownButton = styled(BaseCountdownButton)`
  background-color: ${(props) => props.theme.red500};

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme.red700};
  }
`
