import { HandPalm, Play } from 'phosphor-react'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { createContext, useState } from 'react'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import * as zod from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

interface CyclesProps {
  id: string
  minuteAmout: number
  task: string
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CycleContextProps {
  cycleActivated: CyclesProps | undefined
  currentFinishedCycles: () => void
  isActiveCycle: string | null
  isSecondsPassed: number
  setSecondsCurrentPassed: (value: number) => void
}

export const CycleContext = createContext({} as CycleContextProps)
const schemaValidation = zod.object({
  task: zod.string().min(1, 'Informe uma tarefa'),
  minutesAmout: zod
    .number()
    .min(1, 'Valor mínimo é 5')
    .max(60, 'O valor máximo é 60'),
})

type FormDataProps = zod.infer<typeof schemaValidation>

export function Home() {
  const [cycles, setCycles] = useState<CyclesProps[]>([])
  const [isActiveCycle, setActiveCycle] = useState<string | null>(null)

  const [isSecondsPassed, setIsSecondsPassed] = useState(0)

  const hookForm = useForm<FormDataProps>({
    resolver: zodResolver(schemaValidation),
    defaultValues: {
      minutesAmout: 0,
      task: '',
    },
  })

  const { handleSubmit, watch, reset } = hookForm

  const disabledButtonControl = watch('task')
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

    reset()
  }

  function setSecondsCurrentPassed(value: number) {
    setIsSecondsPassed(value)
  }

  function handleStopCountdown() {
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
    <HomeContainer>
      <form onSubmit={handleSubmit(handleSubmitCountdown)}>
        <CycleContext.Provider
          value={{
            cycleActivated,
            currentFinishedCycles,
            isActiveCycle,
            isSecondsPassed,
            setSecondsCurrentPassed,
          }}
        >
          <FormProvider {...hookForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        </CycleContext.Provider>

        {isActiveCycle ? (
          <StopCountdownButton onClick={handleStopCountdown} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={!disabledButtonControl} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
