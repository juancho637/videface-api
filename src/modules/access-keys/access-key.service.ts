import axios from 'axios';
import { AccessResponseDto } from './dto/response-access-key.dto';
import { AccessKeyResponseType } from './types/access-key-response.type';
import { SendAccessKeyDtoType } from './dto/send-access-key-service.dto';

export class AccessKeyService {
  async sendAccessKey({
    user,
    sendAccessKeyData,
  }: SendAccessKeyDtoType): Promise<AccessResponseDto> {
    try {
      const authHeader = `Basic ${Buffer.from(`${user.username}:${user.password}`).toString('base64')}`;
      const { keyId, email, mobile, ...accessKeyData } = sendAccessKeyData;
      const userInfo = email
        ? { user: { email: email } }
        : { user: { mobile: mobile } };
      const databody = {
        ...userInfo,
        key: { id: keyId },
        ...accessKeyData,
      };
      const { data } = await axios.post<AccessKeyResponseType>(
        `${process.env.HOST_KEYCAFE}/access`,
        databody,
        {
          headers: {
            Authorization: authHeader,
          },
        },
      );

      return {
        message: 'Access key sent successfully',
        idAccess: data.id,
        bookingcode: data.bookingCode,
        email: data.user.email,
        keyId: data.key.id,
        keyName: data.key.name,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Axios error: ${error.message}`);
      } else {
        throw new Error('Unexpected error sending access key');
      }
    }
  }
}
