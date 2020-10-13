import { AsyncStorage } from 'react-native';

const SubscriptionKey = "SUBSCRIPTION";
const ADSENSEKEY = "ADSENSEKEY";

const Storage = {

    getSubscription: async function () {
        let item = await AsyncStorage.getItem(SubscriptionKey);
        return JSON.parse(item);
    },
    setSubscription: async function (value) {
        return await AsyncStorage.setItem(SubscriptionKey, JSON.stringify(value));
    },
    getAdsense: async function () {
        let item = await AsyncStorage.getItem(ADSENSEKEY);
        return JSON.parse(item);
    },
    setAdsense: async function (value) {
        return await AsyncStorage.setItem(ADSENSEKEY, JSON.stringify(value));
    },
};

export default Storage;