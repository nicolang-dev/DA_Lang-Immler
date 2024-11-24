import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet, ScrollView, Button } from "react-native";
import axios from "axios";
import {Picker} from '@react-native-picker/picker';
import {Colors} from "../constants/Colors";
import { router } from "expo-router";

const Item = Picker.Item;

const testJson = [
    {attr1: "test1", attr2: "hello1"},
    {attr1: "test2", attr2: "hello2"},
    {attr1: "test3", attr2: "hello3"},
];


export default function RadioSearch(){
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [countryDataset, setCountryDataset] = useState(Array());
    const [languageDataset, setLanguageDataset] = useState(Array());
    const [selectedStation, setSelectedStation] = useState("");
    const [streamUrl, setStreamUrl] = useState("");

    const maxStations = 1;

    const countryListUrl = "http://de1.api.radio-browser.info/json/countries?hidebroken=true&order=name";
    const languageListUrl = "http://de1.api.radio-browser.info/json/languages?hidebroken=true&order=name";

    function toNameArr(arr: any){
        let result = Array();
        for(let item of arr){
            result.push(item.name);
        }
        return result;
    }

    const style = StyleSheet.create({
        pickerItem: {
            color: 'black'
        }
    })

    useEffect(()=>{
        const testArr = Array();
        axios.get(countryListUrl).then(resp => {
            setCountryDataset(toNameArr(resp.data));
        }).catch(err => {
            console.error(err);
        })
        axios.get(languageListUrl).then(resp => {
            setLanguageDataset(toNameArr(resp.data));
        }).catch(err => {
            console.error(err);
        })
    },[]);

    return(
        <ScrollView>
            <Picker onValueChange={(val: string, idx: number) => {setSelectedCountry(val)}} selectedValue={"Austria"}>
                {countryDataset.map((val, idx) =>(
                    <Item key={idx} value={val} label={val} color={Colors.black}/>
                ))}
            </Picker>
            <Picker onValueChange={(val: string, idx: number) => {setSelectedLanguage(val)}} selectedValue={"german"}>
                {languageDataset.map((val, idx) =>(
                    <Item key={idx} value={val} label={val} color={Colors.black}/>
                ))}
            </Picker>
            <Button title="Search!" onPress={(event) => {
                router.push({pathname: "/radios", params: {country: selectedCountry, language: selectedLanguage}})
            }}/>
        </ScrollView>
    )
}