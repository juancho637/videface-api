import { IsNotEmpty } from 'class-validator';
export class AuthSmartBoxesDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}
