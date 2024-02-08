import styled from 'styled-components'

export const HistoryContainer = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 3.5rem;

  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    line-height: 1.6;
    color: ${(props) => props.theme.gray100};
  }
`

export const HistoryList = styled.div`
  margin-top: 2rem;
  flex: 1;
  overflow: auto; //Quando não couber em tela, irá criar um scroll na tabela

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th {
      background-color: ${(props) => props.theme.gray600};
      font-size: 0.875rem;
      line-height: 1.6;
      padding: 1rem 1.5rem;
      text-align: left;

      &:first-child {
        border-top-left-radius: 8px;
      }
      &:last-child {
        border-top-right-radius: 8px;
      }
    }

    td {
      background-color: ${(props) => props.theme.gray700};
      border-top: 4px solid ${(props) => props.theme.gray800};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        width: 50%;
        border-top-left-radius: 8px;
      }
      &:last-child {
        border-top-right-radius: 8px;
      }
    }
  }
`

const STATUS_COLOR = {
  yellow: 'yellow500',
  red: 'red500',
  green: 'green500',
}

interface StatusProps {
  statusColor: keyof typeof STATUS_COLOR
}

export const Status = styled.span<StatusProps>`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  &::before {
    content: ' ';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 9999px;
    background-color: ${(props) =>
      props.theme[STATUS_COLOR[props.statusColor]]};
  }
`
