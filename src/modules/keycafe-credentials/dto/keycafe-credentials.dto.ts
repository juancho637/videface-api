import { IsNotEmpty } from 'class-validator';
export class KeyCafeCredentialDto {
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  pass: string;
}
