// Import the structure builder and types
import type { StructureBuilder } from "sanity/desk";

// Define the list of emails that can access blog documents
// Simply add or remove emails from this list to manage access
export const BLOG_EDITOR_EMAILS = ["firstzoo2671@gmail.com"];

// Export the structure function
export const structure = (S: StructureBuilder, context: any) => {
  // Get the current user from context
  const { currentUser } = context;
  // Create regular items list
  let items = [];

  // Add the blog item only if user's email is in the allowed list
  if (
    currentUser &&
    currentUser.email &&
    BLOG_EDITOR_EMAILS.includes(currentUser.email)
  ) {
    items.push(
      S.listItem()
        .title("Blogs")
        .schemaType("blog")
        .child(S.documentTypeList("blog").title("Blogs"))
    );
  } else {
    items.push(
      ...[
        S.listItem()
          .title("Properties")
          .schemaType("property")
          .child(S.documentTypeList("property").title("Properties")),

        S.listItem()
          .title("Projects")
          .schemaType("project")
          .child(S.documentTypeList("project").title("Projects")),

        S.listItem()
          .title("Neighborhoods")
          .schemaType("neighborhood")
          .child(S.documentTypeList("neighborhood").title("Neighborhoods")),

        S.listItem()
          .title("Developers")
          .schemaType("developer")
          .child(S.documentTypeList("developer").title("Developers")),

        S.listItem()
          .title("Team Members")
          .schemaType("teamMember")
          .child(S.documentTypeList("teamMember").title("Team Members")),

        S.listItem()
          .title("Testimonials")
          .schemaType("testimonial")
          .child(S.documentTypeList("testimonial").title("Testimonials")),

        S.listItem()
          .title("Lifestyles")
          .schemaType("lifestyle")
          .child(S.documentTypeList("lifestyle").title("Lifestyles")),

        S.listItem()
          .title("Amenities")
          .schemaType("amenity")
          .child(S.documentTypeList("amenity").title("Amenities")),

        S.listItem()
          .title("Blogs")
          .schemaType("blog")
          .child(S.documentTypeList("blog").title("Blogs")),
        S.listItem()
          .title("FAQs")
          .schemaType("faq")
          .child(S.documentTypeList("faq").title("FAQs")),
      ]
    );
  }

  // Return the final structure
  return S.list().title("Content").items(items);
};
