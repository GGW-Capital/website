export default {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "location",
      title: "Location",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "price",
      title: "Price",
      type: "number",
      description: "Numeric price value (e.g., 1500000)",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "marketType",
      title: "Market Type",
      type: "string",
      options: {
        list: [
          { title: "Secondary Market", value: "secondary-market" },
          { title: "Off-Plan", value: "off-plan" },
        ],
      },
      description: "Is this an ongoing project or off-plan project?",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "completionDate",
      title: "Completion Date",
      type: "string",
      hidden: ({ document }: any) => document?.marketType !== "off-plan",
    },

    {
      name: "googleMapsUrl",
      title: "Google Maps URL",
      type: "url",
      description: "Direct Google Maps URL for this property location",
    },
    {
      name: "mainImage",
      title: "Main Image",
      type: "image",
      description:
        "Upload a high-resolution image sized 1920x1280 (3:2 ratio) for best display across the website.",

      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "images",
      title: "Images",
      description:
        "Upload a high-resolution image sized 1920x1280 (3:2 ratio) for best display across the website.",

      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "amenities",
      title: "Amenities",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "amenity" }],
        },
      ],
      description: "Select amenities available in this project",
    },
    {
      name: "area",
      title: "Area",
      type: "number",
      description: "Numeric area value in square feet (e.g., 1500)",
    },
    {
      name: "lifestyle",
      title: "Lifestyle",
      type: "reference",
      to: [{ type: "lifestyle" }],
      description: "Select the lifestyle associated with this project",
    },
    {
      name: "developer",
      title: "Developer",
      type: "reference",
      to: [{ type: "developer" }],
      description: "The developer of this project",
    },
    {
      name: "neighborhood",
      title: "Neighborhood",
      type: "reference",
      to: [{ type: "neighborhood" }],
      description: "The neighborhood where this project is located",
    },
    {
      name: "isFeatured",
      title: "Featured Project",
      type: "boolean",
      description: "Mark this project as featured",
      initialValue: false,
    },
    {
      name: "properties",
      title: "Properties",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "property" }],
        },
      ],
      description: "Properties that are part of this project",
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "mainImage",
      subtitle: "location",
    },
  },
};
