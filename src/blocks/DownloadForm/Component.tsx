'use client'
import type { DownloadFormBlock as DownloadFormBlockProps } from '@/payload-types'
import { FormBlock } from '@/blocks/Form/Component'
import type { Form as PluginForm } from '@payloadcms/plugin-form-builder/types'
import { cn } from '@/utilities/cn'
import { CheckCheckIcon } from 'lucide-react'

export const DownloadFormBlock: React.FC<
  DownloadFormBlockProps & { id?: string; blockType?: 'downloadFormBlock' }
> = ({
  form,
  fileToDownload,
  sectionTitle,
  sectionTitleClasses,
  columnTitle,
  columnTitleClasses,
  listData,
  listItemClasses,
  listTitleClasses,
  endText,
}) => {
  return (
    <div className={cn('container max-w-screen-2xl py-16')}>
      <h2
        id="downloadForm"
        className={cn(
          typeof sectionTitleClasses === 'object' && sectionTitleClasses?.classes,
          'mb-8',
        )}
      >
        {sectionTitle}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="space-y-6">
          <h3
            className={cn(
              typeof columnTitleClasses === 'string' ? '' : columnTitleClasses?.classes,
            )}
          >
            {columnTitle}
          </h3>
          <div className="space-y-8">
            {listData &&
              listData.map((list, index) => (
                <div key={index} className="md:pl-8 lg:pl-12">
                  <div
                    className={cn(
                      typeof listTitleClasses === 'string' ? '' : listTitleClasses?.classes,
                      'mb-4 flex justify-left items-start gap-4',
                    )}
                  >
                    <div className="bg-blue-600">
                      <CheckCheckIcon size={32} className="text-white p-2" />
                    </div>
                    {list.listTitle}
                  </div>
                  {list.listItems?.map((listItem, index) => (
                    <div
                      key={index}
                      className={cn(
                        'mb-4 pl-8 lg:pl-12',
                        typeof listItemClasses === 'string' ? '' : listItemClasses?.classes,
                        'flex justify-left items-start gap-4',
                      )}
                    >
                      <div className="bg-blue-600">
                        <CheckCheckIcon size={28} className="text-white p-2" />
                      </div>
                      <div>{listItem.listItem}</div>
                    </div>
                  ))}
                </div>
              ))}
          </div>

          <p className={cn(typeof listTitleClasses === 'string' ? '' : listTitleClasses?.classes)}>
            {endText}
          </p>
        </div>
        <div>
          <FormBlock
            submitClasses="rounded-lg py-8 bg-blue-600"
            enableIntro={false}
            form={form as PluginForm}
          />
        </div>
      </div>
    </div>
  )
}
