import { StatusBar } from 'expo-status-bar';
import { TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

import React, { useState } from "react";


const { width, height } = Dimensions.get("window");

export default function Credenciais() {


  
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
 


  return (


    <View style={styles.container}>
      <View style={styles.containerMen}>
        <SafeAreaView>
          <View style={styles.cabeca}>
            <Text style={styles.cabecaTexto}>Credenciais</Text>
          </View>
        </SafeAreaView>
      </View>

      <View>



    <View>
      <Text style={{fontSize:14, marginHorizontal: width * 0.05, color:'#5A4429', alignSelf:'center'}}>
        Veja aqui suas informações 
      </Text>
      <Text style={{fontSize:14, marginHorizontal: width * 0.05, marginBottom: height * 0.06, color:'#5A4429', alignSelf:'center'}}>
         de acesso à conta.
      </Text>
    </View>



    <View>
      <Text style={{fontSize:20, marginHorizontal: width * 0.05, marginBottom: height * 0.04, color:'#5A4429'}}>
        Email
      </Text>

      <TouchableOpacity>
      <View style={styles.pai}>
              <View style={styles.filha1}>
                <Text style={styles.info}>Testando@teste.com</Text>
                
              </View>
              <View style={styles.filha2}>
                <Text style={styles.subinfo}>confirmado:</Text>
                <Text style={styles.subinfo}>data</Text>
              </View>
            </View>
      </TouchableOpacity>
    </View>
    <View>
      <Text style={{fontSize:20, marginHorizontal: width * 0.05, marginBottom: height * 0.04, color:'#5A4429'}}>
        Telefone
      </Text>

      <TouchableOpacity>
      <View style={styles.pai}>
              <View style={styles.filha1}>
                <Text style={styles.info}>+55 (81) 9 8996-2531 </Text>
                <View style={styles.next}>
                  <Icon name="chevron-forward" size={width * 0.05} color="#5A4429" />
                </View>
              </View>
              <View style={styles.filha2}>
                <Text style={styles.subinfo}>confirmado:</Text>
                <Text style={styles.subinfo}>data</Text>
              </View>
            </View>
      </TouchableOpacity>
    </View>


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
    marginBottom: height * 0.05,
  },
  cabecaTexto: {
    color: "#5A4429",
    fontSize: width * 0.05,
    fontWeight: "bold",
    top: height * 0.01,
  },

 

  pai: {
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "#DCCCAC",
    padding: width * 0.04,
    borderRadius: width * 0.01,
    width: "100%",
    marginBottom: height * 0.09,
    
  },

  filha1: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },

  filha2: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },

  info: {
    color: "#5A4429",
    fontSize: width * 0.04,
    fontWeight: "bold",
    width: '95%'
  },
  subinfo: {
    color: "#5A4429",
    fontSize: width * 0.03,
  },

  next: {
    flexDirection:'column',
    top: height * 0.01,
  },
});