import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { CloudStorage } from "../api/FirebaseAPI";
import Adapter from "../types/Adapter";
import { AdapterAPI } from "@/api/AdapterAPI";
import { UserContext } from "./UserContext";
import AdapterData from "@/types/AdapterData";

type Props = {
  children: ReactNode;
};

type AdapterContextType = {
  adapterDataList: AdapterData[];
};

const defaultContext: AdapterContextType = {
  adapterDataList: [],
};

export const AdapterContext = createContext<AdapterContextType>(defaultContext);

export const AdapterProvider = ({ children }: Props) => {
  const { user } = useContext(UserContext);
  const [adapterList, setAdapterList] = useState<Adapter[]>([]);
  const [adapterDataList, setAdapterDataList] = useState<AdapterData[]>(
    defaultContext.adapterDataList
  );

  function requestAdapters() {
    if (adapterList !== null) {
      let newAdapterDataList: AdapterData[] = [];
      let promiseList = [];
      for(let adapter of adapterList) {
        let promise = AdapterAPI.getInfo(adapter);
        promiseList.push(promise);
      }
      Promise.allSettled(promiseList).then((results) => {
        for (let result of results) {
          if (result.status == "fulfilled") {
            let val = result.value;
            let newAdapterData = {
              name: val.name,
              mac: val.mac,
              battery: val.battery,
              volume: val.volume,
              streamUrl: val.streamUrl,
              connected: true,
            };
            newAdapterDataList.push(newAdapterData);
          }
        }
      });
      for(let adapter of adapterList) {
        let containsMac = false;
        for(let newAdapterData of newAdapterDataList){
          if(newAdapterData.mac == adapter.mac){
            containsMac = true;
            break;
          }
        }
        if(!containsMac){
          let newAdapterData = {
            name: adapter.name,
            mac: adapter.mac,
            battery: 0,
            volume: 0,
            streamUrl: "",
            connected: false,
          };
        }
      }
      console.log("setting new adapter data list");
      setAdapterDataList(newAdapterDataList);
    }
  }

  useEffect(() => {
    console.log("use effect");
    let intervalId = 0;
    if (user !== null) {
      console.log("user is not null");
      CloudStorage.onAdapterChange((newAdapterList: Adapter[]) => {
        console.log("adapter changed");
        setAdapterList(newAdapterList);
        setInterval(() => requestAdapters(), 5000);
      });
    } else {
      console.log("user is null");
    }
    return () => clearInterval(intervalId);
  }, [user]);

  return (
    <AdapterContext.Provider value={{ adapterDataList }}>
      {children}
    </AdapterContext.Provider>
  );
};
