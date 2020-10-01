import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    StatusBar,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Images } from '../../config';
import Orientation from 'react-native-orientation';
import { CateogryAction } from '../../actions';

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
        };

        Orientation.unlockAllOrientations();
        Orientation.lockToLandscape();
        this.getWord();
    }

    componentDidMount() {
        StatusBar.setHidden(true);
    }

    componentWillUnmount() {
        clearInterval(this.clockCall);
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