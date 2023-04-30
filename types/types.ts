export type DollarData = {
  value: string;
};

export type HolidayData = {
  day: string;
  left: string;
  reason: string;
};

export type NewsItem = {
  description: string;
  link: string;
  pubDate: string;
  guid: { text: string; isPermaLink: string };
  source: { text: string; url: string };
  title: string;
};

export type GNewsData = {
  value: { items: NewsItem[] };
};

export type CardData = {
  id: number;
  title: string;
  footer: string;
  data: DollarData | HolidayData | GNewsData;
};

export type CardShellData = {
  title: string;
  footer: string;
};
