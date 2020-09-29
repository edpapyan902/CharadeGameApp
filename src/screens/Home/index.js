import React, { Component } from 'react'
import {
    FlatList,
    View,
    Text,
    ActivityIndicator,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    ImageBackground, Button
} from 'react-native'
import { Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Images } from '../../config';
import Modal, { ModalContent } from "react-native-modals";

const lstCategory = [
    {
        title: 'Music Songs',
        icon: Images.song
    },
    {
        title: 'TV Shows & Actors',
        icon: Images.tv
    },
    {
        title: 'Musicians',
        icon: Images.musician
    },
    {
        title: 'Famous Zimboz',
        icon: Images.famous
    },
    {
        title: 'Zimboz Geo',
        icon: Images.geo
    },
    {
        title: 'Random Zimboz',
        icon: Images.random
    },
    {
        title: 'Food',
        icon: Images.food
    },
    {
        title: 'Town & Villages',
        icon: Images.town
    },
    {
        title: 'Africa',
        icon: Images.africa
    },
    {
        title: 'Holiday & Chill Spots',
        icon: Images.spot
    },
    {
        title: 'Brands',
        icon: Images.brand
    },
    {
        title: '',
        icon: ''
    }
];

export default class Home extends Component {

    state = {
        dialogVisible: false
    };
    showDialog = () => {
        this.setState({ dialogVisible: true });
    };
    renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={{ flex: 1 }} onPress={this.showDialog}>
                { item.title != '' ?
                    <View style={{ flex: 1, flexDirection: 'column', height: 200, alignItems: "center", justifyContent: "center", borderRadius: 20, backgroundColor: "#ffffff3f", margin: 15 }}>
                        <Image style={{ minWidth: "85%", height: 150, borderRadius: 5 }} resizeMode="contain" source={item.icon}
                            PlaceholderContent={<ActivityIndicator />}></Image>
                    </View>
                    :
                    <View style={{ flex: 1, margin: 15 }}></View>}
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <ImageBackground source={Images.background} style={{ width: "100%", height: "100%" }}>
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
                            data={lstCategory}
                            renderItem={this.renderItem}
                            numColumns={2}
                        />
                    </ScrollView>
                    <View style={{ height: 80 }}></View>
                </SafeAreaView>
                <Modal
                    visible={this.state.dialogVisible}
                    swipeThreshold={100}
                    modalStyle={{ backgroundColor: "transparent" }}
                    onSwipeOut={(event) => { this.setState({ dialogVisible: false }); }}
                    onTouchOutside={() => { this.setState({ dialogVisible: false }); }}
                >

                    <ModalContent style={{ width: 300, height: 380, paddingVertical:25, paddingHorizontal:25, backgroundColor:"transparent" }}>
                        <View style={{borderWidth: 5, paddingHorizontal:10, paddingVertical:20, borderRadius: 30, borderColor: "#fff", backgroundColor: "#00549a"}}>
                            <TouchableOpacity style={{ position: "absolute", top: -23, right: -23 }}>
                                <Icon name="times-circle" size={35} color="#fff"></Icon>
                            </TouchableOpacity>
                            <Text style={{ fontSize: 30, marginTop: 20, marginBottom: 30, textAlign: "center", color: "#fff" }}>Rules</Text>
                            <Text style={{ color: "#fff", textAlign: "center", fontSize: 18, paddingHorizontal: 15 }}>Try to guess the object by describing the plot. To make it more difficult don't use any charactor names.</Text>
                            <TouchableOpacity activeOpacity={0.8} style={{ paddingTop: 30, paddingHorizontal: 10, marginBottom:20 }}>
                                <View style={{ backgroundColor: "#eabf28", height: 40, borderRadius: 10, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ textAlign: "center", color:"#fff", fontSize: 20, fontWeight: "bold" }}>Play</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </ModalContent>
                </Modal>

            </ImageBackground>


        )
    }
}