import { useEffect } from 'react'
import { motion } from 'framer-motion'

export function SlideRedirect() {
  const handleOpen = () => {
    window.open('http://localhost:5174', '_blank')
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.stopPropagation()
        handleOpen()
      }
    }
    window.addEventListener('keydown', handler, { capture: true })
    return () => window.removeEventListener('keydown', handler, { capture: true })
  }, [])

  return (
    <div className="slide-container bg-[#eef2ff] px-8">
      <motion.div
        className="text-center max-w-2xl flex flex-col items-center gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 rounded-2xl bg-indigo-100 border border-indigo-200 flex items-center justify-center text-4xl shadow-md"
        >
          🚀
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <h1 className="text-4xl font-black text-slate-800 mb-2">
            MLOps en SAP OBS Suite
          </h1>
          <p className="text-slate-500 text-base leading-relaxed">
            Veamos cómo estos conceptos se aplican en el ecosistema real de IA de SAP —<br />
            PANDA, FLARE, Embeddings, AI Gateway, Orchestrator y AI Assistant.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center gap-3"
        >
          <motion.button
            onClick={handleOpen}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-base shadow-lg transition-colors flex items-center gap-2"
          >
            <span>Abrir presentación</span>
            <span className="text-lg">→</span>
          </motion.button>

          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span className="font-mono bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-500">
              localhost:5174
            </span>
            <span>· presiona Enter o haz clic</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex gap-3 flex-wrap justify-center"
        >
          {['PANDA', 'FLARE', 'Embeddings', 'AI Gateway', 'Orchestrator', 'AI Assistant'].map((s, i) => (
            <motion.span
              key={s}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + i * 0.07 }}
              className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-600 shadow-sm"
            >
              {s}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
