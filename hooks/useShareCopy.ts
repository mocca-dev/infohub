const useShareCopy = (url: string, onShareSucces: any) => {
  const shareCopy = (isShare: boolean) => {
    if (navigator.share && isShare) {
      navigator
        .share({
          title: 'InfoHub',
          text: 'Enterate del valor del dólar blue y más...',
          url,
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else if (onShareSucces && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url);
      onShareSucces(true);
    }
  };

  return shareCopy;
};

export default useShareCopy;
