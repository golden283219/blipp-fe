import { EDeliveryType } from './enums';

export interface IRestaurant {
  name: string;
  address: string;
  currency: string;
  deliveryStatus: boolean;
  takeawayStatus: boolean;
  reservationStatus: boolean;
  preparationTimes: IPreparationTime[];
}

export interface IPreparationTime {
  deliveryType: EDeliveryType;
  time: number;
}
