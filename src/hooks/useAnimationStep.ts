import { useState, useCallback } from 'react'

export function useAnimationStep(maxSteps: number) {
  const [step, setStep] = useState(0)

  const nextStep = useCallback(() => {
    setStep(s => Math.min(s + 1, maxSteps - 1))
  }, [maxSteps])

  const reset = useCallback(() => setStep(0), [])

  return { step, nextStep, reset, isComplete: step >= maxSteps - 1 }
}
