import { FC, useEffect, useState } from "react";
import { createPortal } from "react-dom";

let addNotificationFunction: Function;

const Notificator: FC<{ time: number }> = ({ time }) => {
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    addNotificationFunction = (message: string) => {
      setNotifications((prev) => [...prev, message]);
      setTimeout(() => {
        setNotifications((prev) => {
          prev.pop();
          return [...prev];
        });
      }, time);
    };
  }, []);

  return createPortal(
    <>
      {notifications.map((n) => (
        <p>{n}</p>
      ))}
    </>,
    document.body
  );
};

export const notify = (message: string) => {
  addNotificationFunction(message);
};

export default Notificator;
