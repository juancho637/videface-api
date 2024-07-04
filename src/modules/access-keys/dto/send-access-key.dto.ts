import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Matches,
  ValidateIf,
} from 'class-validator';

export class SendAccessKeyDto {
  @IsNumber()
  @IsNotEmpty()
  readonly keyId: number;

  @ValidateIf((o) => o.mobile)
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ValidateIf((o) => o.email)
  @IsNumberString()
  @IsNotEmpty()
  readonly mobile: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, {
    message: 'accessStartDate must be in the format YYYY-MM-DD',
  })
  readonly accessStartDate: string;

  @IsOptional()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'accessStartTime must be in the format HH:MM (24-hour format)',
  })
  readonly accessStartTime: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, {
    message: 'accessEndDate must be in the format YYYY-MM-DD',
  })
  readonly accessEndDate: string;

  @IsOptional()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'accessEndTime must be in the format HH:MM (24-hour format)',
  })
  readonly accessEndTime: string;

  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsBoolean()
  readonly returnReminder: boolean;
}
