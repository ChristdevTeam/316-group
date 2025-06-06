'use client'
import React, { useEffect, useState } from 'react'
import { Menu, X, ArrowLeft } from 'lucide-react'
import { MenuItem } from './MenuItem'
import { MegaMenuContent } from './MegaMenuContent'
import type { Link as LinkType } from './types'
import { cn } from '@/utilities/cn'
import { Header } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import { LogoDark } from '@/components/Logo/LogoDark'
import Link from 'next/link'

export const MegaMenu = ({
  className,
  header,
  theme,
}: {
  className: string
  header: Header
  theme: string | null
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    // Set initial value and listen for changes
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize() // Check initial viewport size
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleToggle = () => {
    setIsOpen(!isOpen)
    setActiveSection(null)
  }

  const handleBack = () => {
    setActiveSection(null)
  }

  const getHref = (link?: LinkType): string => {
    if (!link) {
      console.warn('No link provided to getHref.')
      return '#'
    }

    if (link.type === 'custom') {
      return link.url || '#'
    }

    if (link.type === 'reference') {
      if (link.reference?.relationTo === 'pages' && typeof link.reference.value !== 'string') {
        return `/${link.reference.value.slug}`
      } else if (
        link.reference?.relationTo === 'posts' &&
        typeof link.reference.value !== 'string'
      ) {
        return `/posts/${link.reference.value.slug}`
      }
    }

    return '#'
  }

  const getMegaMenuItems = (title: string) => {
    if (!header.navItems) return []
    return header.navItems.find((item) => item.title === title)?.megaMenuItems || []
  }

  return (
    <div className={cn('relative', className)}>
      {/* Mobile Menu Button */}
      <button
        onClick={handleToggle}
        className="lg:hidden p-2 hover:bg-gray-100 rounded-md transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center space-x-8">
        {header.navItems?.map((section, index) => (
          <MenuItem
            className={cn('font-normal justify-start text-xl')}
            isMobile={isMobile}
            key={index}
            title={section.hasMegaMenu ? section.title : section.link?.label}
            href={getHref(section.link)}
            hasMegaMenu={section.hasMegaMenu ? section.hasMegaMenu : false}
            isActive={activeSection === section.title}
            onClick={() => {
              if (section.hasMegaMenu !== true) {
              } else
                section.title &&
                  setActiveSection(activeSection === section.title ? null : section.title)
            }}
          />
        ))}
      </nav>

      {/* Overlay */}
      {(isOpen || activeSection) && (
        <div
          className={cn(
            'fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300',
            {
              'opacity-100': isOpen || activeSection,
              'opacity-0': !isOpen && !activeSection,
            },
          )}
          onClick={() => {
            setIsOpen(false)
            setActiveSection(null)
          }}
        />
      )}

      {/* Desktop Mega Menu */}
      <div
        className={cn(
          'hidden lg:block fixed top-0 right-0 bg-white dark:bg-gray-900 shadow-xl z-50 transition-all duration-300 ease-in-out pl-8',
          'rounded-l-2xl',
          'animate-in slide-in-from-top',
          {
            'translate-y-0 opacity-100': activeSection,
            '-translate-y-4 opacity-0 pointer-events-none': !activeSection,
          },
        )}
        style={{
          height: '100vh',
          width: 'max(55%, 900px)',
          visibility: activeSection ? 'visible' : 'hidden',
        }}
      >
        <div className="p-8">
          {/* Menu Items at Top */}
          <div className="flex gap-6 justify-start mb-8  pb-4">
            {header.navItems?.map((section, index) => (
              <MenuItem
                className={cn('font-normal justify-start text-xl')}
                isMobile={isMobile}
                key={index}
                href={getHref(section.link)}
                title={section.title}
                hasMegaMenu={section.hasMegaMenu ? section.hasMegaMenu : false}
                isActive={activeSection === section.title}
                onClick={() => {
                  if (section.hasMegaMenu !== true) {
                    setIsOpen(false)
                    setActiveSection(null)
                  } else
                    section.title &&
                      setActiveSection(activeSection === section.title ? null : section.title)
                }}
              />
            ))}
          </div>

          {/* Active Section Content */}
          {activeSection !== null && (
            <MegaMenuContent
              setActiveSection={setActiveSection}
              setIsOpen={setIsOpen}
              items={getMegaMenuItems(activeSection)}
            />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 top-0 bg-white dark:bg-gray-900 z-50 transition-all duration-300 ease-in-out overflow-auto lg:hidden p-4',
          {
            'translate-y-0': isOpen,
            'translate-y-full': !isOpen,
          },
        )}
      >
        <div className="flex items-center justify-between px-1 pb-16 pt-4">
          <Link href="/">
            {theme && theme === 'light' ? (
              <Logo loading="eager" priority="high" />
            ) : (
              <LogoDark loading="eager" priority="high" />
            )}
          </Link>
          <button
            onClick={handleToggle}
            className="lg:hidden hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </button>
        </div>
        {activeSection ? (
          <div
            className={cn('transition-all duration-300 ease-in-out', {
              'animate-in-left': activeSection,
              'animate-out-left': !activeSection,
            })}
          >
            <button
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:text-gray-900 py-4 px-1 w-[100%]"
            >
              <ArrowLeft className="h-6 w-6 mr-2 text-gray-900 dark:text-gray-100" />
              {/* Back to Menu */}
            </button>
            <div className="p-1">
              <MegaMenuContent
                setActiveSection={setActiveSection}
                setIsOpen={setIsOpen}
                items={getMegaMenuItems(activeSection)}
              />
            </div>
          </div>
        ) : (
          <div className="p-1 space-y-8">
            {header.navItems?.map((section) => (
              <MenuItem
                className={cn('font-normal text-2xl justify-between w-[100%]')}
                key={section.title}
                title={section.title}
                hasMegaMenu={section.hasMegaMenu ? section.hasMegaMenu : false}
                isActive={false}
                href={getHref(section.link)}
                onClick={() => {
                  if (section.hasMegaMenu !== true) {
                    setIsOpen(false)
                    setActiveSection(null)
                  } else
                    section.title &&
                      setActiveSection(activeSection === section.title ? null : section.title)
                }}
                isMobile={isMobile}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
