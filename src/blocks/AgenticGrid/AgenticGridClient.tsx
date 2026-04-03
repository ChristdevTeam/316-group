'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { cn } from '@/utilities/cn'
import { Icon } from '@/components/Icon'
import { Media } from '@/components/Media'
import type { AgenticGridBlock } from '@/payload-types'

// ── Grid position maps ──
// 10 items: 3 cols × 4 rows, center card spans rows 2–3
const GRID_MAP_10: Record<number, { col: number; row: number }> = {
  0: { col: 1, row: 1 },
  1: { col: 2, row: 1 },
  2: { col: 3, row: 1 },
  3: { col: 1, row: 2 },
  4: { col: 3, row: 2 },
  5: { col: 1, row: 3 },
  6: { col: 3, row: 3 },
  7: { col: 1, row: 4 },
  8: { col: 2, row: 4 },
  9: { col: 3, row: 4 },
}

// 8 items: 3 cols × 3 rows, center card is single cell row 2
const GRID_MAP_8: Record<number, { col: number; row: number }> = {
  0: { col: 1, row: 1 },
  1: { col: 2, row: 1 },
  2: { col: 3, row: 1 },
  3: { col: 1, row: 2 },
  4: { col: 3, row: 2 },
  5: { col: 1, row: 3 },
  6: { col: 2, row: 3 },
  7: { col: 3, row: 3 },
}

