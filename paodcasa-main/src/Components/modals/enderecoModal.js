import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Modal from "react-native-modal";

export default function AdicionarEnderecoModal({
  isVisible,
  onClose,
  AddAddress,
}) {
  const [endereco, setEndereco] = useState({
    rua: "",
    cidade: "",
    estado: "",
    cep: "",
  });

  const handleAddEndereco = () => {
    AddAddress(endereco);
    onClose();
  };

  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Adicionar Endereço</Text>
        <TextInput
          style={styles.input}
          placeholder="Rua"
          onChangeText={(text) => setEndereco({ ...endereco, rua: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Cidade"
          onChangeText={(text) => setEndereco({ ...endereco, cidade: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Estado"
          onChangeText={(text) => setEndereco({ ...endereco, estado: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="CEP"
          onChangeText={(text) => setEndereco({ ...endereco, cep: text })}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 8,
          }}
        >
          <TouchableOpacity style={styles.botaoCan} onPress={onClose}>
            <Text style={styles.modalCancel}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoAdd} onPress={handleAddEndereco}>
            <Text style={styles.modalOption}>Adicionar Endereço</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#CCBCB4",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#ECDEBC",
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  modalOption: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },
  modalCancel: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },
  botaoCan: {
    backgroundColor: "#804707",
    padding: 6,
    borderRadius: 6,
    alignItems: "center",
  },
  botaoAdd: {
    backgroundColor: "#67452C",
    padding: 8,
    borderRadius: 6,
  },
});
