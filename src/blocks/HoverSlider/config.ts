import { bgColorPickerLight } from '@/fields/bgColorPicker'
import { link } from '@/fields/link'
import { Block } from 'payload'

export const HoverSliderBlock: Block = {
  slug: 'hoverSlider',
  interfaceName: 'HoverSliderBlock',
  fields: [
    {
      name: 'sliderItems',
      type: 'array',
      required: true,
      minRows: 2,
      fields: [
        {
          name: 'id',
          type: 'number',
          required: true,
          admin: {
            hidden: true,
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          required: true,
        },
        link(),
        {
          name: 'mediaFile',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        bgColorPickerLight,
      ],
      hooks: {
        beforeChange: [
          ({ value, operation }) => {
            if (operation === 'update' || operation === 'create') {
              if (value) {
                value?.forEach((item: any, index: number) => {
                  if (!item.id) {
                    // Assign the auto-increment ID based on the index
                    item.id = index + 1
                  }
                })
              }

              return value
            }
          },
        ],
      },
    },
  ],
}
