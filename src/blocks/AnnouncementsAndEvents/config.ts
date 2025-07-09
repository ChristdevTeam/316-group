import { Block } from 'payload'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

export const AnnouncementsAndEvents: Block = {
  slug: 'announcementsAndEvents',
  interfaceName: 'AnnouncementsAndEventsBlock',
  fields: [
    {
      name: 'announcements',
      type: 'array',
      label: 'Announcements',
      defaultValue: [
        {
          content: {
            root: {
              children: [
                {
                  children: [
                    {
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: "See how 316 Group's market intelligence and business solutions help to drive innovation, and elevate growth for businesses across various industries.",
                      type: 'text',
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  type: 'paragraph',
                  version: 1,
                  textFormat: 0,
                  textStyle: '',
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'root',
              version: 1,
            },
          },
          date: '2024-11-03T00:00:00.000Z',
        },
        {
          content: {
            root: {
              children: [
                {
                  children: [
                    {
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: "See how 316 Group's market intelligence and business solutions help to drive innovation, and elevate growth for businesses across various industries.",
                      type: 'text',
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  type: 'paragraph',
                  version: 1,
                  textFormat: 0,
                  textStyle: '',
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'root',
              version: 1,
            },
          },
          date: '2024-11-03T00:00:00.000Z',
        },
        {
          content: {
            root: {
              children: [
                {
                  children: [
                    {
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: "See how 316 Group's market intelligence and business solutions help to drive innovation, and elevate growth for businesses across various industries.",
                      type: 'text',
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  type: 'paragraph',
                  version: 1,
                  textFormat: 0,
                  textStyle: '',
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'root',
              version: 1,
            },
          },
          date: '2024-11-03T00:00:00.000Z',
        },
      ],
      fields: [
        {
          name: 'content',
          type: 'richText',
          label: 'Announcement Content',
          required: true,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                FixedToolbarFeature(),
              ]
            },
          }),
        },
        {
          name: 'date',
          type: 'date',
          label: 'Date',
          required: true,
        },
      ],
    },
    {
      name: 'events',
      type: 'array',
      label: 'Events',
      defaultValue: [
        {
          title: 'Board of Directors Advisory workshop,316 Money',
          date: '2024-12-18T00:00:00.000Z',
          venue: '316 Money',
          detailedDateTime: 'December 18, 2024 at 2:00 PM - 5:00 PM EST',
          detailedVenue: 'To be disclosed',
        },
        {
          title: 'Board of Directors Advisory workshop,316 Money',
          date: '2024-12-26T00:00:00.000Z',
          venue: '316 Money',
          detailedDateTime: 'December 26, 2024 at 10:00 AM - 1:00 PM EST',
          detailedVenue: 'To be disclosed',
        },
        {
          title: 'Board of Directors Advisory workshop,316 Money',
          date: '2024-12-18T00:00:00.000Z',
          venue: '316 Money',
          detailedDateTime: 'December 18, 2024 at 9:00 AM - 12:00 PM EST',
          detailedVenue: 'To be disclosed',
        },
        {
          title: 'Board of Directors Advisory workshop,316 Money',
          date: '2024-12-18T00:00:00.000Z',
          venue: '316 Money',
          detailedDateTime: 'December 18, 2024 at 3:00 PM - 6:00 PM EST',
          detailedVenue: 'To be disclosed',
        },
      ],
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Event Title',
          required: true,
        },
        {
          name: 'date',
          type: 'date',
          label: 'Event Date',
          required: true,
        },
        {
          name: 'venue',
          type: 'text',
          label: 'Venue',
          required: true,
        },
        {
          name: 'detailedDateTime',
          type: 'text',
          label: 'Detailed Date and Time',
          admin: {
            description: 'Detailed date and time information shown on hover',
          },
        },
        {
          name: 'detailedVenue',
          type: 'textarea',
          label: 'Detailed Venue Information',
          admin: {
            description: 'Additional venue details shown on hover',
          },
        },
      ],
    },
  ],
}
