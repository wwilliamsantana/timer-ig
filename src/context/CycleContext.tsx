import {
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { CycleReducer, CyclesProps } from '../reducers/cycles/reducer'
import {
  createCountdownAction,
  currentFinishedCyclesAction,
  interruptedButtonCountdownAction,
} from '../reducers/cycles/action'
import { differenceInSeconds } from 'date-fns'

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

export const CycleContext = createContext({} as CycleContextData)

export function CycleContextProvider({ children }: CycleContextProps) {
  const [cycleState, dispatch] = useReducer(
    CycleReducer,
    {
      cycles: [],
      idActiveCycle: null,
    },
    (initialState) => {
      const state = localStorage.getItem('@ignite:time-countdown')

      if (state) {
        return JSON.parse(state)
      }

      return initialState
    },
  )

  const { cycles, idActiveCycle } = cycleState
  const cycleActivated = cycles.find((cycle) => cycle.id === idActiveCycle)

  const [isSecondsPassed, setIsSecondsPassed] = useState(() => {
    if (cycleActivated) {
      return differenceInSeconds(new Date(), cycleActivated.startDate)
    }
    return 0
  })

  function createCountdown(data: FormDataProps) {
    const id = String(new Date().getTime())
    const newCycle: CyclesProps = {
      id,
      minuteAmout: data.minutesAmout,
      task: data.task,
      startDate: new Date(),
    }

    dispatch(createCountdownAction(newCycle))

    setIsSecondsPassed(0)
  }

  function setSecondsCurrentPassed(value: number) {
    setIsSecondsPassed(value)
  }

  function interruptedButtonCountdown() {
    dispatch(interruptedButtonCountdownAction())
  }

  function currentFinishedCycles() {
    dispatch(currentFinishedCyclesAction())
  }

  useEffect(() => {
    const stateCycle = JSON.stringify(cycleState)

    localStorage.setItem('@ignite:time-countdown', stateCycle)
  }, [cycleState])

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
