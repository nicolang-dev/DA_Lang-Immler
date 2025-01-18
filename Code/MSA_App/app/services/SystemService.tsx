import { getLocales, Locale } from 'expo-localization';
import * as Network from "expo-network";

export const SystemService = {
    getRegionCode(): string | null{
        try{
            const locales: Locale[] = getLocales();
            return locales[0].regionCode;
        } catch(err) {
            throw err;
        }
    },
    getLanguageCode(): string | null{
        try{
            const locales: Locale[] = getLocales();
            return locales[0].languageCode;
        } catch(err) {
            throw err;
        }
    },
    async isConnectedToInternet(): Promise<boolean>{
        try{
            const state = await Network.getNetworkStateAsync();
            if(state.isInternetReachable !== undefined){
                return state.isInternetReachable;
            }
            return false;
        } catch(err) {
            throw err;
        }
    }
};