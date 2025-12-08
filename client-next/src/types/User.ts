export interface User {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    role: string;
    phone: string;
    photo: string;
    address: string;
    isVerified: boolean;
  };
}
