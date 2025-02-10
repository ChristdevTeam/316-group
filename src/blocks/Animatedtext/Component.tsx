'use client'

import { AnimatedText as AnimatedTextProps } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { motion } from 'framer-motion'

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  textClasses,
  animationSpeed,
  bgColor,
}) => {
  const speed = animationSpeed === 'fast' ? 6 : animationSpeed === 'slow' ? 12 : 9
  return (
    <div className={cn(bgColor, 'overflow-hidden whitespace-nowrap')}>
      <motion.div
        animate={{
          x: ['100%', '-100%'], // Slide from right to left
        }}
        transition={{
          duration: speed, // Adjust the duration
          repeat: Infinity, // Loop infinitely
          ease: 'linear', // Smooth linear animation
        }}
        whileHover={{ x: 'pause' }}
        style={{ display: 'inline-block' }}
      >
        <h2 className={cn(textClasses)} dangerouslySetInnerHTML={{ __html: text }} />
      </motion.div>
    </div>
  )
}
