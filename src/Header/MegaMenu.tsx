'use client'
import React, { useEffect, useState } from 'react'
import { Menu, X, MoveLeft } from 'lucide-react'
// import { cn } from "@/lib/utils";
import { MenuItem } from './menu/MenuItem'
import { MegaMenuContent } from './menu/MegaMenuContent'
import type { MenuSection } from './menu/types'
import { cn } from '@/utilities/cn'

const menuData: MenuSection[] = [
  {
    title: 'Products',
    hasMegaMenu: true,
    items: [
      { type: 'link', label: 'Analytics', href: '#' },
      { type: 'link', label: 'Engagement', href: '#' },
      { type: 'divider' },
      { type: 'subheading', label: 'Advanced Tools' },
      {
        type: 'link',
        label: 'Security',
        href: '#',
        description: 'Protect your data.',
      },
      { type: 'link', label: 'Integrations', href: '#' },
    ],
  },
  {
    title: 'Resources',
    hasMegaMenu: true,
    items: [
      { type: 'link', label: 'Documentation', href: '#' },
      { type: 'link', label: 'Guides', href: '#' },
      {
        type: 'text',
        label: 'API Reference provides detailed information about all endpoints.',
      },
    ],
  },
  {
    title: 'Random',
    hasMegaMenu: true,
    items: [
      {
        label: 'Documentation',
        href: '#',
        type: 'link',
      },
      {
        label: 'Guides',
        href: '#',
        type: 'link',
      },
      {
        label: 'Help Center',
        href: '#',
        type: 'link',
      },
      {
        label: 'API Reference',
        href: '#',
        type: 'link',
      },
    ],
  },
  {
    title: 'About',
    hasMegaMenu: true,
    items: [
      {
        label: 'Company',
        href: '#',
        type: 'link',
      },
      {
        label: 'Team',
        href: '#',
        type: 'link',
      },
      {
        label:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos magnam alias tenetur voluptates iste ea, quidem voluptatem temporibus praesentium autem facilis mollitia dicta, doloremque impedit minima saepe! Nemo, quisquam debitis.',
        href: '#',
        type: 'text',
      },
    ],
  },
  {
    title: 'Contact',
    hasMegaMenu: false,
    href: '/contact',
  },
]

export const MegaMenu = ({ className }: { className: string }) => {
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

  const handleSectionClick = (section: MenuSection) => {
    if (!section.hasMegaMenu) {
      window.location.href = section.href as string
      return
    }

    if (isMobile) {
      setActiveSection(section.title)
    } else {
      setActiveSection(activeSection === section.title ? null : section.title)
    }
  }

  const handleBack = () => {
    setActiveSection(null)
  }

  return (
    <div className={cn('relative', className)}>
      {/* Mobile Menu Button */}
      <button
        onClick={handleToggle}
        className="md:hidden p-2 hover:bg-gray-100 rounded-md transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-8">
        {menuData.map((section) => (
          <MenuItem
            isMobile={false}
            key={section.title}
            title={section.title}
            hasMegaMenu={section.hasMegaMenu}
            isActive={activeSection === section.title}
            onClick={() => handleSectionClick(section)}
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
          'hidden md:block fixed top-0 right-0 bg-white dark:bg-gray-900 shadow-xl z-50 transition-all duration-300 ease-in-out pl-8',
          'rounded-l-2xl w-[max(45%, 800px)]',
          'animate-in slide-in-from-top',
          {
            'translate-y-0 opacity-100': activeSection,
            '-translate-y-4 opacity-0 pointer-events-none': !activeSection,
          },
        )}
        style={{ height: '100vh' }}
      >
        <div className="p-8">
          {/* Menu Items at Top */}
          <div className="flex space-x-8 mb-8 border-b border-gray-100 pb-4">
            {menuData.map((section) => (
              <MenuItem
                isMobile={false}
                key={section.title}
                title={section.title}
                hasMegaMenu={section.hasMegaMenu}
                isActive={activeSection === section.title}
                onClick={() => handleSectionClick(section)}
              />
            ))}
          </div>

          {/* Active Section Content */}
          {activeSection && (
            <MegaMenuContent
              items={menuData.find((section) => section.title === activeSection)?.items || []}
            />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 top-0 bg-white dark:bg-gray-900 z-50 transition-all duration-300 ease-in-out overflow-auto md:hidden p-4',
          {
            'translate-y-0': isOpen,
            'translate-y-full': !isOpen,
          },
        )}
      >
        <div className="flex items-center justify-end p-1">
          <button
            onClick={handleToggle}
            className="md:hidden p-2 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-9 w-9" /> : <Menu className="h-9 w-9" />}
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
              className="flex items-center text-gray-600 hover:text-gray-900 py-4 px-4 w-[100%]"
            >
              <MoveLeft className="h-8 w-8 mr-2 text-gray-900 dark:text-gray-100" />
              {/* Back to Menu */}
            </button>
            <div className="p-4">
              <MegaMenuContent
                items={menuData.find((section) => section.title === activeSection)?.items || []}
              />
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {menuData.map((section) => (
              <MenuItem
                key={section.title}
                title={section.title}
                hasMegaMenu={section.hasMegaMenu}
                isActive={false}
                onClick={() => handleSectionClick(section)}
                isMobile={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
