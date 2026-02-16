import { Brand, CaseStudy, EbooksAndGuide, Page, Post } from '@/payload-types'

// export interface MegaMenuItem {
//   type: 'link' | 'subHeading' | 'divider' | 'text'
//   label?: string // For link, subheading, and text
//   href?: string // For links only
//   description?: string // For explanatory text under links
// }

export interface MenuSection {
  title: string
  hasMegaMenu: boolean
  items?: MegaMenuItem[]
  href?: string
}

export type Link = {
  type?: 'reference' | 'custom' | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts' | 'case-studies' | 'ebooks-and-guides' | 'brands'
    value: string | Page | Post | CaseStudy | EbooksAndGuide | Brand
  } | null
  url?: string | null
  label?: string
}

export type NavItems = {
  title?: string | null
  hasMegaMenu?: boolean | null
  link?: {
    type?: ('reference' | 'custom') | null
    newTab?: boolean | null
    reference?:
      | ({
          relationTo: 'pages'
          value: string | Page
        } | null)
      | ({
          relationTo: 'posts'
          value: string | Post
        } | null)
      | ({
          relationTo: 'case-studies'
          value: string | CaseStudy
        } | null)
      | ({
          relationTo: 'ebooks-and-guides'
          value: string | EbooksAndGuide
        } | null)
      | ({
          relationTo: 'brands'
          value: string | Brand
        } | null)
    url?: string | null
    label: string
  }
  megaMenuItems?:
    | {
        type?: ('link' | 'subHeading' | 'text' | 'divider') | null
        label?: string | null
        description?: string | null
        link?: {
          type?: ('reference' | 'custom') | null
          newTab?: boolean | null
          reference?:
            | ({
                relationTo: 'pages'
                value: string | Page
              } | null)
            | ({
                relationTo: 'posts'
                value: string | Post
              } | null)
            | ({
                relationTo: 'case-studies'
                value: string | CaseStudy
              } | null)
            | ({
                relationTo: 'ebooks-and-guides'
                value: string | EbooksAndGuide
              } | null)
            | ({
                relationTo: 'brands'
                value: string | Brand
              } | null)
          url?: string | null
          label: string
          appearance?: ('default' | 'outline' | 'ghost' | 'secondary' | 'underline') | null
        }
        id?: string | null
      }[]
    | null
  id?: string | null
}

export type MegaMenuItem = {
  type?: ('link' | 'subHeading' | 'text' | 'divider') | null
  label?: string | null
  description?: string | null
  link?: {
    type?: ('reference' | 'custom') | null
    newTab?: boolean | null
    reference?:
      | ({
          relationTo: 'pages'
          value: string | Page
        } | null)
      | ({
          relationTo: 'posts'
          value: string | Post
        } | null)
      | ({
          relationTo: 'case-studies'
          value: string | CaseStudy
        } | null)
      | ({
          relationTo: 'ebooks-and-guides'
          value: string | EbooksAndGuide
        } | null)
      | ({
          relationTo: 'brands'
          value: string | Brand
        } | null)
    url?: string | null
    label: string
    appearance?: ('default' | 'outline' | 'ghost' | 'secondary' | 'underline') | null
  }
  id?: string | null
}
