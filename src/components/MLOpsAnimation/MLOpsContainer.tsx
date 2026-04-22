import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  VB_W, VB_H,
  DATA_C, ML_C, DEV_C, OPS_C,
  K_ML, K_DATA, K_DEV, K_OPS,
  COLOR,
  DATAML_PATH, DEVOPS_PATH, KNOT_PATH,
  DATAML_STAGES, DEVOPS_STAGES, KNOT_STAGES,
  type Stage,
} from './constants'
import { LoopPath } from './LoopPath'
import { AnimatedPointer } from './AnimatedPointer'
import { StageLabel } from './StageLabel'

// ─── Circle node with icon ────────────────────────────────────────────────────
function CircleNode({
  cx, cy, r, fill, stroke, label, icon, delay,
}: {
  cx: number; cy: number; r: number; fill: string; stroke: string
  label: string; icon: string; delay: number
}) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 160, damping: 14 }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      <circle cx={cx} cy={cy} r={r} fill={fill} fillOpacity={0.18} stroke={stroke} strokeWidth={2} />
      <text x={cx} y={cy - 10} textAnchor="middle" fontSize={22}>{icon}</text>
      <text x={cx} y={cy + 16} textAnchor="middle" fontSize={13} fontWeight="900" fill={stroke}>
        {label}
      </text>
    </motion.g>
  )
}

// ─── Divider line & plus / arrow labels ──────────────────────────────────────
function Operator({ x, y, text }: { x: number; y: number; text: string }) {
  return (
    <motion.text
      x={x} y={y}
      textAnchor="middle" dominantBaseline="middle"
      fontSize={38} fontWeight="900" fill="#cbd5e1"
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.9, type: 'spring', stiffness: 200 }}
      style={{ transformOrigin: `${x}px ${y}px` }}
    >
      {text}
    </motion.text>
  )
}

