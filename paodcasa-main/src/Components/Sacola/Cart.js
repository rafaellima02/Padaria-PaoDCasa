import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions
} from "react-native";
import { SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import Counter from "../Counter";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";

const { width, height } = Dimensions.get("window");
export default function Cart() {
  const [count, setCount] = useState(1);
  const navigation = useNavigation();
  const [carrinhoProdutos, setCarrinhoProdutos] = useState();
  const [decodedToken, setDecodedToken] = useState(null);
  const [clienteId, setClienteId] = useState();
  const [total, setTotal] = useState(0);

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

  const getCarrinho = async () => {
    console.log(clienteId);
    try {
      const response = await fetch(
        `http://177.93.108.196:3000/api/carrinho/cliente/${clienteId}`
      );
      if (!response.ok) {
        throw new Error("Erro ao recuperar produtos no carrinho");
      }

      const data = await response.json();
      setCarrinhoProdutos(data);
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
          await getCarrinho();
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();

    return () => {};
  }, [clienteId]);

  const atualizaQuantidade = (index, newCount) => {
    const novoCarrinhoProdutos = [...carrinhoProdutos];
    novoCarrinhoProdutos[index].quantidade = newCount;
    setCarrinhoProdutos(novoCarrinhoProdutos);
  };

  const atualizaPrecoTotal = (index, newTotalPrice) => {
    const novoCarrinhoProdutos = [...carrinhoProdutos];
    novoCarrinhoProdutos[index].preco = newTotalPrice;
    setCarrinhoProdutos(novoCarrinhoProdutos);
  };

  const calcularTotal = () => {
    if (carrinhoProdutos && carrinhoProdutos.length > 0) {
      const totalCalculado = carrinhoProdutos.reduce((acumulador, produto) => {
        const precoTotal = parseFloat(produto.preco);
        return isNaN(precoTotal) ? acumulador : acumulador + precoTotal;
      }, 0);

      return totalCalculado.toFixed(2); // Para formatar o total com duas casas decimais
    }

    return "0.00";
  };

  const deletaProd = async (index) => {
    try {
      const produtoId = carrinhoProdutos[index].produto.id;

      const response = await fetch(
        `http://177.93.108.196:3000/api/carrinho/${clienteId}/${produtoId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao remover o produto");
      }

      const novoCarrinhoProdutos = carrinhoProdutos.filter(
        (_, i) => i !== index
      );
      setCarrinhoProdutos(novoCarrinhoProdutos);
    } catch (error) {
      console.error(error);
    }
  };

  const irParaConfirmação = () => {
    if (!carrinhoProdutos || carrinhoProdutos.length === 0) {
      Alert.alert("Sacola vazia", "Por favor, adicione itens à sacola antes.");
      return;
    }

    navigation.navigate("Confirmação", { carrinhoProdutos });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.namePageSpace}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("BottomTabNavigator", { screen: "ínicio" })
          }
        >
          <Icon
            style={{ marginLeft: width * 0.03 }}
            name="chevron-back"
            size={width * 0.1}
            color="#CCBCB4"
          />
        </TouchableOpacity>

        <Text style={styles.pageName}>Fazer Pedido</Text>
      </View>
      <ScrollView
        style={{ marginBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {carrinhoProdutos?.map((produto, index) => (
          <View style={styles.produtoSpace} key={index}>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={{
                  uri: `http://177.93.108.196:3000${produto.produto.url} `,
                }}
                style={{
                  width: 80,
                  height: 80,
                  marginLeft: 18,
                  borderRadius: 5,
                }}
              />

              <View style={{ marginLeft: 14 }}>
                <Text style={styles.txtProduto}>{produto.produto.nome}</Text>
                <Text style={[styles.txtProduto, { paddingTop: 5 }]}>
                  R${produto.preco}
                </Text>
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity onPress={() => deletaProd(index)}>
                <Image
                  source={require("../../../assets/trash.png")}
                  style={{ width: 30, height: 30, marginBottom: 25 }}
                />
              </TouchableOpacity>
              <Counter
                count={produto.quantidade}
                setCount={(newCount) => atualizaQuantidade(index, newCount)}
                setTotalPrice={(newTotalPrice) =>
                  atualizaPrecoTotal(index, newTotalPrice)
                }
                produto={produto.produto}
              />
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.botaoCarrinho}
        onPress={() => navigation.navigate("Busca")}
      >
        <Text style={styles.textoBotaoCarrinho}>Adicionar Itens</Text>
      </TouchableOpacity>

      <View
        style={{
          backgroundColor: "#b48c5c73",
          borderTopLeftRadius: 14,
          borderTopRightRadius: 14,
        }}
      >
        <Text style={{ color: "#b48c5c73" }}>.</Text>
        <View
          style={{
            backgroundColor: "#DCCCAC",
            marginTop: -14,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
              marginBottom: 12,
            }}
          >
            <Text style={styles.txtEnd}>Frete</Text>
            <Text style={styles.txtEnd}>1,00</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: 12,
              borderBottomColor: "#2e2e2e8c",
              borderBottomWidth: 1,
              borderBottomStartRadius: 15,
              borderBottomEndRadius: 15,
            }}
          >
            <Text style={styles.txtEnd}>Total</Text>
            <Text style={styles.txtEnd}>R${calcularTotal()}</Text>
          </View>
          <View style={{ height: 70, alignItems: "center" }}>
            <TouchableOpacity
              style={styles.btnStyle}
              onPress={irParaConfirmação}
            >
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                Confirmar Compra
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: height * 0.035,
    backgroundColor: "#CCBCB4",
  },
  namePageSpace: {
    width: "100%",
    height: height * 0.07,
    backgroundColor: "#67452C",
    flexDirection: "row",
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    elevation: 2,
    alignItems:'center'
  },
  pageName: {
    color: "#DCCCAC",
    fontSize: height * 0.033,
    fontWeight: "bold",
    textAlign:'center',
    letterSpacing: 1,
    marginTop: 3,
    marginLeft: 60,
    shadowColor: "#DCCCAC",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 7,
  },
  produtoSpace: {
    flexDirection: "row",
    paddingTop: 23,
    alignItens: "center",
    justifyContent: "space-between",
    borderBottomColor: "#2e2e2e8c",
    borderBottomWidth: 1,
    borderBottomStartRadius: 15,
    borderBottomEndRadius: 15,
    paddingBottom: 23,
  },
  txtProduto: {
    color: "#5A4429",
    fontWeight: "bold",
    letterSpacing: 0.45,
    fontSize: 14,
  },
  btnMaisItens: {
    backgroundColor: "#5A4429",
    height: 31,
    width: 147,
    alignItems: "center",
    borderRadius: 25,
    justifyContent: "center",
  },
  txtEnd: {
    color: "#5A4429",
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 15,
    marginRight: 15,
    letterSpacing: 0.45,
  },
  btnStyle: {
    alignItems: "center",
    backgroundColor: "#5A4429",
    width: "90%",
    marginTop: 18,
    height: 35,
    justifyContent: "center",
    borderRadius: 25,
  },
  botaoCarrinho: {
    backgroundColor: "#5E361D",
    padding: 10,
    borderRadius: 8,
    position: "absolute",
    bottom: 170,
    right: 10,
  },
  textoBotaoCarrinho: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
