import { Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "@/constants/Style";

type Props = {
  active: boolean;
  onDisconnect: Function;
};

export default function DisconnectButton({ active, onDisconnect }: Props) {
  return (
    <Pressable
      disabled={!active}
      style={{
        alignSelf: "flex-end",
        paddingBottom: 15,
      }}
      onPress={() => onDisconnect()}
    >
      <AntDesign
        name="disconnect"
        size={24}
        color={active ? Colors.lightTurquoise : Colors.grey}
      />
    </Pressable>
  );
}
