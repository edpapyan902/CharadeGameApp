import React from "react";
import { createStackNavigator } from "react-navigation-stack";

/* Main Screen */
import Home from "../screens/Home";
import Setting from "../screens/Setting";
import Play from "../screens/Play";
import Adsense from "../screens/Adsense";

// Main Stack View App
const StackNavigator = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    Setting: {
      screen: Setting
    },
    Play: {
      screen: Play
    },
    Adsense: {
      screen: Adsense
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
  }
);

export default RootStack;