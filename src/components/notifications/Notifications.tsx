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
  duration: number;
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
        { message, id: idGen(), type, duration },
      ]);
    };
  }, []);

  const deleteNotification = (id: string) => {
    setNotifications((prev) => {
      return prev.filter((n) => n.id !== id);
    });
  };
  return createPortal(
    <div className='notifications-container'>
      {notifications.map((n) => {
        return (
          <Notification
            deleteNotification={deleteNotification}
            notification={n}
            duration={duration}
            key={n.id}
          />
        );
      })}
    </div>,
    document.body
  );
};
export const notify = (message: string, type?: NotificationEnum) => {
  type
    ? addNotification(message, type)
    : addNotification(message, NotificationEnum.INFO);
};

export default Notifications;
