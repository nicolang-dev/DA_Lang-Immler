import { getLocales, Locale } from 'expo-localization';

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
    }
};