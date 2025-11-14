'use client'

import { TabBlock } from '@/payload-types'
import { cn } from '@/utilities/cn'
import React, { useState, useRef, useEffect } from 'react'
import { Media } from '@/components/Media'
import { Button } from '@/components/ui/button'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export const TabBlockComponent: React.FC<TabBlock> = ({ tabs, paddingType }) => {
  const [activeTab, setActiveTab] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const tabsRef = useRef<HTMLDivElement>(null)

  const activeTabContent = tabs?.[activeTab]

  useEffect(() => {
    if (tabsRef.current) {
      const tabsContainer = tabsRef.current
      const activeTabElement = tabsContainer.children[activeTab] as HTMLElement

      if (activeTabElement) {
        const containerWidth = tabsContainer.offsetWidth
        const tabWidth = activeTabElement.offsetWidth
        const tabLeft = activeTabElement.offsetLeft

        const scrollPosition = tabLeft - containerWidth / 2 + tabWidth / 2

        tabsContainer.scrollTo({
          left: scrollPosition,
          behavior: 'smooth',
        })
      }
    }
  }, [activeTab])

  if (!activeTabContent) return null

  return (
    <div
      className={cn(
        'w-full',
        paddingType === 'default' && 'py-16',
        paddingType === 'noPadding' && 'py-0',
        paddingType === 'paddingAdded' && 'py-32',
        paddingType === 'paddingTopOnly' && 'pt-16 pb-0',
        paddingType === 'paddingBottomOnly' && 'pb-16 pt-0',
        paddingType === 'paddingTopOnlyAdded' && 'pt-32 pb-0',
        paddingType === 'paddingBottomOnlyAdded' && 'pb-32 pt-0',
        paddingType === 'paddingTopAdded' && 'pt-32 pb-16',
        paddingType === 'paddingBottomAdded' && 'pb-32 pt-16',
        activeTabContent.mainContent?.backgroundColor,
      )}
    >
      <div className="container max-w-screen-2xl">
        {/* Tab Navigation */}
        <div
          ref={tabsRef}
          className="flex gap-0 justify-between mb-12 overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] border-b-4 border-green-200"
        >
          {tabs?.map((tab, index) => (
            <h2
              key={index}
              onClick={() => {
                setActiveTab(index)
                setIsExpanded(false)
              }}
              className={cn(
                'py-4 text-lg md:text-xl lg:text-2xl font-semibold transition-colors px-4 md:px-8 lg:px-12 whitespace-nowrap rounded-t-xl cursor-pointer',
                activeTab === index
                  ? 'bg-green-200 text-slate-950'
                  : 'text-slate-400 hover:text-slate-700',
              )}
            >
              {tab.tabName}
            </h2>
          ))}
        </div>

        {/* Main Content */}
        <div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {activeTabContent.mainContent?.media && (
              <div className={cn('p-6 md:p-8 rounded-2xl', activeTabContent.mainContent?.imgBg)}>
                <Media
                  resource={activeTabContent.mainContent.media}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            )}

            {activeTabContent.mainContent?.vcta && (
              <div
                className={cn(
                  'flex flex-col',
                  activeTabContent.mainContent.vcta.alignment === 'top' && 'justify-start h-full',
                  activeTabContent.mainContent.vcta.alignment === 'center' &&
                    'justify-center h-full',
                  activeTabContent.mainContent.vcta.alignment === 'bottom' && 'justify-end h-full',
                )}
              >
                {activeTabContent.mainContent.vcta.subtitle && (
                  <p className="text-lg">{activeTabContent.mainContent.vcta.subtitle}</p>
                )}
                {activeTabContent.mainContent.vcta.title && (
                  <h3
                    className={cn(activeTabContent.mainContent.vcta.titleClasses)}
                    dangerouslySetInnerHTML={{ __html: activeTabContent.mainContent.vcta.title }}
                  />
                )}
                {activeTabContent.mainContent.vcta.description && (
                  <RichText
                    enableGutter={false}
                    content={activeTabContent.mainContent.vcta.description}
                    className={cn(activeTabContent.mainContent.vcta.descriptionClasses)}
                  />
                )}
                <div className="flex gap-4 mt-8 md:mt-12 align-start justify-start">
                  {activeTabContent.mainContent.vcta.links?.map(({ link, buttonClasses }, i) => (
                    <CMSLink key={i} {...link} className={cn(buttonClasses)} />
                  ))}

                  <Button
                    variant="default"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center justify-center gap-2 rounded-full text-lg px-6 py-2"
                  >
                    {isExpanded ? 'Collapse' : 'See Integrations'}
                    <span
                      className={cn(
                        'transition-transform duration-300',
                        isExpanded ? 'rotate-180' : '',
                      )}
                    >
                      ↓
                    </span>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Expandable Content */}
        <div
          className={cn(
            'transition-all duration-300 ease-in-out origin-top',
            isExpanded ? 'h-auto opacity-100 mt-12' : 'h-0 opacity-0 overflow-hidden',
          )}
        >
          {activeTabContent.expandableContent && (
            <>
              {activeTabContent.expandableContent.heading && (
                <h4 className={cn(activeTabContent.expandableContent.headingClasses)}>
                  {activeTabContent.expandableContent.heading}
                </h4>
              )}

              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 mb-8">
                {activeTabContent.expandableContent.items?.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 md:gap-6 align-center bg-white rounded-2xl p-2 sm:px-4 md:px-6 shadow-sm md:shadow-lg"
                  >
                    <div className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 flex-shrink-0 flex items-center justify-center">
                      <Media resource={item.media} />
                    </div>
                    <div className="flex flex-col gap-2 align-start justify-center">
                      <h5 className={cn(activeTabContent.expandableContent?.itemTitleClasses)}>
                        {item.title}
                      </h5>
                      <p className={cn(activeTabContent.expandableContent?.itemDescriptionClasses)}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex align-end justify-end">
                <Button
                  variant="outline"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center justify-center gap-2 rounded-full text-lg px-6 py-2"
                >
                  {isExpanded ? 'Collapse' : 'See Integrations'}
                  <span
                    className={cn(
                      'transition-transform duration-300',
                      isExpanded ? 'rotate-180' : '',
                    )}
                  >
                    ↓
                  </span>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
