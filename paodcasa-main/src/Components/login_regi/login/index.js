import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { View, Image, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  StatusBar;

  const [emailTelefone, setEmailTelefone] = useState("");
  const [senha, setSenha] = useState("");

  const navigation = useNavigation();

  const Entrar = async () => {
    try {
      const response = await fetch(
        "http://177.93.108.196:3000/api/cliente/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailTelefone,
            senha: senha,
          }),
        }
      );

      const responseData = await response.json();

      if (response.ok && responseData.token) {
        await AsyncStorage.setItem("userToken", responseData.token);

        navigation.navigate("BottomTabNavigator", { screen: "Conta" });
      } else {
        console.log("Credenciais inválidas");
        alert("Credenciais inválidas. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro durante o login:", error);
      alert("Erro durante o login. Tente novamente.");
    }
  };

  function voltar() {
    navigation.navigate("BottomTabNavigator", { screen: "Conta" });
  }

  return (
    <View style={styles.container}>
      <View style={styles.divpai}>
        <TouchableOpacity style={styles.divfilha} onPress={voltar}>
          <View>
            <Icon name="chevron-back" size={35} color="#A07F5A" />
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
        <Text style={styles.txt}> LOGIN</Text>
      </View>

      <View>
        <Text style={styles.inputtxt}>E-mail ou Telefone</Text>
      </View>

      <View style={styles.main1}>
        <TextInput
          style={styles.credenciais}
          value={emailTelefone}
          onChangeText={(text) => setEmailTelefone(text)}
        />
      </View>

      <View>
        <Text style={styles.inputsenha}>Senha</Text>
      </View>

      <View style={styles.main1}>
        <TextInput
          style={styles.credenciais}
          secureTextEntry={true} // Para ocultar a senha
          value={senha}
          onChangeText={(text) => setSenha(text)}
        />
      </View>

      <View>
        <TouchableOpacity style={styles.btn} onPress={Entrar}>
          <View>
            <Text style={styles.btnentrar}>Entrar</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.txtlogin}>- Faça login também como -</Text>
      </View>

      <View style={styles.outroslogin}>
        <TouchableOpacity style={styles.login1}>
          <View>
            <Image
              style={styles.gmail}
              source={require("../../../../assets/icon-gmail.png")}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.login2}>
          <View>
            <Image
              style={styles.face}
              source={require("../../../../assets/icon-face.png")}
            />
          </View>
        </TouchableOpacity>
      </View>

      <View>
        <View style={styles.regis}>
          <View>
            <Text style={styles.txtregis}>Não tem conta ?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
              <Text style={styles.registrar}>Registre-se</Text>
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
    alignItems: "center",
    justifycontent: "center",
    backgroundColor: "#CCBCB4",
  },

  logo: {
    width: 100,
    height: 100,
    marginBottom: 50,
  },

  credenciais: {
    display: "flex",
    borderRadius: 7,
    backgroundColor: "#DCCCAC",
    height: 40,
    borderColor: "#A07F5A",
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    elevation: 8
  },

  main1: {
    width: "87%",
  },

  inputtxt: {
    marginBottom: 5,
    marginRight: 183,
  },

  txt: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#5A4429",
    //marginRight: 105,
    marginBottom: 20,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },

  inputsenha: {
    marginBottom: 5,
    marginRight: 265,
  },

  outroslogin: {
    flexDirection: "row",
    marginBottom: 35,
  },

  login1: {
    display: "flex",
    alignItems: "center",
    borderRadius: 7,
    backgroundColor: "#DCCCAC",
    height: 50,
    width: 150,
    elevation: 8
  },

  login2: {
    marginLeft: 50,
    display: "flex",
    alignItems: "center",
    borderRadius: 7,
    backgroundColor: "#DCCCAC",
    height: 50,
    width: 150,
    elevation: 8
  },

  face: {
    width: 40,
    height: 40,
    alignItems: "center",
    top: 5,
  },

  gmail: {
    width: 40,
    height: 40,
    alignItems: "center",
    top: 5,
  },

  btn: {
    marginBottom: 50,
    marginTop: 20,
    width: 270,
    height: 50,
    backgroundColor: "#A07F5A",
    borderRadius: 10,
    alignItems: "center",
    elevation: 8
  },

  btnentrar: {
    display: "flex",
    textAlign: "center",
    top: 10,
    color: "white",
    fontSize: 20,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },

  txtlogin: {
    marginBottom: 30,
    color: "#5A4429",
    fontSize: 15,
  },

  regis: {
    flexDirection: "row",
    marginTop: 0,
  },

  txtregis: {
    color: "#5A4429",
    fontSize: 15,
  },

  registrar: {
    color: "#5A4429",
    fontSize: 15,
    marginLeft: 15,
    fontWeight: "bold",
  },

  divfilha: {
    top: 50,
    display: "flex",
    marginRight: 310,
    marginBottom: 90,
    width: "16%",
  },
});
