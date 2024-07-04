import axios from 'axios';
import { AuthDto } from '@common/dtos';
import { AccessKeyResponseType } from './types/access-key-response.type';

export class AccessKeyService {
  async sendAccessKey({
    user,
    sendAccessKeyData,
  }: SendAccessKeyDtoType): Promise<any> {
    try {
      const authHeader = `Basic ${Buffer.from(`${user.username}:${user.password}`).toString('base64')}`;
      const { keyId, email, mobile, ...accessKeyData } = sendAccessKeyData;
      const userInfo = email ? { email: email } : { mobile: mobile };

      await axios.post<AccessKeyResponseType>( //TODO: Add type for response and do something with response
        `${process.env.HOST_KEYCAFE}/access`,
        {
          headers: {
            Authorization: authHeader,
          },
          data: {
            ...userInfo,
            key: { serialNumber: keyId },
            ...accessKeyData,
          },
        },
      );

      return {
        message: 'Access key sent successfully',
      };
    } catch (error) {
      throw new Error('Error sending access key');
    }
  }
}

type SendAccessKeyDtoType = {
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
