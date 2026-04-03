import { defineEntity, type InferDto } from '../entity-factory';

const loanFields = {
  borrower: { type: 'STRING' as const, required: true },
  loanDate: { type: 'DATE' as const, required: true },
  returnDate: { type: 'DATE' as const },
  bookId: { type: 'STRING' as const, required: true },
  ownerId: { type: 'STRING' as const, required: true },
  isReturned: { type: 'BOOLEAN' as const, default: false as const },
};

export const loanEntity = defineEntity({
  name: 'loan',
  prefix: 'l',
  basePath: '/api/loans',
  userScoped: true,
  fields: loanFields,
  extend: (base) =>
    class extends (base as any) {
      getByBook(bookId: string): Promise<InferDto<typeof loanFields>[]> {
        return (this as any).get(`/api/loans?bookId=${bookId}`) as Promise<
          InferDto<typeof loanFields>[]
        >;
      }
    },
});
