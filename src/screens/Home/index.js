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
    BackHandler,
    StatusBar
} from 'react-native'
import { Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Images } from '../../config';
import Modal, { ModalContent } from "react-native-modals";
import Orientation from 'react-native-orientation';
import { CateogryAction } from '../../actions';

import { getIntertial } from '../../components/adMob/Intertial';
import Banner from '../../components/adMob/Banner';
import { AdMobInterstitial } from 'react-native-admob';

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            lstCategory: null,
            currentCategory: null,
            load: false,
            setting: null
        }
        Orientation.lockToPortrait();
    };

    getCategory = () => {
        this.setState({ load: true }, () => {
            CateogryAction.getCategory(response => {
                if (response.success)
                    this.setState({ lstCategory: response.data.Word, setting: response.data.Setting });
                this.setState({ load: false });
            });
        })
    }

    state = {
        dialogVisible: false
    };

    showDialog = (item) => {
        this.setState({ dialogVisible: true, currentCategory: item });
    }

    hideDialog = () => {
        this.setState({ dialogVisible: false, currentCategory: null });
    }

    playGame = () => {
        AdMobInterstitial.showAd().catch(error => console.warn(error));
        this.setState({ dialogVisible: false });
        this.props.navigation.navigate("Play", { currentCategory: this.state.currentCategory });
    }

    backAction = () => {
        StatusBar.setHidden(false);
        Orientation.lockToPortrait();
    }

    componentDidMount() {
        this.getCategory();
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
        getIntertial();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
        AdMobInterstitial.removeAllListeners();
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={{ flex: 1 }} onPress={() => this.showDialog(item)}>
                { item.title != '' ?
                    <View style={{ flex: 1, flexDirection: 'column', height: 200, alignItems: "center", justifyContent: "center", borderRadius: 20, backgroundColor: "#ffffff3f", margin: 15 }}>
                        <Image style={{ minWidth: "85%", height: 150, borderRadius: 5 }} resizeMode="contain" source={{ uri: CateogryAction.API_URL + item.icon }}
                            PlaceholderContent={<ActivityIndicator />}></Image>
                    </View>
                    :
                    <View style={{ flex: 1, margin: 15 }}></View>}
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <ImageBackground source={Images.background_blue} style={{ width: "100%", height: "100%" }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ flexDirection: "row", height: 100, justifyContent: "center", alignItems: "center" }}>
                            <View style={{ flex: 1 }} />
                            <View style={{ flex: 2, marginTop: 25, alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ color: "#fff", fontSize: 30 }}>CHARADES</Text>
                                <Text style={{ color: "#fff", fontSize: 20 }}>SERVICE</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: "flex-end" }}>
                                <TouchableOpacity onPress={({ }) => { this.props.navigation.navigate("Setting"); }} activeOpacity={0.7} style={{
                                    justifyContent: "center", alignItems: "center", backgroundColor: "#fff", borderRadius: 100,
                                    width: 40, height: 40,
                                    marginRight: 20,
                                }}>
                                    <Icon name={'cog'} color={'gray'} size={30} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <FlatList
                            style={{ padding: "3.5%" }}
                            keyExtractor={(item, index) => index.toString()}
                            data={this.state.lstCategory}
                            renderItem={this.renderItem}
                            numColumns={2}
                        />
                    </ScrollView>
                    {this.state.setting == null || !this.state.setting.subscription ??
                        <View style={{ height: 50 }}>
                            <Banner />
                        </View>}
                </SafeAreaView>
                <Modal
                    visible={!!this.state.dialogVisible}
                    swipeThreshold={100}
                    modalStyle={{ backgroundColor: "transparent" }}
                    onSwipeOut={(event) => { this.setState({ dialogVisible: false }); }}
                    onTouchOutside={() => { this.setState({ dialogVisible: false }); }}
                >

                    <ModalContent style={{ width: 300, height: 380, paddingVertical: 25, paddingHorizontal: 25, backgroundColor: "transparent" }}>
                        <View style={{ borderWidth: 5, paddingHorizontal: 10, paddingVertical: 20, borderRadius: 30, borderColor: "#fff", backgroundColor: "#00549a" }}>
                            <Text style={{ fontSize: 30, marginTop: 20, marginBottom: 30, textAlign: "center", color: "#fff" }}>Rules</Text>
                            <Text style={{ color: "#fff", textAlign: "center", fontSize: 18, paddingHorizontal: 15 }}>Try to guess the object by describing the plot. To make it more difficult don't use any charactor names.</Text>
                            <TouchableOpacity activeOpacity={0.8} style={{ paddingTop: 30, paddingHorizontal: 10, marginBottom: 20 }} onPress={this.playGame}>
                                <View style={{ backgroundColor: "#eabf28", height: 40, borderRadius: 10, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ textAlign: "center", color: "#fff", fontSize: 20, fontWeight: "bold" }}>Play</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ position: "absolute", top: 5, right: 5, width: 35, height: 35 }}>
                            <TouchableOpacity onPress={this.hideDialog}>
                                <Icon name="times-circle" size={35} color="#fff"></Icon>
                            </TouchableOpacity>
                        </View>
                    </ModalContent>
                </Modal>
                {this.state.load &&
                    <ActivityIndicator
                        size="large"
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                        color={"white"}
                    />
                }

            </ImageBackground>


        )
    }
}