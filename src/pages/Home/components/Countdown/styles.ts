import { styled } from 'styled-components'

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
