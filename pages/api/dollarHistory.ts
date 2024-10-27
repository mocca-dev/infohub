// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const resp = await fetch(
    'https://api.argentinadatos.com/v1/cotizaciones/dolares/blue'
  );
  const data = await resp.json();
  const history = data.map((day: any) => [day.fecha, day.venta]);

  res.status(200).json({
    id: 0,
    title: 'Dólar Blue',
    footer: 'nada',
    data: { history },
  });
};

export default handler;
