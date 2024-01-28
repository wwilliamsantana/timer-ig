import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { differenceInSeconds } from 'date-fns'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesInput,
  Separator,
  TaskInput,
} from './styles'
import { useEffect, useState } from 'react'

const schemaValidation = zod.object({
  task: zod.string().min(1, 'Informe uma tarefa'),
  minutesAmout: zod
    .number()
    .min(5, 'Valor mínimo é 5')
    .max(60, 'O valor máximo é 60'),
})

type FormDataProps = zod.infer<typeof schemaValidation>

interface CyclesProps {
  id: string
  minuteAmout: number
  task: string
  startDate: Date
}

export function Home() {
  const [cycles, setCyles] = useState<CyclesProps[]>([])
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

  const minutosAmout = Math.floor(totalSeconds / 60)
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

    setCyles((state) => [...state, cyclesCurrent])
    setActiveCycle(id)

    reset()
  }

  useEffect(() => {
    if (cycleActivated) {
      setInterval(() => {
        setIsSecondsPassed(
          differenceInSeconds(new Date(), cycleActivated.startDate),
        )
      }, 1000)
    }
  }, [cycleActivated])

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleSubmitCountdown)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            type="text"
            id="task"
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
          />

          <label htmlFor="minutesAmout">durante</label>
          <MinutesInput
            type="number"
            id="minutesAmout"
            step={5}
            max={60}
            min={5}
            placeholder="00"
            {...register('minutesAmout', { valueAsNumber: true })}
          />
          <span>minutos.</span>
        </FormContainer>
        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        <Button disabled={!disabledButtonControl} type="submit">
          <Play size={24} />
          Começar
        </Button>
      </form>
    </HomeContainer>
  )
}
