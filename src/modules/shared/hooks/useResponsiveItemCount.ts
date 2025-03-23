import { useState, useEffect } from 'react';

const useResponsiveItemCount = (desktopCount: number, mobileCount: number): number => {
  const [count, setCount] = useState<number>(desktopCount);

  useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth < 640) {
        setCount(mobileCount);
      } else {
        setCount(desktopCount);
      }
    };

    updateCount();
    window.addEventListener('resize', updateCount);
    return () => window.removeEventListener('resize', updateCount);
  }, [desktopCount, mobileCount]);

  return count;
};

export default useResponsiveItemCount;
