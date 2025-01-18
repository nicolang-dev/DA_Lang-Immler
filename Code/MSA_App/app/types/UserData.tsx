import Station from "./Station";
import Adapter from "./Adapter";

type UserData = {
    uid: string,
    stationList: Station[],
    adapterList: Adapter[]
}

export default UserData;