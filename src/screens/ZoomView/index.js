import React, { Component } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    ImageBackground,
    BackHandler,
    StatusBar,
    Dimensions
} from 'react-native'
import { SkypeIndicator } from 'react-native-indicators';
import { Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Images } from '../../config';
import { CategoryAction } from '../../actions';
import Storage from "../../Store";
import ImageZoom from 'react-native-image-pan-zoom';

export default class ZoomView extends Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <ImageBackground source={Images.background_blue} style={{ width: "100%", height: "100%" }}>
                <ImageZoom cropWidth={Dimensions.get('window').width}
                    cropHeight={Dimensions.get('window').height}
                    imageWidth={Dimensions.get('window').width}
                    imageHeight={300}>
                    <Image style={{ width: Dimensions.get('window').width, height: 300 }}
                        source={{ uri: CategoryAction.API_URL + this.props.navigation.state.params.adsense_url }} />
                </ImageZoom>
            </ImageBackground>
        )
    }
}