import Station from "./Station";
import Adapter from "./Adapter";

type Connection = {
    adapter: Adapter;
    station: Station;
    paused: boolean;
}

export default Connection;