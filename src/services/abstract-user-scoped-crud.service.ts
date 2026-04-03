import { AbstractCrudService } from '@eleansphere/service-core';

export abstract class AbstractUserScopedCrudService<
  TDto,
  TCreate,
  TUpdate,
> extends AbstractCrudService<TDto, TCreate, TUpdate> {
  protected abstract readonly basePath: string;
  private _userIdProvider: (() => string | null) | null = null;

  setUserIdProvider(provider: () => string | null): void {
    this._userIdProvider = provider;
  }

  override getAll(): Promise<TDto[]> {
    const userId = this._userIdProvider?.();
    const query = userId ? `?ownerId=${userId}` : '';
    return this.get<TDto[]>(`${this.basePath}${query}`);
  }
}
