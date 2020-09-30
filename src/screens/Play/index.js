import React, { Component } from 'react'
import {
    FlatList,
    View,
    Text,
    ActivityIndicator,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
    Button,
    StatusBar
} from 'react-native'
import { Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Images } from '../../config';
import Orientation from 'react-native-orientation';

export default class Play extends Component {
    constructor(props) {
        super(props);
        this.state = { timer: 5, isReady: false, isFinish: false };
        this.startTimer();
        Orientation.unlockAllOrientations();
        Orientation.lockToLandscape();
    }
    componentDidMount() {
        StatusBar.setHidden(true);
    }
    goHome() {
        this.props.navigation.navigate("Home");
        StatusBar.setHidden(false);
        Orientation.lockToPortrait();
    }
    startTimer = () => {
        this.clockCall = setInterval(() => {
            this.decrementClock();
        }, 1000);
    }

    finishGame() {
        clearInterval(this.clockCall);
        if (!this.state.isReady) {
            this.setState({ isReady: true });
            this.setState({ timer: 10 })
            this.startTimer();
        }
        else {
            this.setState({ isFinish: true });
            this.setState({ isReady: false });
        }
    }

    decrementClock = () => {
        if (this.state.timer === 0) {
            this.finishGame();
            return;
        }
        this.setState((prevstate) => ({ timer: prevstate.timer - 1 }));
    };

    componentWillUnmount() {
        clearInterval(this.clockCall);
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#000" }}>
                <ImageBackground borderRadius={40} source={Images.background} style={{ flex: 1, borderRadius: 50, borderColor: "#fff", borderWidth: 10 }}>
                    <View style={{ width: "100%", height: "100%", padding: 40 }}>
                        <View style={{ height: 40, flexDirection: "row" }}>
                            <View style={{ flex: 1, alignItems: "flex-start" }}>
                                <TouchableOpacity onPress={this.goHome.bind(this)} activeOpacity={0.7} style={{
                                    justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff3f", borderRadius: 100,
                                    width: 40, height: 40,
                                }}>
                                    <Icon name={'angle-left'} color={'#fff'} size={30} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ fontSize: 30, fontWeight: "bold", color: '#fff' }}>
                                    {this.state.timer}
                                </Text>
                            </View>
                            <View style={{ flex: 1 }}></View>
                        </View>
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ fontSize: 80, color: "#fff", fontWeight: "bold", marginBottom: 20 }}>GET READY</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>

        )
    }
}