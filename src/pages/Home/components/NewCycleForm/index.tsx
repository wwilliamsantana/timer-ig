import { FormContainer, MinutesInput, TaskInput } from './styles'

export function NewCycleForm() {
  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        type="text"
        id="task"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!isActiveCycle}
        {...register('task')}
      />

      <label htmlFor="minutesAmout">durante</label>
      <MinutesInput
        type="number"
        id="minutesAmout"
        step={5}
        max={60}
        disabled={!!isActiveCycle}
        min={1}
        placeholder="00"
        {...register('minutesAmout', { valueAsNumber: true })}
      />
      <span>minutos.</span>
    </FormContainer>
  )
}