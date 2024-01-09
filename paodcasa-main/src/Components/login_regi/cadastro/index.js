import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";


const { width, height } = Dimensions.get("window");

export default function Cadastro() {
  let statusbar = StatusBar.currentHeight;

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [passo, setPasso] = useState(1);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (passo === 1 && email.trim() !== "") {
      setPasso(2);
    } else if (passo === 2 && senha.trim() !== "") {
      try {
        const response = await fetch(
          "http://177.93.108.196:3000/api/cliente/criar",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, senha }),
          }
        );

        if (response.ok) {
          alert("Cadastro concluído com sucesso, faça login!");
          navigation.navigate("Login");
        } else {
          const data = await response.json();
          alert(`Erro ao cadastrar: ${data.error}`);
        }
      } catch (error) {
        console.error("Erro ao cadastrar:", error);
        alert("Erro ao cadastrar. Tente novamente.");
      }
    } else {
      alert("Por favor, preencha os campos corretamente.");
    }
  };

  function voltar() {
    if (passo === 2) {
      setPasso(1);
    } else {
      navigation.navigate("Login");
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity style={styles.divfilha} onPress={voltar}>
          <View>
            <Icon name="chevron-back" size={45} color="#A07F5A" />
          </View>
        </TouchableOpacity>
      </View>

      <View>
        <Image
          source={require("../../../../assets/padaria.png")}
          style={styles.logo}
        />
      </View>

      <View>
        <View>
          <Text style={styles.texto}>
            {passo === 1
              ? "Utilize um email válido"
              : "Utilize uma senha válida"}
          </Text>
        </View>
      </View>

      {passo === 1 && (
        <View style={styles.main1}>
          <TextInput
            style={styles.inputtext}
            placeholder="E-mail"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>
      )}

      {passo === 2 && (
        <View style={styles.main1}>
          <TextInput
            style={styles.inputtext}
            secureTextEntry={true}
            placeholder="Senha"
            onChangeText={(text) => setSenha(text)}
            value={senha}
          />
        </View>
      )}

      <View>
        <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
          <View>
            <Text style={styles.btnavancar}>
              {passo === 1 ? "Avançar" : "Cadastrar"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{top: height * 0.1}}>
        <Text style={styles.txt}>
          O PãoD'casa poderá enviar quaisquer comunicações neste e-mail, pra
          cancelar a inscrição basta acessar `Configurações`.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifycontent: "center",
    backgroundColor: "#CCBCB4",
  },

  divfilha: {
    top: 50,
    display: "flex",
    marginRight: 330,
    marginBottom: 90,
    width: "16%",
  },

  logo: {
    width: 120,
    height: 120,
    marginBottom: 50,
  },

  texto: {
    fontSize: 17,
    color: "#fff",
    marginRight: width * 0.40,
    marginBottom: 15,
    textAlign: "center",
  },

  txt: {
    fontSize: 13,
    color: "white",
    //marginRight: 105,
    marginBottom: 20,
    textAlign: "center",
  },

  inputtext: {
    display: "flex",
    borderRadius: 7,
    backgroundColor: "#DCCCAC",
    height: 52,
    borderColor: "#A07F5A",
    borderWidth: 1,
    marginBottom: 110,
    paddingLeft: 8,
    elevation: 8,
  },

  main1: {
    width: "87%",
    borderColor: "#A07F5A",
  },

  btn: {
    marginBottom: 120,
    width: 270,
    height: 50,
    backgroundColor: "#A07F5A",
    borderRadius: 10,
    alignItems: "center",
    elevation: 8,
  },

  btnavancar: {
    display: "flex",
    textAlign: "center",
    top: 10,
    color: "white",
    fontSize: 20,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
});
