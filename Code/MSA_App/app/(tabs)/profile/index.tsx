import { Text, View, SafeAreaView } from "react-native"
import { GlobalStyle } from "@/constants/Style";
import { useState } from "react";
import VerticalSlider from 'rn-vertical-slider';

export default function ProfileScreen(){
    const [value, setValue] = useState(0);
    return (
        <SafeAreaView style={GlobalStyle.page}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <VerticalSlider
        value={value}
        onChange={(value) => setValue(value)}
        height={200}
        width={40}
        step={1}
        min={0}
        max={100}
        borderRadius={5}
        minimumTrackTintColor="#2979FF"
        maximumTrackTintColor="#D1D1D6"
        showIndicator
        renderIndicator={() => (
          <View
            style={{
              height: 40,
              width: 80,
              backgroundColor: '#2979FF',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff' }}>{value}</Text>
          </View>
        )}
        containerStyle={{ backgroundColor: '#e0e0e0', borderRadius: 10 }}
        sliderStyle={{ backgroundColor: '#fff', borderRadius: 5 }}
      />
    </View>
        </SafeAreaView>
    );
}