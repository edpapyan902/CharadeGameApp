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
import Rate, { AndroidMarket } from 'react-native-rate'
import Modal, { ModalContent } from "react-native-modals";
import { openComposer } from 'react-native-email-link'

import Storage from "../../Store";

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
    }
];

export default class Setting extends Component {
    constructor() {
        super()
        this.state = {
            setting: null,
            dialogVisible: false,
            hugViewVisivle: false,
            checkoutSuccessDialog: false,
        }
        this.pricacyUrl = "https://google.com";
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
        if (this.state.checkoutSuccessDialog) {
            this.setState({ checkoutSuccessDialog: false })
            return true;
        }
        return false;
    }

    paypalRequest = async () => {
        if (await Storage.getSubscription() == 1)
            return;

        RNPaypal.paymentRequest({
            clientId: "AeqJvRiaRbrutSrbCCsDnkfy9zwF_yopkBPpamZ7oTidca_RlMuvXJzO4n8rKsSReb8z5K5nZHA4s5aC",
            environment: RNPaypal.ENVIRONMENT.SANDBOX,
            intent: RNPaypal.INTENT.SALE,
            price: 10,
            currency: "USD",
            description: 'Android testing',
            acceptCreditCards: true
        }).then(async response => {
            this.setState({ checkoutSuccessDialog: true });
            await Storage.setSubscription("1");
        }).catch(err => {
            console.log(err.message)
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

    checkoutOK = () => {
        this.setState({ checkoutSuccessDialog: false });
    }

    renderItem = ({ item }) => {
        const buttons = ['60', '90', '120']
        const { selectedIndex } = this.state
        return (
            <TouchableOpacity style={{ flex: 1 }} onPress={() => { this.itemClicked(item) }} activeOpacity={0.8}>
                <View style={{ flex: 1, marginVertical: 10, marginHorizontal: 5, height: 80, backgroundColor: "#fff", borderRadius: 10, flexDirection: 'row', alignItems: "center", justifyContent: "flex-start" }}>
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
                        <View style={{ flex: 1, alignItems: "flex-end", paddingRight: 20, justifyContent: "flex-end" }}>
                            <View style={{ padding: 5, borderRadius: 100, width: 40, height: 40, justifyContent: "center", alignItems: "center", borderWidth: 3, borderColor: "#004ba1" }}>
                                <Text style={{ fontSize: 20 }}>30</Text>
                            </View>
                        </View>
                        :
                        <></>}
                </View>
            </TouchableOpacity>

        )
    }
    render() {
        return (
            <ImageBackground source={Images.background_blue} style={{ width: "100%", height: "100%" }} >
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ height: 70, flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 30 }}>
                        <View style={{ flex: 1, alignItems: "flex-start" }}>
                            <TouchableOpacity onPress={({ }) => { this.props.navigation.navigate("Home"); }} activeOpacity={0.7} style={{
                                justifyContent: "center", alignItems: "center",
                                width: 40, height: 40,
                                marginLeft: 10
                            }}>
                                <Icon name={'arrow-left'} color={'white'} size={25} />
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

                <Modal
                    visible={!!this.state.checkoutSuccessDialog}
                    swipeThreshold={50}
                    modalStyle={{ backgroundColor: "transparent" }}
                >

                    <ModalContent style={{ width: 350, height: 350, padding: 0, paddingTop: 60 }}>
                        <View style={{ flex: 1, backgroundColor: "#fff", borderRadius: 5, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ color: "#71c341", fontSize: 33, marginTop: 40 }}>Success!</Text>
                            <Text style={{ color: "#71c341", fontSize: 20 }}>Thank you.</Text>
                            <TouchableOpacity style={{ width: "100%", marginTop: 50, justifyContent: "center", alignItems: "center" }} onPress={this.checkoutOK}>
                                <View style={{ backgroundColor: "#71c341", width: "80%", borderRadius: 5, height: 50, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ fontSize: 20, color: "#fff" }}>OK</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ position: "absolute", width: 350, height: 120, top: 0, alignItems: "center", justifyContent: "center" }}>
                            <Image source={Images.checkout} style={{ width: 100, height: 100 }}></Image>
                        </View>
                    </ModalContent>
                </Modal>

            </ImageBackground >


        )
    }
}