import { useContext, useEffect } from 'react'
import { CountdownContainer, Separator } from './styles'

import { differenceInSeconds } from 'date-fns'
import { CycleContext } from '../../../../context/CycleContext'

export function Countdown() {
  const {
    cycleActivated,
    currentFinishedCycles,
    isSecondsPassed,
    setSecondsCurrentPassed,
  } = useContext(CycleContext)

  const totalSeconds = cycleActivated ? cycleActivated.minuteAmout * 60 : 0
  const currentSeconds = cycleActivated ? totalSeconds - isSecondsPassed : 0

  const minutosAmout = Math.floor(currentSeconds / 60)
  const secondsAmout = currentSeconds % 60

  const minutes = String(minutosAmout).padStart(2, '0')
  const seconds = String(secondsAmout).padStart(2, '0')

  useEffect(() => {
    let interval: number

    if (cycleActivated) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          cycleActivated.startDate,
        )

        if (secondsDifference >= totalSeconds) {
          currentFinishedCycles()
          clearInterval(interval)
          setSecondsCurrentPassed(totalSeconds)
        } else {
          setSecondsCurrentPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    cycleActivated,
    totalSeconds,
    currentFinishedCycles,
    setSecondsCurrentPassed,
  ])

  useEffect(() => {
    if (cycleActivated) {
      document.title = `${minutes}:${seconds}`
    } else {
      document.title = 'Ignite timer'
    }
  }, [minutes, seconds, cycleActivated])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
