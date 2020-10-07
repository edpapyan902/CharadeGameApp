import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";

export default class Loading extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

    setTimeout(() => {
      this.props.navigation.navigate("Home");
    }, 2000);
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "#fff", fontSize: 25, fontWeight: "bold" }}>CharadesGame</Text>
        <Text style={{ color: "#fff", fontSize: 17, fontWeight: "bold" }}>Service</Text>
      </View>
    );
  }
}