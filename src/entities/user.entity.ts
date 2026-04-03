import { defineEntity } from '../entity-factory';

export const userEntity = defineEntity({
  name: 'user',
  prefix: 'u',
  basePath: '/api/users',
  userScoped: false,
  fields: {
    username: { type: 'STRING' as const, required: true, minLength: 2, maxLength: 50 },
    // writeOnly: excluded from read Dto, still present in CreateDto / UpdateDto
    password: { type: 'STRING' as const, required: true, minLength: 6, writeOnly: true },
    email: { type: 'STRING' as const, required: true, unique: true, format: 'email' as const },
    role: { type: 'STRING' as const, required: true },
  },
});
