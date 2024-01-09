import * as Icon from "react-native-feather";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const ProdutosPorCategoria = ({ route }) => {
  const { categoriaId } = route?.params;
  const [produtos, setProdutos] = useState([]);
  const [nomeCategoria, setNomeCategoria] = useState("");

  const [pesquisa, setPesquisa] = useState("");
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);
  const [opcoesFiltradas, setOpcoesFiltradas] = useState([]);
  const navigation = useNavigation();

  const handlePesquisa = async (text) => {
    setPesquisa(text);
    try {
      const response = await fetch(
        `http://177.93.108.196:3000/api/produto/${text}`
      );
      if (!response.ok) {
        throw new Error("Erro na solicitação GET");
      }
      const produtos = await response.json();
      setOpcoesFiltradas(produtos);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  useEffect(() => {
    fetch(`http://177.93.108.196:3000/api/categoria/${categoriaId}`)
      .then((response) => response.json())
      .then((data) => setNomeCategoria(data.nome))
      .catch((error) =>
        console.error("Erro na busca de nome da categoria:", error)
      );

    fetch(`http://177.93.108.196:3000/api/produto/categoria/${categoriaId}`)
      .then((response) => response.json())
      .then((data) => setProdutos(data))
      .catch((error) => console.error("Erro na busca de produtos:", error));
  }, [categoriaId]);

  const renderItem = ({ item }) => (
    <View style={styles.produtoItem}>
      <TouchableOpacity
        onPress={() => navigation.navigate("ItemSelecionado", { ...item })}
        style={{ alignItems: "center" }}
      >
        <View style={styles.itemContainer}>
          <Image
            source={{ uri: `http://177.93.108.196:3000${item?.imagem[0].url}` }}
            style={styles.imgProdutos}
          />
          <View
            style={{ display: "flex", flexDirection: "column", marginLeft: 4 }}
          >
            <Text
              style={{
                color: "#5A4429",
                fontSize: 17,
                fontWeight: "bold",
                marginTop: 8,
                marginBottom: 8,
              }}
            >
              {item.nome}
            </Text>
            <Text
              style={{ color: "#5A4429", fontSize: 12, fontWeight: "bold" }}
            >
              {item.preco}/unid
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: "600" }}>
        {`Categoria ${nomeCategoria}`}{" "}
      </Text>

      <View style={{ marginTop: 30 }}>
        {/* Barra de pesquisa */}
        <View style={styles.barraPesquisa}>
          <View style={styles.containerInputPesquisa}>
            <Icon.Search height={25} width={25} stroke="gray" />
            <TextInput
              placeholder="Pesquisar produtos"
              style={styles.inputPesquisa}
              keyboardType="default"
              value={pesquisa}
              onChangeText={handlePesquisa}
              onFocus={() => setMostrarOpcoes(true)}
              onBlur={() => setMostrarOpcoes(false)}
            />
          </View>
        </View>

        {/* Lista de opções filtradas */}
        {mostrarOpcoes && (
          <View style={styles.opcoesContainer}>
            {opcoesFiltradas.map((produto, index) => (
              <TouchableOpacity
                key={index}
                style={styles.opcaoItem}
                onPress={() => {
                  navigation.navigate("ItemSelecionado", { ...produto });
                }}
              >
                <Image
                  style={{ width: 55, height: 45, borderRadius: 6 }}
                  source={{
                    uri: `http://177.93.108.196:3000${produto.imagem[0].url}`,
                  }}
                />
                <Text
                  style={{ marginLeft: 8, fontSize: 18, fontWeight: "400" }}
                >
                  {produto.nome}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={{ marginTop: 75 }}>
          <Text
            style={{
              borderBottomWidth: 2,
              borderBottomColor: "gray",
              marginBottom: 21,
              paddingBottom: 16,
              fontSize: 18,
              fontWeight: "500",
            }}
          >
            Produtos relacionados
          </Text>
          <FlatList
            data={produtos}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.listaProdutos}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: "#ECDCCC",
    paddingTop: 12,
  },
  listaProdutos: {
    justifyContent: "space-between",
  },
  produtoItem: {
    flex: 1,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    margin: 10,
    backgroundColor: "#fffafa",
  },
  imgProdutos: {
    width: "100%",
    height: 105,
    borderRadius: 7,
  },
  itemContainer: {
    backgroundColor: "#fffafa",
    height: 180,
    width: "100%",
    borderRadius: 8,
  },

  //  tudo de barra pesquisa
  barraPesquisa: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  containerInputPesquisa: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "gray",
  },
  inputPesquisa: {
    marginLeft: 8,
    flex: 1,
  },
  opcoesContainer: {
    margin: 2,
  },
  opcaoItem: {
    padding: 8,
    fontSize: 14,
    borderColor: "gray",
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ProdutosPorCategoria;
