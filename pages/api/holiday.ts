// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { HolidayCardData } from '@/types/interfaces';

enum MonthNumber {
  Enero = 1,
  Febrero = 2,
  Marzo = 3,
  Abril = 4,
  Mayo = 5,
  Junio = 6,
  Julio = 7,
  Agosto = 8,
  Septiembre = 9,
  Octubre = 10,
  Noviembre = 11,
  Diciembre = 12,
}

const DayName = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
];

const getDayNumber = (date: string) => {
  const now = new Date();
  const dateMonth = date.split('-')[1];
  if (now.getMonth() === 11 && dateMonth !== '11') {
    return new Date(`${now.getFullYear() + 1}-${date}`).getDay();
  } else {
    return new Date(`${now.getFullYear()}-${date}`).getDay();
  }
};

const isWeekend = (date: string) => {
  const day = getDayNumber(date);
  return day === 0 || day === 6;
};

const getDayName = (date: string) => DayName[getDayNumber(date)];

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
      day: holidayNumber,
      month: holidayMonth,
      left: holidayLeft,
      reason: holidayReason,
      isWeekend: isWeekend(`${MonthNumber[holidayMonth]}-${holidayNumber}`),
      dayName: getDayName(`${MonthNumber[holidayMonth]}-${holidayNumber}`),
    },
  });
};

export default handler;
