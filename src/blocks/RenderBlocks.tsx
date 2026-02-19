import { cn } from 'src/utilities/cn'
import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { BusinessSliderBlock } from './BusinessSlider/Component'
import { BusinessSliderBlock2 } from './BusinessSlider2/Component'
import { HoverSlider } from './HoverSlider/Component'
import { ServicesAccordion } from './ServicesAccordion/Component'
import { ContentClipPathBlock } from './ContentClipPath/Component'
import { FullCardGradient } from './FullCardGradient/Component'
import { ShowcaseBlock } from './Showcase/Component'
import { GlobalAccounts } from './GlobalAccounts/Component'
import { AnimatedText } from './Animatedtext/Component'
import { NumbersBlock } from './Numbers/Component'
import { TabBlockComponent } from './TabBlock/Component'
import { InteractiveMediaGrid } from './InteractiveMediaGrid/Component'
import { TestimonialSliderBlock } from './TestimonialSlider/Component'
import { TestimonialSliderSimpleBlock } from './TestimonialSliderSimple/Component'
import { SpacingBlock } from './SpacingBlock/Component'
import { DownloadFormBlock } from './DownloadForm/Component'
import { CaseStudyArchiveBlock } from './CaseStudyArchiveBlock/Component'
import { ResourcesHeroBlock } from './ResourcesHero/Component'
import { EbooksAndGuidesArchiveBlock } from './EbooksAndGuidesArchiveBlock/Component'
import { ContentWithFormComponent } from './ContentWithForm/Component'
import { InvestorRelationsBlock } from './InvestorRelations/Component'
import { AnnouncementsAndEventsBlock } from './AnnouncementsAndEvents/Component'
import { IndustriesBlockComponent } from './Industries/Component'
import { CardGridBlock } from './CardGrid/Component'
import { BrandSliderBlock } from './BrandSlider/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  contentWithForm: ContentWithFormComponent,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  bslider: BusinessSliderBlock,
  bslider2: BusinessSliderBlock2,
  hoverSlider: HoverSlider,
  servicesAccordion: ServicesAccordion,
  contentClipPath: ContentClipPathBlock,
  fullCardGradient: FullCardGradient,
  showcase: ShowcaseBlock,
  globalAccounts: GlobalAccounts,
  animatedText: AnimatedText,
  numbers: NumbersBlock,
  tabBlock: TabBlockComponent,
  interactiveMediaGrid: InteractiveMediaGrid,
  testimonialSlider: TestimonialSliderBlock,
  testimonialSliderSimple: TestimonialSliderSimpleBlock,
  spacing: SpacingBlock,
  downloadForm: DownloadFormBlock,
  caseStudyArchive: CaseStudyArchiveBlock,
  resourcesHero: ResourcesHeroBlock,
  ebooksAndGuidesArchive: EbooksAndGuidesArchiveBlock,
  investorRelations: InvestorRelationsBlock,
  announcementsAndEvents: AnnouncementsAndEventsBlock,
  industries: IndustriesBlockComponent,
  cardGrid: CardGridBlock,
  brandSlider: BrandSliderBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className={''} key={index}>
                  {/* @ts-expect-error */}
                  <Block {...block} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
