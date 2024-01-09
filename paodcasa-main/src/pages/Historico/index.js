import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

export default function Historico() {
  const navigation = useNavigation();
  const [pedidos, setPedidos] = useState([]);
  const [pedidosHistorico, setPedidosHistorico] = useState([]);
  const [decodedToken, setDecodedToken] = useState(null);
  const [clienteId, setClienteId] = useState();

  async function get() {
    const userToken = await AsyncStorage.getItem("userToken");

    if (userToken) {
      const decoded = jwtDecode(userToken);

      setClienteId(decoded.clienteId);
      setDecodedToken(decoded);
    } else {
      console.log("Token não encontrado no AsyncStorage");
    }
  }

  async function getPedidos() {
    fetch(`http://177.93.108.196:3000/api/pedido/${clienteId}`)
      .then((response) => response.json())
      .then((data) => setPedidos(data))
      .catch((error) => console.error("Erro na busca de pedidos:", error));
  }

  async function getPedidosHistorico() {
    fetch(`http://177.93.108.196:3000/api/pedido/historico/${clienteId}`)
      .then((response) => response.json())
      .then((data) => setPedidosHistorico(data))
      .catch((error) => console.error("Erro na busca de pedidos:", error));
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Componente pedido montado");
        await get();
        if (clienteId !== undefined) {
          await getPedidos();
          await getPedidosHistorico();
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          console.log("Componente pedido montado");
          await get();
          if (clienteId !== undefined) {
            await getPedidos();
            await getPedidosHistorico();
          }
        } catch (error) {
          console.error("Erro ao buscar dados:", error);
        }
      };

      fetchData();

      return () => {};
    }, [clienteId])
  );

  if (!decodedToken) {
    return (
      <View style={styles.containerMen}>
        <SafeAreaView>
          <View style={styles.cabeca}>
            <Text style={styles.cabecaTexto}>PEDIDOS</Text>
          </View>
          <View style={styles.mensagemContainer}>
            <Text style={styles.mensagem}>
              Entre ou crie uma conta para ver seus pedidos
            </Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  if (decodedToken && pedidos.length === 0 && pedidosHistorico.length === 0) {
    return (
      <View style={styles.containerMen}>
        <SafeAreaView>
          <View style={styles.cabeca}>
            <Text style={styles.cabecaTexto}>PEDIDOS</Text>
          </View>
          <View style={styles.mensagemContainer}>
            <Text style={styles.mensagem}>
              Você ainda não fez nenhum pedido
            </Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  const pedidosAtuais = pedidos.slice(0, 2);
  const historicoPedidos = pedidosHistorico;

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.cabeca}>
          <Text style={styles.cabecaTexto}>PEDIDOS</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
          <View style={styles.tudo}>
            <View>
              <Text style={styles.nomepedidos}> Seus Pedidos </Text>
            </View>

            <View>
              {pedidosAtuais.map((pedido) => (
                <TouchableOpacity
                  key={pedido.id}
                  style={styles.cardpedidos}
                  onPress={() =>
                    navigation.navigate("DetalhesPedido", { pedido })
                  }
                >
                  <View style={styles.divpai}>
                    <View style={styles.esquerda}>
                      <View>
                        <Text style={styles.cdgpedido}>
                          Código: {pedido.id.substring(0, 6)}
                        </Text>
                      </View>

                      <View style={{ height: "15%" }}>
                        {pedido.itens.map((item) => (
                          <View key={item.produto_id}>
                            <Text style={styles.itens}>
                              Item: {item.quantidade}x {item.produto.nome}
                            </Text>
                          </View>
                        ))}
                      </View>

                      <View style={{ marginTop: height * 0.004 }}>
                        <View style={styles.setah}>
                          <View>
                            <Icon
                              name="chevron-down-sharp"
                              size={width * 0.04}
                              color="#000"
                            />
                          </View>
                          <View style={[styles.btn, { paddingTop: 50 }]}>
                            <Text style={styles.btn}>ACOMPANHAR</Text>
                          </View>
                        </View>
                      </View>
                    </View>

                    <View style={styles.direita}>
                      <View style={[styles.statspedidos, { paddingTop: 8 }]}>
                        <Text style={styles.statspedidos}>Status:</Text>
                        <Text style={styles.statspedidos}>{pedido.status}</Text>
                      </View>

                      <View>
                        <Text style={styles.preco}>R$ {pedido.total}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <View>
              <Text style={styles.nomehistorico}> HISTÓRICO </Text>
            </View>

            <View>
              {historicoPedidos.map((historicoPedido) => (
                <TouchableOpacity
                  key={historicoPedido.id}
                  style={styles.cardhistorico}
                  onPress={() =>
                    navigation.navigate("DetalhesPedido", { historicoPedido })
                  }
                >
                  <View style={styles.divpai}>
                    <View style={styles.esquerda}>
                      <View>
                        <Text style={styles.cdgpedido}>
                          Cód. Pedido: {historicoPedido.id.substring(0, 6)}
                        </Text>
                      </View>

                      <View style={{ height: "15%" }}>
                        <Text style={styles.itens}>
                          Items: {historicoPedido.itens.length} itens
                        </Text>
                      </View>

                      <View style={{ marginTop: height * 0.004 }}>
                        <View style={styles.setah}>
                          <View>
                            <Icon
                              name="chevron-down-sharp"
                              size={width * 0.04}
                              color="#000"
                            />
                          </View>
                          <View style={[styles.btn, { paddingTop: 50 }]}>
                            <Text style={styles.btn}>ACOMPANHAR</Text>
                          </View>
                        </View>
                      </View>
                    </View>

                    <View style={styles.direita}>
                      <View style={[styles.statshistorico, { paddingTop: 8 }]}>
                        <Text style={styles.statshistorico}>Status:</Text>
                        <Text style={styles.statshistorico}>FINALIZADO</Text>
                      </View>

                      <View>
                        <Text style={styles.precohist}>
                          R$ {historicoPedido.total}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CCBCB4",
  },

  cabeca: {
    backgroundColor: "#67452C",
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: height * 0.1,
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

  scroll: {
    marginBottom: Platform.OS === "ios" ? 0 : height * 0.16,
  },

  tudo: {
    flex: 1,
    padding: width * 0.03,
    paddingBottom: height * 0.02,
  },

  nomepedidos: {
    color: "#5A4429",
    fontSize: width * 0.07,
    fontWeight: "bold",
    marginLeft: width * 0.09,
  },
  nomehistorico: {
    color: "#5A4429",
    fontSize: width * 0.06,
    fontWeight: "bold",
    marginLeft: width * 0.09,
    marginTop: width * 0.29,
  },

  cardpedidos: {
    width: "95%",
    alignSelf: "center",
    height: 150,
    backgroundColor: "#DCCCAC",
    borderRadius: 20,
    alignItems: "center",
    elevation: 8,
    marginVertical: 10,
    marginHorizontal: 7,
  },

  divpai: {
    flexDirection: "row",
    width: "90%",
    display: "flex",
  },

  esquerda: {
    flexDirection: "column",
    width: "65%",
    justifyContent: "space-between",
  },

  direita: {
    flexDirection: "column",
    width: "50%",
    justifyContent: "space-between",
  },

  setah: {
    flexDirection: "row",
    alignItems: "baseline",
  },

  cdgpedido: {
    color: "#5A4429",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "700",
    marginVertical: "5%",
  },
  itens: {
    color: "#5A4429",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "700",
  },

  btn: {
    color: "#5A4429",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "700",
    alignItems: "baseline",
  },

  statspedidos: {
    color: "#5A4429",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "700",
  },
  preco: {
    color: "#5A4429",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "700",
  },

  cardhistorico: {
    width: "95%",
    alignSelf: "center",
    height: 150,
    backgroundColor: "#DCCCAC",
    borderRadius: 20,
    alignItems: "center",
    elevation: 8,
    marginVertical: 10,
    marginHorizontal: 7,
  },

  statshistorico: {
    color: "#5A4429",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "700",
  },

  btnhistorico: {
    color: "#5A4429",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "700",
  },

  precohist: {
    color: "#5A4429",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "700",
  },
  containerMen: {
    flex: 1,
    backgroundColor: "#CCBCB4",
  },
  mensagemContainer: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
    marginBottom: "auto",
  },
  mensagem: {
    color: "#5A4429",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});