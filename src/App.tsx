import { AnimatePresence, motion } from 'framer-motion'
import { usePresentation } from './hooks/usePresentation'
import { Navigation } from './components/core/Navigation'
import { Slide_Presenter } from './components/slides/Slide_Presenter'
import { Slide0_History } from './components/slides/Slide0_History'
import { Slide1_DevOpsCICD } from './components/slides/Slide1_DevOpsCICD'
import { Slide2_Roles } from './components/slides/Slide2_Roles'
import { Slide3_DriftExplainer } from './components/slides/Slide3_DriftExplainer'
import { Slide4_TechDebt } from './components/slides/Slide4_TechDebt'
import { SlideDevOpsVsMLOps } from './components/slides/SlideDevOpsVsMLOps'
import { Slide5_Lifecycle } from './components/slides/Slide5_Lifecycle'
import { Slide6_Independent } from './components/slides/Slide6_Independent'
import { Slide7_DevOpsToMLOps } from './components/slides/Slide7_DevOpsToMLOps'
import { Slide8_Development } from './components/slides/Slide8_Development'
import { Slide9_InteractiveDemo } from './components/slides/Slide9_InteractiveDemo'
import { SlideLevel0_MLOps } from './components/slides/SlideLevel0_MLOps'
import { SlideLevel1_MLOps } from './components/slides/SlideLevel1_MLOps'
import { SlideLevel2_MLOps } from './components/slides/SlideLevel2_MLOps'

type SlideComponent = React.ComponentType<{ animStep?: number }>

const slides: SlideComponent[] = [
  Slide_Presenter,      // 0
  Slide0_History,       // 1
  Slide1_DevOpsCICD,    // 2 — animStep: 0-5 (6 acts)
  Slide2_Roles,         // 3 — animStep: 0-7
  Slide3_DriftExplainer, // 4
  Slide4_TechDebt,      // 5
  SlideDevOpsVsMLOps,   // 6  ← NEW
  Slide5_Lifecycle,     // 7 — animStep: 0-10
  Slide6_Independent,   // 8
  Slide7_DevOpsToMLOps, // 9
  SlideLevel0_MLOps,    // 10
  SlideLevel1_MLOps,    // 11
  SlideLevel2_MLOps,    // 12
  Slide8_Development,   // 13
  Slide9_InteractiveDemo, // 14
]

// Slides that receive animStep prop (indices in slides array)
const ANIMATED_SLIDES = new Set([2, 3, 7])

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '-60%' : '60%', opacity: 0 }),
}

export default function App() {
  const { currentSlide, totalSlides, goNext, goPrev, goTo, animStep } = usePresentation()
  const CurrentSlide = slides[currentSlide]
  const slideProps = ANIMATED_SLIDES.has(currentSlide) ? { animStep } : {}

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#eef2ff] relative">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.12] blur-3xl"
          style={{ background: 'radial-gradient(circle, #3b82f6, transparent)' }}
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-[450px] h-[450px] rounded-full opacity-[0.10] blur-3xl"
          style={{ background: 'radial-gradient(circle, #818cf8, transparent)' }}
          animate={{ x: [0, -20, 0], y: [0, -25, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 right-20 w-64 h-64 rounded-full opacity-[0.06] blur-2xl"
          style={{ background: 'radial-gradient(circle, #06b6d4, transparent)' }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* SAP Logo */}
      <img
        src="/SAP_2011_logo.svg.png"
        alt="SAP"
        className="fixed top-3 left-4 h-8 w-auto z-50 opacity-80"
      />

      {/* Slide area */}
      <AnimatePresence mode="wait" custom={1}>
        <motion.div
          key={currentSlide}
          custom={1}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <CurrentSlide {...slideProps} />
        </motion.div>
      </AnimatePresence>

      <Navigation
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        onNext={goNext}
        onPrev={goPrev}
        onGoTo={goTo}
      />
    </div>
  )
}
