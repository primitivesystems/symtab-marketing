"use client"

import { useEffect, type ReactNode } from "react"
import { motion, useAnimationControls, useReducedMotion } from "motion/react"
import { usePathname } from "next/navigation"

export function WelcomeMotion({ children }: { children: ReactNode }) {
  const controls = useAnimationControls()
  const reducedMotion = useReducedMotion()
  const pathname = usePathname()
  useEffect(() => {
    // Fade only: ancestor filters break backdrop blur and transform sticky content.
    void controls.start({
      opacity: reducedMotion ? 1 : [0.85, 1],
      transition: { duration: reducedMotion ? 0 : 0.24, ease: "easeOut" },
    })
    return () => {
      controls.stop()
    }
  }, [controls, pathname, reducedMotion])
  return (
    <motion.div initial={false} animate={controls}>
      {children}
    </motion.div>
  )
}

export function FeatureMotion({ children }: { children: ReactNode }) {
  return (
    <motion.article
      className="bento-card"
      initial={false}
    >
      {children}
    </motion.article>
  )
}
