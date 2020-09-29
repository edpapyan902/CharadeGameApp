import React, { Component } from "react";
import { ActivityIndicator, View } from "react-native";

export default class Loading extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

    setTimeout(() => {
      this.props.navigation.navigate("Home");
    }, 500);
  }

  render() {
    return (
      <View>
        <ActivityIndicator
          size="large"
          color={"black"}
          style={{
            position: "absolute",
            top: 260,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center"
          }}
        />
      </View>
    );
  }
}