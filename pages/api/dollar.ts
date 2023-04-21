// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

enum CardType {
  Dollar = 1,
  Holiday = 2,
}

type DolarData = {
  value: string;
};

type CardData = {
  id: number;
  title: string;
  footer: string;
  data: DolarData;
  type: number;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<CardData>) => {
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
    type: CardType.Dollar,
  });
};

export default handler;
