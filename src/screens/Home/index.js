import React, { Component } from 'react'
import {
    FlatList,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    ImageBackground,
    BackHandler,
    StatusBar
} from 'react-native'
import { SkypeIndicator } from 'react-native-indicators';
import { Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Images } from '../../config';
import Modal, { ModalContent } from "react-native-modals";
import Orientation from 'react-native-orientation';
import { CategoryAction } from '../../actions';

import { getIntertial } from '../../components/adMob/Intertial';
import Banner from '../../components/adMob/Banner';
import { AdMobInterstitial } from 'react-native-admob';

import Storage from "../../Store";

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            lstCategory: null,
            currentCategory: null,
            load: false,
            dialogVisible: false,
            showSubcateogry: false,
            lstSubCategory: null,
        }
        Orientation.lockToPortrait();
    };

    getCategory = () => {
        this.setState({ load: true }, () => {
            CategoryAction.getCategory(async response => {
                if (response.success)
                    this.setState({ lstCategory: this.filterCategory(response.data.Category) });
                this.setState({ load: false });
                console.log(response);
            });
        })
    }

    filterCategory = (data) => {
        let lstCategory = data;
        if (lstCategory.length % 2 != 0) {
            lstCategory.push({ title: "" });
        }
        return lstCategory;
    }

    showDialog = (item) => {
        this.setState({ dialogVisible: true, currentCategory: item });
    }

    hideDialog = () => {
        this.setState({ dialogVisible: false, currentCategory: null, lstSubCategory: null, showSubcateogry: false });
    }

    playGame = async () => {
        if (this.state.currentCategory.subcategory != null && !this.state.showSubcateogry) {
            this.setState({ lstSubCategory: this.state.currentCategory.subcategory }, () => {
                this.setState({ showSubcateogry: true });
            });
        }
        else {
            if (await Storage.getSubscription() == 0)
                AdMobInterstitial.showAd().catch(error => console.warn(error));

            this.setState({ dialogVisible: false });
            this.props.navigation.navigate("Play", { currentCategory: this.state.currentCategory });
            this.setState({ currentCategory: null, lstSubCategory: null, showSubcateogry: false });
        }
    }

    subitemClicked = (item) => {
        this.setState({ currentCategory: item }, () => {
            this.playGame();
        })
    }

    backAction = () => {
        StatusBar.setHidden(false);
        Orientation.lockToPortrait();
        if (this.state.dialogVisible) {
            this.setState({ dialogVisible: false })
            return true;
        }
        return false;
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

    renderSubItem = ({ item }) => {
        return (
            <TouchableOpacity style={{ flex: 1, paddingVertical: 5 }} onPress={() => this.subitemClicked(item)} activeOpacity={0.8}>
                <View style={{ flex: 1, backgroundColor: "#fff", borderRadius: 10, paddingVertical: 10, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: "#000", fontSize: 20 }}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={{ flex: 1 }} onPress={() => this.showDialog(item)}>
                { item.title != '' ?
                    <View style={{ flex: 1, flexDirection: 'column', height: 200, alignItems: "center", justifyContent: "center", borderRadius: 20, backgroundColor: "#ffffff3f", marginHorizontal: 15, marginBottom: 35, marginTop: 10 }}>
                        <Image style={{ minWidth: "85%", height: 150, borderRadius: 5 }} resizeMode="contain" source={{ uri: CategoryAction.API_URL + item.icon }}
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
                    <View style={{ height: 50 }}>
                        <Banner />
                    </View>
                </SafeAreaView>
                <Modal
                    visible={!!this.state.dialogVisible}
                    swipeThreshold={100}
                    modalStyle={{ backgroundColor: "transparent" }}
                    onTouchOutside={() => { this.setState({ dialogVisible: false }); }}
                >
                    {this.state.showSubcateogry ?
                        <ModalContent style={{ width: 300, height: 380, paddingVertical: 25, paddingHorizontal: 25, backgroundColor: "transparent" }}>
                            <View style={{ borderWidth: 5, paddingHorizontal: 5, paddingVertical: 30, borderRadius: 30, borderColor: "#fff", backgroundColor: "#71c341", justifyContent: "center", alignItems: "center" }}>
                                <FlatList
                                    style={{ padding: "1.5%", width: "95%" }}
                                    keyExtractor={(item, index) => index.toString()}
                                    data={this.state.lstSubCategory}
                                    renderItem={this.renderSubItem}
                                    numColumns={1}
                                    showsVerticalScrollIndicator={false}
                                />
                            </View>
                            <View style={{ position: "absolute", top: 5, right: 5, width: 35, height: 35 }}>
                                <TouchableOpacity onPress={this.hideDialog}>
                                    <Icon name="times-circle" size={35} color="#fff"></Icon>
                                </TouchableOpacity>
                            </View>
                        </ModalContent>
                        :
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
                    }

                </Modal>
                {this.state.load &&
                    <SkypeIndicator
                        size={40}
                        color={"#71c341"}
                    />
                }

            </ImageBackground>
        )
    }
}