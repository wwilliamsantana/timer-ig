import { FormContainer, MinutesInput, TaskInput } from './styles'
import { useContext } from 'react'

import { useFormContext } from 'react-hook-form'
import { CycleContext } from '../../../../context/CycleContext'

export function NewCycleForm() {
  const { idActiveCycle } = useContext(CycleContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        type="text"
        id="task"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!idActiveCycle}
        {...register('task')}
      />

      <label htmlFor="minutesAmout">durante</label>
      <MinutesInput
        type="number"
        id="minutesAmout"
        step={5}
        max={60}
        disabled={!!idActiveCycle}
        min={5}
        placeholder="00"
        {...register('minutesAmout', { valueAsNumber: true })}
      />
      <span>minutos.</span>
    </FormContainer>
  )
}
