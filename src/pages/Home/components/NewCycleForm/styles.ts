import { styled } from 'styled-components'

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
