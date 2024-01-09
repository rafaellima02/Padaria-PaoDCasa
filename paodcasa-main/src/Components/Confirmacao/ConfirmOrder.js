import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import ConfirmarPagamento from "../modals/pagamentoModal";
import AdicionarEnderecoModal from "../modals/enderecoModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";

const { width, height } = Dimensions.get("window");

export default function ConfirmOrder({ route }) {
  
  const navigation = useNavigation();
  const { carrinhoProdutos } = route.params;

  const [endereco, setEndereco] = useState();
  const [cliente, setCliente] = useState();
  const [totalTodo, setTotal] = useState();
  const [subtotal, setSubtotal] = useState("0.00");
  const [frete, setFrete] = useState("1.00");
  const [formaPagamento, setFormaPagamento] = useState("");
  const [isEnderecoModalVisible, setAddressModalVisible] = useState(false);
  const [clienteId, setClienteId] = useState();

  const toggleEnderecoModal = () => {
    setAddressModalVisible(!isEnderecoModalVisible);
  };

  const handlePagamentoSelecao = (metodoPagamento) => {
    setFormaPagamento(metodoPagamento);
  };

  async function get() {
    const userToken = await AsyncStorage.getItem("userToken");

    if (userToken) {
      const decoded = jwtDecode(userToken);

      setClienteId(decoded.clienteId);
    } else {
      console.log("Token não encontrado no AsyncStorage");
    }
  }

  const getEndereco = async () => {
    try {
      const response = await fetch(
        `http://177.93.108.196:3000/api/endereco/${clienteId}`
      );
      if (!response.ok) {
        throw new Error("Erro ao recuperar produtos no carrinho");
      }

      const data = await response.json();
      setEndereco(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCliente = async () => {
    try {
      const response = await fetch(
        `http://177.93.108.196:3000/api/cliente/${clienteId}`
      );
      if (!response.ok) {
        throw new Error("Erro ao recuperar produtos no carrinho");
      }

      const data = await response.json();
      setCliente(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Componente sacola montado");
        await get();
        if (clienteId !== undefined) {
          await getEndereco();
          await getCliente();
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
    calcularTotalPedido();

    return () => { };
  }, [clienteId]);

  const fazerPedido = async () => {
    if (!endereco || endereco.length === 0) {
      Alert.alert("Endereço ausente", "Por favor, adicione um endereço.");
      return;
    }

    if (!cliente?.telefone) {
      Alert.alert(
        "Número de telefone ausente",
        "Por favor, adicione um número de telefone."
      );
      return;
    }

    try {
      const response = await fetch("http://177.93.108.196:3000/api/pedido", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cliente_id: cliente.id,
          produtos: carrinhoProdutos.map((produto) => ({
            quantidade: produto.quantidade,
            produto: {
              id: produto.produto.id,
            },
            endereco: {
              id: endereco[0].id,
            },
          })),
          total: totalTodo,
          status: "Aguardando confirmação",
          confirmado: false,
          carrinhoId: carrinhoProdutos[0].carrinho_id,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao fazer pedido");
      }

      const data = await response.json();

      Alert.alert("Pedido realizado com sucesso!");
      navigation.navigate("BottomTabNavigator", { screen: "Inicio" });
    } catch (error) {
      console.error(error);
      Alert.alert("Erro ao fazer pedido. Tente novamente.");
    }
  };

  const handleAddAddress = async (novoEndereco) => {
    try {
      const response = await fetch("http://177.93.108.196:3000/api/endereco", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cliente_id: cliente.id,
          ...novoEndereco,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao adicionar endereço");
      }

      setEndereco([novoEndereco]);
    } catch (error) {
      console.error(error);
      Alert.alert("Falha ao criar endereço");
    }
  };

  const calcularTotalPedido = () => {
    if (!carrinhoProdutos || carrinhoProdutos.length === 0) {
      setSubtotal("0.00");
      setFrete("1.00");
      setTotal("1.00");
      return;
    }

    const subtotalValue = carrinhoProdutos.reduce((acc, produto) => {
      const precoNumerico = parseFloat(produto.preco);
      return acc + precoNumerico;
    }, 0);

    setSubtotal(subtotalValue.toFixed(2));

    const freteValue = 1.0;

    setFrete(freteValue.toFixed(2));

    const totalValue = subtotalValue + freteValue;

    setTotal(totalValue.toFixed(2));
  };

  const renderNumeroTelefone = () => {
    if (!cliente?.telefone) {
      return (
        <TouchableOpacity onPress={() => navigation.navigate("Conta")}>
          <Text style={styles.upPartInf}>
            Inexistente. Clique aqui para adicionar.
          </Text>
        </TouchableOpacity>
      );
    }
    return <Text style={styles.upPartInf}> {cliente.telefone}</Text>;
  };

  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.pageNameSpace}>
        <TouchableOpacity
          style={{}}
          onPress={() => navigation.navigate("Carrinho")}
        >
           <Icon
            style={{ marginLeft: width * 0.03, }}
            name="chevron-back"
            size={width * 0.1}
            color="#CCBCB4"
          />
        </TouchableOpacity>

        <Text style={styles.pageName}>Confirmar Pedido</Text>
      </View>
      <View style={{ height: "74.9%" }}>
        <ScrollView>
          <View
            style={{
              backgroundColor: "#DCCCAC",
              marginTop: height * 0.014,
              elevation: 2,
            }}
          >
            <View
              style={{ borderBottomWidth: 1, borderBottomColor: "#848484" }}
            >
              <Text style={styles.nameCardInf}>Informações de entrega</Text>
            </View>
            <View
              style={{ marginTop: 6, marginLeft: 22, flexDirection: "row" }}
            >
              <Text style={styles.upPartInf}>{cliente?.nome}</Text>
              <Text style={styles.upPartInf}>
                Número :
              </Text>
              {renderNumeroTelefone()}
            </View>

            {endereco && endereco.length > 0 ? (
              <View style={{ marginLeft: 22, marginBottom: 5 }}>
                <Text style={[styles.downPartInf, { marginTop: 6 }]}>
                  Rua: {endereco[0].rua}, {endereco[0].cidade},{" "}
                  {endereco[0].estado}{" "}
                </Text>
                <Text style={[styles.downPartInf, {marginBottom:2}]}>
                  CEP: {endereco[0].cep}
                </Text>
              </View>
            ) : (
              <View style={{ marginLeft: 18, marginTop: 6, width: "90%" }}>
                <TouchableOpacity onPress={toggleEnderecoModal}>
                  <Text style={styles.downPartInf}>
                    Ainda não possui nenhum endereço em sua conta. Clique aqui
                    para adicionar.
                  </Text>
                </TouchableOpacity>
                {isEnderecoModalVisible && (
                  <AdicionarEnderecoModal
                    isVisible={isEnderecoModalVisible}
                    onClose={toggleEnderecoModal}
                    AddAddress={handleAddAddress}
                  />
                )}
              </View>
            )}
          </View>

          <View
            style={{ backgroundColor: "#DCCCAC", marginTop: 10, elevation: 2 }}
          >
            <View
              style={{ borderBottomWidth: 1, borderBottomColor: "#848484" }}
            >
              <Text style={styles.nameCardInf}>Itens de entrega</Text>
            </View>

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {carrinhoProdutos?.map((produto, index) => (
                <View
                  style={{
                    marginLeft: 13,
                    alignItems: "flex-start",
                    marginTop: height * 0.01
                  }}
                  key={index}
                >
                  <View style={{ alignItems: "center" }}>
                    <Image
                      source={{
                        uri: `http://177.93.108.196:3000${produto.produto.url}`,
                      }}
                      style={{
                        width: 77,
                        height: 77,
                        borderRadius: 5,
                        marginTop: 12,
                      }}
                    />
                    <Text
                      style={{
                        color: "#5A4429",
                        fontSize: 14,
                        fontWeight: "bold",
                        marginTop: 2,
                        textAlign: "center",
                        maxWidth: 100,
                      }}
                    >
                      {produto.produto.nome}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        marginBottom: 13,
                        marginTop: 5,
                      }}
                    >
                      <Text
                        style={{
                          color: "#5A4429",
                          fontSize: 14,
                          fontWeight: "bold",
                        }}
                      >
                        {"Quantidade: "}
                        {produto.quantidade}{" "}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          <View
            style={{ backgroundColor: "#DCCCAC", marginTop: 10, elevation: 2 }}
          >
            <View
              style={{ borderBottomWidth: 1, borderBottomColor: "#848484" }}
            >
              <Text style={styles.nameCardInf}>
                Forma de pagamento: {formaPagamento || "Selecione"}
              </Text>
            </View>
            <ConfirmarPagamento pagamentoSelecionado={handlePagamentoSelecao} />
          </View>

          <View
            style={{ backgroundColor: "#DCCCAC", marginTop: 10, elevation: 2 }}
          >
            <View
              style={{
                marginTop: 12,
                paddingBottom: 12,
                justifyContent: "space-between",
                flexDirection: "row",
                borderBottomWidth: 1,
                borderBottomColor: "#848484",
              }}
            >
              <Text
                style={{
                  marginLeft: 22,
                  color: "#5A4429",
                  fontSize: 15,
                  fontWeight: "bold",
                  letterSpacing: 0.45,
                }}
              >
                Frete
              </Text>
              <Text
                style={{
                  marginRight: 22,
                  color: "#5A4429",
                  fontSize: 15,
                  fontWeight: "bold",
                  letterSpacing: 0.45,
                }}
              >
                {frete}
              </Text>
            </View>
            <View
              style={{
                marginTop: 12,
                paddingBottom: 12,
                justifyContent: "space-between",
                flexDirection: "row",
                borderBottomWidth: 1,
                borderBottomColor: "#848484",
              }}
            >
              <Text
                style={{
                  marginLeft: 22,
                  color: "#5A4429",
                  fontSize: 15,
                  fontWeight: "bold",
                  letterSpacing: 0.45,
                }}
              >
                Subtotal
              </Text>
              <Text
                style={{
                  marginRight: 22,
                  color: "#5A4429",
                  fontSize: 15,
                  fontWeight: "bold",
                  letterSpacing: 0.45,
                }}
              >
                {subtotal}
              </Text>
            </View>
            <View
              style={{
                marginTop: 12,
                marginBottom: 12,
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  marginLeft: 21,
                  color: "#5A4429",
                  fontSize: 15,
                  fontWeight: "bold",
                  letterSpacing: 0.45,
                }}
              >
                Tempo estimado
              </Text>
              <Text
                style={{
                  marginRight: 18,
                  color: "#5A4429",
                  fontSize: 15,
                  fontWeight: "bold",
                  letterSpacing: 0.45,
                }}
              >
                7:38
              </Text>
            </View>
          </View>
          <View style={{ width: "100%", marginTop: 12, paddingBottom: 12 }}>
            <Text
              style={{
                marginLeft: 15,
                color: "#5A4429",
                fontSize: 13,
                fontWeight: "bold",
                letterSpacing: 0.45,
              }}
            >
              Ao clicar em "Fazer pedido" você está{"\n"}
              concordando com os nossos{" "}
              <Text style={{ color: "#C0883E", fontWeight: "bold" }}>
                termos e condições
              </Text>
            </Text>
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          backgroundColor: "#b48c5c73",

          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
      >
        <Text style={{ color: "#b48c5c73" }}>.</Text>
        <View
          style={{
            backgroundColor: "#DCCCAC",
            marginTop: -14,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                paddingLeft: 27,
                fontSize: 15,
                color: "#5A4429",
                fontWeight: "bold",
              }}
            >
              Total
            </Text>
            <Text
              style={{
                paddingRight: 27,
                fontSize: 15,
                color: "#5A4429",
                fontWeight: "bold",
              }}
            >
              {totalTodo}
            </Text>
          </View>
          <View>
            <View
              style={{ height: "100%", width: "100%", alignItems: "center" }}
            >
              <TouchableOpacity
                onPress={fazerPedido}
                style={styles.btnConfPedido}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 18,
                    fontWeight: "bold",
                    paddingTop: 11,
                  }}
                >
                  FAZER PEDIDO
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: "#CCBCB4",
    flex: 1,
  },
  pageNameSpace: {
    backgroundColor: "#67452C",
    height: height * 0.07,
    width: "100%",
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    flexDirection: "row",
    elevation: 2,
  },
  pageName: {
    color: "#DCCCAC",
    fontSize: height * 0.03,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 1,
    marginLeft: 35,
    marginTop: 3,
    shadowColor: "#DCCCAC",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 7,
  },
  nameCardInf: {
    color: "#5A4429",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 22,
    marginBottom: 6,
    marginTop: 6,
  },
  upPartInf: {
    fontSize: 15,
    color: "#5A4429",
    fontWeight: "bold",
  },
  downPartInf: {
    color: "#5A4429",
    fontSize: 14,
    fontWeight: "bold",

  },
  imgProduto: {
    width: 20,
    height: 20,
  },
  txtFormPay: {
    color: "#5A4429",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 8,
    marginLeft: 22,
    marginBottom: 8,
  },
  btnConfPedido: {
    backgroundColor: "#67452C",
    width: "90%",
    height: 47,
    alignItems: "center",
    borderRadius: 25,
    marginTop: 14,
  },
  produtoSpace: {
    marginBottom: 16,
  },
});
