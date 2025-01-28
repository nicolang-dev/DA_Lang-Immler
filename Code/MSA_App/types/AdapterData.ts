import Adapter from "./Adapter";

type AdapterData = {
    name: string,
    mac: string
    volume: number;
    battery: number;
    streamUrl: string;
    connected: boolean;
}

export default AdapterData;