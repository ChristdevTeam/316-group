import React from 'react'
import { ChevronDown, MoveRight } from 'lucide-react'
import { cn } from '@/utilities/cn'
// import { cn } from "@/lib/utils";

interface MenuItemProps {
  title: string
  hasMegaMenu: boolean
  isActive: boolean
  onClick: () => void
  isMobile: boolean
}

export const MenuItem = ({ title, hasMegaMenu, isActive, onClick, isMobile }: MenuItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      'hover:text-emerald-600 flex items-center justify-between gap-1 transition-colors duration-200 py-2 w-[100%]',
      isActive && 'text-emerald-600',
      isMobile && 'font-small text-2xl',
      !isMobile && 'font-medium',
    )}
  >
    {title}
    {hasMegaMenu && isMobile && (
      <MoveRight
        className={cn('h-6 w-6 transition-transform duration-200', isActive && 'rotate-180')}
      />
    )}
    {hasMegaMenu && !isMobile && (
      <ChevronDown
        className={cn('h-4 w-4 transition-transform duration-200', isActive && 'rotate-180')}
      />
    )}
  </button>
)
