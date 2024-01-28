import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
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

const schemaValidation = zod.object({
  task: zod.string().min(1, 'Informe uma tarefa'),
  minutesAmout: zod
    .number()
    .min(5, 'Valor mínimo é 5')
    .max(60, 'O valor máximo é 60'),
})

type FormDataProps = zod.infer<typeof schemaValidation>

export function Home() {
  const { register, handleSubmit, watch, reset } = useForm<FormDataProps>({
    resolver: zodResolver(schemaValidation),
    defaultValues: {
      minutesAmout: 0,
      task: '',
    },
  })
  const disabledButtonControl = watch('task')

  function handleSubmitCountdown(data: FormDataProps) {
    console.log(data)
    reset()
  }

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
            {...register('minutesAmout')}
          />
          <span>minutos.</span>
        </FormContainer>
        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <Button disabled={!disabledButtonControl} type="submit">
          <Play size={24} />
          Começar
        </Button>
      </form>
    </HomeContainer>
  )
}
