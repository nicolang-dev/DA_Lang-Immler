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
import Adapter from "@/types/Adapter";

type Props = {
  children: ReactNode;
};

type AdapterContextType = {
  adapterList: AdapterData[];
  loaded: boolean;
};

const defaultContext: AdapterContextType = {
  adapterList: [],
  loaded: false
};

async function requestAdapters(adapterList: Adapter[]): Promise<AdapterData[]> {
  if (adapterList.length > 0) {
    let reachableAdapterList: AdapterData[] = [];
    let promiseList = [];
    for (let adapter of adapterList) {
      let promise = AdapterAPI.getInfo(adapter.mac); //request info of every stored adapter
      promiseList.push(promise);
    }
    let results = await Promise.allSettled(promiseList); //if all adapters requested
    for (let result of results) {
      //adding reachable adapters to new list:
      if (result.status == "fulfilled") {
        //if adapter is reachable
        let val = result.value;
        let reachableAdapter = {
          name: val.name,
          mac: val.mac,
          battery: val.battery,
          volume: val.volume,
          streamUrl: val.streamUrl,
          connected: true,
        };
        reachableAdapterList.push(reachableAdapter);
      }
    }
    //adding unreachable adapters to new list:
    let unreachableAdapterList: AdapterData[] = [];
    let reachable = false;
    for (let adapter of adapterList) {
      for (let reachableAdapter of reachableAdapterList) {
        if (reachableAdapter.mac == adapter.mac) {
          reachable = true;
          break;
        }
      }
      if (!reachable) {
        //if adapter is not reachable
        let unreachableAdapter = {
          name: adapter.name,
          mac: adapter.mac,
          battery: 0,
          volume: 0,
          streamUrl: "",
          connected: false,
        };
        unreachableAdapterList.push(unreachableAdapter);
      }
      reachable = false;
    }
    let newAdapterList = reachableAdapterList.concat(unreachableAdapterList);
    return newAdapterList;
  }
  return [];
}

export const AdapterContext = createContext<AdapterContextType>(defaultContext);

export const AdapterProvider = ({ children }: Props) => {
  const { user } = useContext(UserContext);
  const [storedAdapterList, setStoredAdapterList] = useState<Adapter[]>([]);
  const [adapterList, setAdapterList] = useState<AdapterData[]>(
    defaultContext.adapterList
  );
  const [intervalSet, setIntervalSet] = useState(false);
  const [loaded, setLoaded] = useState(defaultContext.loaded);
  let intervalId: NodeJS.Timeout;

  useEffect(() => {
    if (user !== null) {
      CloudStorage.onAdapterChange((newStoredAdapterList: Adapter[]) => {
        console.log("setting stored adpater list: ", newStoredAdapterList);
        setStoredAdapterList(newStoredAdapterList);
      });
    }
  }, [user]);

  useEffect(() => {
    if (storedAdapterList.length > 0) {
      requestAdapters(storedAdapterList).then((newAdapterList) => {
        console.log("setting adapter list:", newAdapterList);
        setAdapterList(newAdapterList);
        if (!intervalSet) {
          intervalId = setInterval(() => {
            requestAdapters(storedAdapterList).then((requestedAdapterList) => {
              setLoaded(true);
              if (
                JSON.stringify(requestedAdapterList) !==
                JSON.stringify(adapterList)
              ) {
                setAdapterList(requestedAdapterList);
              }
            });
          }, 5000);
          setIntervalSet(true);
        }
      });
    } else{
      setLoaded(true);
    }
  }, [storedAdapterList]);

  useEffect(() => {
    if(intervalSet){
      return () => {
        clearInterval(intervalId);
        setIntervalSet(false);
      };
    }
  }, []);

  /*useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!intervalSet) {
      console.log("setting interval");
      interval = setInterval(() => {
        requestAdapters(storedAdapterList).then((requestedAdapters) => {
          console.log("requested adapters:", requestedAdapters);
          console.log("adapter list:", adapterList);
          if (
              JSON.stringify(requestedAdapters) !==
              JSON.stringify(adapterList)
          ) { //if adapter list changed
            console.log("setting adapter list");
            setAdapterList(requestedAdapters);
          }
        });
      }, 5000);
      setIntervalSet(true);
    }
    return () => {
      console.log("clearing interval");
      setIntervalSet(false);
      clearInterval(interval)};
  }, [adapterList]);*/

  return (
    <AdapterContext.Provider value={{ adapterList, loaded }}>
      {children}
    </AdapterContext.Provider>
  );
};
