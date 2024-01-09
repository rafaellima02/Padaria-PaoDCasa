import "core-js/stable/atob";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const { width, height } = Dimensions.get("window");

export default function Perfil() {
  const navigation = useNavigation();
  const [decodedToken, setDecodedToken] = useState(null);
  const [nomeC, setNomeC] = useState();

  async function sair() {
    try {
      await AsyncStorage.removeItem("userToken");
      alert("Sessão encerrada com sucesso!");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Erro ao encerrar a sessão:", error);
    }
  }

  async function get() {
    const userToken = await AsyncStorage.getItem("userToken");
    try {
      if (userToken) {
        const decoded = jwtDecode(userToken);

        setNomeC(decoded.clienteNome);
        setDecodedToken(decoded);
      } else {
        console.log("Token não encontrado no AsyncStorage");
        setNomeC(null); 
      }
    } catch {
      console.log("erros");
      setNomeC(null);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          console.log("Componente Perfil montado");
          await get();
        } catch (error) {
          console.error("Erro ao buscar dados:", error);
        }
      };

      fetchData();
      return () => {};
    }, [])
  );



  return (
    <SafeAreaView style={styles.container}>
      {decodedToken ? (
        <View style={styles.heatconta}>
          <View style={styles.heatconta2}>
            <View>
              <Image
                source={require("./icon.png")}
                style={styles.profileImage}
              />
            </View>
            <View>
              <Text style={styles.userName}>
                {nomeC ? nomeC : "Carregando"}
              </Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={sair}>
              <Text style={styles.buttonText}>
                <Icon name="exit-outline" size={width * 0.09} color="#000" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.mensagemContainer}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <Text style={styles.mensagemTexto}>
            Você ainda não possui uma conta.
          </Text>
          <TouchableOpacity style={{backgroundColor: '#5A4429', padding: 7}} onPress={() => navigation.navigate('Login')}><Text style={{color: 'white'}}> Faça login aqui.</Text></TouchableOpacity>
          </View>
        </View>
      )}

      <ScrollView style={styles.scroll}>
        <View style={styles.tudo}>
          <View style={styles.listaitem}>
            <TouchableOpacity>
              <View style={styles.filha}>
                <View style={styles.dois}>
                  <Image
                    source={require("./staricon.png")}
                    style={styles.star}
                  />

                  <Text style={styles.menuItemText}>Minhas avaliações</Text>
                </View>
                <View>
                  <Icon name="chevron-forward" size={25} color="#5A4429" />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.filha}>
                <View style={styles.dois}>
                  <Icon
                    style={styles.icon3}
                    name="chatbubble-ellipses-outline"
                    size={25}
                    color="#000"
                  />

                  <Text style={styles.menuItemText}>Fale conosco</Text>
                </View>
                <View>
                  <Icon name="chevron-forward" size={25} color="#5A4429" />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.filha}>
                <View style={styles.dois}>
                  <Icon
                    style={styles.icon6}
                    name="notifications-outline"
                    size={25}
                    color="#000"
                  />

                  <Text style={styles.menuItemText}>Notificações</Text>
                </View>

                <View>
                  <Icon name="chevron-forward" size={25} color="#5A4429" />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.filha}>
                <View style={styles.dois}>
                  <Icon
                    style={styles.icon4}
                    name="heart-outline"
                    size={25}
                    color="#000"
                  />

                  <Text style={styles.menuItemText}>Favoritos</Text>
                </View>
                <View>
                  <Icon name="chevron-forward" size={25} color="#5A4429" />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.filha}>
                <View style={styles.dois}>
                  <Image
                    source={require("./icons-bilhete.png")}
                    style={styles.bilhete}
                  />

                  <Text style={styles.menuItemText}>Cupons</Text>
                </View>

                <View>
                  <Icon name="chevron-forward" size={25} color="#5A4429" />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Carton")}>
              <View style={styles.filha}>
                <View style={styles.dois}>
                  <Icon
                    style={styles.icon5}
                    name="wallet-outline"
                    size={25}
                    color="#000"
                  />

                  <Text style={styles.menuItemText}>Pagamento</Text>
                </View>

                <View>
                  <Icon name="chevron-forward" size={25} color="#5A4429" />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.filha}>
                <View style={styles.dois}>
                  <Icon
                    style={styles.icon6}
                    name="checkmark-circle-outline"
                    size={25}
                    color="#000"
                  />

                  <Text style={styles.menuItemText}>Assinaturas</Text>
                </View>

                <View>
                  <Icon name="chevron-forward" size={25} color="#5A4429" />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.filha}>
                <View style={styles.dois}>
                  <Icon name="thumbs-up-outline" size={25} color="#000" />

                  <Text style={styles.menuItemText}>Fidelidades</Text>
                </View>

                <View>
                  <Icon name="chevron-forward" size={25} color="#5A4429" />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.filha}>
                <View style={styles.dois}>
                  <Image
                    source={require("./confiança.png")}
                    style={styles.bilhete}
                  />

                  <Text style={styles.menuItemText}>Doações</Text>
                </View>
                <View>
                  <Icon name="chevron-forward" size={25} color="#5A4429" />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Endereco")}>
              <View style={styles.filha}>
                <View style={styles.dois}>
                  <Icon
                    style={styles.icon}
                    name="location-outline"
                    size={25}
                    color="#000"
                  />

                  <Text style={styles.menuItemText}>Meus endereços</Text>
                </View>
                <View>
                  <Icon name="chevron-forward" size={25} color="#5A4429" />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("MeusDados")}>
              <View style={styles.filha}>
                <View style={styles.dois}>
                  <Icon
                    style={styles.icon6}
                    name="reader-outline"
                    size={25}
                    color="#000"
                  />

                  <Text style={styles.menuItemText}>Meus Dados</Text>
                </View>

                <View>
                  <Icon name="chevron-forward" size={25} color="#5A4429" />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.baixo}>
            <TouchableOpacity>
              <View style={styles.baixobtn}>
                <View style={styles.dois}>
                  <Icon
                    style={styles.icon7}
                    name="help-circle-outline"
                    size={25}
                    color="#000"
                  />

                  <Text style={styles.textbaixo}>Ajuda</Text>
                </View>
                <View>
                  <Icon name="chevron-forward" size={25} color="#5A4429" />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.baixobtn}>
                <View style={styles.dois}>
                  <Icon
                    style={styles.icon7}
                    name="settings-outline"
                    size={25}
                    color="#000"
                  />

                  <Text style={styles.textbaixo}>Configurações</Text>
                </View>
                <View>
                  <Icon name="chevron-forward" size={25} color="#5A4429" />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.baixobtn}>
                <View style={styles.dois}>
                  <Icon
                    style={styles.icon7}
                    name="shield-checkmark-outline"
                    size={25}
                    color="#000"
                  />

                  <Text style={styles.textbaixo}>Segurança</Text>
                </View>
                <View>
                  <Icon name="chevron-forward" size={25} color="#5A4429" />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#CCBCB4",
    marginBottom: 50,
  },

  profileImage: {
    width: 65,
    height: 65,
    borderRadius: 35,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#5A4429",
    // top: -50
    marginLeft: 15,
  },

  filha: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DCCCAC",
    padding: 15,
    marginVertical: 1,
    borderRadius: 5,
    width: "100%",
    justifyContent: "space-between",
  },

  dois: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  listaitem: {
    width: "100%",
    marginVertical: 1,
  },
  menuItemText: {
    color: "#5A4429",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 20,
  },

  button: {
    borderRadius: 5,
    width: "16%",
    alignItems: "center",
    top: -35,
    marginLeft: 85,
  },

  scroll: {
    width: "100%",
  },

  heatconta: {
    borderBottomWidth: 1,
    borderColor: "rgba(46, 46, 46, 0.55)",
    marginBottom: 0,
    width: "100%",
    marginLeft: 1,
    display: "flex",
    // top: -15,
    paddingBottom: 30,
    paddingTop: 15,
  },

  heatconta2: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    top: 20,
  },

  bilhete: {
    width: 24,
    height: 24,
  },

  star: {
    width: 24,
    height: 24,
  },

  baixo: {
    paddingTop: 100,
  },

  tudo: {
    display: "flex",
    flexDirection: "column",
  },

  textbaixo: {
    marginLeft: 20,
  },

  baixobtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginVertical: 1,
    borderRadius: 5,
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: "rgba(220, 205, 172, 0.33)",
  },
  mensagemContainer: {
    backgroundColor: "#DCCCAC",
    padding: 15,
    marginVertical: 6,
    borderRadius: 5,
    width: "100%",
  },
  mensagemTexto: {
    color: "#5A4429",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: '4%'
  },
});
