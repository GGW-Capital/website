export default {
  name: 'amenity',
  title: 'Amenity',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'value',
      title: 'Value',
      type: 'slug',
      description: 'Auto-generated from name (lowercase, no spaces)',
      options: {
        source: 'name',
        maxLength: 200,
        slugify: (input: string) => input
          .toLowerCase()
          .replace(/\s+/g, '_')
          .replace(/[^\w-]+/g, '')
          .slice(0, 200)
      },
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Building Features', value: 'building' },
          { title: 'Interior Features', value: 'interior' },
          { title: 'Outdoor Features', value: 'outdoor' },
          { title: 'Security Features', value: 'security' },
          { title: 'Wellness & Recreation', value: 'wellness' },
          { title: 'Technology', value: 'technology' },
          { title: 'Services', value: 'services' },
          { title: 'Accessibility', value: 'accessibility' },
          { title: 'Views', value: 'views' },
          { title: 'Kitchen Features', value: 'kitchen' },
          { title: 'Bathroom Features', value: 'bathroom' },
          { title: 'Bedroom Features', value: 'bedroom' },
          { title: 'Utilities', value: 'utilities' },
          { title: 'Transportation', value: 'transportation' },
          { title: 'Nearby', value: 'nearby' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Optional description of this amenity',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
    },
  },
}
