// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// We import object and document schemas
import blockContent from "./blockContent";
import category from "./category";
import post from "./post";
import author from "./author";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    {
      name: "pra",
      type: "document",
      title: "PracticeBlog",
      fields: [
        {
          name: "name",
          type: "string",
        },
        {
          name: "content",
          title: "Content",
          type: "array",
          of: [
            {
              type: "block",
            },
            {
              type: "image",
              fields: [
                {
                  title: 'Position',
                  name: 'position',
                  type: 'string',
                  options: {
                    list: [
                      {title: 'Center', value: 'center'},
                      {title: 'Left', value: 'left'},
                      {title: 'Right', value: 'right'},
                    ],
                    layout: 'radio',
                    isHighlighted: true
                  }
                }



                ,

                {
                  type: "text",
                  title: "description",
                  name: "AltText",
                  options: {
                    isHighlighted: true,
                  },
                }
              ],
              options: {
                hotspot: true,
              },
            },
            {
              type: "code",
              options: {
                withFilename: true,
              },
            }
          ],
        },
        {
          name: "dob",
          title: "Dob",
          type: "datetime",
        },
        {
          name: "age",
          type: "number",
          validation: (Rule) => {
            return Rule.required()
              .min(20)
              .max(30)
              .error("age must between 20 and 30");
          },
        },
        {
          name: "image",
          type: "image",
          validation: (Rule) => {
            return Rule.required();
          },
          options: {
            hotspot: true,
          },
        },
        {
          name: "slug",
          type: "slug",
        },
        {
          name: "ref",
          type: "reference",
          to: [{ type: "author" }],
        },
      ],
    },
    // The following are document types which will appear
    // in the studio.
    post,
    author,
    category,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    blockContent,
  ]),
});
