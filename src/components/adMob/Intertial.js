import { AdMobInterstitial } from 'react-native-admob'
import { Platform } from 'react-native';

let isShow = true;
export const getIntertial = () => {

    // AdMobInterstitial.setAdUnitID(() => {
    //     Platform.OS === 'android'
    //         ?
    //         "ca-app-pub-7315663868828228/8345553444"
    //         :
    //         "ca-app-pub-7315663868828228/2907386321"
    // });
    // AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
    // if (isShow) {
    //     AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
    //     isShow = false;
    // }

    // AdMobInterstitial.addEventListener('adClosed', () => {
    //     setTimeout(() => AdMobInterstitial.requestAd().then(() => {
    //         AdMobInterstitial.showAd();
    //     }), 10000)
    // });

}
