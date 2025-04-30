import { CaseStudy } from '@/payload-types'
import { cn } from '@/utilities/cn'
import React from 'react'
import { CMSLink } from '../Link'

const CTA: React.FC<{ cta: CaseStudy['callToAction'] }> = ({ cta }) => {
  return (
    <div className={cn('container max-w-screen-2xl mb-8')}>
      <div
        className={cn(
          'flex flex-col md:flex-row py-4 md:py-0 md:px-8 gap-4 lg:gap-8',
          cta?.bgColor,
        )}
      >
        <div className="p-8 md:p-12 bg-slate-100 space-y-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold">{cta?.title}</h2>
          <div className="bg-blue-700 h-1 w-3/4 lg:w-1/2 rounded-lg"></div>
          <p className="text-lg lg:text-2xl">{cta?.description}</p>
        </div>
        <div className="flex justify-center items-center px-8">
          <CMSLink
            {...cta?.link}
            icon
            iconType="arrow-right"
            appearance="inline"
            className="text-white text-lg md:text-xl lg:text-2xl text-nowrap"
          />
        </div>
      </div>
    </div>
  )
}

export default CTA
