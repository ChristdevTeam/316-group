'use client'
import React from 'react'

import { CaseStudy } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { CheckCheckIcon, CheckIcon } from 'lucide-react'
import { Media } from '../Media'
import { CMSLink } from '../Link'

const ProcessMapping: React.FC<{ processMapping: CaseStudy['processMapping'] }> = ({
  processMapping,
}) => {
  return (
    <div className={cn('py-16', processMapping?.bgColor)}>
      <div className="container max-w-screen-2xl">
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-white font-semibold">
          Process Mapping
        </h2>
      </div>
      <div className="container max-w-screen-2xl flex flex-col lg:flex-row justify-between align-start gap-6 md:gap-8 lg:gap-12 xl:gap-16 pt-16">
        <div className="space-y-2 lg:space-y-6 xl:space-y-8 2xl:space-y-10 w-full lg:w-1/2 lg:justify-center">
          {processMapping?.title && (
            <div className="flex items-start gap-4">
              <div className="bg-white h-8 w-8 p-2 flex justify-center items-center mt-1">
                <CheckIcon />
              </div>
              <h2
                dangerouslySetInnerHTML={{ __html: processMapping?.title }}
                className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold text-white"
              ></h2>
            </div>
          )}
          {processMapping?.steps &&
            processMapping?.steps.map((step, index) => (
              <div className="flex items-start gap-4 pl-8" key={index}>
                <div className="bg-white h-8 w-8 p-2 flex justify-center items-center mt-1">
                  <CheckCheckIcon />
                </div>
                {step.title && (
                  <p
                    dangerouslySetInnerHTML={{ __html: step.title }}
                    className="text-base lg:text-lg xl:text-xl 2xl:text-2xl text-white"
                  />
                )}
              </div>
            ))}
          {processMapping?.link && (
            <CMSLink
              className="rounded-xl text-base lg:text-lg hover:bg-white hover:text-black px-10 py-6"
              {...processMapping.link}
            />
          )}
        </div>
        <div className="flex flex-col sm:flex-row lg:flex-col w-full xl:w-1/2 justify-center">
          {processMapping?.image && <Media resource={processMapping.image} />}
        </div>
      </div>
    </div>
  )
}

export default ProcessMapping
