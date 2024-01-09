import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";
import { CheckBox } from "react-native-elements";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function ConfirmarPagamento({ pagamentoSelecionado }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const escondeModal = () => {
    setModalVisible(false);
  };

  const handlePagamentoSelecao = (metodoPagamento) => {
    pagamentoSelecionado(metodoPagamento);
    setSelectedPayment(metodoPagamento);
    escondeModal();
  };

  const mostrarModal = () => {
    setModalVisible(true);
  };

  const buttonText = selectedPayment
    ? ` Alterar a forma de pagamento? (${selectedPayment})`
    : "+ Selecione a forma de pagamento";

  const renderOption = (opcao) => {
    const isChecked = selectedPayment === opcao;

    return (
      <TouchableOpacity
        key={opcao}
        onPress={() => handlePagamentoSelecao(opcao)}
      >
        <View style={styles.optionContainer}>
          <CheckBox checked={isChecked} />
          <Text style={styles.modalOption}>{opcao}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <TouchableOpacity onPress={mostrarModal}>
        <Text style={styles.txtFormPay}>{buttonText}</Text>
      </TouchableOpacity>

      <Modal
        isVisible={modalVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Selecione a forma de pagamento</Text>
          {renderOption("Dinheiro")}
          {renderOption("Pix")}
          {renderOption("Cartão de Crédito")}
          {renderOption("Cartão de Débito")}
          <TouchableOpacity onPress={escondeModal}>
            <Text style={styles.modalCancel}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  txtFormPay: {
    color: "#5A4429",
    fontSize: windowWidth * 0.04,
    fontWeight: "bold",
    marginTop: windowHeight * 0.01,
    marginLeft: windowWidth * 0.05,
    marginBottom: windowHeight * 0.01,
  },
  modalContainer: {
    backgroundColor: "#DCCCAC",
    padding: windowWidth * 0.05,
    borderRadius: windowWidth * 0.02,
  },
  modalTitle: {
    fontSize: windowWidth * 0.05,
    fontWeight: "bold",
    marginBottom: windowHeight * 0.02,
  },
  modalOption: {
    fontSize: windowWidth * 0.04,
    color: "#5A4429",
    marginBottom: windowHeight * 0.01,
  },
  modalCancel: {
    fontSize: windowWidth * 0.04,
    color: "#FF0000",
    marginTop: windowHeight * 0.02,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
