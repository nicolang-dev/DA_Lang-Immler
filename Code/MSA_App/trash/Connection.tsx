import Station from "./Station";
import Adapter from "./Adapter";

class Connection{
    adapter: Adapter;
    station: Station;
    paused: boolean;

    constructor(adapter: Adapter, station: Station, paused: boolean){
        this.adapter = adapter;
        this.station = station;
        this.paused = paused;
    }
}

export default Connection;