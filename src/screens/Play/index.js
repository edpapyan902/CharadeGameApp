import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    StatusBar,
    NativeEventEmitter,
    FlatList
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Images } from '../../config';
import Orientation from 'react-native-orientation';
import { CategoryAction } from '../../actions';
import RNDeviceRotation from 'react-native-device-rotation';
import Storage from '../../Store';
import { ScrollView } from 'react-native-gesture-handler';

let totalWord = [];

export default class Play extends Component {

    constructor(props) {
        super(props);
        this.state = {
            timer: 0,
            isReady: false,
            isFinish: false,
            isPause: false,
            lstWord: null,
            lstResultWord: null,
            currentWord: '',
            currentIndex: -1,
            detectDirection: "0",
            background_image: Images.background_blue,
            gotCardCount: 0,
        };

        Orientation.unlockAllOrientations();
        Orientation.lockToLandscapeLeft();

        RNDeviceRotation.setUpdateInterval(100);

        this.orientationEvent = new NativeEventEmitter(RNDeviceRotation);
        this.ReadyTime = 2;
        this.GameTime = 30;
        this.isTouchScreen = false;

        this.getWord();
    }

    componentDidMount() {
        StatusBar.setHidden(true);
        this.orientationEvent.addListener('DeviceRotation', event => {
            if (!this.state.isReady || this.state.isFinish)
                return;

            const roll = Math.round(event.roll);
            if (roll > 290 && !this.state.isPause)
                this.correctAnswer();
            else if (roll < 250 && !this.state.isPause)
                this.failedAnswer();
            else if (roll >= 250 && roll <= 290 && this.state.isPause)
                this.resumeGame();
        })
        RNDeviceRotation.start();
    }

    componentWillUnmount() {
        clearInterval(this.clockCall);

        RNDeviceRotation.stop()
    }

    resumeGame = () => {
        this.setState({
            isPause: false,
            background_image: Images.background_blue,
            currentIndex: (this.state.currentIndex + 1)
        }, () => {
            if (totalWord.length == this.state.currentIndex) {
                this.finishTimer();
                return;
            }
            this.setState({ currentWord: totalWord[this.state.currentIndex].name });
        });
    }

    correctAnswer = () => {
        this.setState({
            currentWord: "CORRECT",
            background_image: Images.background_green,
            isPause: true,
        });
        totalWord[this.state.currentIndex].mark = true;
        this.setState({
            gotCardCount: this.state.gotCardCount + 1
        })
    }

    failedAnswer = () => {
        this.setState({
            currentWord: "PASS",
            background_image: Images.background_red,
            isPause: true,
            gotCardCount: this.state.gotCardCount + 1
        });

        totalWord[this.state.currentIndex].mark = false;
    }

    faildGuess = () => {
        if (!this.state.isReady || this.state.isPause || this.state.isFinish || this.isTouchScreen)
            return;

        totalWord[this.state.currentIndex].mark = false;
        this.setState({
            gotCardCount: this.state.gotCardCount + 1
        })

        this.setState({
            currentWord: "PASS",
            background_image: Images.background_red,
        }, () => {
            this.isTouchScreen = true;
            this.singleShot = setInterval(() => {
                this.isTouchScreen = false;
                clearInterval(this.singleShot);
                this.resumeGame();
            }, 500);
        });
    }

    goHome() {
        this.props.navigation.navigate("Home");
        StatusBar.setHidden(false);
        Orientation.lockToPortrait();
    }

    getWord = () => {
        CategoryAction.getWord(this.props.navigation.state.params.currentCategory.id, response => {
            if (response.success) {
                this.setState({ lstWord: response.data.Word }, async () => {
                    this.playGame();
                });
            }
        });
    }

    filterWord = () => {
        let filterWord = [];
        totalWord.forEach(item => {
            if (item.mark == false || item.mark == true)
                filterWord.push(item);
        });
        if (filterWord.length % 2 != 0) {
            filterWord.push({ name: "" });
        }

        this.setState({ lstResultWord: filterWord });
    }

    playGame = () => {
        this.setState({
            timer: this.ReadyTime,
            isReady: false,
            isFinish: false,
            isPause: false,
            currentIndex: 0,
            gotCardCount: 0,
            lstResultWord: null,
            currentWord: "GET READY"
        });

        this.readyWord();
        this.startTimer();
    }

