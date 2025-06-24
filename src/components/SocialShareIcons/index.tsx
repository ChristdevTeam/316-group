'use client'

import Image from 'next/image'
import React from 'react'

const socialPlatforms = [
  {
    name: 'LinkedIn',
    icon: () => (
      <Image width={32} height={32} src="/assets/linkedin.svg" alt="LinkedIn" className="w-8 h-8" />
    ),
    getShareUrl: (url: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent('Check this out!')}`,
  },

  {
    name: 'Tumblr',
    icon: () => (
      <Image width={32} height={32} src="/assets/tumbler.svg" alt="Tumblr" className="w-8 h-8" />
    ),
    getShareUrl: (url: string) =>
      `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${encodeURIComponent(url)}&caption=${encodeURIComponent('Check this out!')}`,
  },
  {
    name: 'Instagram',
    icon: () => (
      <Image
        width={32}
        height={32}
        src="/assets/Instagram.svg"
        alt="Instagram"
        className="w-8 h-8"
      />
    ),
    // Instagram does not have a direct share URL API like others.
    // This link will just open Instagram. Sharing typically happens via the app.
    getShareUrl: (url: string) => `https://www.instagram.com/`,
  },
  {
    name: 'Facebook',
    icon: () => (
      <Image width={32} height={32} src="/assets/facebook.svg" alt="Facebook" className="w-8 h-8" />
    ),
    getShareUrl: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent('Check this out!')}`,
  },
]

const SocialShareIcons: React.FC = () => {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <div>
      <h3 className="my-4 lg:my-4 text-2xl font-semibold">Share</h3>{' '}
      <div className="flex space-x-4">
        {socialPlatforms.map(({ name, icon: Icon, getShareUrl }) => (
          <a
            key={name}
            href={getShareUrl(currentUrl)}
            target="_blank"
            rel="noopener noreferrer"
            title={`Share on ${name}`}
            aria-label={`Share on ${name}`}
          >
            <Icon />
          </a>
        ))}
      </div>
    </div>
  )
}

export default SocialShareIcons
