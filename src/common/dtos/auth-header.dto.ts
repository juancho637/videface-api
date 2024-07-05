import { IsNotEmpty, IsString } from 'class-validator';

export class AuthHeaderDto {
  @IsString()
  @IsNotEmpty()
  authHeader: string;
}
