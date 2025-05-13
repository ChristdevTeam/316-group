import { Post } from '@/payload-types'
import { ContentBlock } from './Content/Component'
import { SpacingBlock } from './SpacingBlock/Component'
import { TestimonialCard } from './TestimonialCard/Component'
import { Fragment } from 'react'

const blockComponents = {
  content: ContentBlock,
  spacing: SpacingBlock,
  testimonialCard: TestimonialCard,
}

export const RenderPostBlocks: React.FC<{
  blocks: Post['items']
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && blocks.length > 0

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
