import {
  CardData,
  DollarData,
  HolidayData,
  GNewsData,
  WeatherData,
} from './types';

export interface DollarCardData extends CardData {
  data: DollarData;
}

export interface HolidayCardData extends CardData {
  data: HolidayData;
}

export interface GNewsCardData extends CardData {
  data: GNewsData;
}
export interface WeatherCardData extends CardData {
  data: WeatherData;
}
