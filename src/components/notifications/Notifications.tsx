import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Notification from "./Notification.tsx";
import idGen from "../../utils/idGenerator.ts";
import "./Notifications.css";
import genId from "../../utils/idGenerator.ts";
type NotificationsProps = {
  duration: number;
};
export type NotificationType = {
  message: string;
  type: NotificationEnum;
  id: string;
};
export enum NotificationEnum {
  INFO = "INFO",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}
let addNotification: (message: string, type: NotificationEnum) => void;
const Notifications = ({ duration }: NotificationsProps) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  useEffect(() => {
    addNotification = (message: string, type: NotificationEnum) => {
      setNotifications((prev: NotificationType[]) => [
        ...prev,
        { message, id: idGen(), type },
      ]);
      // setTimeout(() => {
      //   setNotifications((prev: NotificationType[]) => {
      //     prev.shift();
      //     return [...prev];
      //   });
      // }, duration);
    };
  }, []);
  return createPortal(
    <div className='notifications-container'>
      {notifications.map((n) => {
        return <Notification notification={n} key={n.id} />;
      })}
    </div>,
    document.body
  );
};
export const notify = (message: string, type: NotificationEnum) => {
  addNotification(message, type);
};

export default Notifications;