import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

const Counter = ({ count, setCount, setTotalPrice, produto }) => {
  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
      if (setTotalPrice) {
        setTotalPrice(produto.preco * (count - 1));
      }
    }
  };

  const handleIncrement = () => {
    setCount(count + 1);
    if (setTotalPrice) {
      setTotalPrice(produto.preco * (count + 1));
    }
  };
  return (
    <View style={{ flexDirection: "row", marginRight: 8 }}>
      <TouchableOpacity onPress={handleDecrement}>
        <Image
          source={require("../../assets/ImagensCounter/minus-btn.png")}
          style={{ width: 25, height: 25 }}
        />
      </TouchableOpacity>

      <Text style={{ fontSize: 18, marginHorizontal: 10, color: "#5A4429" }}>
        {count}
      </Text>

      <TouchableOpacity onPress={handleIncrement}>
        <Image
          source={require("../../assets/ImagensCounter/plus-btn.png")}
          style={{ width: 25, height: 25 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Counter;
