import { Media } from '@/components/Media'
import type { TestimonialCard as TestimonialCardProps } from '@/payload-types'
import { cn } from '@/utilities/cn'

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  author,
  authorPosition,
  authorClasses,
  testimonial,
  testimonialClasses,
  mainBackground,
  accentColor,
  image,
}) => {
  return (
    <div className={cn('relative overflow-hidden p-4 md:p-8 mx-auto container max-w-screen-2xl')}>
      {/* Top right decorative circle - lime green */}
      <div
        className={cn(
          'absolute top-0 right-0 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-64 xl:h-64 translate-x-[50%] -translate-y-[50%] bg-lime-400 rounded-full',
          accentColor,
        )}
      />

      {/* Main content container with blue background */}
      <div
        className={cn(
          mainBackground,
          'relative text-white p-4 md:p-12 xl:p-16 rounded-sm z-10 overflow-hidden',
        )}
      >
        {/* Logo/Image container */}
        {image && (
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 flex items-center justify-center">
              <Media resource={image} />
            </div>
          </div>
        )}

        {/* Quote text */}
        <div className="text-center mb-10  mx-auto">
          <p className={cn(testimonialClasses)}>{testimonial}</p>
        </div>

        {/* Attribution */}
        <div className={cn(authorClasses)}>
          <p className="">{author},</p>
          <p className="">{authorPosition}</p>
        </div>
      </div>

      {/* Bottom left decorative circle - lime green */}
      <div className="absolute -bottom-0 -left-0 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-64 xl:h-64 -translate-x-[50%] translate-y-[50%] bg-lime-400 rounded-full" />
    </div>
  )
}
