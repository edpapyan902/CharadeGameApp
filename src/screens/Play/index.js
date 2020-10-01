import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    StatusBar,
    Dimensions
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Images } from '../../config';
import Orientation from 'react-native-orientation';
import { CateogryAction } from '../../actions';
import { magnetometer, SensorTypes, setUpdateIntervalForType } from "react-native-sensors";
import LPF from "lpf";

const { height, width } = Dimensions.get("window");

export default class Play extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: 1,
            isReady: false,
            isFinish: false,
            lstWord: null,
            currentWord: 'GET READY',
            currentIndex: -1,
            magnetometer: "0",
        };
        LPF.init([]);
        LPF.smoothing = 0.2;
        Orientation.unlockAllOrientations();
        Orientation.lockToLandscape();
        this.getWord();
    }

    _toggle = () => {
        if (this._subscription) {
            this._unsubscribe();
        } else {
            this._subscribe();
        }
    };

    _subscribe = async () => {
        setUpdateIntervalForType(SensorTypes.magnetometer, 16);
        this._subscription = magnetometer.subscribe(
            sensorData => this.setState({ magnetometer: this._angle(sensorData) }),
            error => console.log("The sensor is not available"),
        );
    };

    _unsubscribe = () => {
        this._subscription && this._subscription.unsubscribe();
        this._subscription = null;
    };

    _angle = magnetometer => {
        let angle = 0;
        if (magnetometer) {
            let { x, y } = magnetometer;
            if (Math.atan2(y, x) >= 0) {
                angle = Math.atan2(y, x) * (180 / Math.PI);
            } else {
                angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
            }
        }
        return Math.round(LPF.next(angle));
    };

    _direction = degree => {
        if (degree >= 22.5 && degree < 67.5) {
            return "NE";
        } else if (degree >= 67.5 && degree < 112.5) {
            return "E";
        } else if (degree >= 112.5 && degree < 157.5) {
            return "SE";
        } else if (degree >= 157.5 && degree < 202.5) {
            return "S";
        } else if (degree >= 202.5 && degree < 247.5) {
            return "SW";
        } else if (degree >= 247.5 && degree < 292.5) {
            return "W";
        } else if (degree >= 292.5 && degree < 337.5) {
            return "NW";
        } else {
            return "N";
        }
    };

    // Match the device top with pointer 0° degree. (By default 0° starts from the right of the device.)
    _degree = magnetometer => {
        return magnetometer - 90 >= 0
            ? magnetometer - 90
            : magnetometer + 271;
    };

    componentDidMount() {
        StatusBar.setHidden(true);
        this._toggle();
    }
    goHome() {
        this.props.navigation.navigate("Home");
        StatusBar.setHidden(false);
        Orientation.lockToPortrait();
    }
    getWord = () => {
        CateogryAction.getWord(this.props.navigation.state.params.currentCategory.id, response => {
            if (response.success) {
                this.setState({ lstWord: response.data });
                this.startTimer();
            }
        });
    }
    startTimer = () => {
        this.clockCall = setInterval(() => {
            this.decrementClock();
        }, 1000);
    }

    finishTimer() {
        clearInterval(this.clockCall);
        if (!this.state.isReady) {
            this.setState({
                currentIndex: 1,
                isReady: true,
                timer: 10,
                currentWord: this.state.lstWord[0].name
            });
            this.startTimer();
        }
        else {
            this.setState({ isFinish: true });
            this.setState({ isReady: false });
            this.setState({ currentWord: "Finished!" });
        }
    }

    faildGuess = () => {
        if (this.state.isFinish)
            return;

        this.setState((prevstate) => ({ currentIndex: prevstate.currentIndex + 1 }));
        if (this.state.lstWord.length == this.state.currentIndex) {
            this.finishTimer();
            return;
        }
        this.setState({ currentWord: this.state.lstWord[this.state.currentIndex].name });
    }

    decrementClock = () => {
        if (this.state.timer === 0) {
            this.finishTimer();
            return;
        }
        this.setState((prevstate) => ({ timer: prevstate.timer - 1 }));
    };

    componentWillUnmount() {
        clearInterval(this.clockCall);
        this._unsubscribe();
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#000" }}>
                <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={this.faildGuess}>
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
                                <Text style={{ fontSize: 80, color: "#fff", fontWeight: "bold", marginBottom: 20 }}>{this.state.currentWord}</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </View>

        )
    }
}