import { defineEntity } from '../entity-factory';

export const profileImageEntity = defineEntity({
  name: 'profileImage',
  prefix: 'f',
  basePath: '/api/profile-images',
  routePath: '/api/profile-images',
  serviceType: 'file',
  uploadField: 'avatar',
  fields: {
    name: { type: 'STRING' as const },
    // writeOnly: sent as multipart form data, not returned in read Dto
    avatar: { type: 'BLOB' as const, writeOnly: true },
    user: { type: 'STRING' as const },
  },
});
