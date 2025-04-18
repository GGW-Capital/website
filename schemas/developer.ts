export default {
  name: 'developer',
  title: 'Developer',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'website',
      title: 'Website URL',
      type: 'url',
    },
    {
      name: 'isFeatured',
      title: 'Featured Developer',
      type: 'boolean',
      description: 'Mark as featured to display prominently on the developers page',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
    },
  },
}