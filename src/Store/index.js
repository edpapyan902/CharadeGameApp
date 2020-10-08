import { AsyncStorage } from 'react-native';

const TimeKey = "TIME";
const SubscriptionKey = "SUBSCRIPTION";

const Storage = {

    getTime: async function () {
        let item = await AsyncStorage.getItem(TimeKey);
        return JSON.parse(item);
    },
    setTime: async function (value) {
        return await AsyncStorage.setItem(TimeKey, JSON.stringify(value));
    },
    getSubscription: async function () {
        let item = await AsyncStorage.getItem(SubscriptionKey);
        return JSON.parse(item);
    },
    setSubscription: async function (value) {
        return await AsyncStorage.setItem(SubscriptionKey, JSON.stringify(value));
    },
};

export default Storage;