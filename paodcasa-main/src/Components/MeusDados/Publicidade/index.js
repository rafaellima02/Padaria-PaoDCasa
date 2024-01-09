
import { SafeAreaView } from 'react-native';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";



const { width, height } = Dimensions.get("window");

export default function Publicidade() {




  return (


    <View style={styles.container}>
      <View style={styles.containerMen}>
        <SafeAreaView>
          <View style={styles.cabeca}>
            <Text style={styles.cabecaTexto}>Publicidade</Text>
          </View>
        </SafeAreaView>
      </View>

      <View>



        <View>
          <Text style={{ fontSize: 17, marginHorizontal: width * 0.05, color: '#5A4429', alignSelf: 'center', fontWeight: "bold", }}>
            Escolha se você quer receber anúncios fora do PãoD'Casa
          </Text>
          <Text style={{ fontSize: 14, marginHorizontal: width * 0.05, marginBottom: height * 0.06, color: '#5A4429', alignSelf: 'center' }}>
            Os anúncios são apresentados em sites e apps de terceiros que utlizem o nosso serviço de publicidade. O anunciante define seu público-alvo, sem acesso a seus dados pessoias.
          </Text>
        </View>



        <View style={{flexDirection:'row'}}>
          <Text style={{ fontSize: 15, marginHorizontal: width * 0.05, marginBottom: height * 0.04,  fontWeight: "bold", color: '#5A4429' }}>
            Quero receber anúncios de terceiros
          </Text>


          <View style={{top: -height * 0.008 }}>
            <Icon name="toggle-sharp" size={width * 0.09} color="#5A4429" />
          </View>

        </View>


      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCBCB4',
  },

  cabeca: {
    backgroundColor: "#CCBCB4",
    alignItems: "center",
    justifyContent: "center",


    borderBottomLeftRadius: width * 0.05,
    borderBottomRightRadius: width * 0.05,
    height: height * 0.1,
    marginBottom: height * 0.05,
  },
  cabecaTexto: {
    color: "#5A4429",
    fontSize: width * 0.05,
    fontWeight: "bold",
    top: height * 0.01,
  },
});