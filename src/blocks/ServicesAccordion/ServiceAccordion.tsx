import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { ServicesAccordionBlock } from '@/payload-types'
import RichText from '@/components/RichText'

type Props = {
  className?: string
} & ServicesAccordionBlock

export const ServiceAccordion: React.FC<Props> = ({ serviceItems }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="space-y-4">
      {serviceItems &&
        serviceItems.map((item, index) => (
          <div key={item.title} className="border-b border-gray-200 last:border-0 pb-4">
            <div className="space-y-2">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between text-left text-3xl font-medium hover:text-primary transition-colors"
              >
                <span>{item.title}</span>
                <ChevronDown
                  className={`h-7 w-7 transform transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className="pb-4 flex flex-wrap gap-2"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {item.bulletPoints?.map((point, pointIndex) => (
                  <div key={pointIndex} className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                      {point.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              className={`grid transition-all duration-200 ease-in-out ${
                openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="pb-4 text-xl text-gray-600 leading-relaxed">
                  <RichText content={item.content} enableGutter={false} enableProse={false} />{' '}
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}