// ─── Main container ───────────────────────────────────────────────────────────
export function MLOpsContainer() {
  const [dmlProgress, setDmlProgress] = useState(0)
  const [dvProgress, setDvProgress]   = useState(0)
  const [knotProgress, setKnotProgress] = useState(0)

  const isActive = useCallback((stage: Stage, progress: number) =>
    progress >= stage.range[0] && progress < stage.range[1],
  [])

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full"
    >
      {/* ── Section backgrounds ─────────────────────────────────────── */}
      {/* DataML box: lobe centers at (125,117) and (285,117), R=62 → x: 125-62-30=33, y: 117-62-30=25, w: 285+62+30-33=344, h: 62*2+60=184 */}
      <rect x={18} y={18} width={366} height={202} rx={16}
        fill="white" fillOpacity={0.6} stroke="#fde68a" strokeWidth={1.5} />
      {/* DevOps box: lobe centers at (125,370) and (285,370), R=62 */}
      <rect x={18} y={262} width={366} height={220} rx={16}
        fill="white" fillOpacity={0.6} stroke="#bfdbfe" strokeWidth={1.5} />
      {/* Knot box: K_ML=(520,127), K_OPS=(750,127), K_DATA=(520,363), K_DEV=(750,363), KR=90 */}
      <rect x={415} y={18} width={430} height={464} rx={20}
        fill="white" fillOpacity={0.7} stroke="#c7d2fe" strokeWidth={2} />

      {/* ── Section badge labels ─────────────────────────────────────── */}
      {[
        { x: 60,  y: 36,  text: 'DataML', bg: '#d97706', textCol: 'white' },
        { x: 60,  y: 280, text: 'DevOps', bg: '#3b82f6', textCol: 'white' },
        { x: 460, y: 36,  text: 'MLOps',  bg: '#6366f1', textCol: 'white' },
      ].map(({ x, y, text, bg, textCol }) => (
        <motion.g key={text} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <rect x={x - 30} y={y - 12} width={60} height={18} rx={9} fill={bg} />
          <text x={x} y={y + 2} textAnchor="middle" fontSize={9.5} fontWeight="900" fill={textCol}>{text}</text>
        </motion.g>
      ))}

      {/* ── DataML loop (top-left) ───────────────────────────────────── */}
      <LoopPath
        d={DATAML_PATH}
        color1={COLOR.data} color2={COLOR.ml}
        gradId="dmlGrad"
        delay={0.4}
      />
      <CircleNode cx={DATA_C.x} cy={DATA_C.y} r={44} fill={COLOR.data} stroke={COLOR.data} label="Data" icon="☁️" delay={0.5} />
      <CircleNode cx={ML_C.x}   cy={ML_C.y}   r={44} fill={COLOR.ml}   stroke={COLOR.ml}   label="ML"   icon="🧠" delay={0.6} />

      {DATAML_STAGES.map(s => (
        <StageLabel key={s.label + 'dml'} stage={s} active={isActive(s, dmlProgress)} />
      ))}
      <AnimatedPointer
        pathD={DATAML_PATH}
        duration={7}
        onProgress={setDmlProgress}
        color="#f59e0b"
        glowColor="#fde68a"
        startDelay={2.0}
      />

      {/* ── DevOps loop (bottom-left) ────────────────────────────────── */}
      <LoopPath
        d={DEVOPS_PATH}
        color1={COLOR.dev} color2={COLOR.ops}
        gradId="dvGrad"
        delay={0.6}
      />
      <CircleNode cx={DEV_C.x} cy={DEV_C.y} r={44} fill={COLOR.dev} stroke={COLOR.dev} label="Dev" icon="💻" delay={0.7} />
      <CircleNode cx={OPS_C.x} cy={OPS_C.y} r={44} fill={COLOR.ops} stroke={COLOR.ops} label="Ops" icon="⚙️" delay={0.8} />

      {DEVOPS_STAGES.map(s => (
        <StageLabel key={s.label + 'dv'} stage={s} active={isActive(s, dvProgress)} />
      ))}
      <AnimatedPointer
        pathD={DEVOPS_PATH}
        duration={7}
        onProgress={setDvProgress}
        color="#3b82f6"
        glowColor="#bfdbfe"
        startDelay={2.2}
      />

      {/* ── Plus operator ───────────────────────────────────────────── */}
      <Operator x={201} y={244} text="+" />

      {/* ── Arrow ───────────────────────────────────────────────────── */}
      <motion.g
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.1, duration: 0.5 }}
      >
        <line x1={390} y1={244} x2={408} y2={244} stroke="#94a3b8" strokeWidth={2.5} strokeLinecap="round" />
        <polygon points="408,238 418,244 408,250" fill="#94a3b8" />
        <text x={403} y={260} textAnchor="middle" fontSize={8} fill="#94a3b8" fontWeight="700">=</text>
      </motion.g>

      {/* ── MLOps knot (right) ───────────────────────────────────────── */}
      <LoopPath
        d={KNOT_PATH}
        color1={COLOR.ml} color2={COLOR.dev}
        gradId="knotGrad"
        delay={0.8}
      />
      <CircleNode cx={K_ML.x}   cy={K_ML.y}   r={52} fill={COLOR.ml}   stroke={COLOR.ml}   label="ML"   icon="🧠" delay={1.0} />
      <CircleNode cx={K_OPS.x}  cy={K_OPS.y}  r={52} fill={COLOR.ops}  stroke={COLOR.ops}  label="Ops"  icon="⚙️" delay={1.1} />
      <CircleNode cx={K_DATA.x} cy={K_DATA.y} r={52} fill={COLOR.data} stroke={COLOR.data} label="Data" icon="☁️" delay={1.2} />
      <CircleNode cx={K_DEV.x}  cy={K_DEV.y}  r={52} fill={COLOR.dev}  stroke={COLOR.dev}  label="Dev"  icon="💻" delay={1.3} />

      {KNOT_STAGES.map(s => (
        <StageLabel key={s.label + 'knot'} stage={s} active={isActive(s, knotProgress)} />
      ))}
      <AnimatedPointer
        pathD={KNOT_PATH}
        duration={10}
        onProgress={setKnotProgress}
        color="#a5b4fc"
        glowColor="#e0e7ff"
        startDelay={2.5}
      />
    </svg>
  )
}
