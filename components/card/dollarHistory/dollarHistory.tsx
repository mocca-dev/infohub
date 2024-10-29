import { useEffect, useState } from 'react';
import Card from '../card';
import useFetch from '@/hooks/useFetch';
import { LineChart } from 'react-chartkick';
import 'chartkick/chart.js';
import HistoryNavbar from './HistoryNavbar/HistoryNavbar';
import { DollarHistoyCardData } from '@/types/interfaces';

const DollarHistory = () => {
  const [dollarHistoryCard, isDollarHistoryLoading, refreshDollarHistory] =
    useFetch<DollarHistoyCardData>('/api/dollarHistory', 300);
  const [dollarHistoryList, setDollarHistoryList] = useState([]);
  const [minValue, setMinValue] = useState(0);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const history = dollarHistoryCard?.data;
    setDollarHistoryList(history);
    if (history)
      setMinValue(Math.min(...history.map((dollar: any) => dollar[1])) - 5);
  }, [dollarHistoryCard]);

  const changeRange = (range: number) => {
    setSelected(range);
    const history = dollarHistoryCard?.data;
    const slicedHistory = history.slice(-range, history.length);
    setDollarHistoryList(slicedHistory);
    setMinValue(Math.min(...slicedHistory.map((dollar: any) => dollar[1])) - 5);
  };

  return (
    <Card
      data={{ title: 'Dólar blue histórico', footer: '' }}
      isLoading={isDollarHistoryLoading}
      refresh={refreshDollarHistory}
      isBig
    >
      <>
        <br />
        <HistoryNavbar changeRange={changeRange} selected={selected} />
        <LineChart
          data={dollarHistoryList}
          min={minValue}
          prefix="$"
          colors={['#fff']}
          points={false}
        />
      </>
    </Card>
  );
};

export default DollarHistory;
