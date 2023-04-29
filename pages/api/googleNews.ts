import type { NextApiRequest, NextApiResponse } from 'next';
let googleNewsAPI = require('google-news-json');

type NewsItem = {
  description: string;
  link: string;
  pubDate: string;
  guid: { text: string; isPermaLink: string };
  source: { text: string; url: string };
  title: string;
};

type GNewsData = {
  value: { items: NewsItem[] };
};

type CardData = {
  id: number;
  title: string;
  footer: string;
  data: GNewsData;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<CardData>) => {
  let news = await googleNewsAPI.getNews(googleNewsAPI.TOP_NEWS, null, 'es-AR');

  res.status(200).json({
    id: 2,
    title: 'Google News - Argentina',
    footer: '',
    data: { value: { ...news, items: news.items.slice(0, 10) } },
  });
};

export default handler;
