import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react'
import { motion } from 'framer-motion'

interface NavigationProps {
  currentSlide: number
  totalSlides: number
  onNext: () => void
  onPrev: () => void
  onGoTo: (i: number) => void
}

export function Navigation({ currentSlide, totalSlides, onNext, onPrev, onGoTo }: NavigationProps) {
  const progress = ((currentSlide + 1) / totalSlides) * 100
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {})
    } else {
      document.exitFullscreen().catch(() => {})
    }
  }

  return (
    <>
      {/* Progress bar */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-blue-100 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      {/* Slide dots */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-50">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            onClick={() => onGoTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentSlide
                ? 'bg-blue-500 w-5'
                : 'bg-blue-200 hover:bg-blue-400 w-1.5'
            }`}
          />
        ))}
      </div>

      {/* Prev arrow */}
      {currentSlide > 0 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onPrev}
          className="fixed left-4 top-1/2 -translate-y-1/2 z-50 p-2.5 rounded-full bg-white border border-blue-100 shadow-md hover:bg-blue-50 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-blue-600" />
        </motion.button>
      )}

      {/* Next arrow */}
      {currentSlide < totalSlides - 1 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onNext}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-50 p-2.5 rounded-full bg-white border border-blue-100 shadow-md hover:bg-blue-50 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-blue-600" />
        </motion.button>
      )}

      {/* Top-right: slide counter + fullscreen */}
      <div className="fixed top-3 right-4 z-50 flex items-center gap-2">
        <span className="text-slate-400 text-xs font-mono bg-white/80 px-2 py-1 rounded-full border border-blue-100">
          {currentSlide + 1} / {totalSlides}
        </span>
        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-full bg-white border border-blue-100 shadow-sm hover:bg-blue-50 transition-colors"
          title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
        >
          {isFullscreen
            ? <Minimize2 className="w-4 h-4 text-blue-600" />
            : <Maximize2 className="w-4 h-4 text-blue-600" />}
        </button>
      </div>
    </>
  )
}
