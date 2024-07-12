import axios from 'axios';
import { AccessKeyResponseType } from './types';
import {
  SendAccessKeyDtoType,
  DeleteAccessKeyDtoType,
  AccessResponseDto,
} from './dto';

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

  async deleteAccessKey({
    user,
    accessKeyId,
  }: DeleteAccessKeyDtoType): Promise<{ message: string }> {
    try {
      const authHeader = `Basic ${Buffer.from(`${user.username}:${user.password}`).toString('base64')}`;

      await axios.delete(`${process.env.HOST_KEYCAFE}/access/${accessKeyId}`, {
        headers: {
          Authorization: authHeader,
        },
      });

      return { message: 'Access key deleted successfully' };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Axios error: ${error.message}`);
      } else {
        throw new Error('Unexpected error deleting access key');
      }
    }
  }
}
