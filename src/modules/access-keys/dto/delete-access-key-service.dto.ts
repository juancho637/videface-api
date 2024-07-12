import { AuthDto } from '@common/dtos';

export type DeleteAccessKeyDtoType = {
  user: AuthDto;
  accessKeyId: string;
};
