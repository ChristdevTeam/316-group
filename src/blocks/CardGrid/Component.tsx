'use client'
import React, { useEffect, useState } from 'react'
import { cn } from '@/utilities/cn'
import type { CardGridBlock as CardGridBlockProps } from '@/payload-types'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import * as FaIcons from 'react-icons/fa'
import * as MdIcons from 'react-icons/md'
import * as BiIcons from 'react-icons/bi'
import * as BsIcons from 'react-icons/bs'
import * as HiIcons from 'react-icons/hi'
import * as IoIcons from 'react-icons/io'

type Props = {
  className?: string
} & CardGridBlockProps

// Helper to find icon component dynamically from imported sets
const getIconComponent = (iconName: string) => {
  if (!iconName) return null
  const prefix = iconName.slice(0, 2).toLowerCase()

  // We only bundle a few common sets to avoid massive bundle size
  // Using explicit checks
  if (prefix === 'fa') return (FaIcons as any)[iconName]
  if (prefix === 'md') return (MdIcons as any)[iconName]
  if (prefix === 'bi') return (BiIcons as any)[iconName]
  if (prefix === 'bs') return (BsIcons as any)[iconName]
  if (prefix === 'hi') return (HiIcons as any)[iconName]
  if (prefix === 'io') return (IoIcons as any)[iconName]

  return null
}

const IconDisplay = ({ name, className }: { name: string; className?: string }) => {
  const [Icon, setIcon] = useState<any>(null)

  useEffect(() => {
    const iconComp = getIconComponent(name)
    if (iconComp) setIcon(() => iconComp)
  }, [name])

  if (!Icon) return <div className={cn('w-6 h-6 bg-white/20 rounded-full', className)} /> // Fallback

  return <Icon className={className} />
}

const colorThemes: Record<string, string> = {
  blue: 'bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800',
  purple: 'bg-gradient-to-br from-purple-600 via-purple-700 to-fuchsia-800',
  orange: 'bg-gradient-to-br from-orange-500 via-orange-600 to-red-700',
  pink: 'bg-gradient-to-br from-pink-500 via-pink-600 to-rose-700',
  green: 'bg-gradient-to-br from-green-500 via-green-600 to-emerald-700',
  sky: 'bg-gradient-to-br from-sky-500 via-sky-600 to-cyan-700',
}

export const CardGridBlock: React.FC<Props> = ({ className, title, description, cards }) => {
  return (
    <div className={cn('py-16 bg-gray-50', className)}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          {title && <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">{title}</h2>}
          {description && <p className="text-lg text-slate-600 leading-relaxed">{description}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards?.map((card, index) => {
            const themeClass = colorThemes[card.colorTheme] || colorThemes.blue
            const href = card.link?.url || (card.link?.reference?.value as any)?.slug || '#'

            return (
              <div
                key={index}
                className={cn(
                  'relative overflow-hidden rounded-3xl text-white flex flex-col h-[500px] transition-transform hover:-translate-y-1 duration-300',
                  themeClass,
                )}
              >
                {/* Content Container */}
                <div className="p-8 flex flex-col h-full z-10 relative">
                  {/* Header: Icon and Title */}
                  <div className="mb-6">
                    <div className="mb-4 inline-flex items-center justify-center p-0">
                      <IconDisplay name={card.icon} className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold font-sans">{card.title}</h3>
                  </div>

                  {/* Description */}
                  <p className="text-white/90 text-sm leading-relaxed mb-6 opacity-90 line-clamp-3">
                    {card.description}
                  </p>

                  {/* Link Arrow */}
                  <div className="mb-4">
                    <Link
                      href={href}
                      className="inline-flex items-center text-sm font-semibold hover:gap-2 transition-all"
                    >
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>

                  {/* Image Container - Pushed to bottom */}
                  <div className="mt-auto relative w-full h-[220px] -mx-8 -mb-8 translate-y-2">
                    {card.image && typeof card.image === 'object' && (
                      <Image
                        src={card.image.url || ''}
                        alt={card.image.alt || card.title}
                        fill
                        className="object-cover object-top rounded-t-lg shadow-lg"
                      />
                    )}
                    {/* Mock UI if no image provided? No, image is required */}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
