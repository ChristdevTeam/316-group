import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { EbooksAndGuide } from '../../../payload-types'

export const revalidateGuidesAndDownloads: CollectionAfterChangeHook<EbooksAndGuide> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    const path = `//${doc.slug}`

    payload.logger.info(`Revalidating post at path: ${path}`)

    revalidatePath(path)
  }

  // If the post was previously published, we need to revalidate the old path
  if (previousDoc._status === 'published' && doc._status !== 'published') {
    const oldPath = `/ebooks-and-guides/${previousDoc.slug}`

    payload.logger.info(`Revalidating old Ebooks and Guides at path: ${oldPath}`)

    revalidatePath(oldPath)
  }

  return doc
}
