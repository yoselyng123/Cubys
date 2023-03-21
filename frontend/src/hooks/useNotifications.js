import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { useState, useEffect } from 'react';

function useNotifications() {
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

  useEffect(() => {
    if (notificationPermissions !== Permissions.GRANTED) return;
    const listener =
      Notifications.addNotificationReceivedListener(handleNotification);
    return () => listener.remove();
  }, [notificationPermissions]);

  const scheduleNotification = (seconds, title, body) => {
    const schedulingOptions = {
      content: {
        title,
        body,
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

  const parseMilitarHoursFormat = (hour) => {
    var newHour = hour.split(':')[0];
    if (hour.split(':')[1].substring(2, 4) === 'pm') {
      if (newHour === '12') {
        newHour = Number(newHour);
      } else {
        newHour = Number(newHour) + 12;
      }
    }
    var minutes = hour.split(':')[1].slice(0, 2);

    return newHour + minutes;
  };

  const FiveMinutesBeforeStart = (startTime, currentHour, currentMin) => {
    let resStartTime = parseMilitarHoursFormat(startTime);
    let resHour = parseInt(resStartTime.substring(0, 2)) * 3600;
    let resMin = parseInt(resStartTime.substring(2, 4)) * 60;
    let fiveMin = 5 * 60;
    let resTimeInSeconds = resHour + resMin;
    resTimeInSeconds = resTimeInSeconds - fiveMin;

    console.log(
      `+----------+----------+----------+----------+----------+----------+`
    );
    console.log(
      `StartTime Militar: ${resStartTime}
      resHour: ${resHour}
      resMin: ${resMin}
      ResSeconds: ${resTimeInSeconds}`
    );

    let currentTimeInSeconds = parseInt(currentHour) + parseInt(currentMin);

    if (resTimeInSeconds - currentTimeInSeconds > 0) {
      return resTimeInSeconds - currentTimeInSeconds;
    } else {
      return -1;
    }
  };
  const FiveMinutesBeforeEnd = (endTime, currentHour, currentMin) => {
    let resEndTime = parseMilitarHoursFormat(endTime);
    let resHour = parseInt(resEndTime.substring(0, 2)) * 3600;
    let resMin = parseInt(resEndTime.substring(2, 4)) * 60;
    let fiveMin = 5 * 60;
    let resTimeInSeconds = resHour + resMin;
    resTimeInSeconds = resTimeInSeconds - fiveMin;

    console.log(
      `EndTime Militar: ${resEndTime}
      resHour: ${resHour}
      resMin: ${resMin}
      ResSeconds: ${resTimeInSeconds}`
    );

    let currentTimeInSeconds = parseInt(currentHour) + parseInt(currentMin);
    console.log(
      `\nCurrentHour: ${currentHour}
      CurrentMin: ${currentMin}
      Current Seconds: ${currentTimeInSeconds}`
    );

    if (resTimeInSeconds - currentTimeInSeconds > 0) {
      return resTimeInSeconds - currentTimeInSeconds;
    } else {
      return -1;
    }
  };
  const onTime = (startTime, currentHour, currentMin) => {
    let resStartTime = parseMilitarHoursFormat(startTime);
    let resHour = parseInt(resStartTime.substring(0, 2)) * 3600;
    let resMin = parseInt(resStartTime.substring(2, 4)) * 60;

    let resTimeInSeconds = resHour + resMin;

    console.log(
      `StartTime Militar: ${resStartTime}
      resHour: ${resHour}
      resMin: ${resMin}
      ResSeconds: ${resTimeInSeconds}`
    );

    let currentTimeInSeconds = parseInt(currentHour) + parseInt(currentMin);

    if (resTimeInSeconds - currentTimeInSeconds >= 0) {
      return resTimeInSeconds - currentTimeInSeconds;
    } else {
      return -1;
    }
  };

  return {
    scheduleNotification,
    requestNotificationPermissions,
    handleNotification,
    notificationPermissions,
    FiveMinutesBeforeStart,
    FiveMinutesBeforeEnd,
    onTime,
  };
}

export default useNotifications;
