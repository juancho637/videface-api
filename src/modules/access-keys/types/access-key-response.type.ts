export type AccessKeyResponseType = {
  id: number;
  suppressGuestNotifications: boolean;
  anonymous: boolean;
  returnReminder: boolean;
  requirePhotoVerification: boolean;
  suppressInstructions: boolean;
  requireTravelerID: boolean;
  bookingCode: number;
  user: {
    email: string;
  };
  accessCode: number;
  allowSetup: boolean;
  key: {
    id: number;
    currentLocation: {
      id: number;
      name: string;
    };
    name: string;
    homeLocation: {
      id: number;
      name: string;
    };
    serialNumber: string;
  };
  confirmed: boolean;
};
