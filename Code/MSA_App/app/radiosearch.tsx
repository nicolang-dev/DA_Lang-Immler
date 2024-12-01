import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet, ScrollView, Button } from "react-native";
import axios from "axios";
import {Picker} from '@react-native-picker/picker';
import {Colors} from "../constants/Colors";
import { router } from "expo-router";
import { getCountries, getLanguages } from "@/components/Utilities";

const Item = Picker.Item;

export default function RadioSearch(){
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [countryDataset, setCountryDataset] = useState(Array());
    const [languageDataset, setLanguageDataset] = useState(Array());

    const defaultCountry = "Austria";
    const defaultLanguage = "German";

    const style = StyleSheet.create({
        pickerItem: {
            color: 'black'
        }
    })

    useEffect(()=>{
        setSelectedCountry(defaultCountry);
        setSelectedLanguage(defaultLanguage);
        getCountries().then(res => {
            if(res != null){
                setCountryDataset(res);
            }
        }).catch(err => {
            console.error(err);
        });

        getLanguages().then(res => {
            if(res != null){
                setLanguageDataset(res);
            }
        }).catch(err => {
            console.error(err);
        })
    },[]);

    return(
        <ScrollView>
            <Picker onValueChange={(val: string, idx: number) => {setSelectedCountry(val)}} selectedValue={selectedCountry}>
                {countryDataset.map((val, idx) =>(
                    <Item key={idx} value={val} label={val} color={Colors.black}/>
                ))}
            </Picker>
            <Picker onValueChange={(val: string, idx: number) => {setSelectedLanguage(val)}} selectedValue={selectedLanguage}>
                {languageDataset.map((val, idx) =>(
                    <Item key={idx} value={val} label={val} color={Colors.black}/>
                ))}
            </Picker>
            <Button title="Search!" onPress={(event) => {
                router.push({pathname:"/favouriteStationSelect", params: {country: selectedCountry, language: selectedLanguage}})
            }}/>
        </ScrollView>
    )
}