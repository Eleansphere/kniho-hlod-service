import { AbstractServiceContainer } from '@eleansphere/service-core';
import { AuthService } from './services/auth.service';
import { bookEntity } from './entities/book.entity';
import { loanEntity } from './entities/loan.entity';
import { userEntity } from './entities/user.entity';
import { profileImageEntity } from './entities/profile-image.entity';

export class KnihoHlodServices extends AbstractServiceContainer {
  readonly auth: AuthService;
  readonly users: InstanceType<typeof userEntity.Service>;
  readonly books: InstanceType<typeof bookEntity.Service>;
  readonly loans: InstanceType<typeof loanEntity.Service>;
  readonly files: InstanceType<typeof profileImageEntity.Service>;

  constructor(baseUrl: string, tokenProvider: () => string | null) {
    super(baseUrl, tokenProvider);
    this.auth = new AuthService(...this.args());
    this.users = new userEntity.Service(...this.args());
    this.books = new bookEntity.Service(...this.args());
    this.loans = new loanEntity.Service(...this.args());
    this.files = new profileImageEntity.Service(...this.args());
  }
}

let _instance: KnihoHlodServices | null = null;

export function configureServices(
  baseUrl: string,
  tokenProvider: () => string | null
): KnihoHlodServices {
  _instance = new KnihoHlodServices(baseUrl, tokenProvider);
  return _instance;
}

export function getServices(): KnihoHlodServices {
  if (!_instance) {
    throw new Error('Services not configured. Call configureServices() in app.ts first.');
  }
  return _instance;
}
