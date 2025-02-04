import Station from "./Station";
import AdapterData from "./AdapterData";

type Connection = {
    adapter: AdapterData;
    station: Station;
    paused: boolean;
}

export default Connection;