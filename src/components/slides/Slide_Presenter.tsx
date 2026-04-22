import { motion } from 'framer-motion'

const SIDEBAR_LINKS = [
  {
    href: 'https://www.linkedin.com/in/ruben-alejandro-calderon-corona/',
    label: 'LinkedIn',
    display: 'linkedin.com/in/ruben-alejandro-calderon-corona',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: '#0077b5',
    bg: '#e8f4fb',
    borderColor: '#0077b526',
  },
  {
    href: 'https://github.com/rubenalejandrocalderoncorona',
    label: 'GitHub',
    display: 'github.com/rubenalejandrocalderoncorona',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
    color: '#24292e',
    bg: '#f0f0f0',
    borderColor: '#24292e26',
  },
  {
    href: 'https://www.youtube.com/@rubenalejandrocalderoncorona',
    label: 'YouTube',
    display: 'youtube.com/@rubenalejandrocalderoncorona',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
      </svg>
    ),
    color: '#ff0000',
    bg: '#fff0f0',
    borderColor: '#ff000026',
  },
]

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
)

const sidebarVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.4,
    },
  },
}

const sidebarItemVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
}

const centerVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
}

const repoBarVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { delay: 1.1, duration: 0.45, ease: 'easeOut' as const } },
}

export function Slide_Presenter() {
  return (
    <div className="slide-container flex items-center justify-center">
      <div className="flex flex-col items-center">
        {/* Main row: sidebar + center */}
        <div className="flex flex-row gap-8 items-center justify-center">
          {/* Left sidebar */}
          <motion.div
            className="flex flex-col gap-4"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
          >
            {SIDEBAR_LINKS.map((link) => (
              <motion.div
                key={link.label}
                className="flex flex-row items-center gap-3"
                variants={sidebarItemVariants}
              >
                <motion.a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-xl border-2 flex-shrink-0"
                  style={{
                    background: link.bg,
                    borderColor: link.borderColor,
                    color: link.color,
                    textDecoration: 'none',
                  }}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: `0 4px 18px ${link.color}40`,
                    borderColor: link.color,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.icon}
                </motion.a>
                <span
                  className="text-slate-600 font-medium"
                  style={{ whiteSpace: 'nowrap', textDecoration: 'none', fontSize: '12px' }}
                >
                  {link.display}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Center column */}
          <motion.div
            className="flex flex-col items-center gap-4"
            variants={centerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Profile picture */}
            <div className="relative">
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                  filter: 'blur(16px)',
                  opacity: 0.35,
                }}
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              <img
                src="/ProfilePicture.jpeg"
                alt="Ruben Calderon"
                className="relative w-36 h-36 rounded-full object-cover border-4 border-white shadow-2xl"
                style={{ boxShadow: '0 8px 40px rgba(99,102,241,0.3)' }}
              />
            </div>

            {/* Name & subtitle */}
            <div className="text-center">
              <h1 className="text-4xl font-black text-slate-800 mb-1 leading-tight">
                Ruben Alejandro
                <br />
                Calderon Corona
              </h1>
              <p className="text-slate-500 text-base">MLOps · Data Engineering · AI in Production</p>
            </div>

            {/* Presentation title card */}
            <div className="bg-white border border-blue-100 rounded-2xl px-8 py-4 text-center shadow-sm">
              <div className="text-xs font-bold text-blue-400 tracking-widest uppercase mb-1">
                Presentación
              </div>
              <div className="text-xl font-black text-slate-800">
                MLOps: De DevOps al ML en Producción
              </div>
            </div>

            {/* Bottom repo bar */}
            <motion.a
              href="https://github.com/rubenalejandrocalderoncorona/mlops-presentation"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white border border-blue-200 rounded-2xl px-5 py-3 shadow-sm w-full"
              style={{ textDecoration: 'none' }}
              variants={repoBarVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ boxShadow: '0 4px 20px rgba(99,102,241,0.18)', borderColor: '#6366f1' }}
            >
              <span className="text-indigo-500 flex-shrink-0">
                <GitHubIcon />
              </span>
              <span className="flex flex-col flex-1 min-w-0">
                <span className="font-bold text-slate-800 text-sm leading-tight">
                  ¡Revisa el repositorio!
                </span>
                <span
                  className="text-slate-500 text-sm truncate"
                  style={{ textDecoration: 'none' }}
                >
                  github.com/rubenalejandrocalderoncorona/mlops-presentation
                </span>
              </span>
              <span
                className="text-blue-500 text-xs italic flex-shrink-0"
                style={{ textDecoration: 'none' }}
              >
                Feel free to explore →
              </span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
