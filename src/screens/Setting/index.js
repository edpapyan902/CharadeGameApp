import React, { Component, useCallback } from 'react'
import {
    FlatList,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
    BackHandler,
    Linking,
    Alert
} from 'react-native'
import { ButtonGroup } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Images } from '../../config';
import { Image } from 'react-native-elements';
import RNPaypal from 'react-native-paypal-lib';
import { CategoryAction } from '../../actions';
import Rate, { AndroidMarket } from 'react-native-rate'
import Modal, { ModalContent } from "react-native-modals";
import { openComposer } from 'react-native-email-link'

import { Storage } from "../../Store";

const lstSetting = [
    {
        index: 0,
        title: 'RATE US 5 STARS',
        icon: 'star',
        content: ''
    },
    {
        index: 1,
        title: 'FEEDBACK',
        icon: 'comment-dots',
        content: ''
    },
    {
        index: 2,
        title: 'PRIVACY POLICY',
        icon: 'portrait',
        content: ''
    },
    {
        index: 3,
        title: 'ROUND TIME',
        icon: 'clock',
        content: ''
    },
    {
        index: 4,
        title: 'SUBSCRIPTION',
        icon: 'chess-queen',
        content: "Don't show Google Advertisement."
    },
    {
        index: 5,
        title: 'RESTORE PHRCHASE',
        icon: 'history',
        content: ''
    }
];

export default class Setting extends Component {
    constructor() {
        super()
        this.state = {
            selectedIndex: 2,
            setting: null,
            dialogVisible: false,
            hugViewVisivle: false,
        }
        this.pricacyUrl = "https://google.com";
        this.updateIndex = this.timeChanged.bind(this)
        this.getSetting();
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }

    backAction = () => {
        if (this.state.dialogVisible) {
            this.setState({ dialogVisible: false })
            return true;
        }
        return false;
    }

    getSetting = () => {
        CategoryAction.getSetting(response => {
            if (response.success)
                this.setState({ setting: response.data.Setting });
            this.setState({ load: false });
        });
    }

    timeChanged(selectedIndex) {
        this.setState({ selectedIndex })
        CategoryAction.setTime((selectedIndex + 2) * 30, async () => {
            await Storage.setItem("time", (selectedIndex + 2) * 30);
        });
    }

    paypalRequest = () => {
        // RNPaypal.paymentRequest({
        //     clientId: "AdmXEOuG-37njWDPAOagN1lTjkho4Sp8lkzYrB7JIZUXJz4gO1Oh0SsA6BDZhnd324Bd-Bx58WBJq28U",
        //     environment: RNPaypal.ENVIRONMENT.SANDBOX,
        //     intent: RNPaypal.INTENT.SALE,
        //     price: 100,
        //     currency: "USD",
        //     description: 'Android testing',
        //     acceptCreditCards: true
        // }).then(response => {
        //     console.log(response);
        // }).catch(err => {
        //     console.log(err.message)
        // })
        CategoryAction.subscription(async response => {
            await Storage.setItem("subscription", 1);
        })
    }

    itemClicked = (item) => {
        if (item.index == 4)
            this.paypalRequest();
        else if (item.index == 0)
            this.setState({ hugViewVisivle: false }, () => {
                this.setState({ dialogVisible: true });
            });
        else if (item.index == 1)
            this.feedbackApp();
        else if (item.index == 2)
            Linking.openURL(this.pricacyUrl);
    }

    rateApp = () => {
        this.setState({ dialogVisible: false })
        const options = {
            GooglePackageName: "com.scnpinside",
            preferredAndroidMarket: AndroidMarket.Google,
        }
        Rate.rate(options, success => { });
    }

    feedbackApp = () => {
        openComposer({
            to: 'zimbo.charades@gmail.com',
            subject: 'CharadesGameApp Feedback Test',
            body: ''
        })
    }

