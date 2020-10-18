import React, { Component } from "react";
import {
  Platform,
  View,
  Text,
  ImageBackground,
} from "react-native";

import Storage from "../../Store";
import { Images } from '../../config';

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
      <ImageBackground source={Platform.OS == "android" ? Images.splash_android : Images.splash_ios} style={{ width: "100%", height: "100%" }} />
    );
  }
}