export interface IUser {
  id: string;
  userName: string;
  phoneNumber: string;
  addressDelivery: string;
  concurancyStamp: string;
}

export interface IRegisterUser {
  email: string;
  userName: string;
  phoneNumber: string;
  addressDelivery: string;
  password: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}
