// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { DollarCardData } from '@/types/interfaces';
import type { NextApiRequest, NextApiResponse } from 'next';

const getDollarValueFromEmbedded = async (url: string) => {
  const HTMLParser = require('node-html-parser');
  const dolarResp = await fetch(url);
  const dolar = await dolarResp.text();

  const dolarRoot = HTMLParser.parse(dolar);
  const dolarTile = dolarRoot.querySelector('.data__valores');
  const dolarContainer = dolarTile.querySelectorAll('p')[1];

  const spanElement = dolarContainer.querySelector('span');

  return dolarContainer.removeChild(spanElement).innerHTML.toString();
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<DollarCardData>
) => {
  const HTMLParser = require('node-html-parser');
  const dolarHoyResp = await fetch('https://dolarhoy.com');
  const dolarHoy = await dolarHoyResp.text();

  const dolarHoyRoot = HTMLParser.parse(dolarHoy);
  const dolarBlueTile = dolarHoyRoot.querySelector('.tile.dolar');
  const dolarBlue = dolarBlueTile
    .querySelector('.venta')
    .querySelector('.val')
    .innerHTML.toString();

  const dolarBlueUpdateDate =
    'Actualizado por última vez: ' +
    dolarBlueTile
      .querySelector('.tile.update')
      .querySelector('span')
      .innerHTML.toString()
      .split(': ')[1];

  const officialValue = await getDollarValueFromEmbedded(
    'https://dolarhoy.com/i/cotizaciones/dolar-bancos-y-casas-de-cambio'
  );
  const mepValue = await getDollarValueFromEmbedded(
    'https://dolarhoy.com/i/cotizaciones/dolar-mep'
  );

  res.status(200).json({
    id: 0,
    title: 'Dólar Blue',
    footer: dolarBlueUpdateDate,
    data: { value: dolarBlue, official: officialValue, mep: mepValue },
  });
};

export default handler;
