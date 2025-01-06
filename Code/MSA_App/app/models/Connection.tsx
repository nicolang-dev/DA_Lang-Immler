import Station from "./Station";
import Adapter from "./Adapter";

class Connection{
    adapter: Adapter;
    station: Station;

    constructor(adapter: Adapter, station: Station){
        this.adapter = adapter;
        this.station = station;
    }
}

export default Connection;