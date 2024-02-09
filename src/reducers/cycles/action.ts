import { CyclesProps } from './reducer'

export enum ActionType {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPTED_COUNTDOWN = 'INTERRUPTED_COUNTDOWN',
  MARK_CURRENT_SECONDS_FINISHED = 'MARK_CURRENT_SECONDS_FINISHED',
}

export type ActionsProps =
  | { type: ActionType.ADD_NEW_CYCLE; payload: CyclesProps }
  | { type: ActionType.INTERRUPTED_COUNTDOWN }
  | { type: ActionType.MARK_CURRENT_SECONDS_FINISHED }

export function createCountdownAction(newCycle: CyclesProps): ActionsProps {
  return {
    type: ActionType.ADD_NEW_CYCLE,
    payload: newCycle,
  }
}

export function interruptedButtonCountdownAction(): ActionsProps {
  return {
    type: ActionType.INTERRUPTED_COUNTDOWN,
  }
}

export function currentFinishedCyclesAction(): ActionsProps {
  return {
    type: ActionType.MARK_CURRENT_SECONDS_FINISHED,
  }
}
