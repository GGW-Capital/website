/**
 * Generate JSON-LD schema for FAQs
 */
export function generateFAQJsonLd(faqs: Array<{question: string, answer: string}>) {
    if (!faqs || faqs.length === 0) return null
  
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: typeof faq.answer === 'string' ? faq.answer : 'See our website for detailed answer.',
        },
      })),
    }
  }
  
  /**
   * Generate FAQ schema from Sanity data
   */
  export function generateFAQSchema(faqs: any[]) {
    if (!faqs || faqs.length === 0) return null
  
    // Convert block content to text for schema
    const processedFaqs = faqs.map(faq => {
      // Handle case where answer is a block content array
      let answerText = '';
      if (typeof faq.answer === 'string') {
        answerText = faq.answer;
      } else if (Array.isArray(faq.answer)) {
        // Simple extraction of text from block content
        answerText = faq.answer
          .filter((block: any) => block._type === 'block')
          .map((block: any) => 
            block.children
              ?.filter((child: any) => child._type === 'span')
              .map((span: any) => span.text)
              .join('')
          )
          .join(' ') || '';
      }
  
      return {
        question: faq.question,
        answer: answerText || 'See our website for detailed answer.',
      };
    });
  
    return generateFAQJsonLd(processedFaqs);
  }