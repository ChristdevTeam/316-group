import React from 'react'
import { MoveRight } from 'lucide-react'
import { cn } from '@/utilities/cn'

interface SlideTitleProps {
  title: string
  isActive: boolean
  onHover?: () => void
  className?: string
}

const SlideTitle = ({ title, isActive, onHover, className }: SlideTitleProps) => {
  return (
    <div
      className={cn(
        'transition-all duration-300 cursor-pointer flex items-center justify-between w-full group',
        isActive ? 'text-black hover:text-teal-400' : 'text-gray-300',
        className,
      )}
      onMouseEnter={onHover}
    >
      <h2 className="text-3xl lg:text-4xl font-medium text-left py-4">{title}</h2>
      <MoveRight
        className={cn(
          'transition-all duration-300 transform',
          isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4',
          'ml-4 hidden md:block',
        )}
        size={40}
      />
    </div>
  )
}

export default SlideTitle
