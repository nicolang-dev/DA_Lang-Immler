import Adapter from "./Adapter"
import Station from "./Station"

type UserData = {
    uid: string,
    adapterList: Adapter[],
    stationList: Station[]
}

export default UserData;