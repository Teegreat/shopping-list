import { forwardRef, useEffect } from "react";
import { ScrollViewProps, Platform, StatusBar, ScrollView } from "react-native";

export const BodyScrollView = forwardRef<any, ScrollViewProps>((props, ref) => {
  // iOS specific props
  const iosProps =
    Platform.OS === "ios"
      ? {
          automaticallyAdjustsScrollIndicatorInsets: true,
          contentInsetAdjustmentBehavior: "automatic",
          contentInset: { bottom: 0 },
          scrollIndicatorInsets: { bottom: 0 },
        }
      : {};

  return (
    <ScrollView
      {...iosProps}
      {...props}
      ref={ref}
      style={[{ flex: 1 }, props.style]}

    />
  );
});
