import { useEffect, useState } from "react";
import { ScrollView, Button } from "react-native";
import {Picker} from '@react-native-picker/picker';
import { Colors, GlobalStyle } from "@/constants/Style";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { RadioBrowserAPI } from "@/api/RadioBrowserAPI";
import Language from "@/types/Language";
import Country from "@/types/Country";
import { SystemService } from "@/services/SystemService";

const Item = Picker.Item;

export default function RadioSearch(){
    const [selectedCountryName, setSelectedCountryName] = useState("");
    const [selectedLanguageName, setSelectedLanguageName] = useState("");
    const [countryDataset, setCountryDataset] = useState<Country[] | null>(null);
    const [languageDataset, setLanguageDataset] = useState<Language[] | null>(null);
    const [isDataFetched, setDataFetched] = useState(false);

    useEffect(()=>{
        RadioBrowserAPI.getCountryNames().then(res => {
            if(res != null){
                setCountryDataset(res);
            }
        }).catch(err => {
            console.error(err);
        });

        RadioBrowserAPI.getLanguageNames().then(res => {
            if(res != null){
                setLanguageDataset(res);
            }
        }).catch(err => {
            console.error(err);
        })
    },[]);

    useEffect(() => {
        const systemCountryCode = SystemService.getRegionCode();
        const systemLanguageCode = SystemService.getLanguageCode();
        if(countryDataset !== null){
            let systemCountry = countryDataset.find(country => country.code == systemCountryCode);
            if(systemCountry !== undefined){
                setSelectedCountryName(systemCountry.name);
            }
        }
        if(languageDataset !== null){
            let systemLanguage = languageDataset.find(language => language.code == systemLanguageCode);
            if(systemLanguage !== undefined){
                setSelectedLanguageName(systemLanguage.name);
            }
        }
    }, [countryDataset, languageDataset]);

    if(countryDataset !== null && languageDataset !== null){
        return(
            <SafeAreaView style={GlobalStyle.page}>
                <ScrollView>
                    <Picker onValueChange={(countryName: string) => {setSelectedCountryName(countryName)}} selectedValue={selectedCountryName}>
                        <Item key={"-"} value={"-"} label="-" color={Colors.white}/>
                        {countryDataset.map((country, idx) =>(
                            <Item key={idx} value={country.name} label={country.name} color={Colors.white}/>
                        ))}
                    </Picker>
                    <Picker onValueChange={(languageName: string) => {setSelectedLanguageName(languageName)}} selectedValue={selectedLanguageName}>
                        <Item key={"-"} value={"-"} label="-" color={Colors.white}/>
                        {languageDataset.map((language, idx) =>(
                            <Item key={idx} value={language.name} label={language.name} color={Colors.white}/>
                        ))}
                    </Picker>
                    <Button color={Colors.lightTurquoise} title="Search!" onPress={() => {
                        router.push({pathname: "/(tabs)/music/favouriteStationSelect", params: {countryName: selectedCountryName, languageName: selectedLanguageName}})
                    }}/>
                </ScrollView>
            </SafeAreaView>
        )
    }
}