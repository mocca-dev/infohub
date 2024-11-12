import { useEffect, useState } from 'react';
import Card from '../card';
import useFetch from '@/hooks/useFetch';
import { LineChart } from 'react-chartkick';
import 'chartkick/chart.js';
import HistoryNavbar from './HistoryNavbar/HistoryNavbar';
import { DollarHistoyCardData } from '@/types/interfaces';

const DollarHistory = () => {
  const [dollarHistoryCard, isDollarHistoryLoading, refreshDollarHistory] =
    useFetch<DollarHistoyCardData>('/api/dollarHistory');
  const [dollarHistoryList, setDollarHistoryList] = useState([]);
  const [minValue, setMinValue] = useState(0);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const rangeFromLocalStorage =
      localStorage.getItem('range') || selected.toString();
    const range = parseInt(rangeFromLocalStorage);
    const history = dollarHistoryCard?.data;
    setDollarHistoryList(history);
    if (history) changeRange(range, history);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dollarHistoryCard]);

  const changeRange = (range: number, updatedHistory?) => {
    setSelected(range);
    localStorage.setItem('range', range.toString());
    const history = updatedHistory ? updatedHistory : dollarHistoryCard?.data;
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
