import { service } from "@/services/notifications";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const NotifyExample = () => {
  let id: string = "";

  React.useEffect(() => {
    service.setup();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notifications Example</Text>
      <Button
        title="Notify Now!"
        onPress={service.nofity}
        testID="notifyNowBtn"
      />
      <Button
        title="Schedule Notification!"
        onPress={async () => (id = await service.scheduleNofity())}
      />
      <Button
        title="Cancel Scheduled Notification!"
        onPress={() => service.cancel(id)}
      />

      <Button
        title="Notification with Actions!"
        onPress={() => service.notificationWithActions()}
      />
    </View>
  );
};

export default NotifyExample;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 10,
  },
  text: {
    color: "black",
    fontSize: 18,
    textAlign: "center",
  },
});
