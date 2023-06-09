import { MouseEventHandler } from 'react';

export type DollarData = {
  value: string | undefined;
};

export type HolidayData = {
  day: string | undefined;
  left: string | undefined;
  reason: string | undefined;
};

export type NewsItem = {
  description: string;
  link: string;
  pubDate: string;
  guid: { text: string; isPermaLink: string };
  source: { text: string; url: string };
  title: string;
};

export type WeatherData = {
  temperature: string;
  status: string;
};

export type GNewsData = {
  value: { items: NewsItem[] };
};

export type CardData = {
  id: number;
  title: string;
  footer: string;
  data: DollarData | HolidayData | GNewsData | WeatherData;
};

export type CardShellData = {
  title: string | undefined;
  footer: string | undefined;
};

export type Option = {
  label: string;
  action: MouseEventHandler<HTMLButtonElement>;
};
