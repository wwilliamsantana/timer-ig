import { ReactNode, createContext, useReducer, useState } from 'react'

interface CyclesProps {
  id: string
  minuteAmout: number
  task: string
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface FormDataProps {
  minutesAmout: number
  task: string
}

interface CycleContextData {
  cycles: CyclesProps[]
  cycleActivated: CyclesProps | undefined
  currentFinishedCycles: () => void
  idActiveCycle: string | null
  isSecondsPassed: number
  setSecondsCurrentPassed: (value: number) => void
  createCountdown: (data: FormDataProps) => void
  interruptedButtonCountdown: () => void
}

interface CycleContextProps {
  children: ReactNode
}

interface CycleStateProps {
  cycles: CyclesProps[]
  idActiveCycle: string | null
}

export const CycleContext = createContext({} as CycleContextData)

export function CycleContextProvider({ children }: CycleContextProps) {
  const [cycleState, dispatch] = useReducer(
    (state: CycleStateProps, action: any) => {
      switch (action.type) {
        case 'ADD_NEW_CYCLE':
          return {
            ...state,
            cycles: [...state.cycles, action.payload],
            idActiveCycle: action.payload.id,
          }
        case 'INTERRUPTED_COUNTDOWN':
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
        case 'MARK_CURRENT_SECONDS_FINISHED':
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
    },
    {
      cycles: [],
      idActiveCycle: null,
    },
  )

  const { cycles, idActiveCycle } = cycleState

  const [isSecondsPassed, setIsSecondsPassed] = useState(0)
  const cycleActivated = cycles.find((cycle) => cycle.id === idActiveCycle)

  function createCountdown(data: FormDataProps) {
    const id = String(new Date().getTime())
    const newCycle: CyclesProps = {
      id,
      minuteAmout: data.minutesAmout,
      task: data.task,
      startDate: new Date(),
    }

    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: newCycle,
    })

    setIsSecondsPassed(0)
  }

  function setSecondsCurrentPassed(value: number) {
    setIsSecondsPassed(value)
  }

  function interruptedButtonCountdown() {
    dispatch({
      type: 'INTERRUPTED_COUNTDOWN',
    })
  }

  function currentFinishedCycles() {
    dispatch({
      type: 'MARK_CURRENT_SECONDS_FINISHED',
    })
  }

  return (
    <CycleContext.Provider
      value={{
        cycles,
        idActiveCycle,
        isSecondsPassed,
        cycleActivated,
        createCountdown,
        setSecondsCurrentPassed,
        interruptedButtonCountdown,
        currentFinishedCycles,
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}
