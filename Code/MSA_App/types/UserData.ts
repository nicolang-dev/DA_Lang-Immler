import Adapter from "./Adapter"
import Station from "./Station"

type UserData = {
    adapterList: Adapter[] | null,
    stationList: Station[] | null
}

export default UserData;