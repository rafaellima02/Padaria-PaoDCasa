import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  SafeAreaView,
} from "react-native";




const { width, height } = Dimensions.get("window");

export default function Cabecalho() {
  return (
    <View style={styles.cabeca}>
      <StatusBar/>

    <View style={styles.pai}>

      <View>
      <Text style={styles.cabecaTexto}>
        Padaria
      </Text>
      </View>

      <View>
        <Image
          source={require("../../assets/padaria.png")}
          style={{ height: 40, width: 40, marginHorizontal: width * 0.02,}}
        />
      </View>

      <View>
        <Text style={styles.cabecaTexto}>PãoD'Casa</Text>


      </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  cabeca: {
    backgroundColor: "#67452C",
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: height * 0.09,
  },
  cabecaTexto: {
    color: "white",
    fontSize: 19,
    fontWeight: "bold",
    top: height * 0.006
  },

  pai:{
    flexDirection:'row',
    marginLeft:'4%'
  },

});
