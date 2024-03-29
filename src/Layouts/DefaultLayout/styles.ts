import { styled } from 'styled-components'

export const LayoutContainer = styled.div`
  max-width: 74rem;
  min-height: calc(100vh - 10rem);
  margin: 5rem auto;
  border-radius: 8px;
  padding: 2.5rem;

  background-color: ${(props) => props.theme.gray800};

  display: flex;
  flex-direction: column;
`
