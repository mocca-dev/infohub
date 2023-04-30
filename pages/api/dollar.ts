// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { DollarCardData } from '@/types/interfaces';
import type { NextApiRequest, NextApiResponse } from 'next';

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

  const dolarBlueUpdateDate = dolarBlueTile
    .querySelector('.tile.update')
    .querySelector('span')
    .innerHTML.toString();

  res.status(200).json({
    id: 0,
    title: 'Dólar Blue',
    footer: dolarBlueUpdateDate,
    data: { value: dolarBlue },
  });
};

export default handler;
