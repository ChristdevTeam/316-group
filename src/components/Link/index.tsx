import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from 'src/utilities/cn'
import Link from 'next/link'
import React from 'react'

import type { CaseStudy, EbooksAndGuide, Page, Post } from '@/payload-types'
import { ArrowRight, ChevronRight, ExternalLink } from 'lucide-react'

export type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts' | 'ebooks-and-guides' | 'case-studies'
    value: Page | Post | string | number | CaseStudy | EbooksAndGuide
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
  icon?: boolean | null
  iconType?: 'chevron-right' | 'arrow-right' | 'external-link'
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
    icon,
    iconType,
  } = props

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
          reference.value.slug
        }`
      : url

  if (!href) return null

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link
        className={cn('flex gap-4 items-center', className)}
        href={href || url || ''}
        {...newTabProps}
      >
        {label && label}
        {icon && iconType === 'arrow-right' && <ArrowRight />}
        {icon && iconType === 'chevron-right' && <ChevronRight />}
        {icon && iconType === 'external-link' && <ExternalLink />}
        {children && children}
      </Link>
    )
  }

  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {icon && iconType === 'arrow-right' && <ArrowRight />}
        {icon && iconType === 'chevron-right' && <ChevronRight />}
        {icon && iconType === 'external-link' && <ExternalLink />}
        {children && children}
      </Link>
    </Button>
  )
}
