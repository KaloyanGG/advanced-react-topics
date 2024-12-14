import { useEffect, useRef, useState } from "react";

type ProgressBarProps = {
  className: string;
  deleteNotification: Function;
  duration: number;
};
const ProgressBar = ({
  duration,
  className,
  deleteNotification,
}: ProgressBarProps) => {
  const [value, setValue] = useState<number>(100);

  useEffect(() => {
    const intervalTime = 25;
    const decrementPerInterval = 100 / (duration / intervalTime);

    const interval = setInterval(() => {
      setValue((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          deleteNotification();
          return 0;
        }
        return prev - decrementPerInterval;
      });
    }, intervalTime);
    return () => clearInterval(interval);
  }, [duration]);

  return <progress className={className} value={value} max={100} />;
};

export default ProgressBar;
