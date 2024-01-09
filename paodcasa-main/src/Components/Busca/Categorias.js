import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Categorias() {
  const navigation = useNavigation();
  const [ativarCategoria, setAtivarCategoria] = useState(null);
  const [categorias, setCategorias] = useState();

  async function getCategorias() {
    await fetch("http://177.93.108.196:3000/api/categoria")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na solicitação GET");
        }
        return response.json();
      })
      .then((data) => {
        setCategorias(data);
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  }

  useEffect(() => {
    getCategorias();
  }, []);

  const handleCategoriaPress = (categoria) => {
    setAtivarCategoria(categoria.id);

    navigation.navigate("ProdutosPorCategoria", { categoriaId: categoria.id });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ overflow: "visible" }}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      >
        {categorias?.map((categoria, index) => {
          let taAtivo = categoria.id === ativarCategoria;
          let btnClass = taAtivo ? styles.btn : styles.btn2;
          let textClass = taAtivo ? styles.texto : styles.texto2;

          return (
            <View
              key={index}
              style={{
                display: "flex",
                marginRight: 24,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => handleCategoriaPress(categoria)}
                style={{
                  margin: 6,
                  borderRadius: 18,
                  backgroundColor: "#E5E7EB",
                  shadowColor: "black",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,
                  elevation: 2,
                  ...btnClass,
                }}
              >
                <Image
                  style={{ width: 42, height: 42 }}
                  source={{
                    uri: `http://177.93.108.196:3000${categoria.imagem[0].url}`,
                  }}
                  resizeMode="contain"
                  borderRadius={16}
                  backgroundColor={"#E5E7EB"}
                />
              </TouchableOpacity>
              <Text style={{ fontSize: 14, lineHeight: 20, ...textClass }}>
                {categoria.nome}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
    backgroundColor: "#ECDCCC",
  },
  btn: {
    backgroundColor: "#6B7280",
  },
  btn2: {
    backgroundColor: "#E5E7EB",
  },
  texto: {
    fontWeight: "600",
    color: "#1F2937",
  },
  texto2: {
    color: "#6B7280",
  },
});
