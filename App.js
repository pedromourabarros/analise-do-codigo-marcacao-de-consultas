import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

// Importação dos componentes de tela
import SplashScreen from './src/screens/SplashScreen';
import CreateProfileScreen from './src/screens/CreateProfileScreen';
import HomeScreen from './src/screens/HomeScreen';
import AppointmentScreen from './src/screens/AppointmentScreen';
import DoctorListScreen from './src/screens/DoctorListScreen';
import ProfileScreen from './src/screens/ProfileScreen';

// Criação do navegador de pilha para gerenciar as transições entre telas
const Stack = createStackNavigator();

/**
 * Componente principal do aplicativo
 * Responsável por configurar o provedor de tema, navegação e estrutura geral
 */
export default function App() {
  return (
    // Provedor do React Native Paper para componentes de UI material design
    <PaperProvider>
      {/* Container principal de navegação que gerencia o estado de navegação */}
      <NavigationContainer>
        {/* Barra de status personalizada */}
        <StatusBar style="light" />
        
        {/* Navegador de pilha que define as telas disponíveis */}
        <Stack.Navigator 
          initialRouteName="Splash"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#2196F3', // Cor azul para o cabeçalho
            },
            headerTintColor: '#fff', // Cor branca para o texto do cabeçalho
            headerTitleStyle: {
              fontWeight: 'bold', // Texto do cabeçalho em negrito
            },
          }}
        >
          {/* Tela de splash inicial */}
          <Stack.Screen 
            name="Splash" 
            component={SplashScreen} 
            options={{ headerShown: false }}
          />
          
          {/* Tela para criar perfil (primeira vez) */}
          <Stack.Screen 
            name="CreateProfile" 
            component={CreateProfileScreen} 
            options={{ 
              title: 'Criar Perfil',
              headerLeft: null, // Remove botão de voltar
              gestureEnabled: false // Desabilita gesto de voltar
            }}
          />
          
          {/* Tela inicial do aplicativo */}
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'Início' }}
          />
          
          {/* Tela para agendar consultas */}
          <Stack.Screen 
            name="Appointment" 
            component={AppointmentScreen} 
            options={{ title: 'Agendar Consulta' }}
          />
          
          {/* Tela para listar médicos disponíveis */}
          <Stack.Screen 
            name="DoctorList" 
            component={DoctorListScreen} 
            options={{ title: 'Médicos Disponíveis' }}
          />
          
          {/* Tela de perfil do usuário */}
          <Stack.Screen 
            name="Profile" 
            component={ProfileScreen} 
            options={{ title: 'Meu Perfil' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
