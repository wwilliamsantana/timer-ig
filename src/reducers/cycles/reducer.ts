import { ActionType, ActionsProps } from './action'
import { produce } from 'immer'

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
      return produce(state, (draft) => {
        draft.cycles.push(action.payload)
        draft.idActiveCycle = action.payload.id
      })

    case ActionType.INTERRUPTED_COUNTDOWN: {
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.idActiveCycle
      })

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.idActiveCycle = null
        draft.cycles[currentCycleIndex].interruptedDate = new Date()
      })
    }
    case ActionType.MARK_CURRENT_SECONDS_FINISHED: {
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.idActiveCycle
      })

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.idActiveCycle = null
        draft.cycles[currentCycleIndex].finishedDate = new Date()
      })
    }
    default:
      return state
  }
}
