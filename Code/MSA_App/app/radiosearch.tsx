import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import axios from "axios";

export default function RadioSearch(){
    const [countryName, setCountryName] = useState("");
    const [languageName, setLanguageName] = useState("");
    const [countryDataset, setCountryDataset] = useState(Array());
    const [languageDataset, setLanguageDataset] = useState(Array());
    const [streamUrl, setStreamUrl] = useState("");
    const deviceUrl ="";
    const apiUrl = "http://de1.api.radio-browser.info";

    function sendStreamUrl(){
        const url = deviceUrl + "/setStreamUrl";
        axios.post(url, streamUrl);
    }

    function getStationsByCountry(country: string){
        const url = apiUrl + "";
        axios.get(url).then(resp=>{
            return resp.data;
        }).catch(err => {
            console.error(err);
        })
    }

    function getStationsByLanguage(language: string){
        const url = apiUrl + "";
        axios.get(url).then(resp=>{
            return resp.data;
        }).catch(err => {
            console.error(err);
        })
    }

    const testList = [
        {key: "test"},
        {key: "hello"}
    ];
    const countryListUrl = "http://de1.api.radio-browser.info/json/countries";
    const languageListUrl = "http://de1.api.radio-browser.info/json/languages";

    function toNameArr(arr: any){
        let result = Array();
        for(let item of arr){
            result.push(item.name);
        }
        return result;
    }

    function toDataset(arr: any){
        let dataset = Array();
        for(let i = 0; i < arr.length; i++){
            let item = Object();
            item.id = (i+1).toString();
            item.title = arr[i];
            dataset.push(item);
        }
        return dataset;
    }

    useEffect(()=>{
        const testArr = Array();
        axios.get(countryListUrl).then(resp => {
            const countryArr = toNameArr(resp.data);
            setCountryDataset(toDataset(countryArr));
            console.log(countryDataset);
        }).catch(err => {
            console.error(err);
        })
        axios.get(languageListUrl).then(resp => {
            const languageArr = toNameArr(resp.data);
            setLanguageDataset(toDataset(languageArr));
        }).catch(err => {
            console.error(err);
        })
    },[]);

    StyleSheet.create({
        
    });

    return(
        <View>
            <FlatList
                data={testList}
                renderItem={({item}) => <Text>{item.key}</Text>}   
            />
            <AutocompleteDropdown 
            dataSet={countryDataset}
            loading={false}
            onSelectItem={(item)=>{
                console.log(item);
            }}/>
        </View>
    )
}