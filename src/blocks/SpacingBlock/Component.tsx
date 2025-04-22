import { SpacingBlock as SpacingBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'

export const SpacingBlock: React.FC<SpacingBlockProps> = ({ spacing, bgColor, width }) => {
  return <div className={cn(spacing, bgColor, width)} />
}
