import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Navigation } from 'react-native-feather';
import Icon from "react-native-vector-icons/Ionicons";

const { width, height } = Dimensions.get("window");



export default function MeusDados() {






  return (


    <View style={styles.container}>
      <View>
        <SafeAreaView>
          <View style={styles.cabeca}>
            <Text style={styles.cabecaTexto}>MEUS DADOS</Text>
          </View>
        </SafeAreaView>
      </View>

      <View>
        <SafeAreaView>
          <TouchableOpacity>
            <View style={styles.pai}>
              <View style={styles.filha1}>
                <Text style={styles.info}>Informações Pessoais</Text>
                <View style={styles.next}>
                  <Icon name="chevron-forward" size={width * 0.05} color="#5A4429" />
                </View>
              </View>
              <View style={styles.filha2}>
                <Text style={styles.subinfo}>Nome completo e CPF</Text>
              </View>
            </View>
          </TouchableOpacity>



          <TouchableOpacity>
            <View style={styles.pai}>
              <View style={styles.filha1}>
                <Text style={styles.info}>Meu perfil</Text>
                <View style={styles.next}>
                  <Icon name="chevron-forward" size={width * 0.05} color="#5A4429" />
                </View>
              </View>
              <View style={styles.filha2}>
                <Text style={styles.subinfo}>Dados pessoais</Text>
              </View>
            </View>
          </TouchableOpacity>



          <TouchableOpacity>
            <View style={styles.pai}>
              <View style={styles.filha1}>
                <Text style={styles.info}>Credenciais</Text>
                <View style={styles.next}>
                  <Icon name="chevron-forward" size={width * 0.05} color="#5A4429" />
                </View>
              </View>
              <View style={styles.filha2}>
                <Text style={styles.subinfo}>Dados de acesso à minha conta</Text>
              </View>
            </View>
          </TouchableOpacity>



          <TouchableOpacity>
            <View style={styles.pai}>
              <View style={styles.filha1}>
                <Text style={styles.info}>Publicidade</Text>
                <View style={styles.next}>
                  <Icon name="chevron-forward" size={width * 0.05} color="#5A4429" />
                </View>
              </View>
              <View style={styles.filha2}>
                <Text style={styles.subinfo}>Gerenciar permissão</Text>
              </View>
            </View>
          </TouchableOpacity>



        </SafeAreaView>
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
    backgroundColor: "#67452C",
    alignItems: "center",
    justifyContent: "center",


    borderBottomLeftRadius: width * 0.05,
    borderBottomRightRadius: width * 0.05,
    height: height * 0.1,
    marginBottom: height * 0.05,
  },
  cabecaTexto: {
    color: "white",
    fontSize: width * 0.06,
    fontWeight: "bold",
    top: height * 0.01,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: width * 0.01, height: height * 0.003 },
    textShadowRadius: width * 0.02,
  },

  pai: {
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "#DCCCAC",
    padding: width * 0.04,
    borderRadius: width * 0.01,
    width: "100%",
    marginBottom: height * 0.002,
    
  },

  filha1: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },

  info: {
    color: "#5A4429",
    fontSize: width * 0.04,
    fontWeight: "bold",
    width: '95%'
  },
  subinfo: {
    color: "#5A4429",
    fontSize: width * 0.03,
  },

  next: {
    flexDirection:'column',
    top: height * 0.01,
  },
});