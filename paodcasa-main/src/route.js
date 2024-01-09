import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import Busca from "./pages/Busca";
import Historico from "./pages/Historico";
import { Ionicons } from "@expo/vector-icons";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import ProdutosPorCategoria from "./Components/Categorias/buscaCategorias";
import Cadastro from "./Components/login_regi/cadastro";
import Login from "./Components/login_regi/login";
import Detail from "./pages/Detail/Detail";
import Cart from "./Components/Sacola/Cart";
import ConfirmOrder from "./Components/Confirmacao/ConfirmOrder";
import Enderecos from "./Components/Enderecos/Enderecos";
import Cartao from "./Components/Cartao/Cartao";
import Infos from "./Components/MeusDados/InformacoesPessoais";
import Credenciais from "./Components/MeusDados/Credenciais";
import Publicidade from "./Components/MeusDados/Publicidade";
import MeusDados from "./Components/MeusDados";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      //Tira o texto que aparecer em cima
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#dae4e9",
        tabBarInactiveTintColor: "white",
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#67452C",
          height: 50,
          paddingTop: 4,
          alignItems: "center",
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
        },
        tabBarLabelStyle: {
          color: "white",
          fontWeight: "500",
          paddingBottom: 4,
          fontSize: 12,
          paddingTop: 0,
          marginTop: 0,
        },
        tabBarIconStyle: {
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        },
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={Home}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return <Ionicons name="home-sharp" size={size} color={color} />;
            }
            return <Ionicons name="home-outline" size={size} color={color} />;
          },
        }}
      />

      <Tab.Screen
        name="Busca"
        component={Busca}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return <Ionicons name="search" size={size} color={color} />;
            }
            return <Ionicons name="search-outline" size={size} color={color} />;
          },
        }}
      />

      <Tab.Screen
        name="Pedidos"
        component={Historico}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return <Ionicons name="clipboard" size={size} color={color} />;
            }
            return (
              <Ionicons name="clipboard-outline" size={size} color={color} />
            );
          },
        }}
      />

      <Tab.Screen
        name="Conta"
        component={Perfil}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return <Ionicons name="person" size={size} color={color} />;
            }
            return <Ionicons name="person-outline" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="BottomTabNavigator"
        screenOptions={{ headerShown: false }}
      >
        {/* Barra inferior */}
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
        />
        {/* Tela Cadastro como rota independente */}
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="ProdutosPorCategoria"
          component={ProdutosPorCategoria}
        />
        <Stack.Screen name="ItemSelecionado" component={Detail} />
        <Stack.Screen name="Carrinho" component={Cart} />
        <Stack.Screen name="Confirmação" component={ConfirmOrder} />
        <Stack.Screen name="Endereco" component={Enderecos} />
        <Stack.Screen name="Carton" component={Cartao} />
        <Stack.Screen name="Infos" component={Infos} />
        <Stack.Screen name="Credenciais" component={Credenciais} />
        <Stack.Screen name="Publicidade" component={Publicidade} />
        <Stack.Screen name="MeusDados" component={MeusDados} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
