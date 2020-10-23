import { AdMobInterstitial } from 'react-native-admob'
import { Platform } from 'react-native';

export const getIntertial = () => {

    AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
    AdMobInterstitial.setAdUnitID(
        Platform.OS == "android" ?
            "ca-app-pub-8844670004607379/1951082201"
            : "ca-app-pub-8844670004607379/5462951805"
    );

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
