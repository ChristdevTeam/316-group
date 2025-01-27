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
    <section className="flex flex-col md:flex-row flex-1">
      <div
        className={cn(
          'md:w-[40%] p-8 md:p-16 md:pr-20 flex items-start py-16 2xl:pl-44',
          headingSection.firstSectionBackgroundColor,
        )}
      >
        <div className="w-full">
          <div className="md:max-w-none">
            <h4 className={cn(headingSection.smallHeadingClasses)}>
              {headingSection.smallHeading}
            </h4>
            <h2
              className={cn(headingSection.mainHeadingClasses)}
              dangerouslySetInnerHTML={{ __html: headingSection.mainHeading }}
            ></h2>
            <RichText
              content={headingSection.description}
              className={cn('leading-relaxed', headingSection.descriptionClasses)}
              enableGutter={false}
              enableProse={false}
            />
            {headingSection.links && headingSection.links.length > 0 && (
              <div className="flex gap-4">
                {headingSection.links.map(({ link, buttonClasses }, i) => {
                  return (
                    <div key={i} className="flex">
                      <CMSLink size={'lg'} {...link} className={cn(buttonClasses)} />
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
          'md:w-[60%] p-8 md:p-16 flex items-center  py-16 xl:pr-16 2xl:pr-44',
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
  )
}
