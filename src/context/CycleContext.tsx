import { ReactNode, createContext, useState } from 'react'

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
  isActiveCycle: string | null
  isSecondsPassed: number
  setSecondsCurrentPassed: (value: number) => void
  handleSubmitCountdown: (data: FormDataProps) => void
  interruptedButtonCountdown: () => void
}

interface CycleContextProps {
  children: ReactNode
}

export const CycleContext = createContext({} as CycleContextData)

export function CycleContextProvider({ children }: CycleContextProps) {
  const [cycles, setCycles] = useState<CyclesProps[]>([])
  const [isActiveCycle, setActiveCycle] = useState<string | null>(null)

  const [isSecondsPassed, setIsSecondsPassed] = useState(0)

  const cycleActivated = cycles.find((cycle) => cycle.id === isActiveCycle)

  function handleSubmitCountdown(data: FormDataProps) {
    const id = String(new Date().getTime())
    const cyclesCurrent: CyclesProps = {
      id,
      minuteAmout: data.minutesAmout,
      task: data.task,
      startDate: new Date(),
    }

    setCycles((state) => [...state, cyclesCurrent])
    setActiveCycle(id)
    setIsSecondsPassed(0)

    // reset()
  }

  function setSecondsCurrentPassed(value: number) {
    setIsSecondsPassed(value)
  }

  function interruptedButtonCountdown() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === isActiveCycle) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycle(null)
  }

  function currentFinishedCycles() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === isActiveCycle) {
          // setActiveCycle(null) Zerar countdown após finalizarmos o tempo
          return { ...cycle, finishedDate: new Date() }
        } else return cycle
      }),
    )
  }

  return (
    <CycleContext.Provider
      value={{
        cycles,
        isActiveCycle,
        isSecondsPassed,
        cycleActivated,
        handleSubmitCountdown,
        setSecondsCurrentPassed,
        interruptedButtonCountdown,
        currentFinishedCycles,
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}
