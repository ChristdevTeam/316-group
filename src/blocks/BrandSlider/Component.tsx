import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { BrandSliderBlock as BrandSliderBlockProps } from '@/payload-types'
import { BrandSliderClient } from './Component.client'

export const BrandSliderBlock: React.FC<BrandSliderBlockProps> = async (props) => {
  const payload = await getPayload({ config: configPromise })

  const { docs: brands } = await payload.find({
    collection: 'brands',
    depth: 1,
    pagination: false,
    sort: 'title',
  })

  return <BrandSliderClient {...props} brands={brands} />
}
