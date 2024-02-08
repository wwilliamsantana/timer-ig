import { HandPalm, Play } from 'phosphor-react'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { useContext } from 'react'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import * as zod from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CycleContext } from '../../context/CycleContext'

const schemaValidation = zod.object({
  task: zod.string().min(1, 'Informe uma tarefa'),
  minutesAmout: zod
    .number()
    .min(1, 'Valor mínimo é 5')
    .max(60, 'O valor máximo é 60'),
})

type FormDataProps = zod.infer<typeof schemaValidation>

export function Home() {
  const { createCountdown, idActiveCycle, interruptedButtonCountdown } =
    useContext(CycleContext)

  const hookForm = useForm<FormDataProps>({
    resolver: zodResolver(schemaValidation),
    defaultValues: {
      minutesAmout: 0,
      task: '',
    },
  })

  const { handleSubmit, watch, reset } = hookForm

  function handleCreateCountdown(data: FormDataProps) {
    createCountdown(data)
    reset()
  }

  const disabledButtonControl = watch('task')

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateCountdown)}>
        <FormProvider {...hookForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {idActiveCycle ? (
          <StopCountdownButton
            onClick={interruptedButtonCountdown}
            type="button"
          >
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
