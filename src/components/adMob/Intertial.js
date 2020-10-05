import { AdMobInterstitial } from 'react-native-admob'
let isShow = true;
export const getIntertial = () => {

    AdMobInterstitial.setAdUnitID("ca-app-pub-7315663868828228/8647993703");
    AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
    if (isShow) {
        AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
        isShow = false;
    }

    AdMobInterstitial.addEventListener('adClosed', () => {
        setTimeout(() => AdMobInterstitial.requestAd().then(() => {
            AdMobInterstitial.showAd();
        }), parseInt(orderStore.inter.interval))
    });

}
