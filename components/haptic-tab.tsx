import * as Haptics from 'expo-haptics';
import type { Tabs } from 'expo-router';
import { PlatformPressable } from 'expo-router/react-navigation';
import type { ComponentProps } from 'react';

// Desde expo-router 57, Tabs usa su propia copia de React Navigation: el tipo de
// las props del botón y el Pressable salen de esa misma copia para que coincidan.
type TabScreenOptions = Exclude<
  NonNullable<ComponentProps<typeof Tabs.Screen>['options']>,
  (...args: never[]) => unknown
>;
type HapticTabProps = Parameters<NonNullable<TabScreenOptions['tabBarButton']>>[0];

export function HapticTab(props: HapticTabProps) {
  return (
    <PlatformPressable
      {...props}
      onPressIn={(ev) => {
        if (process.env.EXPO_OS === 'ios') {
          // Add a soft haptic feedback when pressing down on the tabs.
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPressIn?.(ev);
      }}
    />
  );
}
