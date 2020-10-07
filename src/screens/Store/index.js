import { AsyncStorage } from 'react-native';

const Storage = {

    getItem: async function (key) {
        let item = await AsyncStorage.getItem(key);
        //You'd want to error check for failed JSON parsing...
        return JSON.parse(item);
    },
    setItem: async function (key, value) {
        return await AsyncStorage.setItem(key, JSON.stringify(value));
    },
    removeItem: async function (key) {
        return await AsyncStorage.removeItem(key);
    }
};

export default Storage;