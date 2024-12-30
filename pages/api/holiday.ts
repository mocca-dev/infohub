import type { NextApiRequest, NextApiResponse } from 'next';
import { HolidayCardData } from '@/types/interfaces';
import { Holiday } from '@/types/types';

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

const isWeekend = (date: string) => {
  const day = new Date(date).getDay();
  return day >= 5;
};

function getWeekDayBasedInArgentina(dateString: string) {
  const splittedDate = dateString.split('-');
  let year = parseInt(splittedDate[0]),
    month = parseInt(splittedDate[1]),
    day = parseInt(splittedDate[2]);

  const date = new Date(Date.UTC(year, month - 1, day + 1));
  const options = { timeZone: 'America/Argentina/Buenos_Aires' };

  const formatter = new Intl.DateTimeFormat('es-AR', {
    ...options,
    weekday: 'long',
  });

  return formatter.format(date);
}

const getArgentinaDatosHolliday = async () => {
  const date = new Date();
  let apiYear = date.getFullYear();

  if (date.getMonth() + 1 === 12 && date.getDate() > 25) apiYear++;

  const resp = await fetch(
    'https://api.argentinadatos.com/v1/feriados/' + apiYear
  );
  const data: Holiday[] = await resp.json();

  const today = Date.now();
  const days = data.map((day: Holiday) => {
    const dayInMilliseconds = new Date(day.fecha).getTime();

    const nextDate = new Date(day.fecha).getTime();
    const diffTime = Math.abs(today - nextDate);
    const left =
      'Faltan ' +
      (Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1).toString() +
      ' días';
    const nextHolidaySplitted = day.fecha.split('-');
    const month = MonthNumber[parseInt(nextHolidaySplitted[1])];
    const nextDay: string = parseInt(nextHolidaySplitted[2]).toString();

    return {
      day: nextDay,
      month,
      left,
      reason: day.nombre,
      isWeekend: isWeekend(day.fecha),
      dayName: getWeekDayBasedInArgentina(day.fecha),
      isNextHoliday: dayInMilliseconds > today,
    };
  });
  return { days };
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<HolidayCardData>
) => {
  const data = await getArgentinaDatosHolliday();
  res.status(200).json({
    id: 1,
    title: 'Feriados',
    footer: '',
    data: data,
  });
};

export default handler;

// enum DaysOfWeek {
//   Monday = 'Lunes',
//   Tuesday = 'Martes',
//   Wednesday = 'Miércoles',
//   Thursday = 'Jueves',
//   Friday = 'Viernes',
//   Saturday = 'Sábado',
//   Sunday = 'Domingo',
// }

// const getLaNacionHolliday = async () => {
//   const HTMLParser = require('node-html-parser');
//   let holiday;
//   try {
//     const holidayResp = await fetch('https://www.lanacion.com.ar/feriados/');
//     holiday = await holidayResp.text();
//   } catch (error) {
//     console.error('ERROR', error);
//   }

//   const holidayRoot = HTMLParser.parse(holiday);
//   const holidayNumber = holidayRoot
//     .querySelector('.com-text.sueca.--font-bold.--threexl')
//     .innerHTML.toString();
//   const holidayLeft = holidayRoot
//     .querySelector('.com-text.--l')
//     .innerHTML.toString()
//     .replace('<strong>', '')
//     .replace('</strong>', '')
//     .replace(' para el próximo feriado', '');
//   const holidayMonth = holidayRoot
//     .querySelector('.com-text.--font-bold.--m')
//     .innerHTML.toString();
//   const holidayReason = holidayRoot
//     .querySelector('.com-text.--s')
//     .innerHTML.toString();

//   return {
//     day: holidayNumber,
//     month: holidayMonth,
//     left: holidayLeft,
//     reason: holidayReason,
//     isWeekend: isWeekend(`${MonthNumber[holidayMonth]}-${holidayNumber}`),
//     dayName: getDayName(`${MonthNumber[holidayMonth]}-${holidayNumber}`),
//   };
// };
