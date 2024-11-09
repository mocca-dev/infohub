import {
  CardData,
  DollarData,
  GNewsData,
  WeatherData,
  HistoryDay,
  HolidayListData,
} from './types';

export interface DollarCardData extends CardData {
  data: DollarData;
}

export interface DollarHistoyCardData extends CardData {
  data: HistoryDay[];
}

export interface HolidayCardData extends CardData {
  data: HolidayListData;
}

export interface GNewsCardData extends CardData {
  data: GNewsData;
}
export interface WeatherCardData extends CardData {
  data: WeatherData;
}
