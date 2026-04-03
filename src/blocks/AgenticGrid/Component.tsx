import React from 'react'

import type { AgenticGridBlock as AgenticGridProps } from '@/payload-types'
import { AgenticGridClient } from './AgenticGridClient'

export const AgenticGridBlock: React.FC<AgenticGridProps> = (props) => {
  return <AgenticGridClient {...props} />
}
