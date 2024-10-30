import {Text} from "react-native";
import { useState } from "react";

export default function TabTwoScreen() {
    const [ip, setIp] = useState(null);
    return (  
        <Text>The broadcast IP is {ip}</Text>
    )
  };
