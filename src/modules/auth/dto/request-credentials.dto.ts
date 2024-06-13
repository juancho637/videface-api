import { IsNotEmpty } from 'class-validator';
export class RequestCredentialDto {
  @IsNotEmpty()
  companyName: string;
}
