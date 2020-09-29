import React, { Component } from 'react'
import {
    FlatList,
    View,
    Text,
    ActivityIndicator,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    ImageBackground
} from 'react-native'
import { Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Images } from '../../config';

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

    renderItem = ({ item }) => {
        return (
            item.title != '' ?
                <View style={{ flex: 1, flexDirection: 'column', height: 200, alignItems: "center", justifyContent: "center", borderRadius: 20, backgroundColor: "#ffffff3f", margin: 15 }}>
                    <Image style={{ minWidth: "85%", height: 150, borderRadius: 5 }} resizeMode="contain" source={item.icon}
                        PlaceholderContent={<ActivityIndicator />}></Image>
                </View>
                :
                <View style={{ flex: 1, margin: 15 }}></View>
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
            </ImageBackground>


        )
    }
}