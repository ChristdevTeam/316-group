// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { resendAdapter } from '@payloadcms/email-resend'

import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { Settings } from './Settings/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import { TypeGenerator } from './collections/TypeGenerator'
import { CaseStudies } from './collections/CaseStudies'
import { Tags } from './collections/Tags'
import { EbooksAndGuides } from './collections/EbooksAndGuides'
import { TextStyles } from './collections/TextStyles'
import { DownloadFormSubmissions } from './collections/DownloadFormSubmissions'
import { Investors } from './collections/Investors'
import { DownloadTracking } from './collections/DownloadTracking'
import { Brands } from './collections/Brands'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
      beforeDashboard: ['@/components/BeforeDashboard'],
      graphics: {
        Logo: '@/graphics/Logo',
        Icon: '@/graphics/Icon',
      },
    },
    meta: {
      titleSuffix: '| 316 Group',
      icons: [
        {
          rel: 'icon',
          type: 'image/svg',
          url: `${process.env.NEXT_PUBLIC_SERVER_URL}/favicon.svg`,
        },
      ],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  collections: [
    Pages,
    Posts,
    CaseStudies,
    Media,
    Categories,
    Tags,
    Users,
    TypeGenerator,
    EbooksAndGuides,
    TextStyles,
    DownloadFormSubmissions,
    Investors,
    DownloadTracking,
    Brands,
  ],
  upload: {
    limits: {
      fileSize: 300000000, // 300MB, written in bytes
    },
  },
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer, Settings],
  plugins: [...plugins],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  email: resendAdapter({
    defaultFromAddress: 'contact@316group.co.uk',
    defaultFromName: '316 Group',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
})