export const AgenticGridClient: React.FC<AgenticGridBlock> = ({
  headerSection,
  centerCard,
  items,
  backgroundType,
  sectionBgColor,
  sectionGradient,
  activeBorderColor,
}) => {
  const [activeId, setActiveId] = useState(0)
  const [connectorD, setConnectorD] = useState('')
  const [connectorVisible, setConnectorVisible] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map())

  const itemCount = items?.length ?? 0
  const is10 = itemCount > 8
  const gridMap = is10 ? GRID_MAP_10 : GRID_MAP_8
  const totalRows = is10 ? 4 : 3

  // Border color utility → convert from raw color picker value to border-{value}
  const borderColorClass = activeBorderColor ? `border-${activeBorderColor}` : 'border-white'

  // ── Connector line calculation ──
  const updateConnector = useCallback(() => {
    const grid = gridRef.current
    const center = centerRef.current
    const activeCard = cardRefs.current.get(activeId)
    if (!grid || !center || !activeCard) return

    const gridRect = grid.getBoundingClientRect()
    const cardRect = activeCard.getBoundingClientRect()
    const centerRect = center.getBoundingClientRect()

    const c = {
      left: centerRect.left - gridRect.left,
      top: centerRect.top - gridRect.top,
      right: centerRect.right - gridRect.left,
      bottom: centerRect.bottom - gridRect.top,
      width: centerRect.width,
      height: centerRect.height,
    }

    const a = {
      left: cardRect.left - gridRect.left,
      top: cardRect.top - gridRect.top,
      right: cardRect.right - gridRect.left,
      bottom: cardRect.bottom - gridRect.top,
      width: cardRect.width,
      height: cardRect.height,
    }

    const acx = a.left + a.width / 2
    const acy = a.top + a.height / 2

    let sx: number, sy: number, ex: number, ey: number

    if (acy < c.top) {
      // Above center
      sy = a.bottom
      ey = c.top
      if (acx < c.left) {
        sx = a.right
        ex = c.left
      } else if (acx > c.right) {
        sx = a.left
        ex = c.right
      } else {
        sx = acx
        ex = acx
      }
    } else if (acy > c.bottom) {
      // Below center
      sy = a.top
      ey = c.bottom
      if (acx < c.left) {
        sx = a.right
        ex = c.left
      } else if (acx > c.right) {
        sx = a.left
        ex = c.right
      } else {
        sx = acx
        ex = acx
      }
    } else {
      // Same rows as center
      sy = acy
      ey = acy
      if (acx < c.left) {
        sx = a.right
        ex = c.left
      } else {
        sx = a.left
        ex = c.right
      }
    }

    setConnectorD(`M ${sx} ${sy} L ${ex} ${ey}`)
    setConnectorVisible(true)
  }, [activeId])

  useEffect(() => {
    const timer = setTimeout(updateConnector, 100)
    return () => clearTimeout(timer)
  }, [updateConnector])

  useEffect(() => {
    window.addEventListener('resize', updateConnector)
    return () => window.removeEventListener('resize', updateConnector)
  }, [updateConnector])

  // ── Background classes ──
  const sectionBg =
    backgroundType === 'gradient' && sectionGradient
      ? cn(
          sectionGradient.type,
          sectionGradient.fromColor,
          sectionGradient.viaColor,
          sectionGradient.toColor,
        )
      : sectionBgColor || 'bg-blue-950'

  return (
    <section className={cn('w-full py-16 lg:py-24 px-[5%] text-white', sectionBg)}>
      {/* Header */}
      {headerSection && (
        <div className="mb-12">
          {headerSection.tagline && (
            <p
              className={cn(
                'tracking-widest mb-8 pb-8 border-b border-white/60',
                headerSection.taglineClasses,
              )}
              dangerouslySetInnerHTML={{ __html: headerSection.tagline }}
            />
          )}
          {headerSection.title && (
            <h2
              className={cn('mb-4', headerSection.titleClasses)}
              dangerouslySetInnerHTML={{ __html: headerSection.title }}
            />
          )}
          {headerSection.description && (
            <p className={cn('leading-relaxed max-w-3xl', headerSection.descriptionClasses)}>
              {headerSection.description}
            </p>
          )}
        </div>
      )}

      {/* Main Content: Accordion + Grid */}
      <div className="flex flex-col-reverse lg:flex-row gap-12 items-start">
        {/* ── Left: Accordion ── */}
        <div className="w-full lg:w-1/2">
          {items?.map((item, index) => {
            const isActive = activeId === index
            return (
              <div
                key={item.id || index}
                className="border-b border-white/10 cursor-pointer"
                onClick={() => setActiveId(index)}
              >
                <div className="flex justify-between items-center py-4 group">
                  <span
                    className={cn(
                      'font-medium text-lg transition-colors',
                      isActive ? 'text-white' : 'text-white/70',
                    )}
                  >
                    {item.title}
                  </span>
                  <svg
                    className={cn(
                      'w-5 h-5 transition-transform duration-300 text-white/60',
                      isActive && 'rotate-180',
                    )}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                <div
                  className={cn(
                    'overflow-hidden transition-all duration-300 text-white/70 text-[0.95rem] leading-relaxed',
                    isActive ? 'max-h-52 mb-4' : 'max-h-0',
                  )}
                >
                  <p className="pb-2">{item.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Right: Interactive Grid ── */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div
            ref={gridRef}
            className="relative w-full"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: `repeat(${totalRows}, auto)`,
              gap: '1.25rem',
            }}
          >
            {/* SVG Overlay */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ zIndex: 15 }}
            >
              <path
                d={connectorD}
                className={cn(
                  'transition-all duration-300 fill-none',
                  connectorVisible ? 'opacity-100' : 'opacity-0',
                )}
                stroke="rgba(255,255,255,0.6)"
                strokeWidth={1.5}
              />
            </svg>

            {/* Center Card */}
            <div
              ref={centerRef}
              className={cn(
                'rounded-xl flex items-center justify-center relative',
                centerCard?.bgColor || 'bg-[#000a1a]',
                'border border-white/20',
              )}
              style={{
                gridColumn: '2',
                gridRow: is10 ? '2 / 4' : '2',
                zIndex: 5,
                boxShadow: '0 0 50px rgba(0,0,0,0.6)',
              }}
            >
              {centerCard?.image && typeof centerCard.image === 'object' ? (
                <Media
                  resource={centerCard.image}
                  imgClassName="object-contain max-h-[80%] max-w-[80%]"
                />
              ) : (
                <div
                  className={cn(
                    'font-bold text-2xl tracking-wide flex flex-col items-center justify-center text-center',
                    centerCard?.textColor || 'text-orange-500',
                  )}
                >
                  <span>{centerCard?.text || 'AGENTIC'}</span>
                  {centerCard?.superscript && (
                    <span className="text-xs -mt-1">{centerCard.superscript}</span>
                  )}
                </div>
              )}
            </div>

            {/* Industry Cards */}
            {items?.map((item, index) => {
              const pos = gridMap[index]
              if (!pos) return null
              const isActive = activeId === index

              return (
                <div
                  key={item.id || index}
                  ref={(el) => {
                    if (el) cardRefs.current.set(index, el)
                  }}
                  className={cn(
                    'rounded-md flex flex-col items-center justify-center px-4 py-6 cursor-pointer transition-all duration-300 text-center relative min-h-[130px]',
                    'bg-white/5 border border-white/10 hover:bg-slate-900/60',
                    isActive && cn('bg-slate-900/80', borderColorClass),
                  )}
                  style={{
                    gridColumn: pos.col,
                    gridRow: pos.row,
                    zIndex: isActive ? 20 : 10,
                    borderWidth: isActive ? '1.5px' : '1px',
                  }}
                  onClick={() => setActiveId(index)}
                >
                  {item.icon && (
                    <Icon name={item.icon} className="text-2xl mb-2 opacity-80" size={24} />
                  )}
                  <span className="text-[0.7rem] font-medium leading-tight">{item.title}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
