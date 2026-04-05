import { defineEntity } from '../entity-factory';
import type { InferDto } from '../entity-factory';

const fields = {
  title: { type: 'STRING' as const, required: true as const, maxLength: 200 },
  message: { type: 'TEXT' as const, required: true as const },
  severity: { type: 'STRING' as const, required: true as const, default: 'info' },
  activeFrom: { type: 'DATE' as const, required: true as const },
  activeTo: { type: 'DATE' as const, required: true as const },
};

export const systemNotificationEntity = defineEntity({
  name: 'systemNotification',
  prefix: 'sn',
  basePath: '/api/system-notifications',
  userScoped: false,
  fields,
  extend(Base) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return class extends (Base as any) {
      async getActive(): Promise<InferDto<typeof fields>[]> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (this as any).get('/api/system-notifications/active') as Promise<InferDto<typeof fields>[]>;
      }
    };
  },
});
