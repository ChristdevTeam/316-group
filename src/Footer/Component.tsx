import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'
import type { Footer } from '@/payload-types'
import ComponentClient from './Component.Client'

export async function Footer() {
  const footer: Footer = await getCachedGlobal('footer', 3)()

  return <ComponentClient footer={footer} />
}
