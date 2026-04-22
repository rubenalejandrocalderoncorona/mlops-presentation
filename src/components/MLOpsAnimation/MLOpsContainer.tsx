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
      style={{ overflow: 'visible' }}
    >
      {/* ── Section backgrounds ─────────────────────────────────────── */}
      <rect x={20} y={20} width={360} height={195} rx={16}
        fill="white" fillOpacity={0.6} stroke="#fde68a" strokeWidth={1.5} />
      <rect x={20} y={265} width={360} height={195} rx={16}
        fill="white" fillOpacity={0.6} stroke="#bfdbfe" strokeWidth={1.5} />
      <rect x={430} y={20} width={460} height={440} rx={20}
        fill="white" fillOpacity={0.7} stroke="#c7d2fe" strokeWidth={2} />

      {/* ── Section badge labels ─────────────────────────────────────── */}
      {[
        { x: 55,  y: 36, text: 'DataML',  bg: '#d97706', textCol: 'white' },
        { x: 55,  y: 281, text: 'DevOps',  bg: '#3b82f6', textCol: 'white' },
        { x: 470, y: 36, text: 'MLOps',   bg: '#6366f1', textCol: 'white' },
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
      <Operator x={200} y={240} text="+" />

      {/* ── Arrow ───────────────────────────────────────────────────── */}
      <motion.g
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.1, duration: 0.5 }}
      >
        <line x1={393} y1={238} x2={425} y2={238} stroke="#94a3b8" strokeWidth={2.5} strokeLinecap="round" />
        <polygon points="425,232 435,238 425,244" fill="#94a3b8" />
        <text x={412} y={255} textAnchor="middle" fontSize={8} fill="#94a3b8" fontWeight="700">=</text>
      </motion.g>

      {/* ── MLOps knot (right) ───────────────────────────────────────── */}
      <LoopPath
        d={KNOT_PATH}
        color1={COLOR.ml} color2={COLOR.dev}
        gradId="knotGrad"
        delay={0.8}
      />
      <CircleNode cx={K_ML.x}   cy={K_ML.y}   r={K_ML.r}   fill={COLOR.ml}   stroke={COLOR.ml}   label="ML"   icon="🧠" delay={1.0} />
      <CircleNode cx={K_OPS.x}  cy={K_OPS.y}  r={K_OPS.r}  fill={COLOR.ops}  stroke={COLOR.ops}  label="Ops"  icon="⚙️" delay={1.1} />
      <CircleNode cx={K_DATA.x} cy={K_DATA.y} r={K_DATA.r} fill={COLOR.data} stroke={COLOR.data} label="Data" icon="☁️" delay={1.2} />
      <CircleNode cx={K_DEV.x}  cy={K_DEV.y}  r={K_DEV.r}  fill={COLOR.dev}  stroke={COLOR.dev}  label="Dev"  icon="💻" delay={1.3} />

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