    renderItem = ({ item }) => {
        const buttons = ['60', '90', '120']
        const { selectedIndex } = this.state
        return (
            <TouchableOpacity style={{ flex: 1 }} onPress={() => { this.itemClicked(item) }} activeOpacity={0.8}>
                <View style={{ flex: 1, margin: 5, height: 80, backgroundColor: "#fff", borderRadius: 10, flexDirection: 'row', alignItems: "center", justifyContent: "flex-start" }}>
                    <View style={{ width: 100 }}>
                        <Icon name={item.icon} style={{ paddingHorizontal: 25 }} color={("#004ba1")} size={40}></Icon>
                    </View>
                    <View style={{ flexDirection: "column" }}>
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.title}</Text>
                        {item.content != '' ?
                            <Text style={{ fontSize: 15 }}>{item.content}</Text>
                            :
                            <></>}
                    </View>
                    {item.title == 'ROUND TIME' ?
                        <ButtonGroup
                            onPress={this.timeChanged}
                            selectedIndex={selectedIndex}
                            buttons={buttons}
                            selectedButtonStyle={{ backgroundColor: "#004ba1" }}
                            containerStyle={{ borderWidth: 3, borderColor: "#004ba1", height: 40, width: 130, borderRadius: 15 }}
                        /> :
                        <></>}
                </View>
            </TouchableOpacity>

        )
    }
    render() {
        return (
            <ImageBackground source={Images.background_blue} style={{ width: "100%", height: "100%" }} >
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ height: 70, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                        <View style={{ flex: 1, alignItems: "flex-start" }}>
                            <TouchableOpacity onPress={({ }) => { this.props.navigation.navigate("Home"); }} activeOpacity={0.7} style={{
                                justifyContent: "center", alignItems: "center",
                                width: 40, height: 40,
                                marginLeft: 10
                            }}>
                                <Icon name={'arrow-left'} color={'white'} size={30} />
                            </TouchableOpacity>
                        </View>
                        <Text style={{ flex: 2, textAlign: "center", color: "#fff", fontSize: 30 }}>SETTINGS</Text>
                        <View style={{ flex: 1 }} />
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 10 }}>
                        <FlatList
                            keyExtractor={(item, index) => index.toString()}
                            data={lstSetting}
                            renderItem={this.renderItem}
                            numColumns={1}
                        />
                    </ScrollView>
                </SafeAreaView>
                <Modal
                    visible={!!this.state.dialogVisible}
                    swipeThreshold={50}
                    modalStyle={{ backgroundColor: "transparent" }}
                >

                    <ModalContent style={{ width: 350, height: 350, paddingVertical: 25, paddingHorizontal: 25, backgroundColor: "transparent" }}>
                        {!this.state.hugViewVisivle ?
                            <View style={{ borderWidth: 5, paddingHorizontal: 10, paddingVertical: 20, borderRadius: 20, borderColor: "#fff", backgroundColor: "#ffde00", justifyContent: "center", alignItems: "center" }}>
                                <Image source={Images.monkey} style={{ width: 80, height: 80, marginTop: 10 }}></Image>
                                <Text style={{ color: "#00", textAlign: "center", marginVertical: 20, fontSize: 22, paddingHorizontal: 15, fontWeight: "bold" }}>WHAT DO YOU THINK ABOUT OUR APP?</Text>
                                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                    <TouchableOpacity onPress={({ }) => { this.setState({ hugViewVisivle: true }) }} activeOpacity={0.8} style={{
                                        justifyContent: "center", alignItems: "center", backgroundColor: "#fff", borderRadius: 30,
                                        width: 60, height: 60,
                                        marginHorizontal: 10
                                    }}>
                                        <Image source={Images.rate_good} style={{ width: 40, height: 40 }}></Image>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={({ }) => { this.setState({ dialogVisible: false }) }} activeOpacity={0.8} style={{
                                        justifyContent: "center", alignItems: "center", backgroundColor: "#fff", borderRadius: 30,
                                        width: 60, height: 60,
                                        marginHorizontal: 10
                                    }}>
                                        <Image source={Images.rate_cancel} style={{ width: 40, height: 40 }}></Image>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={({ }) => { this.feedbackApp() }} activeOpacity={0.8} style={{
                                        justifyContent: "center", alignItems: "center", backgroundColor: "#fff", borderRadius: 30,
                                        width: 60, height: 60,
                                        marginHorizontal: 10
                                    }}>
                                        <Image source={Images.rate_bad} style={{ width: 40, height: 40 }}></Image>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            :
                            <View style={{ borderWidth: 5, paddingHorizontal: 10, paddingVertical: 20, borderRadius: 20, borderColor: "#fff", backgroundColor: "#ffde00", justifyContent: "center", alignItems: "center" }}>
                                <Image source={Images.hugface} style={{ width: 80, height: 80, marginTop: 10 }}></Image>
                                <Image source={Images.rating} style={{ height: 80, width: 200 }} resizeMode="contain"></Image>
                                <Text style={{ color: "#00", textAlign: "center", marginBottom: 10, fontSize: 20, paddingHorizontal: 15, fontWeight: "bold" }}>GIVE US 5 STARS TO ENCOURAGE US?</Text>
                                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                    <TouchableOpacity onPress={({ }) => { this.rateApp() }} activeOpacity={0.8} style={{
                                        justifyContent: "center", alignItems: "center", backgroundColor: "#ff6600", borderRadius: 20,
                                        width: 100, height: 40,
                                        marginHorizontal: 10
                                    }}>
                                        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>Sure</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={({ }) => { this.setState({ dialogVisible: false }) }} activeOpacity={0.8} style={{
                                        justifyContent: "center", alignItems: "center", backgroundColor: "#fff", borderRadius: 20,
                                        width: 100, height: 40,
                                        marginHorizontal: 10
                                    }}>
                                        <Text style={{ color: "#ff6600", fontWeight: "bold", fontSize: 18 }}>Later</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>}

                    </ModalContent>
                </Modal>
            </ImageBackground >


        )
    }
}