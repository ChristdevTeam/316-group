import { Setting, Form as PayloadForm } from '@/payload-types'
import { cn } from '@/utilities/cn'
import React from 'react'
import RichText from '../RichText'
import { Media } from '../Media'
import { FormBlock } from '@/blocks/Form/Component'
import type { Form as PluginForm } from '@payloadcms/plugin-form-builder/types'

const CaseStudyForm: React.FC<{ endContent: Setting['caseStudySinglePageEndingContent'] }> = ({
  endContent,
}) => {
  const { sectionBackgroundColor, title, description, image, form } = endContent

  return (
    <div className={cn('w-full py-16 lg:py-24', sectionBackgroundColor)}>
      <div className="container max-w-screen-2xl grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
        <div className="space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-10">
          <div className="space-y-2 md:space-y-4">
            <h2
              className="text-2xl md:text-3xl font-semibold"
              dangerouslySetInnerHTML={{ __html: title }}
            ></h2>
            <div className="bg-blue-700 rounded-lg h-1 w-1/2 md:w-1/5"></div>
          </div>
          <RichText
            enableGutter={false}
            content={description}
            className="text-lg md:text-xl mt-2"
          />
          <Media resource={image} className="w-[150px]" />
        </div>

        {form && typeof form === 'object' && (
          <FormBlock
            hideLabels={true}
            submitClasses="rounded-lg py-6 text-md bg-blue-700 hover:bg-slate-900 transition-all duration-300"
            form={form as PluginForm}
            enableIntro={false}
          />
        )}
      </div>
    </div>
  )
}

export default CaseStudyForm
