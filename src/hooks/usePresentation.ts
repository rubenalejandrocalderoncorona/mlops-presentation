import { useState, useEffect, useCallback, useRef } from 'react'

export const TOTAL_SLIDES = 16

// Max anim steps per slide index (0 = no sub-steps)
const SLIDE_ANIM_STEPS: Record<number, number> = {
  2: 5,  // DevOpsCICD (index 2): steps 0-5
  3: 7,  // Roles (index 3): steps 1-6 highlight each role, 7 = all lit
  6: 10, // Lifecycle (index 6): steps 1-10 explore each stage
}

export function usePresentation() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [animStep, setAnimStep] = useState(0)

  // Keep refs in sync so keydown handler always reads current values
  const slideRef = useRef(0)
  const stepRef = useRef(0)

  useEffect(() => { slideRef.current = currentSlide }, [currentSlide])
  useEffect(() => { stepRef.current = animStep }, [animStep])

  const resetStep = useCallback(() => {
    setAnimStep(0)
    stepRef.current = 0
  }, [])

  const goNext = useCallback(() => {
    setCurrentSlide(s => {
      const next = Math.min(s + 1, TOTAL_SLIDES - 1)
      slideRef.current = next
      return next
    })
    resetStep()
  }, [resetStep])

  const goPrev = useCallback(() => {
    setCurrentSlide(s => {
      const prev = Math.max(s - 1, 0)
      slideRef.current = prev
      return prev
    })
    resetStep()
  }, [resetStep])

  const goTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, TOTAL_SLIDES - 1))
    setCurrentSlide(clamped)
    slideRef.current = clamped
    resetStep()
  }, [resetStep])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return

      if (e.key === ' ') {
        e.preventDefault()
        const max = SLIDE_ANIM_STEPS[slideRef.current] ?? 0
        if (max > 0 && stepRef.current < max) {
          const next = stepRef.current + 1
          stepRef.current = next
          setAnimStep(next)
        }
      } else if (e.key === 'b' || e.key === 'B') {
        e.preventDefault()
        const max = SLIDE_ANIM_STEPS[slideRef.current] ?? 0
        if (max > 0 && stepRef.current > 0) {
          const prev = stepRef.current - 1
          stepRef.current = prev
          setAnimStep(prev)
        }
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        goNext()
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        goPrev()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [goNext, goPrev])

  return { currentSlide, totalSlides: TOTAL_SLIDES, goNext, goPrev, goTo, animStep, resetStep }
}
