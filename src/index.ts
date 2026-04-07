// ── Entity factory ────────────────────────────────────────────────────────────
export { defineEntity } from './entity-factory';
export type { FieldDef, Fields, InferDto, InferCreateDto, InferUpdateDto, DtoClass } from './entity-factory';

// ── BE: Model configs (via entity objects) ────────────────────────────────────
export { bookEntity } from './entities/book.entity';
export { loanEntity } from './entities/loan.entity';
export { userEntity } from './entities/user.entity';
export { profileImageEntity } from './entities/profile-image.entity';
export { systemNotificationEntity } from './entities/system-notification.entity';

// ── Shared: Auth DTOs ─────────────────────────────────────────────────────────
export { LoginRequest, LoginResponse, ChangePasswordRequest, RegisterRequest } from './dtos/auth.dto';

// ── FE: Auth service ──────────────────────────────────────────────────────────
export { AuthService } from './services/auth.service';
export { AbstractUserScopedCrudService } from './services/abstract-user-scoped-crud.service';

// ── FE: Service container ─────────────────────────────────────────────────────
export { KnihoHlodServices, configureServices, getServices } from './service-container';

// ── Backwards-compatible DTO exports ─────────────────────────────────────────
// Value exports allow `new BookDto()` in components.
// Type exports allow `BookDto` as a type annotation.
import { bookEntity } from './entities/book.entity';
import { loanEntity } from './entities/loan.entity';
import { userEntity } from './entities/user.entity';
import { profileImageEntity } from './entities/profile-image.entity';

export const BookDto = bookEntity.Dto;
export type BookDto = InstanceType<typeof bookEntity.Dto>;
export const CreateBookDto = bookEntity.CreateDto;
export type CreateBookDto = InstanceType<typeof bookEntity.CreateDto>;
export const UpdateBookDto = bookEntity.UpdateDto;
export type UpdateBookDto = InstanceType<typeof bookEntity.UpdateDto>;

export const LoanDto = loanEntity.Dto;
export type LoanDto = InstanceType<typeof loanEntity.Dto>;
export const CreateLoanDto = loanEntity.CreateDto;
export type CreateLoanDto = InstanceType<typeof loanEntity.CreateDto>;
export const UpdateLoanDto = loanEntity.UpdateDto;
export type UpdateLoanDto = InstanceType<typeof loanEntity.UpdateDto>;

export const UserDto = userEntity.Dto;
export type UserDto = InstanceType<typeof userEntity.Dto>;
export const CreateUserDto = userEntity.CreateDto;
export type CreateUserDto = InstanceType<typeof userEntity.CreateDto>;
export const UpdateUserDto = userEntity.UpdateDto;
export type UpdateUserDto = InstanceType<typeof userEntity.UpdateDto>;

export const ProfileImageDto = profileImageEntity.Dto;
export type ProfileImageDto = InstanceType<typeof profileImageEntity.Dto>;
export const CreateProfileImageDto = profileImageEntity.CreateDto;
export type CreateProfileImageDto = InstanceType<typeof profileImageEntity.CreateDto>;

import { systemNotificationEntity } from './entities/system-notification.entity';

export const SystemNotificationDto = systemNotificationEntity.Dto;
export type SystemNotificationDto = InstanceType<typeof systemNotificationEntity.Dto>;
export const CreateSystemNotificationDto = systemNotificationEntity.CreateDto;
export type CreateSystemNotificationDto = InstanceType<typeof systemNotificationEntity.CreateDto>;
export const UpdateSystemNotificationDto = systemNotificationEntity.UpdateDto;
export type UpdateSystemNotificationDto = InstanceType<typeof systemNotificationEntity.UpdateDto>;
