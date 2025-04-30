export default {
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'A short summary of the blog post',
      validation: (Rule: any) => Rule.required().max(200),
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Market Trends', value: 'market-trends' },
          { title: 'Investment Tips', value: 'investment-tips' },
          { title: 'Property Guide', value: 'property-guide' },
          { title: 'Luxury Lifestyle', value: 'luxury-lifestyle' },
          { title: 'Dubai Living', value: 'dubai-living' },
          { title: 'News', value: 'news' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'External or Internal Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule: any) =>
                      Rule.uri({
                        allowRelative: true,
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }).required(),
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab?',
                    initialValue: true,
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          fields: [
            {
              type: 'text',
              name: 'alt',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility',
            },
          ],
        },
      ],
      validation: (Rule: any) => Rule.required(),
    },
    
    {
      name: 'isFeatured',
      title: 'Featured Blog',
      type: 'boolean',
      description: 'Mark this blog as featured',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      subtitle: 'excerpt',
    },
    prepare({ title, media, subtitle }: any) {
      return {
        title,
        media,
        subtitle: subtitle.substring(0, 50) + '...',
      }
    },
  },
}