import type { Post } from '@/payload-types'

export const post3: Partial<Post> = {
  slug: 'dollar-and-sense-the-financial-forecast',
  _status: 'published',
  // @ts-ignore
  authors: ['{{AUTHOR}}'],
  items: [],
  meta: {
    description: `Money isn't just currency; it's a language. Dive deep into its nuances, where strategy meets intuition in the vast sea of finance.`,
    // @ts-ignore
    image: '{{IMAGE_1}}',
    title: 'Dollar and Sense: The Financial Forecast',
  },
  relatedPosts: [], // this is populated by the seed script
  title: 'Dollar and Sense: The Financial Forecast',
}
