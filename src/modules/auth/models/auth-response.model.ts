export class AuthResponseModel {
  id: number;
  twoFactor: boolean;
  user: {
    firstName: string;
    id: number;
    organization: string;
    mobile: string;
    type: string;
    lastName: string;
    email: string;
  };
  token: string;
}
