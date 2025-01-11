'use client'
import { ServicesAccordionBlock } from '@/payload-types'
import { ServiceAccordion } from './ServiceAccordion'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/cn'
import { CMSLink } from '@/components/Link'

type Props = {
  className?: string
} & ServicesAccordionBlock

export const ServicesAccordion: React.FC<Props> = ({ serviceItems, headingSection, blockType }) => {
  return (
    <div className="flex flex-col">
      <section className="flex flex-col md:flex-row flex-1">
        <div
          className={cn(
            'md:w-[45%] p-8 md:p-16 flex items-start py-16 xl:pl-16 2xl:pl-44',
            headingSection.firstSectionBackgroundColor,
          )}
        >
          <div className="w-full">
            <div className="md:max-w-none">
              <h2 className="text-small uppercase tracking-wider text-gray-200 mb-4">
                {headingSection.smallHeading}
              </h2>
              <h1
                className="text-3xl lg:text-4xl font-semibold text-white mb-6"
                dangerouslySetInnerHTML={{ __html: headingSection.mainHeading }}
              ></h1>
              <RichText
                content={headingSection.description}
                className="text-gray-200 mb-8 text-xl leading-relaxed"
                enableGutter={false}
                enableProse={false}
              />
              {headingSection.links && headingSection.links.length > 0 && (
                <div className="flex gap-4">
                  {headingSection.links.map(({ link, buttonClasses }, i) => {
                    return (
                      <div key={i} className="flex">
                        <CMSLink
                          size={'lg'}
                          {...link}
                          className={cn(
                            'bg-cyan-400 hover:bg-cyan-100 text-white hover:text-gray-900 px-8 py-3 font-medium transition-colors text-lg',
                            buttonClasses,
                          )}
                        />
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className={cn(
            'md:w-[55%] p-8 md:p-16 flex items-center  py-16 xl:pr-16 2xl:pr-44',
            headingSection.secondSectionBackgroundColor,
          )}
        >
          <div className="w-full">
            <div className="lg:max-w-none">
              <ServiceAccordion
                serviceItems={serviceItems}
                headingSection={headingSection}
                blockType={blockType}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
