import React, { Component } from 'react';
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
import { CategoryAction } from '../../actions';
import Storage from "../../Store";

export default class Adsense extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lstAdsense: null
        }
    }

    componentWillMount = () => {
        this.getAdsense();
    }

    getAdsense = () => {
        this.setState({ load: true }, () => {
            CategoryAction.getAdsense(this.props.navigation.state.params.currentCategory.id, async response => {
                if (response.success)
                    this.setState({ lstAdsense: response.data.Adsense });
                this.setState({ load: false });
            });
        })
    }

    itemClicked = (item) => {
        this.props.navigation.navigate("ZoomView", { adsense_url: item.path });
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={{ flex: 1 }} activeOpacity={0.5} onPress={({ }) => { this.itemClicked(item) }}>
                { item.title != '' ?
                    <View style={{ flex: 1, flexDirection: 'column', height: 200, alignItems: "center", justifyContent: "center", borderRadius: 20, backgroundColor: "#ffffff3f", marginHorizontal: 5, marginBottom: 15, }}>
                        <Image style={{ minWidth: "90%", height: 150, borderRadius: 5 }} resizeMode="contain" source={{ uri: CategoryAction.API_URL + item.path }}
                            PlaceholderContent={<ActivityIndicator size={"large"} color={"white"} />} placeholderStyle={{ backgroundColor: "transparent" }}></Image>
                    </View>
                    :
                    <View style={{ flex: 1, margin: 15 }}></View>}
            </TouchableOpacity>
        )
    }

    render = () => {
        return (
            <ImageBackground source={Images.background_blue} style={{ width: "100%", height: "100%" }}>
                <View style={{ flex: 1, paddingBottom: 25 }}>
                    <View style={{ height: 70, marginTop: 10, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                        <View style={{ flex: 1, alignItems: "flex-start" }}>
                            <TouchableOpacity onPress={({ }) => { this.props.navigation.navigate("Home"); }} activeOpacity={0.7} style={{
                                justifyContent: "center", alignItems: "center",
                                width: 40, height: 40,
                                marginLeft: 10
                            }}>
                                <Icon name={'arrow-left'} color={'white'} size={25} />
                            </TouchableOpacity>
                        </View>
                        <Text style={{ flex: 2, textAlign: "center", color: "#fff", fontSize: 30 }}>ADSENSE</Text>
                        <View style={{ flex: 1 }} />
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 10 }}>
                        <FlatList
                            style={{ padding: "1.5%" }}
                            keyExtractor={(item, index) => index.toString()}
                            data={this.state.lstAdsense}
                            renderItem={this.renderItem}
                            numColumns={1}
                        />
                    </ScrollView>
                </View>
                {this.state.load &&
                    <SkypeIndicator
                        size={40}
                        color={"#fff"}
                    />
                }
            </ImageBackground>
        )
    }
}