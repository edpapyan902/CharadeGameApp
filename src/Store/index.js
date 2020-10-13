import { AsyncStorage } from 'react-native';

const SubscriptionKey = "SUBSCRIPTION";

const Storage = {

    getSubscription: async function () {
        let item = await AsyncStorage.getItem(SubscriptionKey);
        return JSON.parse(item);
    },
    setSubscription: async function (value) {
        return await AsyncStorage.setItem(SubscriptionKey, JSON.stringify(value));
    },
};

export default Storage;