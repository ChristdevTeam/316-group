'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { MegaMenu } from './menu/MegaMenu'
import { LogoDark } from '@/components/Logo/LogoDark'

interface HeaderClientProps {
  header: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ header }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header
      className="container max-w-screen-2xl relative z-20   "
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="pt-6 pb-5 border-border flex justify-between items-center">
        {theme && theme === 'light' ? (
          <Link href="/">
            <Logo loading="eager" priority="high" />
          </Link>
        ) : (
          <Link href="/">
            <LogoDark loading="eager" priority="high" />
          </Link>
        )}

        <MegaMenu className="dark:text-gray-100" header={header} theme={theme} />
      </div>
    </header>
  )
}
