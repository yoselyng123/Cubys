import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { useState, useEffect } from 'react';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const [notificationPermissions, setNotificationPermissions] = useState(
  Permissions.UNDETERMINED
);

const scheduleNotification = (seconds) => {
  const schedulingOptions = {
    content: {
      title: 'Notificacioncitae',
      body: 'Esto es lo que lleva una notificacioncitae',
      sound: true,
      priority: Notifications.AndroidNotificationPriority.HIGH,
      color: 'black',
    },
    trigger: {
      seconds: seconds,
    },
  };
  Notifications.scheduleNotificationAsync(schedulingOptions);
};

const handleNotification = (notification) => {
  const { title } = notification.request.content;
  console.log(title);
};

const requestNotificationPermissions = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  setNotificationPermissions(status);
  return status;
};

useEffect(() => {
  if (notificationPermissions !== Permissions.GRANTED) return;
  const listener =
    Notifications.addNotificationReceivedListener(handleNotification);
  return () => listener.remove();
}, [notificationPermissions]);

export {
  scheduleNotification,
  requestNotificationPermissions,
  handleNotification,
};
