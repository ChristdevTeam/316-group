import React from 'react'

import { CaseStudy } from '@/payload-types'
import SocialShareIcons from '../SocialShareIcons'
import RichText from '../RichText'

const CompanyInfo: React.FC<{ companyInfo: CaseStudy['companyInfo'] }> = ({ companyInfo }) => {
  return (
    <div className="container max-w-screen-2xl py-16">
      <div className="flex flex-col lg:flex-row justify-between align-start gap-16 lg:gap-12 lg:pt-16">
        <div className="space-y-4 lg:space-y-8">
          {companyInfo?.background && (
            <div className="flex flex-col">
              <h2 className="text-2xl md:text-3xl lg:text-4xl pb-4 lg:pb-6 font-semibold ">
                Background
              </h2>
              <RichText
                enableGutter={false}
                content={companyInfo?.background}
                className="text-lg md:text-xl"
              />
            </div>
          )}
          {companyInfo?.challenges && (
            <div className="flex flex-col">
              <h2 className="text-2xl md:text-3xl lg:text-4xl pb-4 lg:pb-6 font-semibold ">
                Challenges
              </h2>
              <RichText
                enableGutter={false}
                content={companyInfo?.challenges}
                className="text-lg md:text-xl"
              />
            </div>
          )}
        </div>
        <div className="flex flex-col sm:flex-row lg:flex-col w-full xl:max-w-[25%] min-w-[250px] gap-4 lg:gap-8 p-4 lg:p-8 bg-slate-100 order-first lg:order-none">
          {companyInfo?.name && (
            <div className="flex flex-col gap-4 min-w-[200px]">
              <h3 className="text-2xl font-semibold">Company Name</h3>
              <p
                className="text-lg md:text-xl"
                dangerouslySetInnerHTML={{ __html: companyInfo?.name }}
              />
              <div className="hidden sm:block lg:hidden">
                <SocialShareIcons />
              </div>
            </div>
          )}

          <div className="h-[2px] w-full sm:h-[200px] sm:max-w-[2px] lg:h-[2px] lg:w-full lg:max-w-full bg-slate-700"></div>
          {companyInfo?.overview && (
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold">Overview </h2>
              <p
                dangerouslySetInnerHTML={{ __html: companyInfo?.overview }}
                className="text-lg md:text-xl"
              />
            </div>
          )}
          <div className="sm:hidden lg:block">
            <div className="h-[2px] w-full sm:h-[200px] sm:max-w-[2px] lg:h-[2px] lg:w-full lg:max-w-full bg-slate-700"></div>
            <SocialShareIcons />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyInfo
