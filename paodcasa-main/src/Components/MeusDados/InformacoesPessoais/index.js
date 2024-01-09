import { StatusBar } from 'expo-status-bar';
import { TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

import React, { useState } from "react";


const { width, height } = Dimensions.get("window");

export default function Infos() {



  const handleCPFChange = (formatted, extracted) =>

    
setCPF(extracted);
  


  
  const [email, setEmail] = useState("");
  const [CPF, setCPF] = useState("");
  const [senha, setSenha] = useState("");


  return (


    <View style={styles.container}>
      <View style={styles.containerMen}>
        <SafeAreaView>
          <View style={styles.cabeca}>
            <Text style={styles.cabecaTexto}>INFORMAÇÕES PESSOAIS</Text>
          </View>
        </SafeAreaView>
      </View>

      <View style={styles.pai}>


      <View style={styles.main1}>
          <TextInput
            style={styles.inputtext}
            placeholder="E-mail"
            onChangeText={(text) => setEmail(text)}
          />
        </View>




        <View style={styles.main1}>
      <TextInput
        style={styles.inputtext}
        type={'CPF'}
        value={CPF}
        onChangeText={handleCPFChange}
        placeholder="Digite o CPF"
      />
    </View>



    <View style={styles.main1}>
          <TextInput
            style={styles.inputtext}
            secureTextEntry={true}
            placeholder="Senha"
            onChangeText={(text) => setSenha(text)}
          />
        </View>


      



      </View>
      <View>
        <Text style={{alignSelf:'center', marginBottom: height * 0.08, color:'#5A4429', top:-30, fontSize: 11}}>
          Confirme se os  números de seu CPF estão 
          corretos antes de confirmar a edição.
        </Text>
      </View>


        <View>
        <TouchableOpacity style={styles.btn}>
          <View>
            <Text style={styles.btnavancar}>
              Atualizar
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCBCB4',
  },

  cabeca: {
    backgroundColor: "#CCBCB4",
    alignItems: "center",
    justifyContent: "center",


    borderBottomLeftRadius: width * 0.05,
    borderBottomRightRadius: width * 0.05,
    height: height * 0.1,
    marginBottom: height * 0.09,
  },
  cabecaTexto: {
    color: "#5A4429",
    fontSize: width * 0.04,
    fontWeight: "bold",
    top: height * 0.01,
  },

 

  pai: {
    alignItems: "flex-start",
    padding: width * 0.04,
   
    
  },

  main1: {
    width: "100%",
    borderColor: "#A07F5A",
    
  },
 


  inputtext: {
    display: "flex",
    borderRadius: 7,
    backgroundColor: "#DCCCAC",
    height: 52,
    borderColor: "#A07F5A",
    borderWidth: 1,
    paddingLeft: 8,
    elevation: 8,
    marginBottom: height * 0.030,
    
    
  },


  btn: {
    
    width: width * 0.8,
    height: 50,
    backgroundColor: "#A07F5A",
    borderRadius: 10,
    alignSelf:'center',
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