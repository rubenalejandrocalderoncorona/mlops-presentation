import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

type ServerState = 'checking' | 'online' | 'offline'

interface SlideRedirectProps {
  onServerOffline?: () => void
}

export function SlideRedirect({ onServerOffline }: SlideRedirectProps) {
  const [server, setServer] = useState<ServerState>('checking')

  useEffect(() => {
    let cancelled = false
    // Probe via image tag — bypasses CORS, onload = server up, onerror = down
    const img = new Image()
    const timer = setTimeout(() => {
      img.src = ''
      if (!cancelled) { setServer('offline'); onServerOffline?.() }
    }, 3000)
    img.onload = () => {
      clearTimeout(timer)
      if (!cancelled) setServer('online')
    }
    img.onerror = () => {
      clearTimeout(timer)
      if (!cancelled) { setServer('offline'); onServerOffline?.() }
    }
    img.src = `http://localhost:5174/favicon.svg?_=${Date.now()}`
    return () => { cancelled = true; clearTimeout(timer); img.src = '' }
  }, [onServerOffline])

  const handleOpen = () => window.open('http://localhost:5174', '_blank')

  useEffect(() => {
    if (server !== 'online') return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') { e.stopPropagation(); handleOpen() }
    }
    window.addEventListener('keydown', handler, { capture: true })
    return () => window.removeEventListener('keydown', handler, { capture: true })
  }, [server])

  return (
    <div className="slide-container bg-[#eef2ff] px-8">
      {server === 'checking' && (
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-12 h-12 rounded-full border-4 border-indigo-200 border-t-indigo-600"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
          />
          <p className="text-slate-400 text-sm font-medium">Verificando servidor…</p>
        </motion.div>
      )}

      {server === 'online' && (
        <motion.div
          className="text-center max-w-2xl flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 rounded-2xl bg-green-100 border border-green-200 flex items-center justify-center text-4xl shadow-md"
          >
            🚀
          </motion.div>

          <div>
            <h1 className="text-4xl font-black text-slate-800 mb-2">MLOps en SAP OBS Suite</h1>
            <p className="text-slate-500 text-base leading-relaxed">
              Veamos cómo estos conceptos se aplican en el ecosistema real de IA de SAP —<br />
              PANDA, FLARE, Embeddings, AI Gateway, Orchestrator y AI Assistant.
            </p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-xs text-green-600 font-semibold mb-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block" />
              Servidor activo en localhost:5174
            </div>
            <motion.button
              onClick={handleOpen}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-base shadow-lg transition-colors flex items-center gap-2"
            >
              <span>Abrir presentación</span>
              <span className="text-lg">→</span>
            </motion.button>
            <p className="text-xs text-slate-400">presiona Enter o haz clic</p>
          </div>

          <div className="flex gap-3 flex-wrap justify-center">
            {['PANDA', 'FLARE', 'Embeddings', 'AI Gateway', 'Orchestrator', 'AI Assistant'].map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.07 }}
                className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-600 shadow-sm"
              >
                {s}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}

      {server === 'offline' && (
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-slate-400 text-sm">Servidor no disponible — continuando…</span>
        </motion.div>
      )}
    </div>
  )
}
