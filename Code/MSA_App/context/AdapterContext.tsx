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

type Props = {
  children: ReactNode;
};

type AdapterContextType = {
  adapterList: Adapter[];
  reachableAdapterMacs: string[];
};

const defaultContext: AdapterContextType = {
  adapterList: [],
  reachableAdapterMacs: [],
};

export const AdapterContext = createContext<AdapterContextType>(defaultContext);

export const AdapterProvider = ({ children }: Props) => {
  const { user } = useContext(UserContext);
  const [adapterList, setAdapterList] = useState<Adapter[]>(
    defaultContext.adapterList
  );
  const [reachableAdapterMacs, setReachableAdapterMacs] = useState(
    defaultContext.reachableAdapterMacs
  );

  function requestAdapters() {
    if (adapterList !== null) {
      let promiseList = [];
      let reachableAdapters: Adapter[] = [];
      for (let adapter of adapterList) {
        let promise = AdapterAPI.getInfo(adapter.name);
        promiseList.push(promise);
      }
      Promise.allSettled(promiseList).then((results) => {
        for (let result of results) {
          if (result.status == "fulfilled") {
            reachableAdapters.push(result.value);
            let newReachableAdapterMacs = [...reachableAdapterMacs];
            newReachableAdapterMacs.push(result.value.mac);
            setReachableAdapterMacs(newReachableAdapterMacs);
          }
        }
      });
      let newAdapterList = [...adapterList];
      for (let adapter of newAdapterList) {
        let reachable = false;
        for (let reachableAdapter of reachableAdapters) {
          if (reachableAdapter.mac == adapter.mac) {
            adapter = reachableAdapter;
            reachable = true;
            break;
          }
        }
      }
      console.log("setting adapter list");
      setAdapterList(newAdapterList);
    }
  }

  useEffect(() => {
    let intervalId = 0;
    if(user !== null){
        console.log("user is not null");
        CloudStorage.getAdapterList().then((initAdapterList: Adapter[]) => {
            console.log("adapterlist:", adapterList);
            console.log("setting adapter list");
            setAdapterList(initAdapterList);
            //setInterval(() => requestAdapters(), 5000);
            /*CloudStorage.onAdapterChange((newAdapterList: Adapter[]) => {
                setAdapterList(newAdapterList);
            });*/
        }).catch(err => {
            console.error(err);
        })
    } else {
        console.log("user is null");
    }
    return () => clearInterval(intervalId);
  },[user]);

  return (
    <AdapterContext.Provider value={{ adapterList, reachableAdapterMacs }}>
      {children}
    </AdapterContext.Provider>
  );
};
