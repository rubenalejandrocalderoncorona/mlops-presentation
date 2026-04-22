import { motion, AnimatePresence } from 'framer-motion'
import { GitBranch, CheckCircle, Package, Server, Play } from 'lucide-react'

const CODE_LINES = [
  'def predict(features):',
  '    model = load_model("v1")',
  '    return model.predict(features)',
  '',
  '# git commit -m "feat: add predict fn"',
]

const CI_CHECKS = [
  'Lint & formato',
  'Pruebas unitarias (47/47)',
  'Pruebas de integración',
  'Build exitoso ✓',
]

const CONTAINER_LAYERS = [
  { label: 'FROM python:3.11-slim', color: '#dbeafe' },
  { label: 'COPY requirements.txt .', color: '#e0e7ff' },
  { label: 'RUN pip install -r requirements.txt', color: '#ede9fe' },
  { label: 'COPY . /app', color: '#d1fae5' },
  { label: 'CMD ["uvicorn", "main:app"]', color: '#fef3c7' },
]

// animStep: 0=code, 1=ci, 2=container, 3=deploy
interface Props { animStep?: number }

export function Slide1_DevOpsCICD({ animStep = 0 }: Props) {
  // Map animStep to act
  const act = animStep === 0 ? 'code' : animStep === 1 ? 'ci' : animStep === 2 ? 'container' : 'deploy'
  const deployed = animStep >= 3

  return (
    <div className="slide-container px-8">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <h1 className="text-4xl font-black text-slate-800 mb-1">
          El Ciclo de Vida <span className="text-blue-600">DevOps</span>
        </h1>
        <p className="text-slate-500 text-lg">Del código al usuario en producción — de forma continua</p>
        {animStep === 0 && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="text-slate-400 text-sm mt-1">
            Presiona <kbd className="bg-slate-100 border border-slate-300 rounded px-1.5 py-0.5 text-xs">espacio</kbd> para avanzar cada etapa
          </motion.p>
        )}
      </motion.div>

      {/* Act indicator */}
      <div className="flex justify-center gap-3 mb-6">
        {(['code', 'ci', 'container', 'deploy'] as const).map((a, i) => {
          const labels = ['① Código', '② Integración CI', '③ Contenedor', '④ Despliegue']
          const colors = ['#3b82f6', '#7c3aed', '#d97706', '#059669']
          const isPast = animStep > i
          const isCurrent = animStep === i
          return (
            <div
              key={a}
              className="px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-500"
              style={{
                background: isCurrent ? colors[i] : isPast ? `${colors[i]}25` : '#f1f5f9',
                color: isCurrent ? '#fff' : isPast ? colors[i] : '#94a3b8',
                boxShadow: isCurrent ? `0 0 14px ${colors[i]}60` : 'none',
              }}
            >
              {isPast ? '✓ ' : ''}{labels[i]}
            </div>
          )
        })}
      </div>

      <div className="max-w-4xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {act === 'code' && (
            <motion.div key="code" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
              className="flex gap-6 items-start justify-center">
              <div className="card-light p-0 overflow-hidden w-96">
                <div className="flex gap-1.5 px-3 py-2 bg-slate-800 items-center">
                  <div className="w-3 h-3 rounded-full bg-red-400" /><div className="w-3 h-3 rounded-full bg-yellow-400" /><div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="text-slate-400 text-xs ml-2 font-mono">predict.py</span>
                </div>
                <div className="bg-slate-900 p-4 min-h-36 font-mono text-sm">
                  {CODE_LINES.map((line, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.25 }}
                      className={`leading-6 ${line.startsWith('#') ? 'text-green-400' : line.startsWith('def') || line.startsWith('    return') ? 'text-blue-300' : 'text-slate-300'}`}>
                      {line || ' '}
                    </motion.div>
                  ))}
                  <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-2 h-4 bg-blue-400" />
                </div>
              </div>
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.4 }}
                className="card-light p-4 flex flex-col items-center gap-2">
                <GitBranch className="w-8 h-8 text-blue-500" />
                <span className="text-slate-800 font-bold text-sm">git commit</span>
                <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-1 text-green-700 text-xs font-mono">feat: add predict fn</div>
                <div className="text-xs text-slate-400">Push → CI se activa automáticamente</div>
              </motion.div>
            </motion.div>
          )}

          {act === 'ci' && (
            <motion.div key="ci" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
              className="card-light p-6 max-w-xl mx-auto">
              <div className="flex items-center gap-2 mb-5">
                <CheckCircle className="w-6 h-6 text-purple-600" />
                <h3 className="text-slate-800 font-bold text-lg">Pipeline CI en ejecución</h3>
              </div>
              <div className="space-y-3">
                {CI_CHECKS.map((check, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.35 }}
                    className="flex items-center gap-3">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 + i * 0.35, type: 'spring', stiffness: 300 }}>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </motion.div>
                    <span className="text-slate-700 font-medium text-sm">{check}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-green-100 overflow-hidden">
                      <motion.div className="h-full bg-green-400" initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }}
                        transition={{ delay: 0.15 + i * 0.35, duration: 0.4 }} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {act === 'container' && (
            <motion.div key="container" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
              className="flex gap-6 items-center justify-center">
              <div className="card-light p-0 overflow-hidden w-80">
                <div className="bg-slate-800 px-3 py-2 flex items-center gap-2">
                  <Package className="w-4 h-4 text-blue-400" />
                  <span className="text-slate-300 text-xs font-mono">Dockerfile</span>
                </div>
                <div className="p-4 space-y-2">
                  {CONTAINER_LAYERS.map((layer, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.2 }}
                      className="px-3 py-1.5 rounded text-xs font-mono text-slate-700" style={{ background: layer.color }}>
                      {layer.label}
                    </motion.div>
                  ))}
                </div>
              </div>
              <motion.div initial={{ scale: 0, rotate: -10 }} animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1.1, type: 'spring', stiffness: 180 }}
                className="flex flex-col items-center gap-2">
                <div className="w-28 h-28 rounded-2xl border-4 border-blue-400 bg-blue-50 flex flex-col items-center justify-center shadow-lg glow-blue">
                  <Package className="w-10 h-10 text-blue-500 mb-1" />
                  <span className="text-blue-700 font-black text-xs">app:v1.0</span>
                </div>
                <span className="text-slate-500 text-xs">Imagen Docker lista ✓</span>
              </motion.div>
            </motion.div>
          )}

          {act === 'deploy' && (
            <motion.div key="deploy" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
              className="flex gap-8 items-center justify-center">
              <motion.div initial={{ opacity: 1 }} animate={{ x: deployed ? 140 : 0, opacity: deployed ? 0 : 1 }}
                transition={{ duration: 0.9, delay: 0.3 }} className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 rounded-xl border-2 border-blue-400 bg-blue-50 flex items-center justify-center">
                  <Package className="w-8 h-8 text-blue-500" />
                </div>
                <span className="text-xs text-slate-500">app:v1.0</span>
              </motion.div>
              <div className="text-2xl text-slate-300">→</div>
              <motion.div className="flex flex-col items-center gap-2">
                <div className="w-28 h-28 rounded-2xl border-4 flex flex-col items-center justify-center shadow-lg transition-all duration-700"
                  style={{ borderColor: '#059669', background: '#f0fdf4', boxShadow: '0 0 28px rgba(5,150,105,0.4)' }}>
                  <Server className="w-8 h-8 text-green-600 mb-1" />
                  <motion.div className="flex items-center gap-1">
                    <motion.div className="w-2 h-2 rounded-full bg-green-500"
                      animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
                    <span className="text-green-700 font-bold text-xs">LIVE</span>
                  </motion.div>
                </div>
                <span className="text-xs font-semibold text-green-600">🎉 App en producción</span>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
                className="card-light p-3 text-center">
                <Play className="w-6 h-6 text-green-600 mx-auto mb-1" />
                <div className="text-slate-800 font-bold text-sm">GET /predict</div>
                <div className="text-green-600 text-xs font-mono mt-1">200 OK — 42ms</div>
                <motion.div className="mt-2 h-1 rounded-full bg-green-200 overflow-hidden"
                  initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }}
                  transition={{ duration: 1, repeat: Infinity, repeatType: 'loop' }}>
                  <div className="h-full w-1/3 bg-green-500" />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
