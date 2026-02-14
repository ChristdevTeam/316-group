import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Brand } from '../../../payload-types'

export const revalidateBrands: CollectionAfterChangeHook<Brand> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    const path = `/brands/${doc.slug}`

    payload.logger.info(`Revalidating brand at path: ${path}`)

    revalidatePath(path)
  }

  // If the brand was previously published, we need to revalidate the old path
  if (previousDoc._status === 'published' && doc._status !== 'published') {
    const oldPath = `/brands/${previousDoc.slug}`

    payload.logger.info(`Revalidating old brand at path: ${oldPath}`)

    revalidatePath(oldPath)
  }

  return doc
}
