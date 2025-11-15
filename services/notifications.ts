import * as Notifications from "expo-notifications";
import { SchedulableTriggerInputTypes } from "expo-notifications";
import { Alert } from "react-native";

const notificationListener = Notifications.setNotificationCategoryAsync(
  "myCategory",
  [
    {
      buttonTitle: "Hello",
      identifier: "hello",
    },
    {
      buttonTitle: "Ignore",
      identifier: "ignore",
      options: {
        isDestructive: true,
      },
    },
  ]
);

export const service = {
  setup() {
    // Notifications.setNotificationHandler({
    //   handleNotification: async () => ({
    //     shouldShowAlert: true,
    //     shouldPlaySound: true,
    //     shouldSetBadge: true,
    //   }),
    // });

    Notifications.addNotificationResponseReceivedListener((res) => {
      Alert.alert("Id:", res.actionIdentifier);
      Alert.alert(
        "Data: ",
        res.notification.request.content.data.senderName as string
      );
    });
  },
  nofity() {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Look at that notification",
        body: "I'm so proud of myself!",
      },
      trigger: null, // notify now
      // trigger: {
      //     type: SchedulableTriggerInputTypes.DATE,
      //     date: new Date(2025, 2, 24, 16, 20)
      // },
    });
  },
  scheduleNofity() {
    return Notifications.scheduleNotificationAsync({
      content: {
        title: "Look at that notification",
        body: "I'm so proud of myself!",
      },
      trigger: {
        type: SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 4,
      },
    });
  },
  async cancel(id: string) {
    await Notifications.cancelScheduledNotificationAsync(id);
  },
  notificationWithActions() {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Look at that notification",
        body: "I'm so proud of myself!",
        categoryIdentifier: "myCategory",
        data: {
          dialogId: 33,
          senderName: "Oleg",
        },
      },
      trigger: null, // notify now,
    });
  },
};
