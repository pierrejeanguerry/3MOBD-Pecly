export interface User {
  id: string;
  address?: {
    city?: string;
    country?: string;
    postalCode?: string;
    street?: string;
  };
  caregiverDetails?: {
    instruction?: string;
    licenseNumber?: string;
    motives?: string[];
    paymentMeans?: {
      card: boolean;
      cash: boolean;
      check: boolean;
    };
    presentation?: string;
    price?: {
      convention?: number;
      prices?: {
        price?: number;
        title?: string;
      }[];
      thirdParty?: string;
      vitalCard?: boolean;
    };
    speciality?: string;
    mustBeReferred?: boolean;
  };
  contact?: {
    email?: string;
    phone?: string;
  };
  email: string;
  isCaregiver: boolean;
  lastname?: string;
  firstname?: string;
  password: string;
  gender: string;
  name?: string;
}
