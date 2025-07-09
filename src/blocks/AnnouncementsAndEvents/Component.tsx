'use client'

import type { AnnouncementsAndEventsBlock as AnnouncementsAndEventsBlockProps } from '@/payload-types'
import { cn } from '@/utilities/cn'
import React, { useState } from 'react'
import RichText from '@/components/RichText'
import { MapPinIcon } from 'lucide-react'

export const AnnouncementsAndEventsBlock: React.FC<AnnouncementsAndEventsBlockProps> = ({
  announcements,
  events,
}) => {
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString)
    const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
    const day = date.getDate()
    return { month, day }
  }

  return (
    <div className="container max-w-screen-2xl py-16 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Announcements Section */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-12 bg-blue-600"></div>
            <h2 className="text-4xl font-bold text-blue-600">Announcements</h2>
          </div>

          <div className="space-y-8">
            {announcements?.map((announcement, index) => (
              <div key={index} className="border-b-2 border-blue-600 pb-4">
                <div className="mb-4">
                  <RichText
                    enableGutter={false}
                    content={announcement.content}
                    className="text-lg lg:text-xl"
                  />
                </div>
                <p className="text-blue-600 font-medium text-sm">{formatDate(announcement.date)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Events Section */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-12 bg-blue-600"></div>
            <h2 className="text-4xl font-bold text-blue-600">Events</h2>
          </div>

          <div className="space-y-4">
            {events?.map((event, index) => {
              const { month, day } = formatEventDate(event.date)
              const isHovered = hoveredEvent === index

              return (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() => setHoveredEvent(index)}
                  onMouseLeave={() => setHoveredEvent(null)}
                >
                  <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                    {/* Date Badge */}
                    <div className="flex-shrink-0 bg-lime-400 text-black px-3 py-2 rounded text-center min-w-[60px]">
                      <div className="text-sm font-medium">{month}</div>
                      <div className="text-3xl lg:text-4xl font-bold">{day}</div>
                    </div>

                    {/* Event Info */}
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1 text-lg lg:text-xl">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 text-sm flex items-center">
                        <MapPinIcon className="text-blue-600 mr-2" />
                        {event.venue}
                      </p>
                    </div>
                  </div>

                  {/* Hover Details */}
                  <div
                    className={cn(
                      'overflow-hidden transition-all duration-300 ease-in-out bg-gray-50 rounded-lg px-4',
                      isHovered
                        ? 'max-h-40 opacity-100 py-4 px-4 mb-2'
                        : 'max-h-0 opacity-0 py-0 px-4',
                    )}
                  >
                    {event.detailedDateTime && (
                      <div className="mb-2">
                        <span className="font-medium text-gray-700">Date & Time: </span>
                        <span className="text-gray-600">{event.detailedDateTime}</span>
                      </div>
                    )}
                    {event.detailedVenue && (
                      <div>
                        <span className="font-medium text-gray-700">Venue Details: </span>
                        <span className="text-gray-600">{event.detailedVenue}</span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
