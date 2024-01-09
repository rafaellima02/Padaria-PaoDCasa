import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import Categorias from "./Categorias";

export default function TelaInicial() {
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

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
              <Text style={{ marginLeft: 8, fontSize: 18, fontWeight: "400" }}>
                {produto.nome}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Principal */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
      >
        {/* Categorias  */}
        <Categorias />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ECDCCC",
    paddingTop: 26,
  },
  barraPesquisa: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingBottom: 7,
  },
  containerInputPesquisa: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "gray",
  },
  inputPesquisa: {
    marginLeft: 8,
    flex: 1,
  },
  opcoesContainer: {
    margin: 14,
  },
  opcaoItem: {
    padding: 9.6,
    fontSize: 16,
    borderColor: "gray",
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
