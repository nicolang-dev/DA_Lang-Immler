import Station from "./Station"
import AdapterData from "./AdapterData";

type UserData = {
    adapterList: AdapterData[] | null,
    stationList: Station[] | null
}

export default UserData;