export default {
  name: 'neighborhood',
  title: 'Neighborhood',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'propertyTypes',
      title: 'Property Types',
      description: 'Types of properties available in this neighborhood',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'priceRange',
      title: 'Price Range',
      description: 'Typical price range for properties in this area',
      type: 'string',
    },
    {
      name: 'lifestyle',
      title: 'Lifestyle',
      description: 'Lifestyle characteristics of this neighborhood',
      type: 'reference',
      to: [{ type: 'lifestyle' }],
    },
    {
      name: 'googleMapsUrl',
      title: 'Google Maps URL',
      description: 'Paste the full Google Maps URL for this neighborhood (e.g., https://maps.google.com/?q=Dubai+Marina)',
      type: 'url',
      validation: (Rule: any) => Rule.uri({scheme: ['http', 'https']}),
    },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'locationDetails',
      title: 'Location Details',
      description: 'Additional information about the neighborhood location, nearby attractions, etc.',
      type: 'text',
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
};