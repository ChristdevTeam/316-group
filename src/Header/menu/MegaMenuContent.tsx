import React from 'react'
import { Link, MegaMenuItem } from './types'

interface MegaMenuContentProps {
  items: MegaMenuItem[]
  setIsOpen: (isOpen: boolean) => void
  setActiveSection: (activeSection: string | null) => void
}

export const MegaMenuContent = ({ items, setIsOpen, setActiveSection }: MegaMenuContentProps) => {
  const getHref = (link?: Link): string => {
    if (!link) {
      console.warn('No link provided to getHref.')
      return '#'
    }

    if (link.type === 'custom') {
      return link.url || '#'
    }

    if (link.type === 'reference' && typeof link.reference?.value !== 'string') {
      if (link.reference?.relationTo === 'pages') {
        return `/${link.reference.value.slug}`
      } else {
        return `/${link.reference?.relationTo}/${link.reference?.value.slug}`
      }
    }

    console.warn('Invalid link structure:', link)
    return '#'
  }

  return (
    <div>
      {/* <h3 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wide">
      {title}
    </h3> */}
      <div className="space-y-2">
        {items.map((item, index) => {
          if (item.type === 'subHeading') {
            return (
              <h4 key={item.label} className="text-base font-small text-gray-400 pt-4 ">
                {item.label && <span dangerouslySetInnerHTML={{ __html: item.label }}></span>}
                {item.description && (
                  <span
                    className="block text-sm text-gray-900 mt-1"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  ></span>
                )}
              </h4>
            )
          }

          if (item.type === 'divider') {
            return (
              <div
                key={`divider-${index}`}
                className="border-t border-gray-900 dark:border-t-gray-100"
              ></div>
            )
          }

          if (item.type === 'text') {
            return (
              <p
                key={item.label}
                className="text-sm text-gray-900 max-w-[500px]"
                dangerouslySetInnerHTML={{ __html: item.label ? item.label : '' }}
              ></p>
            )
          }

          return (
            <a
              key={index}
              href={getHref(item.link)}
              className="block text-2xl font-normal text-gray-1000 hover:text-teal-600 py-2 transition-colors duration-200"
              onClick={() => {
                setIsOpen(false)
                setActiveSection(null)
              }}
            >
              {item.link?.label && (
                <span dangerouslySetInnerHTML={{ __html: item.link?.label }}></span>
              )}
              {item.description && (
                <span className="block text-sm text-gray-900 mt-1 hover:text-teal-600">
                  {item.description}
                </span>
              )}
            </a>
          )
        })}
      </div>
    </div>
  )
}
