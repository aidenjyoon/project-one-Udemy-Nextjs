import { useContext } from "react";
import NotificationContext from "../../store/notificationContext";
import Notification from "../ui/notification/Notification";
import MainHeader from "./MainHeader";

const Layout = (props) => {
  const notificationCtx = useContext(NotificationContext);

  const activeNotification = notificationCtx.notification;

  return (
    <>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </>
  );
};

export default Layout;
