import { CMSLinkType } from '@/components/Link'

export const getUrlfromLink = (link: CMSLinkType) => {
  if (link.type === 'reference') {
    return `${link.reference?.relationTo === 'pages' ? '/' : link.reference?.relationTo}/${typeof link.reference?.value !== 'string' && typeof link.reference?.value !== 'number' ? link.reference?.value?.slug : ''}`
  }
  return link.url
}
