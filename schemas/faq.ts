export default {
    name: 'faq',
    title: 'FAQ',
    type: 'document',
    fields: [
      {
        name: 'question',
        title: 'Question',
        type: 'string',
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'answer',
        title: 'Answer',
        type: 'array',
        of: [{ type: 'block' }],
        validation: (Rule: any) => Rule.required(),
      }
    ],
    preview: {
      select: {
        title: 'question',
      },
      prepare({ title }: any) {
        return {
          title,
        };
      },
    },
  }