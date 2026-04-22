import { motion } from 'framer-motion'
import {
  Briefcase, BarChart2, Database, FlaskConical, Code2, Server,
} from 'lucide-react'
import { slideContent } from '../../data/slideContent'
import { StaggerContainer, staggerItem } from '../animations/AnimationWrappers'

const iconMap: Record<string, React.ReactNode> = {
  briefcase: <Briefcase className="w-8 h-8" />,
  'bar-chart': <BarChart2 className="w-8 h-8" />,
  database: <Database className="w-8 h-8" />,
  flask: <FlaskConical className="w-8 h-8" />,
  code: <Code2 className="w-8 h-8" />,
  server: <Server className="w-8 h-8" />,
}

export function Slide1_Roles() {
  const { title, subtitle, roles } = slideContent.slide1

  return (
    <div className="slide-container px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>
        <p className="text-white/60 text-lg">{subtitle}</p>
      </motion.div>

      <StaggerContainer
        staggerDelay={0.12}
        className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto"
      >
        {roles.map(role => (
          <motion.div
            key={role.id}
            variants={staggerItem}
            className="relative p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors group cursor-default"
            style={{ borderColor: `${role.color}40` }}
            whileHover={{ scale: 1.03, borderColor: role.color }}
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center mb-3"
              style={{ backgroundColor: `${role.color}25`, color: role.color }}
            >
              {iconMap[role.icon]}
            </div>
            <h3 className="text-white font-semibold text-base mb-1">{role.title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{role.description}</p>
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{ boxShadow: `0 0 20px ${role.color}30` }}
            />
          </motion.div>
        ))}
      </StaggerContainer>
    </div>
  )
}
