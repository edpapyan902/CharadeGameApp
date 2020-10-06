import React, { Component } from 'react'
import {
    FlatList,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    ImageBackground
} from 'react-native'
import { ButtonGroup } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Images } from '../../config';
import RNPaypal from 'react-native-paypal-lib';
import { CateogryAction } from '../../actions';
import Rate, { AndroidMarket } from 'react-native-rate'

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
            setting: null
        }
        this.updateIndex = this.updateIndex.bind(this)
        this.getSetting();
    }

    getSetting = () => {
        CateogryAction.getSetting(response => {
            if (response.success)
                this.setState({ setting: response.data.Setting });
            this.setState({ load: false });
        });
    }

    updateIndex(selectedIndex) {
        this.setState({ selectedIndex })
    }

    paypalRequest = () => {
        RNPaypal.paymentRequest({
            clientId: "AdmXEOuG-37njWDPAOagN1lTjkho4Sp8lkzYrB7JIZUXJz4gO1Oh0SsA6BDZhnd324Bd-Bx58WBJq28U",
            environment: RNPaypal.ENVIRONMENT.SANDBOX,
            intent: RNPaypal.INTENT.SALE,
            price: 100,
            currency: "USD",
            description: 'Android testing',
            acceptCreditCards: true
        }).then(response => {
            console.log(response);
        }).catch(err => {
            console.log(err.message)
        })
    }

    itemClicked = (item) => {
        if (item.index == 4)
            this.paypalRequest();
        else if (item.index == 1)
            this.rateApp();
    }

    rateApp = () => {
        // const options = {
        //     AppleAppID: "2193813192",
        //     GooglePackageName: "com.mywebsite.myapp",
        //     AmazonPackageName: "com.mywebsite.myapp",
        //     OtherAndroidURL: "http://www.randomappstore.com/app/47172391",
        //     preferredAndroidMarket: AndroidMarket.Google,
        //     preferInApp: false,
        //     openAppStoreIfInAppFails: true,
        //     fallbackPlatformURL: "http://www.mywebsite.com/myapp.html",
        // }
        // Rate.rate(options, success => {
        //     if (success)
        //         this.setState({ rated: true })
        // });
    }

    renderItem = ({ item }) => {
        const buttons = ['60', '90', '120']
        const { selectedIndex } = this.state
        return (
            <TouchableOpacity style={{ flex: 1 }} onPress={() => { this.itemClicked(item) }} activeOpacity={0.7}>
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
                            onPress={this.updateIndex}
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
            </ImageBackground >


        )
    }
}