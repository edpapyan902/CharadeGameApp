import { AdMobInterstitial } from 'react-native-admob'
import { Platform } from 'react-native';

export const getIntertial = () => {

    AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
    // AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712');
    AdMobInterstitial.setAdUnitID(Platform.OS == "android" ? "ca-app-pub-7315663868828228/8345553444" : "ca-app-pub-7315663868828228/8931385534");

    AdMobInterstitial.addEventListener('adLoaded', () =>
        console.log('AdMobInterstitial adLoaded'),
    );
    AdMobInterstitial.addEventListener('adFailedToLoad', error =>
        console.warn(error),
    );
    AdMobInterstitial.addEventListener('adOpened', () =>
        console.log('AdMobInterstitial => adOpened'),
    );
    AdMobInterstitial.addEventListener('adClosed', () => {
        console.log('AdMobInterstitial => adClosed');
        AdMobInterstitial.requestAd().catch(error => console.warn(error));
    });
    AdMobInterstitial.addEventListener('adLeftApplication', () =>
        console.log('AdMobInterstitial => adLeftApplication'),
    );

    AdMobInterstitial.requestAd().catch(error => console.warn(error));
}
