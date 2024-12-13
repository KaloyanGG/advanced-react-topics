import { NotificationEnum, NotificationType } from "./Notifications";

type NotificationProps = {
  key: string;
  notification: NotificationType;
  deleteNotification: Function;
};
const Notification = ({
  notification,
  deleteNotification,
}: NotificationProps) => {
  const { type, message, id } = notification;
  const getClass = () => {
    switch (type) {
      case NotificationEnum.INFO:
        return "info";
      case NotificationEnum.ERROR:
        return "error";
      case NotificationEnum.SUCCESS:
        return "success";
      default:
        console.error("notify() called with a non-existing type");
        return "info";
    }
  };
  const className = getClass();
  return (
    <div className={`notification ${className}`}>
      <div className='content'>
        {type === NotificationEnum.SUCCESS ? (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            width='24'
            height='24'
            fill='rgba(255,255,255,1)'
            stroke='rgba(255,255,255,1)'
          >
            <path d='M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z'></path>
          </svg>
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            width='24'
            height='24'
            fill='rgba(255,255,255,1)'
          >
            <path d='M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z'></path>
          </svg>
        )}
        <span>{message}</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          width='16'
          height='16'
          fill='rgba(255,255,255,1)'
          onClick={() => deleteNotification(id)}
        >
          <path d='M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z'></path>
        </svg>
      </div>
      <div className='progress-container'>
        <progress className={className} value={0.75} />
      </div>
    </div>
  );
};
export default Notification;
