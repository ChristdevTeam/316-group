import React from 'react'
import { FullCardGradient as FullCardGradientProps } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import colors from 'tailwindcss/colors'

export const FullCardGradient: React.FC<FullCardGradientProps> = (props) => {
  const {
    title,
    titleClasses,
    heading,
    headingClasses,
    links,
    iconList,
    bgColor1,
    bgColor2,
    paddingType,
  } = props

  const resolveColor = (color) => {
    const [base, shade] = color.split('-') // Split color into base and shade
    return colors[base]?.[shade] || color // Return Tailwind color or fallback to raw value
  }
  const resolvedColor1 = resolveColor(bgColor1) // e.g., colors.teal[300]
  const resolvedColor2 = resolveColor(bgColor2) // e.g., colors.teal[600]

  return (
    <div
      className={cn(
        'container max-w-screen-2xl',
        paddingType === 'default' && 'py-16',
        paddingType === 'noPadding' && 'py-0',
        paddingType === 'paddingAdded' && 'py-32',
        paddingType === 'paddingTopOnly' && 'pt-16 pb-0',
        paddingType === 'paddingBottomOnly' && 'pb-16 pt-0',
        paddingType === 'paddingTopOnlyAdded' && 'pt-32 pb-0',
        paddingType === 'paddingBottomOnlyAdded' && 'pb-32 pt-0',
        paddingType === 'paddingTopAdded' && 'pt-32 pb-16',
        paddingType === 'paddingBottomAdded' && 'pb-32 pt-16',
      )}
    >
      <div>
        <h3 className={cn(titleClasses, 'lg:py-12 py-8')}>{title}</h3>
      </div>

      <div
        className={cn('rounded-[40px] p-12 md:p-16 lg:py-20 relative overflow-hidden')}
        style={{
          backgroundImage: `linear-gradient(to bottom, ${resolvedColor1}, ${resolvedColor2})`,
        }}
      >
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left side - Heading and Button */}
          <div className="space-y-16 md:w-[60%]">
            <h4
              className={cn(headingClasses, 'text-white')}
              dangerouslySetInnerHTML={{ __html: heading }}
            ></h4>{' '}
            {links && links.length > 0 && (
              <div className="flex justify-start content-center gap-4">
                {links.map(({ link, buttonClasses }, i) => {
                  return (
                    <CMSLink
                      key={i}
                      {...link}
                      className={cn(
                        'bg-white text-gray-800 px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all',
                        buttonClasses,
                      )}
                      size={'lg'}
                    />
                  )
                })}
              </div>
            )}
          </div>

          {/* Right side - Features */}
          <div className="space-y-8">
            {iconList &&
              iconList.length > 0 &&
              iconList.map((item, i) => {
                return (
                  <div className="flex items-center space-x-4" key={i}>
                    {item.icon && <Media resource={item.icon} className="w-14 h-14 text-white" />}
                    <div className="text-white">
                      <p className="font-medium text-lg">{item.title}</p>
                      <p className="opacity-90">{item.subtitle}</p>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}
