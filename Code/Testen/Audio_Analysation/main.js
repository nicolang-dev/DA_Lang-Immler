import {writeFile, readFile} from "fs";
import { MPEGDecoder } from 'mpg123-decoder';
import path from 'path';


// Pfad zur MP3-Datei und Ziel-PCM-Datei
const mp3file = path.join(path.resolve(), 'sample.mp3');
const pcmfile = path.join(path.resolve(), 'sample.pcm');

const decoder = new MPEGDecoder();
await decoder.ready;

function float32ToInt16(float32Array) {
    // Erstelle ein neues Int16Array mit der gleichen Länge wie das Float32Array
    let int16Array = new Int16Array(float32Array.length);
    
    for (let i = 0; i < float32Array.length; i++) {
        // Skalieren und auf den Bereich [-32768, 32767] beschränken
        let scaledValue = Math.max(-1, Math.min(1, float32Array[i])); // Begrenze den Wert auf [-1, 1]
        int16Array[i] = Math.round(scaledValue * 32767); // Umwandlung in Int16-Bereich
    }
    
    return int16Array;
}


const data = readFile(mp3file, (err, rawdata)=>{
    console.log(rawdata);
    const mp3data = new Uint8Array(rawdata);
    const pcmdata = decoder.decode(mp3data).channelData[0];
    const pcmdata2 = float32ToInt16(pcmdata);
    console.log(pcmdata2);
})  