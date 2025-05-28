import { Card, CardPostData } from '@/components/Card'
import { cn } from '@/utilities/cn'

export type Props = {
  className?: string
  guides: CardPostData[]
  heading?: string
}

export const GuideCollectionArchive: React.FC<Props> = (props) => {
  const { guides, className, heading } = props

  return (
    <div className={cn('container max-w-screen-2xl', className)}>
      {heading && (
        <h2 className="pb-4 mb-8 md:mb-12 xl:mb-16 text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white border-b-2 border-foreground">
          {heading}
        </h2>
      )}
      <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
        {guides?.map((doc) => (
          <div key={doc.slug} className="col-span-4">
            <Card relationTo="ebooks-and-guides" doc={doc} showCategories />
          </div>
        ))}
      </div>
    </div>
  )
}
