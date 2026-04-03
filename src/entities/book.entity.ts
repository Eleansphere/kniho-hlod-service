import { defineEntity } from '../entity-factory';

export const bookEntity = defineEntity({
  name: 'book',
  prefix: 'b',
  basePath: '/api/books',
  userScoped: true,
  fields: {
    title: { type: 'STRING' as const, required: true, maxLength: 200 },
    author: { type: 'STRING' as const, maxLength: 100 },
    description: { type: 'TEXT' as const },
    publicationYear: { type: 'INTEGER' as const, min: 1000, max: 9999 },
    isAvailable: { type: 'BOOLEAN' as const, required: true },
    ownerId: { type: 'STRING' as const, required: true },
  },
});
