import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Dimensions,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

export default function Enderecos() {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [decodedToken, setDecodedToken] = useState(null);
  const [clienteId, setClienteId] = useState();
  const [endereco, setEndereco] = useState();
  const [novoEndereco, setNovoEndereco] = useState({
    cep: "",
    cidade: "",
    Estado: "",
    rua: "",
    numero: "",
    complemento: "",
  });

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

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          console.log("Componente sacola montado");
          await get();
          if (clienteId !== undefined) {
            await getEndereco();
          }
        } catch (error) {
          console.error("Erro ao buscar dados:", error);
        }
      };

      fetchData();

      return () => {};
    }, [clienteId])
  );

  const adicionarNovoEndereco = async () => {
    alert(JSON.stringify(novoEndereco));
    return;
    try {
      const response = await fetch("http://177.93.108.196:3000/api/endereco", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clienteId: clienteId,
          ...novoEndereco,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao adicionar novo endereço");
      }

      setIsModalVisible(false);
      await getEndereco();
    } catch (error) {
      console.error(error);
    }
  };

  const renderEnderecos = () => {
    if (!endereco || endereco.length === 0) {
      return (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          Você não possui nenhum endereço salvo.
        </Text>
      );
    }

    return endereco.map((end) => (
      <TouchableOpacity
        key={end.id}
        style={{
          backgroundColor: "#DCCCAC",
          paddingBottom: 12,
          borderBottomWidth: 1,
          borderBottomColor: "#2e2e2e59",
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", marginTop: 12, width: "45%" }}>
            <Icon
              style={{ marginLeft: 4 }}
              name="location-outline"
              size={width * 0.07}
              color="#5A4429"
            />
            <Text
              style={{ marginLeft: 3, fontWeight: "bold", color: "#5A4429" }}
            >
              {`${end.rua}, ${end.numero}\n${end.cidade}, ${end.estado}, ${end.cep}`}
            </Text>
          </View>
          <Icon
            style={{ alignSelf: "center" }}
            name="chevron-forward"
            size={width * 0.076}
            color={"#5A4429"}
          />
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    // tela onde estarão os endereços
    // a parte do header fica da linha 25 ate 31
    // parte onde fica o endereço da linha 32 ate 42
    //botão para para o modal da linha 43 ate 48
    //header do modal, da linha 52 ate 57
    //txt endereço do modal, da linha 58
    //form do modal, da linha 59 ate 67
    //parte que é pra ter um checkbox do modal, da linha 68 ate 70
    //botão salvar do modal, da linha 71 ate 75
    <View style={styles.container}>
      <View style={styles.pageSpace}>
        <TouchableOpacity onPress={() => navigation.navigate("Conta")}>
          <Icon
            style={{ paddingTop: width * 0.05, marginTop: height * 0.005 }}
            name="chevron-back"
            size={width * 0.1}
            color="#CCBCB4"
          />
        </TouchableOpacity>

        <Text style={styles.pageName}>Meus Endereços</Text>
      </View>
      <ScrollView>{renderEnderecos()}</ScrollView>
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: "#67452C",
            alignSelf: "center",
            width: "100%",
            justifyContent: "center",
          }}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.btnText}>ADICIONAR NOVO ENDEREÇO</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="light" />
      <Modal visible={isModalVisible}>
        <View style={styles.container}>
          <View style={styles.pageSpace2}>
            <TouchableOpacity
              style={{ marginTop: -height * 0.015 }}
              onPress={() => setIsModalVisible(false)}
            >
              <Icon
                style={{}}
                name="chevron-back"
                size={width * 0.1}
                color="#CCBCB4"
              />
            </TouchableOpacity>
            <Text style={styles.pageName2}>Novo Endereço</Text>
          </View>
          <Text style={styles.txtAdress}>Endereço</Text>
          <View>
            <TextInput
              style={[styles.txtInput, {}]}
              placeholder="CEP"
              value={novoEndereco.cep}
              onChangeText={(text) =>
                setNovoEndereco({ ...novoEndereco, cep: text })
              }
            />
            <TextInput
              style={[styles.txtInput, { marginTop: height * 0.006 }]}
              placeholder="Cidade"
              value={novoEndereco.cidade}
              onChangeText={(text) =>
                setNovoEndereco({ ...novoEndereco, cidade: text })
              }
            />
            <TextInput
              style={[styles.txtInput, { marginTop: height * 0.006 }]}
              placeholder="Estado"
              value={novoEndereco.Estado}
              onChangeText={(text) =>
                setNovoEndereco({ ...novoEndereco, Estado: text })
              }
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TextInput
                style={[
                  styles.txtInput,
                  { marginTop: height * 0.006, width: "68%" },
                ]}
                placeholder="Rua"
                value={novoEndereco.rua}
                onChangeText={(text) =>
                  setNovoEndereco({ ...novoEndereco, rua: text })
                }
              />
              <TextInput
                style={[
                  styles.txtInput,
                  { marginTop: height * 0.006, width: "31%" },
                ]}
                placeholder="Número"
                value={novoEndereco.numero}
                onChangeText={(text) =>
                  setNovoEndereco({ ...novoEndereco, numero: text })
                }
              />
            </View>
            <TextInput
              style={[styles.txtInput, { marginTop: height * 0.006 }]}
              placeholder="Complemento"
              value={novoEndereco.complemento}
              onChangeText={(text) =>
                setNovoEndereco({ ...novoEndereco, complemento: text })
              }
            />
          </View>
          <View
            style={{ marginTop: height * 0.045, backgroundColor: "#DCCCAC" }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#5A4429",
                fontWeight: "bold",
                marginVertical: 12,
                marginLeft: width * 0.05,
              }}
            >
              Definir endereço padrão
            </Text>
          </View>
          <View style={{ top: "45%" }}>
            <TouchableOpacity
              style={styles.btnSave}
              onPress={adicionarNovoEndereco}
            >
              <Text style={styles.txtBtnSave}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CCBCB4",
  },
  pageSpace: {
    backgroundColor: "#67452C",
    alignItems: "center",
    flexDirection: "row",
    height: height * 0.097,
    paddingHorizontal: width * 0.05,
    marginBottom: height * 0.016,
  },
  pageName: {
    color: "#CCBCB4",
    fontSize: height * 0.03,
    fontWeight: "bold",
    marginLeft: width * 0.1,
    marginTop: height * 0.025,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    letterSpacing: 0.45,
    paddingVertical: height * 0.02,
  },
  pageSpace2: {
    backgroundColor: "#67452C",
    alignItems: "center",
    flexDirection: "row",
    height: height * 0.055,
    paddingHorizontal: width * 0.05,
    marginBottom: height * 0.013,
  },
  pageName2: {
    color: "#CCBCB4",
    fontSize: height * 0.03,
    fontWeight: "bold",
    marginLeft: width * 0.1,
    marginTop: -height * 0.02,
  },
  txtAdress: {
    fontSize: width * 0.04,
    fontWeight: "bold",
    color: "#5A4429",
    marginLeft: width * 0.05,
    marginBottom: height * 0.013,
  },
  txtInput: {
    backgroundColor: "#DCCCAC",
    paddingVertical: 6,
    paddingLeft: width * 0.05,
    fontWeight: "bold",
    letterSpacing: 0.45,
    color: "#5a4429bf",
  },
  btnSave: {
    backgroundColor: "#67452C",
    alignSelf: "center",
    width: "95%",
    borderRadius: width * 0.03,
  },
  txtBtnSave: {
    color: "#fff",
    alignSelf: "center",
    paddingVertical: height * 0.02,
    fontWeight: "bold",
    fontSize: width * 0.04,
  },
});
