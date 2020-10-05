import { AdMobBanner } from 'react-native-admob'
import { View, Text, Platform } from 'react-native';
import React, { Component } from 'react';

class Banner extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isError: false,
            errorText: '',
        }
    }

    render() {
        return (

            <View
                style={
                    {
                        backgroundColor: 'white',
                        alignItems: 'center',
                        width: '100%',
                    }}
            >

                {
                    this.state.isError ?
                        <View />
                        :
                        <AdMobBanner
                            adSize="banner"
                            adUnitID={Platform.OS === 'android'
                                ?
                                "ca-app-pub-3940256099942544/6300978111"
                                :
                                "ca-app-pub-7315663868828228/2907386321"}
                            testDevices={[AdMobBanner.simulatorId]}
                            onAdFailedToLoad={error => {
                                // console.warn(error);                    
                                this.setState({ isError: true, errorText: error + "" });

                                setTimeout(() => {
                                    this.setState({ isError: false });
                                }, 10000);
                            }} />}

            </View>
        );
    }
}

export default Banner;  