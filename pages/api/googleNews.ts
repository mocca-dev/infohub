import { GNewsCardData } from '@/types/interfaces';
import { NewsItem } from '@/types/types';
import type { NextApiRequest, NextApiResponse } from 'next';
let googleNewsAPI = require('google-news-json');

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<GNewsCardData>
) => {
  let news = await googleNewsAPI.getNews(googleNewsAPI.TOP_NEWS, null, 'es-AR');

  const latestSortedNews = news.items
    .slice(0, 10)
    .sort(
      (a: NewsItem, b: NewsItem) =>
        new Date(b.published).getTime() - new Date(a.published).getTime()
    );

  res.status(200).json({
    id: 2,
    title: 'Google News - Argentina',
    footer: '',
    data: { value: { ...news, items: latestSortedNews } },
  });
};

export default handler;
