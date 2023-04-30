// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { HolidayCardData } from '@/types/interfaces';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<HolidayCardData>
) => {
  const HTMLParser = require('node-html-parser');
  let holiday;
  try {
    const holidayResp = await fetch('https://www.lanacion.com.ar/feriados/');
    holiday = await holidayResp.text();
  } catch (error) {
    console.error('ERROR', error);
  }

  const holidayRoot = HTMLParser.parse(holiday);
  const holidayNumber = holidayRoot
    .querySelector('.com-text.sueca.--font-bold.--threexl')
    .innerHTML.toString();
  const holidayLeft = holidayRoot
    .querySelector('.com-text.--l')
    .innerHTML.toString()
    .replace('<strong>', '')
    .replace('</strong>', '')
    .replace(' para el próximo feriado', '');
  const holidayMonth = holidayRoot
    .querySelector('.com-text.--font-bold.--m')
    .innerHTML.toString();
  const holidayReason = holidayRoot
    .querySelector('.com-text.--s')
    .innerHTML.toString();

  res.status(200).json({
    id: 1,
    title: 'Próximo Feriado',
    footer: '',
    data: {
      day: `${holidayNumber}  ${holidayMonth}`,
      left: holidayLeft,
      reason: holidayReason,
    },
  });
};

export default handler;
