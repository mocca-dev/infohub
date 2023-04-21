// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

enum CardType {
  Dollar = 1,
  Holiday = 2,
}

type HollidayData = {
  day: string;
  left: string;
  reason: string;
};

type CardData = {
  id: number;
  title: string;
  footer: string;
  data: HollidayData;
  type: number;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<CardData>) => {
  const HTMLParser = require('node-html-parser');
  const hollidayResp = await fetch('https://www.lanacion.com.ar/feriados/');
  const holliday = await hollidayResp.text();

  const hollidayRoot = HTMLParser.parse(holliday);
  const hollidayNumber = hollidayRoot
    .querySelector('.com-text.sueca.--font-bold.--threexl')
    .innerHTML.toString();
  const hollidayLeft = hollidayRoot
    .querySelector('.com-text.--l')
    .innerHTML.toString()
    .replace('<strong>', '')
    .replace('</strong>', '')
    .replace(' para el próximo feriado', '');
  const hollidayMonth = hollidayRoot
    .querySelector('.com-text.--font-bold.--m')
    .innerHTML.toString();
  const hollidayReason = hollidayRoot
    .querySelector('.com-text.--s')
    .innerHTML.toString();

  res.status(200).json({
    id: 1,
    title: 'Próximo Feriado',
    footer: '',
    data: {
      day: `${hollidayNumber}  ${hollidayMonth}`,
      left: hollidayLeft,
      reason: hollidayReason,
    },
    type: CardType.Holiday,
  });
};

export default handler;
