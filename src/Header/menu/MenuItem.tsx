import React from 'react'
import { ChevronDown, MoveRight } from 'lucide-react'
import { cn } from '@/utilities/cn'
import Link from 'next/link'
// import { cn } from "@/lib/utils";

interface MenuItemProps {
  title: string | null | undefined
  hasMegaMenu: boolean
  isActive: boolean
  onClick: () => void
  isMobile: boolean
  href?: string
  className?: string
}

export const MenuItem = ({
  title,
  hasMegaMenu,
  isActive,
  onClick,
  isMobile,
  href,
  className,
}: MenuItemProps) => {
  if (href && href !== '#') {
    return (
      <Link href={href}>
        <button
          onClick={onClick}
          className={cn(
            'hover:text-emerald-600 flex items-center gap-1 transition-colors duration-200',
            isActive && 'text-emerald-600',
            isMobile && 'font-small text-2xl justify-between w-[100%]',
            !isMobile && 'font-medium justify-start text-xl',
            className,
          )}
          style={isMobile ? { marginTop: '1rem' } : {}}
        >
          {title && <span dangerouslySetInnerHTML={{ __html: title }}></span>}
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
      </Link>
    )
  } else {
    return (
      <button
        onClick={onClick}
        className={cn(
          'hover:text-emerald-600 flex items-center gap-1 transition-colors duration-200',
          isActive && 'text-emerald-600',
          isMobile && 'font-small text-2xl justify-between w-[100%]',
          !isMobile && 'font-medium justify-start text-xl',
        )}
      >
        {title && <span dangerouslySetInnerHTML={{ __html: title }}></span>}
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
  }
}
