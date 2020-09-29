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

const lstSetting = [
    {
        title: 'RATE US 5 STARS',
        icon: 'star',
        content: ''
    },
    {
        title: 'FEEDBACK',
        icon: 'comment-dots',
        content: ''
    },
    {
        title: 'PRIVACY POLICY',
        icon: 'portrait',
        content: ''
    },
    {
        title: 'ROUND TIME',
        icon: 'clock',
        content: ''
    },
    {
        title: 'SUBSCRIPTION',
        icon: 'chess-queen',
        content: "Don't show Google Advertisement."
    },
    {
        title: 'RESTORE PHRCHASE',
        icon: 'history',
        content: ''
    }
];

export default class Setting extends Component {
    constructor() {
        super()
        this.state = {
            selectedIndex: 2
        }
        this.updateIndex = this.updateIndex.bind(this)
    }
    updateIndex(selectedIndex) {
        this.setState({ selectedIndex })
    }

    renderItem = ({ item }) => {
        const buttons = ['60', '90', '120']
        const { selectedIndex } = this.state
        return (
            <View style={{ flex: 1, margin: 5, height: 80, backgroundColor: "#fff", borderRadius: 10, flexDirection: 'row', alignItems: "center", justifyContent: "flex-start" }}>
                <View style={{ width: 100 }}>
                    <Icon name={item.icon} style={{ paddingHorizontal: 25 }} color={("#002F7F")} size={40}></Icon>
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
                        selectedButtonStyle={{ backgroundColor: "#002F7F" }}
                        containerStyle={{ borderWidth: 3, borderColor: "#002F7F", height: 40, width: 130, borderRadius: 15 }}
                    /> :
                    <></>}
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
                            data={lstSetting}
                            renderItem={this.renderItem}
                            numColumns={1}
                        />
                    </ScrollView>
                </SafeAreaView>
            </ImageBackground>


        )
    }
}