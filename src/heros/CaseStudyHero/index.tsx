import { Media } from '@/components/Media'
import { CaseStudy } from '@/payload-types'

export const CaseStudyHero: React.FC<{
  caseStudy: CaseStudy
}> = ({ caseStudy }) => {
  const { title, excerpt, heroImage, tags } = caseStudy

  return (
    <div>
      <div className="container max-w-screen-2xl">
        <h5 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl  font-bold uppercase mb-12">
          Case Study
        </h5>
      </div>
      <div className="w-full bg-[#00244F] py-16 md:py-20 lg:py-24">
        <div className="container max-w-screen-2xl grid grid-cols-1 lg:grid-cols-7 gap-8 lg:gap-16 content-center">
          <div className="lg:col-span-3 flex flex-col justify-center">
            <div className="flex gap-4 mb-4 lg:mb-8 xl:mb-12">
              {tags &&
                tags.length > 0 &&
                tags.map((tag, index) => {
                  if (typeof tag === 'string') {
                    return null
                  } else
                    return (
                      <span
                        key={index}
                        className="px-6 py-1 md:px-6 md:py-2 text-sm md:text-base font-normal border-white border text-white"
                      >
                        {tag.title}
                      </span>
                    )
                })}
            </div>

            <h1
              dangerouslySetInnerHTML={{ __html: title }}
              className="text-white font-extrabold text-xl md:text-2xl lg:text-3xl xl:text-4xl lg:mb-8 xl:mb-12 xl:w-[75%]"
            ></h1>

            <p className="text-lg lg:text-xl font-normal text-white">{excerpt}</p>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-center">
            {heroImage && (
              <div className="relative">
                <Media resource={heroImage} className="w-full" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
