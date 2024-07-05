import { AuthDto } from '@common/dtos';

export type SendAccessKeyDtoType = {
  user: AuthDto;
  sendAccessKeyData: {
    keyId: number;
    email?: string;
    mobile?: string;
    accessStartDate?: string;
    accessStartTime?: string;
    accessEndDate?: string;
    accessEndTime?: string;
    name?: string;
    returnReminder?: boolean;
  };
};
