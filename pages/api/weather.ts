const HTMLParser = require('node-html-parser');
import { WeatherCardData } from '@/types/interfaces';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<WeatherCardData>
) => {
  const weatherResp = await fetch(
    'https://www.meteored.com.ar/tiempo-en_Bahia+Blanca-America+Sur-Argentina-Provincia+de+Buenos+Aires-SAZB-1-16884.html'
  );
  const weather = await weatherResp.text();
  const weatherRoot = HTMLParser.parse(weather);

  const weatherDiv = weatherRoot.querySelector('#estado-actual');

  const status = weatherDiv
    .querySelector('.descripcion')
    .innerHTML.toString()
    .replace('<strong>', '')
    .replace('</strong>', '');

  const temperature = weatherDiv
    .querySelector('.dato-temperatura.changeUnitT')
    .innerHTML.toString()
    .replace('&deg;', '');

  const icon = weatherDiv.querySelector('.temperatura').querySelector('img')
    ._attrs.src;

  res.status(200).json({
    id: 3,
    title: 'Weather - Bahía Blanca',
    footer: '',
    data: { temperature, status, icon },
  });
};

export default handler;
