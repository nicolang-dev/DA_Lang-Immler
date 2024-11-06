import { useEffect } from "react";
import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  //const [ip, setIp] = useState<string | null>(null);
  useEffect(()=>{
    
   }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href={"/radiosearch"}>Go to radio search</Link>
      <Link href={"/configuration"}>Go to configuration</Link>
    </View>
  );
}