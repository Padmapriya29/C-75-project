import React from "react";
import { Image } from "react-native";
import ReadStoryScreen from "./screens/readStory";
import WriteStoryScreen from "./screens/writeStory";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const TabNavigator = createBottomTabNavigator({
  Read: {
    screen: ReadStoryScreen,
    navigationOptions: {
      tabBarIcon: (
        <Image
          source={require("./assets/read.png")}
          style={{ width: 50, height: 50 }}
        />
      ),
      tabBarLabel: "Read Story"
    },
  },
  Write: {
    screen: WriteStoryScreen,
    navigationOptions: {
      tabBarIcon: (
        <Image
          source={require("./assets/write.png")}
          style={{ width: 50, height: 50 }}
        />
      ),
      tabBarLabel: "Write Story"
    },
  },
});

const AppContainer = createAppContainer(TabNavigator);
