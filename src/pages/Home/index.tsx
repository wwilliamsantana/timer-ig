import { HandPalm, Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { differenceInSeconds } from 'date-fns'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { useEffect, useState } from 'react'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'

const schemaValidation = zod.object({
  task: zod.string().min(1, 'Informe uma tarefa'),
  minutesAmout: zod
    .number()
    .min(1, 'Valor mínimo é 5')
    .max(60, 'O valor máximo é 60'),
})

type FormDataProps = zod.infer<typeof schemaValidation>

interface CyclesProps {
  id: string
  minuteAmout: number
  task: string
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export function Home() {
  const [cycles, setCycles] = useState<CyclesProps[]>([])
  const [isActiveCycle, setActiveCycle] = useState<string | null>(null)
  const [isSecondsPassed, setIsSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<FormDataProps>({
    resolver: zodResolver(schemaValidation),
    defaultValues: {
      minutesAmout: 0,
      task: '',
    },
  })
  const disabledButtonControl = watch('task')
  const cycleActivated = cycles.find((cycle) => cycle.id === isActiveCycle)

  const totalSeconds = cycleActivated ? cycleActivated.minuteAmout * 60 : 0
  const currentSeconds = cycleActivated ? totalSeconds - isSecondsPassed : 0

  const minutosAmout = Math.floor(currentSeconds / 60)
  const secondsAmout = currentSeconds % 60

  const minutes = String(minutosAmout).padStart(2, '0')
  const seconds = String(secondsAmout).padStart(2, '0')

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

    reset()
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

  useEffect(() => {
    let interval: number

    if (cycleActivated) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          cycleActivated.startDate,
        )
        console.log(secondsDifference)

        if (secondsDifference >= totalSeconds) {
          setCycles((state) =>
            state.map((cycle) => {
              if (cycle.id === isActiveCycle) {
                return { ...cycle, finishedDate: new Date() }
              } else return cycle
            }),
          )

          clearInterval(interval)
          setActiveCycle(null)
          setIsSecondsPassed(totalSeconds)
        } else {
          setIsSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [cycleActivated, totalSeconds, isActiveCycle])

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleSubmitCountdown)}>
        <NewCycleForm />
        <Countdown />

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
