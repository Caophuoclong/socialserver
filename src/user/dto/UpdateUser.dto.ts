export class UpdateUser {
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly password: string;
  readonly avatarId?: string;
  readonly coverId?: string;
  readonly avatarUrl?: string;
  readonly coverUrl?: string;
  readonly dob: {
    date: number;
    month: number;
    year: number;
  };
}
