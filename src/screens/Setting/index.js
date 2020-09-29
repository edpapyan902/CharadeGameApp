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
import {Images} from '../../config';

const list = [
    {
        name: 'title',
        icon: require("../../assets/images/star.png"),
        content: ''
    }
];

export default class Setting extends Component {

    renderItem = ({ item }) => {
        return (
            <View style={{ flex: 1, margin: 5, height: 80, backgroundColor: "#fff", borderRadius: 10, flexDirection: 'row', alignItems: "center", justifyContent: "flex-start" }}>
                <Image style={{ width: 50, height: 50, marginHorizontal: 20 }} resizeMode="contain"
                    source={require("../../assets/images/star.png")}></Image>
                <Text>dsdsdsdsdsdsdsdsdsds</Text>
            </View>
        )
    }
    render() {
        return (
            <ImageBackground source={Images.background} style={{ width: "100%", height: "100%" }}>
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
                            data={list}
                            renderItem={this.renderItem}
                            numColumns={1}
                        />
                    </ScrollView>
                </SafeAreaView>
            </ImageBackground>


        )
    }
}