export default {
  name: "property",
  title: "Property",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "type",
      title: "Property Type",
      type: "string",
      options: {
        list: [
          { title: "Apartment", value: "Apartment" },
          { title: "Villa", value: "Villa" },
          { title: "Townhouse", value: "Townhouse" },
          { title: "Penthouse", value: "Penthouse" },
          { title: "Duplex", value: "Duplex" },
          { title: "Land", value: "Land" },
          { title: "Commercial", value: "Commercial" },
        ],
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
      name: "bedrooms",
      title: "Bedrooms",
      type: "number",
    },
    {
      name: "bathrooms",
      title: "Bathrooms",
      type: "number",
    },
    {
      name: "area",
      title: "Area",
      type: "number",
      description: "Numeric area value in square feet (e.g., 1500)",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "images",
      title: "Images",
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
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "For Sale", value: "For Sale" },
          { title: "For Rent", value: "For Rent" },
          { title: "Off Plan", value: "Off Plan" },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "marketType",
      title: "Market Type",
      type: "string",
      options: {
        list: [
          { title: "Buy", value: "buy" },
          { title: "Rent", value: "rent" },
          { title: "Off Plan", value: "off-plan" },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Apartment", value: "apartment" },
          { title: "Villa", value: "villa" },
          { title: "Townhouse", value: "townhouse" },
          { title: "Penthouse", value: "penthouse" },
          { title: "Duplex", value: "duplex" },
          { title: "Land", value: "land" },
          { title: "Commercial", value: "commercial" },
        ],
      },
    },
    {
      name: "lifestyle",
      title: "Lifestyle",
      type: "reference",
      to: [{ type: "lifestyle" }],
      description: "Select the lifestyle associated with this property",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
    },
    // {
    //   name: "amenities",
    //   title: "Amenities",
    //   type: "array",
    //   of: [
    //     {
    //       type: "reference",
    //       to: [{ type: "amenity" }],
    //     },
    //   ],
    //   description: "Select amenities available in this property",
    // },
    {
      name: "completionDate",
      title: "Completion Date",
      type: "string",
      hidden: ({ document }:any) => document?.marketType !== "off-plan",
    },
    {
      name: "googleMapsUrl",
      title: "Google Maps URL",
      type: "url",
      description: "Direct Google Maps URL for this property location",
    },
    {
      name: "project",
      title: "Project",
      type: "reference",
      to: [{ type: "project" }],
      description: "If this property is part of a project, select it here",
    },
    {
      name: "developer",
      title: "Developer",
      type: "reference",
      to: [{ type: "developer" }],
      description: "The developer of this property (only needed if not part of a project)",
      hidden: ({ document }: any) => document?.project !== undefined,
    },
    {
      name: "neighborhood",
      title: "Neighborhood",
      type: "reference",
      to: [{ type: "neighborhood" }],
      description: "The neighborhood where this property is located (only needed if not part of a project)",
      hidden: ({ document }: any) => document?.project !== undefined,
    },
    {
      name: "isFeatured",
      title: "Featured Property",
      type: "boolean",
      description: "Mark this property as featured",
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
      subtitle: "location",
    },
  },
};
