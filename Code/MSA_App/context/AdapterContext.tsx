import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { CloudStorage } from "../api/FirebaseAPI";
import { AdapterAPI } from "@/api/AdapterAPI";
import { UserContext } from "./UserContext";
import AdapterData from "@/types/AdapterData";

type Props = {
  children: ReactNode;
};

type AdapterContextType = {
  adapterList: AdapterData[];
};

const defaultContext: AdapterContextType = {
  adapterList: [],
};

export const AdapterContext = createContext<AdapterContextType>(defaultContext);

export const AdapterProvider = ({ children }: Props) => {
  const { user } = useContext(UserContext);
  const [adapterList, setAdapterList] = useState<AdapterData[]>(
    defaultContext.adapterList
  );

  function requestAdapters() {
    if (adapterList !== null) {
      let newAdapterList: AdapterData[] = [];
      let promiseList = [];
      for(let adapter of adapterList) {
        let promise = AdapterAPI.getInfo(adapter.mac);
        promiseList.push(promise);
      }
      Promise.allSettled(promiseList).then((results) => {
        for (let result of results) {
          if (result.status == "fulfilled") {
            let val = result.value;
            let newAdapter = {
              name: val.name,
              mac: val.mac,
              battery: val.battery,
              volume: val.volume,
              streamUrl: val.streamUrl,
              connected: true,
            };
            newAdapterList.push(newAdapter);
          }
        }
      });
      for(let adapter of adapterList) {
        let containsMac = false;
        for(let newAdapter of newAdapterList){
          if(newAdapter.mac == adapter.mac){
            containsMac = true;
            break;
          }
        }
        if(!containsMac){
          let newAdapter = {
            name: adapter.name,
            mac: adapter.mac,
            battery: 0,
            volume: 0,
            streamUrl: "",
            connected: false,
          };
          newAdapterList.push(newAdapter);
        }
      }
      setAdapterList(newAdapterList);
    }
  }

  useEffect(() => {
    let intervalId = 0;
    if (user !== null) {
      CloudStorage.onAdapterChange((newAdapterList) => {
        for(let newAdapter of newAdapterList){
          let containsMac = false;
          for(let adapter of adapterList){
            if(adapter.mac == newAdapter.mac){
              containsMac = true;
              break;
            }
          }
          if(!containsMac){
            let newAdapters = [... adapterList];
            let adapter: AdapterData = {name: newAdapter.name, mac: newAdapter.mac, volume: 0, battery: 0, streamUrl: "", connected: false};
            newAdapters.push(adapter);
            setAdapterList(newAdapters);
          }
          requestAdapters();
        }
        intervalId = setInterval(() => requestAdapters(), 5000);
      });
    } else {
      console.log("user is null");
    }
    return () => clearInterval(intervalId);
  }, [user]);

  return (
    <AdapterContext.Provider value={{ adapterList }}>
      {children}
    </AdapterContext.Provider>
  );
};
