import { motion } from 'framer-motion'
import { CreditCard, AlertTriangle } from 'lucide-react'
import { slideContent } from '../../data/slideContent'

export function Slide2_TechDebt() {
  const { title, subtitle, items, total } = slideContent.slide2

  return (
    <div className="slide-container px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <CreditCard className="w-8 h-8 text-yellow-400" />
          <h1 className="text-4xl font-bold text-white">{title}</h1>
        </div>
        <p className="text-white/60 text-lg">{subtitle}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scaleY: 0, originY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-lg mx-auto bg-gradient-to-b from-gray-100 to-gray-200 rounded-t-lg rounded-b-sm text-gray-900 overflow-hidden shadow-2xl"
        style={{ fontFamily: 'monospace' }}
      >
        {/* Receipt header */}
        <div className="bg-gray-800 text-white text-center py-3 px-4">
          <div className="text-xs text-gray-400">FACTURA DE DEUDA TÉCNICA</div>
          <div className="font-bold text-lg">ML DEBT Co.</div>
          <div className="text-xs text-gray-400">RFC: MLT-2024-DEBT-001</div>
        </div>

        {/* Dashed line */}
        <div className="border-t-2 border-dashed border-gray-400 mx-4 my-2" />

        {/* Line items */}
        <div className="px-4 py-2 space-y-2">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.12, duration: 0.4 }}
              className="flex justify-between items-center text-sm"
            >
              <span className="text-gray-700 flex-1 pr-2">• {item.label}</span>
              <span className="font-bold text-red-600 whitespace-nowrap">{item.penalty}</span>
            </motion.div>
          ))}
        </div>

        <div className="border-t-2 border-dashed border-gray-400 mx-4 my-2" />

        {/* Total */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="px-4 pb-4"
        >
          <div className="flex justify-between items-center bg-red-100 rounded-lg p-3 border-2 border-red-400">
            <span className="font-bold text-gray-800 text-sm">TOTAL:</span>
            <span className="font-black text-red-700 text-lg">{total}</span>
          </div>
          <div className="text-center mt-3 text-xs text-gray-500">
            * Costos estimados en proyectos reales de Fortune 500
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.5 }}
        className="flex items-center justify-center gap-2 mt-6 text-yellow-400"
      >
        <AlertTriangle className="w-5 h-5" />
        <span className="text-sm">MLOps elimina esta deuda con automatización y mejores prácticas</span>
      </motion.div>
    </div>
  )
}
