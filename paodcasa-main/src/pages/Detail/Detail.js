import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { Alert, TouchableOpacity, Dimensions } from "react-native";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import Counter from "../../Components/Counter";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

export default function Detail() {
  const { params } = useRoute();
  let produto = params;

  const navigation = useNavigation();

  const [produtos, setProdutos] = useState([]);

  const [count, setCount] = useState(1);

  const [totalPrice, setTotalPrice] = useState(
    produto.preco ? produto.preco * count : 0
  );

  function filterDesc(desc){
    if(desc.length < 15){
      return desc;
    }
    return `${desc.substring(0,12)}...`
  }

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

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          console.log("Componente item selecionado montado");
          await get();
        } catch (error) {
          console.error("Erro ao buscar dados:", error);
        }
      };

      fetchData();
      return () => {};
    }, [])
  );

  function getProduto() {
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

  useEffect(() => {
    getProduto();
  }, []);

  const AdicionarCarrinho = async () => {
    if (!clienteId) {
      return Alert.alert("Entre em uma conta para adicionar itens à sacola.");
    }

    try {
      const response = await fetch(
        `http://177.93.108.196:3000/api/carrinho/cliente/${clienteId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            produtoId: produto.id,
            quantidade: count,
            preco: totalPrice.toFixed(2),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao adicionar produto à sacola");
      }

      alert("Produto adicionado à sacola com sucesso!");
      navigation.navigate("Carrinho");
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  function handleNavigateToInicio() {
    // Navegar para a rota BottomTabNavigator
    navigation.navigate("BottomTabNavigator", { screen: "Inicio" });
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" backgroundColor="transparent" />

      <View style={{ position: "relative" }}>
        <Image
          source={{ uri: `http://177.93.108.196:3000${produto.imagem[0].url}` }}
          style={styles.imgProduto}
        />
        <TouchableOpacity
          onPress={handleNavigateToInicio}
          style={styles.btnBack}
        >
          <Image
            source={require("../../../assets/arrow-left.png")}
            style={{ width: width * 0.06, height: width * 0.06 }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.nameSpace}>
        <Text style={styles.nameProduto}> {produto.nome}</Text>
        <Text style={[styles.nameProdutoPrice, { paddingRight: width * 0.05 }]}>
          {" "}
          R$ {produto.preco}/Unid
        </Text>
      </View>

      <View style={styles.descricaoSpace}>
        <Text
          style={{
            fontSize: width * 0.06,
            fontWeight: "bold",
            color: "#5A4429",
            paddingTop: height * 0.01,
          }}
        >
          Descrição
        </Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ height: "8.5%" }}
        >
          <Text
            style={{
              marginTop: height * 0.01,
              fontWeight: "bold",
              color: "#5A4429",
              fontSize: width * 0.035,
            }}
          >
            {produto.descricao}
          </Text>
        </ScrollView>
      </View>

      <View
        style={{
          marginTop: height * 0.02,
          alignItems: "center",
          marginBottom: height * 0.015,
          paddingHorizontal: width * 0.05,
        }}
      >
        <Text
          style={{
            fontSize: width * 0.06,
            fontWeight: "bold",
            color: "#5A4429",
          }}
        >
          Mais Itens
        </Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: "row", marginTop: height * 0.02 }}>
            {produtos.slice(6,12).map((produto, index) => (
              <View key={index} style={styles.itemContainer}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ItemSelecionado", { ...produto })
                  }
                  style={{
                    alignItems: "center",
                    paddingHorizontal: width * 0.02,
                    marginBottom: height * 0.009,
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
                      fontSize: width * 0.033,
                      fontWeight: "bold",
                    }}
                  >
                    {filterDesc(`${produto.nome}`)}
                  </Text>
                  <Text
                    style={{
                      color: "#5A4429",
                      fontSize: width * 0.032,
                      fontWeight: "bold",
                    }}
                  >
                    {produto.preco}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <View
        style={{
          backgroundColor: "#b48c5c73",
          borderTopLeftRadius: width * 0.07,
          borderTopRightRadius: width * 0.065,
          height: "100%",
        }}
      >
        <Text style={{ color: "#CCBCB4" }}>.</Text>
        <View
          style={{
            marginTop: -height * 0.018,
            backgroundColor: "#DCCCAC",
            borderTopLeftRadius: width * 0.08,
            borderTopRightRadius: width * 0.08,
            elevation: 1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: 8,
              marginTop: 20,
              paddingLeft: 8,
              borderBottomColor: "#848484",
              borderBottomWidth: 1,
            }}
          >
            <Text
              style={{
                color: "#5A4429",
                fontSize: 18,
                fontWeight: "bold",
                letterSpacing: 0.45,
              }}
            >
              Quantidade
            </Text>
            <Counter
              count={count}
              setCount={setCount}
              setTotalPrice={setTotalPrice}
              produto={produto}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: height * 0.009,
              marginTop: 9,
              paddingLeft: 8,
            }}
          >
            <Text
              style={{
                color: "#5A4429",
                fontSize: 18,
                fontWeight: "bold",
                letterSpacing: 0.45,
              }}
            >
              Total
            </Text>
            <Text
              style={{
                color: "#5A4429",
                fontSize: 18,
                paddingRight: 20,
                fontWeight: "bold",
              }}
            >
              {totalPrice.toFixed(2)}
            </Text>
          </View>
          <View
            style={{
              paddingBottom: "100%",
              width: "100%",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={async () => {
                try {
                  await AdicionarCarrinho();
                } catch (error) {
                  console.error("Erro ao adicionar produto à sacola:", error);
                  Alert.alert(
                    "Entre em uma conta para adicionar itens à sacola."
                  );
                }
              }}
              style={{
                backgroundColor: "#67452C",
                width: "90%",
                height: height * 0.063,
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "center",
                borderRadius: 25,
              }}
            >
              <Text
                style={{
                  paddingTop: 12,
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Adicionar a sacola
              </Text>
              <Image
                source={require("../../../assets/sacola.png")}
                style={{ width: 20, height: 20, marginTop: 12, marginLeft: 6 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CCBCB4",
  },
  imgProduto: {
    width: "100%",
    height: height * 0.4,
  },
  btnBack: {
    position: "absolute",
    marginTop: height * 0.07,
    marginLeft: width * 0.04,
    backgroundColor: "#CCBCB4",
    padding: width * 0.02,
    borderRadius: 9999,
    elevation: 3,
  },
  nameSpace: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: height * 0.02,
    marginTop: -height * 0.05,
    backgroundColor: "#CCBCB4",
    borderBottomColor: "#848484",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.02,
  },
  nameProduto: {
    fontSize: width * 0.055,
    paddingLeft: width * 0.05,
    paddingBottom: height * 0.015,
    lineHeight: height * 0.05,
    fontWeight: "bold",
    color: "#5A4429",
  },
  nameProdutoPrice: {
    fontSize: width * 0.045,
    paddingLeft: width * 0.05,
    paddingTop: height * 0.005,
    lineHeight: height * 0.04,
    fontWeight: "bold",
    color: "#5A4429",
  },
  descricaoSpace: {
    marginTop: height * 0.005,
    paddingHorizontal: width * 0.05,
  },
  imgProdutos: {
    width: width * 0.16,
    height: width * 0.16,
    borderRadius: width * 0.01,
  },
});
