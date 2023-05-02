import { useEffect, useState } from 'react';

export default function useFetch<T>(
  url: string,
  autoRefresh: boolean
): [T | undefined, boolean, any] {
  const [card, setCard] = useState<T>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    fetchFromAPI(url, setCard, setIsLoading);
    if (autoRefresh) {
      const intervalId = setInterval(() => {
        setIsLoading(true);
        fetchFromAPI(url, setCard, setIsLoading);
      }, 1000 * 300);
      return () => clearInterval(intervalId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [card, isLoading, () => refreshData(url, setCard, setIsLoading)];
}

const refreshData = (
  url: string,
  setCard: Function,
  setIsLoading: Function
) => {
  setIsLoading(true);
  fetchFromAPI(url, setCard, setIsLoading);
};

const fetchFromAPI: any = async (
  url: string,
  setCard: Function,
  setIsLoading: Function
) => {
  const resp = await fetch(url);
  const data = await resp.json();

  setCard(data);
  setIsLoading(false);
};
