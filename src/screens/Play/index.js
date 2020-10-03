import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    StatusBar,
    NativeEventEmitter
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Images } from '../../config';
import Orientation from 'react-native-orientation';
import { CateogryAction } from '../../actions';
import { accelerometer, setUpdateIntervalForType, SensorTypes } from "react-native-sensors";
import RNDeviceRotation from 'react-native-device-rotation';

const ReadyTime = 2;
const StartTime = 2;
export default class Play extends Component {

    constructor(props) {
        super(props);
        this.state = {
            timer: 0,
            isReady: false,
            isStart: false,
            isFinish: false,
            isPause: false,
            lstWord: null,
            currentWord: '',
            currentIndex: -1,
            detectDirection: "0",
        };

        Orientation.unlockAllOrientations();
        Orientation.lockToLandscapeLeft();
        this.getWord();

        // setUpdateIntervalForType(SensorTypes.accelerometer, 100);
        // const subscription = accelerometer.subscribe(({ x, y, z }) =>
        //     this.detectSensorEvent(x, y, z)
        // );
    }

    componentDidMount() {
        StatusBar.setHidden(true);

        RNDeviceRotation.setUpdateInterval(0.1);

        const orientationEvent = new NativeEventEmitter(RNDeviceRotation)
        this.subscription = orientationEvent.addListener('DeviceRotation', event => {
            const roll = Math.round(event.roll);
            if (roll > 300)
                this.correctAnswer();
            else if (roll < 240)
                this.failedAnswer();
            else if (roll >= 240 && roll <= 300)
                this.resumeGame();
        })
    }

    componentWillUnmount() {
        clearInterval(this.clockCall);

        if (this.subscription) {
            this.subscription.remove()
        }
        RNDeviceRotation.stop()
    }

    detectSensorEvent = (x, y, z) => {
        const zDelta = Math.round(z * Math.sin(Math.PI / 2));
        // if (zDelta > 500)
        //     this.correctAnswer();
        // else if (zDelta < -500)
        //     this.failedAnswer();
        // else if (Math.abs(zDelta) < 500)
        //     this.resumeGame();
        console.log(zDelta);
    }

    pauseGame = () => {
        this.setState({ isPause: true })
    }

    resumeGame = () => {
        this.setState({ isPause: false })
    }

    correctAnswer = () => {
        this.pauseGame();
        this.setState({ currentWord: "CORRECT" });
    }

    failedAnswer = () => {
        this.pauseGame();
        this.setState({ currentWord: "FAILED" });
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
                this.playGame();
                RNDeviceRotation.start()
            }
        });
    }

    playGame = () => {
        this.setState({
            timer: ReadyTime,
            isReady: false,
            isStart: false,
            isFinish: false,
            isPause: false,
            currentIndex: 0,
            currentWord: "GET READY"
        });
        this.startTimer();
    }

    startTimer = () => {
        this.clockCall = setInterval(() => {
            if (!this.state.isPause)
                this.decrementClock();
        }, 1000);
    }

    finishTimer() {
        clearInterval(this.clockCall);
        if (!this.state.isReady) {
            this.setState({
                isReady: true,
                timer: StartTime,
                currentWord: "LET'S START"
            });
            this.startTimer();
        }
        else if (!this.state.isStart) {
            this.setState({
                isStart: true,
                timer: 10,
                currentWord: this.state.lstWord[this.state.currentIndex].name
            });
            this.startTimer();
        }
        else if (!this.state.isFinish) {
            this.setState({
                isFinish: true,
                timer: 0,
                currentIndex: -1,
                currentWord: "FINISHED!"
            });
        }
    }

    faildGuess = () => {
        if (!this.state.isReady) {
            this.finishTimer();
            return;
        }
        if (this.state.isFinish || !this.state.isStart || this.state.isPause)
            return;

        this.setState({ currentIndex: this.state.currentIndex + 1 }, response => {
            if (this.state.lstWord.length == this.state.currentIndex) {
                this.finishTimer();
                return;
            }
            this.setState({ currentWord: this.state.lstWord[this.state.currentIndex].name });
        });
    }

    decrementClock = () => {
        if (this.state.timer === 0) {
            this.finishTimer();
            return;
        }
        this.setState((prevstate) => ({ timer: prevstate.timer - 1 }));
    };

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
                                <Text style={{ fontSize: 70, color: "#fff", fontWeight: "bold", marginBottom: 20 }}>{this.state.currentWord}</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        )
    }
}