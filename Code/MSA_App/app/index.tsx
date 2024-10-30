import { useEffect } from "react";
import { Text, View } from "react-native";
import dgram from "react-native-udp";

export default function Index() {
  //const [ip, setIp] = useState<string | null>(null);
  useEffect(()=>{
    const remotePort = 1024;
    const address = "172.20.10.4";
    const socket = dgram.createSocket({type: 'udp4'});
    socket.bind(1024);
    socket.once("listening", ()=>{
      socket.send("hello, i am a upd message!", undefined, undefined, remotePort, address, (err) =>{
        if(err) throw err;
        console.log("message sent!");
      });
    });
    socket.on("message", (msg, info)=>{
      console.log("message received!");
      console.log(msg);
    });
  },[])
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>any text</Text>
    </View>
  );
}
