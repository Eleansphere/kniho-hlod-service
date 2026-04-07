import { AbstractAuthService } from '@eleansphere/service-core';
import { ChangePasswordRequest, LoginRequest, LoginResponse, RegisterRequest } from '../dtos/auth.dto';

export class AuthService extends AbstractAuthService<LoginRequest, LoginResponse, { id: string; email: string }> {
  login(credentials: LoginRequest): Promise<LoginResponse> {
    return this.post<LoginResponse>('/api/auth/login', credentials);
  }

  me(): Promise<{ id: string; email: string }> {
    return this.get('/api/auth/me');
  }

  register(dto: RegisterRequest): Promise<void> {
    return this.post('/api/auth/register', dto);
  }

  changePassword(dto: ChangePasswordRequest): Promise<void> {
    return this.post('/api/auth/change-password', dto);
  }
}
