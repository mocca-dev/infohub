import { MouseEventHandler } from 'react';

export type DollarData = {
  value: string | undefined;
  official: string | undefined;
  mep: string | undefined;
};

export type HolidayData = {
  day: string | undefined;
  month: string | undefined;
  left: string | undefined;
  reason: string | undefined;
  isWeekend: boolean | undefined;
  dayName: string | undefined;
};

export type NewsItem = {
  description: string;
  link: string;
  published: string;
  id: string;
  title: string;
};

export type WeatherData = {
  temperature: string;
  status: string;
  icon: string;
};

export type GNewsData = {
  value: { items: NewsItem[] };
};

export type CardData = {
  id: number;
  title: string;
  footer: string;
  data: DollarData | HolidayData | GNewsData | WeatherData | HistoryDay[];
};

export type CardShellData = {
  title: string | undefined;
  footer: string | undefined;
};

export type Option = {
  label: string;
  action: MouseEventHandler<HTMLButtonElement>;
};

export type HistoryDay = {
  moneda: string;
  casa: string;
  fecha: string;
  compra: number;
  venta: number;
};
