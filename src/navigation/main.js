import React from "react";
import { createStackNavigator } from "react-navigation-stack";

/* Main Screen */
import Home from "../screens/Home";
import Setting from "../screens/Setting";

// Main Stack View App
const StackNavigator = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    Setting: {
      screen: Setting
    }
  },
  {
    headerMode: "none",
    initialRouteName: "Home"
  }
);

// Define Root Stack support Modal Screen
const RootStack = createStackNavigator(
  {
    StackNavigator: {
      screen: StackNavigator
    }
  },
  {
    mode: "modal",
    headerMode: "none",
    initialRouteName: "StackNavigator",
    transitionConfig: screen => {
      return handleCustomTransition(screen);
    },
    transparentCard: true
  }
);

export default RootStack;