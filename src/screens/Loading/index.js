import React, { Component } from "react";
import { View, Text } from "react-native";

import Storage from "../../Store";

export default class Loading extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
    let subscription = await Storage.getSubscription();
    let adsense = await Storage.getAdsense();

    if (subscription == null)
      await Storage.setSubscription(0);
    if (adsense == null)
      await Storage.setAdsense(0);

    setTimeout(() => {
      this.props.navigation.navigate("Home");
    }, 2000);
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#000", justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "#fff", fontSize: 25, fontWeight: "bold" }}>CharadesGame</Text>
        <Text style={{ color: "#fff", fontSize: 17, fontWeight: "bold" }}>Service</Text>
      </View>
    );
  }
}