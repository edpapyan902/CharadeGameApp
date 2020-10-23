import { AdMobBanner } from 'react-native-admob'
import { View, Platform } from 'react-native';
import React, { Component } from 'react';

class Banner extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isError: false,
            errorText: '',
        }
    }

    render() {
        return (

            <View style={{ backgroundColor: 'white', alignItems: 'center', width: '100%', }}>
                {
                    this.state.isError ?
                        <View />
                        :
                        <AdMobBanner
                            adSize="banner"
                            adUnitID={Platform.OS === 'android'
                                ?
                                "ca-app-pub-8844670004607379/5200718612"
                                :
                                "ca-app-pub-8844670004607379/9638000539"
                            }
                            testDevices={[AdMobBanner.simulatorId]}
                            onAdFailedToLoad={error => {
                                this.setState({ isError: true, errorText: error + "" });

                                setTimeout(() => {
                                    this.setState({ isError: false });
                                }, 10000);
                            }} />
                }

            </View>
        );
    }
}

export default Banner;  