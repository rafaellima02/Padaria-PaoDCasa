import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Modal,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function Cartao() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();
  return (
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
        <Text style={styles.pageName}>Meus Cartões</Text>
      </View>
      <ScrollView>
        <TouchableOpacity style={styles.spaceCard}>
          <View style={{ marginVertical: 17, flexDirection: "row" }}>
            <Image
              source={require("../../../assets/visa-logo.png")}
              style={{
                marginLeft: width * 0.007,
                width: width * 0.092,
                height: height * 0.025,
              }}
            />
            <Text
              style={{
                color: "#5A4429",
                marginLeft: 3,
                fontWeight: "bold",
                fontSize: width * 0.037,
              }}
            >
              NEON PAGAMENTOS
            </Text>
          </View>
          <Text
            style={{
              color: "#5A4429",
              marginLeft: "27%",
              fontWeight: "bold",
              fontSize: width * 0.037,
              marginVertical: 17,
            }}
          >
            {" "}
            *6485
          </Text>
          <Icon
            style={{ alignSelf: "center" }}
            name="chevron-forward"
            size={30}
            color="#5A4429"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.spaceAddCard}
          onPress={() => setIsModalVisible(true)}
        >
          <View style={{ flexDirection: "row" }}>
            <Icon
              style={{ marginLeft: width * 0.02, alignSelf: "center" }}
              name="add-circle-outline"
              size={25}
              color={"#5A4429"}
            />
            <Text
              style={{
                marginLeft: 3,
                marginVertical: 7,
                color: "#5A4429",
                fontWeight: "bold",
                fontSize: width * 0.036,
              }}
            >
              Adicionar Cartão de Crédito/{`\n`}Débito
            </Text>
          </View>
          <Icon
            style={{ alignSelf: "center" }}
            name="chevron-forward"
            size={30}
            color="#5A4429"
          />
        </TouchableOpacity>
      </ScrollView>

      <StatusBar style="auto" />

      <Modal visible={isModalVisible}>
        <View style={styles.container}>
          <View style={{ backgroundColor: "#67452C", flexDirection: "row" }}>
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Icon
                style={{
                  paddingHorizontal: width * 0.05,
                  marginTop: height * -0.008,
                  marginBottom: height * 0.01,
                }}
                name="chevron-back"
                size={width * 0.1}
                color="#CCBCB4"
              />
            </TouchableOpacity>
            <Text style={styles.pageName2}>Adicionar Cartão</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Icon
              style={{ marginLeft: width * 0.015, marginTop: height * 0.017 }}
              name="shield-checkmark-outline"
              size={35}
              color={"#5A4429"}
            />
            <View
              style={{
                width: "90%",
                marginLeft: width * 0.03,
                marginTop: height * 0.015,
              }}
            >
              <Text
                style={{
                  fontSize: width * 0.039,
                  fontWeight: "bold",
                  color: "#5A4429",
                }}
              >
                As informações do seu cartão de crédito estão protegidas
              </Text>
              <Text style={styles.txtSecurity}>
                Estabelecemos parcerias com plataformas para garantir que os
                detalhes do seu cartões sejam bem protegidos. Nós não teremos
                acesso as informações do seu cartão.{" "}
              </Text>
            </View>
          </View>
          <ScrollView>
            <View
              style={{ backgroundColor: "#DCCCAC", marginTop: height * 0.015 }}
            >
              <Text style={styles.txtSpaceForm}>Informações do cartão</Text>
              <TextInput
                style={[
                  styles.txtInput,
                  { marginTop: height * 0.025, width: "95%" },
                ]}
              >
                Número do cartão
              </TextInput>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <TextInput style={[styles.txtInput, { width: "75%" }]}>
                  Número do Validade(MM/AA)
                </TextInput>
                <TextInput
                  style={[styles.txtInput, { marginLeft: 4, width: "19%" }]}
                >
                  CVV
                </TextInput>
              </View>
              <TextInput
                style={[
                  styles.txtInput,
                  { width: "95%", marginBottom: height * 0.02 },
                ]}
              >
                Nome no Cartão
              </TextInput>
            </View>
          </ScrollView>
          <View
            style={{
              backgroundColor: "#b48c5c73",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          >
            <Text style={{ color: "#b48c5c73" }}>.</Text>
            <View
              style={{
                backgroundColor: "#DCCCAC",
                alignItems: "center",
                marginTop: -13,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            >
              <TouchableOpacity
                style={styles.btnSalvar}
                onPress={() => alert("Salvo com sucesso!")}
              >
                <Text
                  style={{
                    color: "#fff",
                    marginVertical: 12,
                    fontSize: width * 0.043,
                    fontWeight: "bold",
                  }}
                >
                  Salvar
                </Text>
              </TouchableOpacity>
            </View>
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
    marginLeft: width * 0.15,
    marginTop: height * 0.025,
  },
  spaceCard: {
    backgroundColor: "#DCCCAC",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#2e2e2e59",
  },
  spaceAddCard: {
    backgroundColor: "#DCCCAC",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#2e2e2e59",
  },
  pageName2: {
    color: "#CCBCB4",
    fontSize: height * 0.03,
    fontWeight: "bold",
    marginLeft: width * 0.08,
    marginTop: height * -0.004,
  },
  txtSecurity: {
    width: "94%",
    fontSize: width * 0.033,
    fontWeight: "normal",
    color: "#5A4429",
    marginTop: height * 0.003,
  },
  txtSpaceForm: {
    color: "#5A4429",
    marginTop: height * 0.015,
    marginLeft: width * 0.0375,
    fontSize: width * 0.042,
    fontWeight: "bold",
  },
  txtInput: {
    color: "#5a4429bf",
    borderWidth: 2,
    borderColor: "#5a442980",
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 8,
    paddingLeft: 15,
  },
  btnSalvar: {
    backgroundColor: "#67452C",
    marginVertical: 12,
    width: "90%",
    alignItems: "center",
    borderRadius: width * 0.016,
  },
});