    readyWord = () => {

        totalWord = this.state.lstWord;
        console.log(totalWord.length)
        var currentIndex = totalWord.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = totalWord[currentIndex];
            totalWord[currentIndex] = totalWord[randomIndex];
            totalWord[currentIndex].mark = null;
            totalWord[randomIndex] = temporaryValue;
            totalWord[randomIndex].mark = null;
        }
        this.startTimer();
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
                isReady: true,
                timer: this.GameTime,
                currentWord: totalWord[this.state.currentIndex].name
            });
            this.startTimer();
        }
        else if (!this.state.isFinish) {
            this.setState({
                isFinish: true,
                timer: 0,
                background_image: Images.background_blue,
                currentWord: "FINISHED!",
            });
            this.filterWord();
        }
    }

    decrementClock = () => {

        if (this.state.timer == 0) {
            this.finishTimer();
            return;
        }
        this.setState((prevstate) => ({ timer: prevstate.timer - 1 }));
    };

    renderItem = ({ item }) => {
        return (
            <View style={{ flex: 1, marginVertical: 5, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: item.mark ? "#53e25b" : "#b02a2b", textAlign: "center", fontSize: 30, fontWeight: "bold" }}>{item.name}</Text>
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#000" }}>
                <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={this.faildGuess}>
                    <ImageBackground borderRadius={40} source={this.state.background_image} style={{ flex: 1, borderRadius: 50, borderColor: "#fff", borderWidth: 10 }}>
                        <View style={{ width: "100%", height: "100%" }}>
                            {this.state.isFinish ?
                                <View style={{ height: 40, flexDirection: "row", margin: 25 }}>
                                    <View style={{ flex: 1, alignItems: "flex-start" }}>
                                        <TouchableOpacity onPress={this.goHome.bind(this)} activeOpacity={0.7} style={{
                                            justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff3f", borderRadius: 100,
                                            width: 40, height: 40,
                                        }}>
                                            <Icon name={'angle-left'} color={'#fff'} size={30} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
                                        <Text style={{ fontSize: 20, fontWeight: "bold", color: '#fff' }}>
                                            YOU GOT
                                        </Text>
                                        <Text style={{ fontSize: 80, paddingHorizontal: 10, fontWeight: "bold", color: '#fff' }}>
                                            {this.state.gotCardCount}
                                        </Text>
                                        <Text style={{ fontSize: 20, fontWeight: "bold", color: '#fff' }}>
                                            CARDS
                                        </Text>
                                    </View>
                                    <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "flex-end" }}>
                                        <TouchableOpacity onPress={() => { this.playGame() }} activeOpacity={0.7} style={{
                                            justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff3f", borderRadius: 20,
                                            paddingVertical: 10, paddingHorizontal: 20,
                                        }}>
                                            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>PLAY</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                :
                                <View style={{ height: 40, flexDirection: "row", padding: 25 }}>
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
                                </View>}

                            {this.state.isFinish &&
                                <View style={{ backgroundColor: "#fff", height: 5, position: "absolute", top: 90, left: 0, width: "150%" }}></View>
                            }
                            {this.state.isFinish ?
                                <View style={{ flex: 1, marginTop: 5 }}>
                                    <View style={{ flex: 1, position: "absolute", top: 0, right: 0, left: 0, bottom: 0, backgroundColor: "#fff", opacity: 0.1, borderBottomLeftRadius: 46, borderBottomRightRadius: 46 }}>
                                    </View>
                                    <ScrollView style={{ flex: 1 }}>
                                        <FlatList
                                            keyExtractor={(item, index) => index.toString()}
                                            data={this.state.lstResultWord}
                                            renderItem={this.renderItem}
                                            numColumns={2}
                                            style={{ flex: 1, paddingVertical: 20, paddingHorizontal: 10 }}
                                        />
                                    </ScrollView>

                                </View>
                                :
                                <View style={{ flex: 1, position: "absolute", top: 0, right: 0, left: 0, bottom: 0, paddingHorizontal: 10, alignItems: "center", justifyContent: "center" }}>
                                    <Text style={{ fontSize: 70, color: "#fff", fontWeight: "bold", marginBottom: 20, textAlign: "center" }}>{this.state.currentWord}</Text>
                                </View>
                            }

                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        )
    }
}