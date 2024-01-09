import "core-js/stable/atob";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Cabecalho from "../../Components/Cabecalho";
import Carousel from "../../Components/Carousel";
import { ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

export default function Home() {
  const [produtos, setProdutos] = useState([]);
  const [carrinhoProdutos, setCarrinhoProdutos] = useState([]);
  const [decodedToken, setDecodedToken] = useState(null);
  const [clienteId, setClienteId] = useState();

  function filterDesc(desc){
    if(desc.length < 15){
      return desc;
    }
    return `${desc.substring(0,12)}...`
  }

  const navigation = useNavigation();

  async function get() {
    const userToken = await AsyncStorage.getItem("userToken");
    try {
      if (userToken) {
        const decoded = jwtDecode(userToken);

        setClienteId(decoded.clienteId);
        setDecodedToken(decoded);
      } else {
        console.log("Token não encontrado no AsyncStorage");
      }
    } catch {
      console.log("erros");
    }
  }

  function getProdutos() {
    fetch("http://177.93.108.196:3000/api/produto")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na solicitação GET");
        }
        return response.json();
      })
      .then((data) => {
        setProdutos(data);
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  }

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          console.log("Componente Perfil montado");
          await get();
          getProdutos();
          if (clienteId !== undefined) {
            await getCarrinho();
          }
        } catch (error) {
          console.error("Erro ao buscar dados:", error);
        }
      };

      fetchData();
      return () => {};
    }, [])
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Componente Perfil montado");
        await get();
        getProdutos();
        if (clienteId !== undefined) {
          await getCarrinho();
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [clienteId]);

  useEffect(() => {
    getCarrinho();
  }, [carrinhoProdutos]);

  const getCarrinho = async () => {
    if (!clienteId) {
      return;
    }

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
      console.error("Erro ao obter produtos no carrinho:", error.message);
    }
  };

  const mostrarBotaoCarrinho = carrinhoProdutos.length > 0;
  const quantidadeItensNaSacola = carrinhoProdutos.reduce(
    (total, produto) => total + produto.quantidade,
    0
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" backgroundColor="#67452C" />
      <Cabecalho />
      <Text style={styles.txtEndereco}>Endereço: R. Xavier Sobrinho</Text>

      <Carousel />

      <Text style={styles.txtMaisVendidos}>Mais Vendidos</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            marginTop: height * 0.03,
            marginBottom: height * 0.075
          }}
        >
          {produtos.slice(0,6).map((produto, index) => (
            <View key={index} style={styles.itemContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ItemSelecionado", { ...produto })
                }
                style={{
                  alignItems: "center",
                  paddingHorizontal: width * 0.13,
                  paddingVertical: height * 0.018,
                }}
              >
                <Image
                  source={{
                    uri: `http://177.93.108.196:3000${produto.imagem[0].url}`,
                  }}
                  style={styles.imgProdutos}
                />
                <Text
                  style={{
                    color: "#5A4429",
                    fontSize: width * 0.038,
                    fontWeight: "bold",
                    
                  }}
                >
                  {filterDesc(`${produto.nome}`)}
                </Text>
                <Text
                  style={{
                    color: "#5A4429",
                    fontSize: width * 0.038,
                    fontWeight: "bold",
                   
                  }}
                >
                  {produto.preco}/unid
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      {mostrarBotaoCarrinho && (
        <TouchableOpacity
          style={styles.botaoCarrinho}
          onPress={() => navigation.navigate("Carrinho")}
        >
          <Image
            source={require("../../../assets/sacola.png")}
            style={{ width: 35, height: 35 }}
          />
          {quantidadeItensNaSacola > 0 && (
            <View style={styles.notificacaoSacola}>
              <Text style={styles.textoNotificacaoSacola}>
                {quantidadeItensNaSacola}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    marginTop: height * 0.035,
    backgroundColor: "#CCBCB4",
  },
  txtEndereco: {
    marginTop: height * 0.02,
    marginLeft: width * 0.11,
    marginBottom: height * 0.015,
    color: "#5A4429",
    fontSize: width * 0.043,
    fontStyle: "normal",
    fontWeight: "bold",
  },
  txtMaisVendidos: {
    marginTop: height * 0.02,
    fontSize: width * 0.07,
    textAlign: "center",
    color: "#5A4429",
    fontStyle: "normal",
    fontWeight: "bold",
  },
  imgProdutos: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: width * 0.01,
  },
  botaoCarrinho: {
    backgroundColor: "#67452C",
    padding: 10,
    borderRadius: 9999,
    position: "absolute",
    bottom: 67,
    right: 20,
    width: 60,
    height: 60,
    alignItems: "center",
    elevation: 3,
  },
  notificacaoSacola: {
    backgroundColor: "#fff",
    borderRadius: 999,
    position: "absolute",
    top: -5,
    right: 0,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  textoNotificacaoSacola: {
    color: "#67452C",
    fontSize: 12,
    fontWeight: "bold",
  },
});
