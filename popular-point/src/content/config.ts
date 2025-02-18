import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    author: z.string(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().optional(),
    heroImage: z.string().optional(),
  }),
});

export const collections = { blog };
