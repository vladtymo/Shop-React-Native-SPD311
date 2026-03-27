import React from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const Animation = () => {
  const width = useSharedValue(200);
  const rotateDeg = useSharedValue<number>(0);

  const handleStart = () => {
    // width.value = 400; // різка зміна
    // withTiming - плавна зміна
    // withRepeat - повторення анімації
    // withSpring - пружинна анімація
    // withDalay - затримка анімації
    // withSequence - послідовна анімація

    width.value = withRepeat(
      withTiming(400, { duration: 1000 }),
      4,
      true,
      () => {
        console.log("Animation completed");
        width.value = withSpring(
          50,
          {
            stiffness: 389,
          },
          () => {
            width.value = withTiming(100);
          }
        );
      }
    );
  };

  const handlePress = () => {
    if (rotateDeg.value <= 180)
      rotateDeg.value = withTiming(rotateDeg.value + 60);
    else rotateDeg.value = withTiming(rotateDeg.value - 60);
  };

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotateDeg.value}deg` }],
    backgroundColor: interpolateColor(
      width.value,
      [100, 200, 400],
      ["violet", "green", "red"]
    ),
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Animations</Text>
      <Button title="Start" onPress={handleStart} />
      <Pressable onPress={handlePress}>
        <Animated.View
          style={[
            {
              width: width,
              height: 100,
              backgroundColor: "violet",
            },
            animatedStyles,
          ]}
        />
      </Pressable>
    </View>
  );
};

export default Animation;

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
