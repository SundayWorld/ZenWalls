import { Tabs } from "expo-router";
import { Home, Grid } from "lucide-react-native";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000000',
          borderTopWidth: 1,
          borderTopColor: '#1a1a1a',
        },
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#666666',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="category"
        options={{
          title: "Categories",
          tabBarIcon: ({ color, size }) => <Grid color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}