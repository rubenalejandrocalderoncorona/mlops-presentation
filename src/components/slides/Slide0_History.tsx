import { motion } from 'framer-motion'
import { Cog, Infinity, Brain, FileText, Factory } from 'lucide-react'

const milestones = [
  {
    year: '1950s',
    title: 'Toyota Production System',
    subtitle: 'Lean Manufacturing',
    description: 'Taiichi Ohno introduce el sistema de producción Just-in-Time: eliminar desperdicio, mejora continua (Kaizen) y flujo de valor.',
    icon: <Factory className="w-6 h-6" />,
    color: '#dc2626',
    detail: 'La base filosófica de DevOps y MLOps',
  },
  {
    year: '2001',
    title: 'Manifiesto Ágil',
    subtitle: 'Agile Software Development',
    description: '17 desarrolladores definen los principios del desarrollo ágil: individuos, software funcional, colaboración y respuesta al cambio.',
    icon: <FileText className="w-6 h-6" />,
    color: '#d97706',
    detail: 'Iteraciones cortas → feedback rápido',
  },
  {
    year: '2008',
    title: 'DevOps nace',
    subtitle: 'Velocity Conference',
    description: 'Patrick Debois y Andrew Shafer proponen unir Desarrollo y Operaciones. Ciclos CI/CD, infraestructura como código, entrega continua.',
    icon: <Infinity className="w-6 h-6" />,
    color: '#2563eb',
    detail: 'Dev + Ops = entrega de software continua',
  },
  {
    year: '2015',
    title: 'Hidden Technical Debt',
    subtitle: 'Paper de Google/NIPS',
    description: 'Sculley et al. publican el paper seminal que expone la deuda técnica masiva en sistemas ML reales en producción a escala.',
    icon: <Cog className="w-6 h-6" />,
    color: '#7c3aed',
    detail: '"Solo el 5% del código es ML real"',
  },
  {
    year: '2017+',
    title: 'MLOps emerge',
    subtitle: 'Operaciones de Machine Learning',
    description: 'La industria reconoce que el ML en producción requiere sus propias prácticas: versionado de datos, monitoreo de drift, reentrenamiento continuo.',
    icon: <Brain className="w-6 h-6" />,
    color: '#059669',
    detail: 'CI + CD + CT = MLOps',
  },
]

export function Slide0_History() {
  return (
    <div className="slide-container blueprint-grid px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-black text-slate-800 mb-1">
          Del Lean al <span className="text-blue-600">MLOps</span>
        </h1>
        <p className="text-slate-500 text-lg">70 años de evolución hacia la automatización del ML</p>
      </motion.div>

      {/* Timeline */}
      <div className="relative max-w-5xl mx-auto w-full">
        {/* SVG connecting line */}
        <svg
          className="absolute top-10 left-0 w-full"
          style={{ height: 4, overflow: 'visible' }}
          viewBox={`0 0 100 4`}
          preserveAspectRatio="none"
        >
          <motion.line
            x1="8" y1="2" x2="92" y2="2"
            stroke="#bfdbfe"
            strokeWidth="2"
            strokeDasharray="6 3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
          />
        </svg>

        <div className="flex justify-between items-start gap-2 relative">
          {milestones.map((m, i) => (
            <motion.div
              key={m.year}
              className="flex-1 flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.18, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Node dot on timeline */}
              <motion.div
                className="w-10 h-10 rounded-full border-4 border-white flex items-center justify-center shadow-lg mb-3 relative z-10"
                style={{ background: m.color }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.18, type: 'spring', stiffness: 250 }}
              >
                <div className="text-white">{m.icon}</div>
              </motion.div>

              {/* Card */}
              <motion.div
                className="card-light p-3 w-full text-center hover:shadow-lg transition-shadow cursor-default"
                whileHover={{ y: -3 }}
                style={{ borderTop: `3px solid ${m.color}` }}
              >
                <div
                  className="text-xs font-black mb-1 tracking-wider"
                  style={{ color: m.color }}
                >
                  {m.year}
                </div>
                <h3 className="text-slate-800 font-bold text-sm leading-tight mb-0.5">{m.title}</h3>
                <div className="text-blue-500 text-xs font-medium mb-2">{m.subtitle}</div>
                <p className="text-slate-500 text-xs leading-relaxed mb-2">{m.description}</p>
                <div
                  className="text-xs font-semibold px-2 py-1 rounded-full inline-block"
                  style={{ background: `${m.color}15`, color: m.color }}
                >
                  {m.detail}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="mt-6 text-slate-400 text-sm text-center"
      >
        Usa → para continuar
      </motion.p>
    </div>
  )
}
