'use client'
import * as React from 'react'
import { motion, PanInfo } from 'framer-motion'
import { cn } from '@/utilities/cn'
import { TestimonialsBlock } from '@/payload-types'
import RichText from '../RichText'
import { Media } from '../Media'

interface TestimonialCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  testimonials: Omit<TestimonialsBlock, 'blockType'>[]
  showArrows?: boolean
  showBars?: boolean
  testimonialModifier?: {
    bgColor: string
    textClasses: string[]
  }
}

const TestimonialCarousel = React.forwardRef<HTMLDivElement, TestimonialCarouselProps>(
  (
    { className, testimonials, testimonialModifier, showArrows = true, showBars = true, ...props },
    ref,
  ) => {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [exitX, setExitX] = React.useState<number>(0)
    const [containerHeight, setContainerHeight] = React.useState<number>(0)
    const cardRefs = React.useRef<(HTMLDivElement | null)[]>([])

    // Update the container height based on the tallest card
    React.useEffect(() => {
      if (cardRefs.current.length > 0) {
        const heights = cardRefs.current.map((ref) => ref?.clientHeight || 0)
        const maxHeight = Math.max(...heights)
        setContainerHeight(maxHeight)
      }
    }, [testimonials, currentIndex])

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (Math.abs(info.offset.x) > 100) {
        setExitX(info.offset.x)
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % testimonials.length)
          setExitX(0)
        }, 200)
      }
    }

    return (
      <div ref={ref} className={cn('flex items-center justify-center', className)} {...props}>
        <div
          className="relative w-full"
          style={{ height: containerHeight > 0 ? `${containerHeight}px` : 'auto' }}
        >
          {testimonials.map((testimonial, index) => {
            const isCurrentCard = index === currentIndex
            const isPrevCard = index === (currentIndex + 1) % testimonials.length
            const isNextCard = index === (currentIndex + 2) % testimonials.length

            if (!isCurrentCard && !isPrevCard && !isNextCard) return null

            return (
              <motion.div
                key={testimonial.id}
                ref={(el) => {
                  cardRefs.current[index] = el
                }}
                className={cn(
                  'absolute w-full rounded-2xl cursor-grab active:cursor-grabbing',
                  'shadow-xl',
                  testimonialModifier?.bgColor || 'bg-slate-950 dark:bg-slate-700',
                  testimonialModifier?.textClasses || 'text-white dark:text-white',
                  'dark:bg-card dark:shadow-[2px_2px_4px_rgba(0,0,0,0.4),-1px_-1px_3px_rgba(255,255,255,0.1)]',
                  'p-8',
                )}
                style={{
                  zIndex: isCurrentCard ? 3 : isPrevCard ? 2 : 1,
                }}
                drag={isCurrentCard ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={isCurrentCard ? handleDragEnd : undefined}
                initial={{
                  scale: 0.95,
                  opacity: 0,
                  y: isCurrentCard ? 0 : isPrevCard ? 8 : 16,
                  rotate: isCurrentCard ? 0 : isPrevCard ? -2 : -4,
                }}
                animate={{
                  scale: isCurrentCard ? 1 : 0.95,
                  opacity: isCurrentCard ? 1 : isPrevCard ? 0.6 : 0.3,
                  x: isCurrentCard ? exitX : 0,
                  y: isCurrentCard ? 0 : isPrevCard ? 8 : 16,
                  rotate: isCurrentCard ? exitX / 20 : isPrevCard ? -2 : -4,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                }}
              >
                {showArrows && isCurrentCard && (
                  <div className="absolute inset-x-0 top-2 flex justify-between px-4">
                    <span className="text-2xl select-none cursor-pointer text-gray-300 hover:text-gray-400 dark:text-muted-foreground dark:hover:text-primary">
                      &larr;
                    </span>
                    <span className="text-2xl select-none cursor-pointer text-gray-300 hover:text-gray-400 dark:text-muted-foreground dark:hover:text-primary">
                      &rarr;
                    </span>
                  </div>
                )}

                <div className="p-2 md:p-8 flex flex-col items-center gap-4">
                  <RichText
                    enableProse={false}
                    enableGutter={false}
                    className="text-center text-base md:text-lg lg:text-xl text-inherit dark:text-inherit"
                    content={testimonial.description}
                  />
                  {testimonial.avatar && (
                    <Media
                      resource={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <h3 className="text-lg md:text-2xl lg:text-3xl font-semibold text-inherit dark:text-inherit">
                    {testimonial.name}
                  </h3>
                </div>
              </motion.div>
            )
          })}
          {showBars && (
            <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    'w-16 h-1 rounded-full transition-colors',
                    index === currentIndex
                      ? 'bg-blue-400 dark:bg-primary'
                      : 'bg-gray-300 dark:bg-muted-foreground/30',
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    )
  },
)
TestimonialCarousel.displayName = 'TestimonialCarousel'

export { TestimonialCarousel }
export type { TestimonialCarouselProps }
