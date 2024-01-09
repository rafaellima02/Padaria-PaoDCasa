import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

function FaleConosco() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  const enviar = () => {
    // Lógica para enviar a mensagem, por exemplo, usando uma API ou enviar um email.
  };

  return (
    <View>
      <Text>Nome:</Text>
      <TextInput onChangeText={(text) => setNome(text)} value={nome} />
      <Text>Email:</Text>
      <TextInput onChangeText={(text) => setEmail(text)} value={email} />
      <Text>Mensagem:</Text>
      <TextInput
        onChangeText={(text) => setMensagem(text)}
        value={mensagem}
        multiline
      />
      <Button title="Enviar" onPress={enviarMensagem} />
    </View>
  );
}

export default FaleConosco;
