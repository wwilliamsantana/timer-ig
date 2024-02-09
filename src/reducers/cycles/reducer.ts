import { ActionType, ActionsProps } from './action'

export interface CyclesProps {
  id: string
  minuteAmout: number
  task: string
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CycleStateProps {
  cycles: CyclesProps[]
  idActiveCycle: string | null
}

export function CycleReducer(state: CycleStateProps, action: ActionsProps) {
  switch (action.type) {
    case ActionType.ADD_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload],
        idActiveCycle: action.payload.id,
      }
    case ActionType.INTERRUPTED_COUNTDOWN:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.idActiveCycle) {
            return { ...cycle, interruptedDate: new Date() }
          } else {
            return cycle
          }
        }),
        idActiveCycle: null,
      }
    case ActionType.MARK_CURRENT_SECONDS_FINISHED:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.idActiveCycle) {
            return { ...cycle, finishedDate: new Date() }
          } else {
            return cycle
          }
        }),
        idActiveCycle: null,
      }
    default:
      return state
  }
}
