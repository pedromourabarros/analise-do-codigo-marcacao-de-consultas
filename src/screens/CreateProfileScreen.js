import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { 
  Card, 
  Title, 
  TextInput, 
  Button, 
  Avatar,
  Divider 
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Tela para criação inicial do perfil do usuário
 * Permite ao usuário preencher suas informações pessoais pela primeira vez
 */
const CreateProfileScreen = ({ navigation }) => {
  
  // Estados para armazenar os dados do perfil
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    address: '',
    cpf: '',
    emergencyContact: ''
  });

  /**
   * Função para validar se todos os campos obrigatórios foram preenchidos
   * Retorna true se todos os campos estiverem preenchidos, false caso contrário
   */
  const validateForm = () => {
    if (!userData.name || !userData.email || !userData.phone || !userData.cpf) {
      return false;
    }
    return true;
  };

  /**
   * Função para salvar o perfil do usuário no AsyncStorage
   * Persiste os dados localmente no dispositivo
   */
  const saveUserProfile = async (profileData) => {
    try {
      await AsyncStorage.setItem('userProfile', JSON.stringify(profileData));
      return true;
    } catch (error) {
      console.log('Erro ao salvar perfil:', error);
      return false;
    }
  };

  /**
   * Função para lidar com o envio do formulário
   * Valida os dados, salva o perfil e exibe mensagem de sucesso
   */
  const handleCreateProfile = async () => {
    if (!validateForm()) {
      // Exibe alerta de erro se campos obrigatórios não estiverem preenchidos
      Alert.alert(
        'Perfil Incompleto',
        'Por favor, preencha todos os campos obrigatórios (Nome, E-mail, Telefone e CPF).',
        [{ text: 'OK' }]
      );
      return;
    }

    // Salva o perfil no AsyncStorage
    const saved = await saveUserProfile(userData);
    
    if (saved) {
      // Exibe mensagem de sucesso e volta para a tela anterior
      Alert.alert(
        'Perfil Criado com Sucesso!',
        'Seu perfil foi criado e salvo. Agora você pode usar todas as funcionalidades do aplicativo.',
        [
          {
            text: 'Continuar',
            onPress: () => navigation.goBack() // Volta para a tela anterior
          }
        ]
      );
    } else {
      Alert.alert(
        'Erro ao Salvar',
        'Não foi possível salvar seu perfil. Tente novamente.',
        [{ text: 'OK' }]
      );
    }
  };

  /**
   * Função para atualizar dados do formulário
   * Mantém os campos sincronizados com a entrada do usuário
   */
  const updateUserData = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    // Container principal com scroll para permitir rolagem
    <ScrollView style={styles.container}>
      
      {/* Cabeçalho com avatar e título */}
      <View style={styles.header}>
        <Avatar.Text size={100} label="👤" style={styles.avatar} />
        <Title style={styles.mainTitle}>Criar Meu Perfil</Title>
        <Title style={styles.subtitle}>
          Preencha suas informações para começar a usar o aplicativo
        </Title>
      </View>

      {/* Formulário principal em card */}
      <Card style={styles.formCard}>
        <Card.Content>
          
          {/* Seção de dados pessoais */}
          <Title style={styles.sectionTitle}>Dados Pessoais</Title>
          
          {/* Campo para nome completo */}
          <TextInput
            label="Nome Completo *"
            value={userData.name}
            onChangeText={(value) => updateUserData('name', value)}
            mode="outlined"
            style={styles.input}
            placeholder="Digite seu nome completo"
          />

          {/* Campo para CPF */}
          <TextInput
            label="CPF *"
            value={userData.cpf}
            onChangeText={(value) => updateUserData('cpf', value)}
            mode="outlined"
            style={styles.input}
            keyboardType="numeric"
            placeholder="000.000.000-00"
          />

          {/* Campo para e-mail */}
          <TextInput
            label="E-mail *"
            value={userData.email}
            onChangeText={(value) => updateUserData('email', value)}
            mode="outlined"
            style={styles.input}
            keyboardType="email-address"
            placeholder="seu.email@exemplo.com"
          />

          {/* Campo para telefone */}
          <TextInput
            label="Telefone *"
            value={userData.phone}
            onChangeText={(value) => updateUserData('phone', value)}
            mode="outlined"
            style={styles.input}
            keyboardType="phone-pad"
            placeholder="(11) 99999-9999"
          />

          <Divider style={styles.divider} />

          {/* Seção de informações adicionais */}
          <Title style={styles.sectionTitle}>Informações Adicionais</Title>
          
          {/* Campo para data de nascimento */}
          <TextInput
            label="Data de Nascimento"
            value={userData.birthDate}
            onChangeText={(value) => updateUserData('birthDate', value)}
            mode="outlined"
            style={styles.input}
            placeholder="DD/MM/AAAA"
          />

          {/* Campo para endereço */}
          <TextInput
            label="Endereço"
            value={userData.address}
            onChangeText={(value) => updateUserData('address', value)}
            mode="outlined"
            style={styles.input}
            multiline
            numberOfLines={2}
            placeholder="Rua, número, bairro, cidade - UF"
          />

          {/* Campo para contato de emergência */}
          <TextInput
            label="Contato de Emergência"
            value={userData.emergencyContact}
            onChangeText={(value) => updateUserData('emergencyContact', value)}
            mode="outlined"
            style={styles.input}
            placeholder="Nome e telefone de contato"
          />

        </Card.Content>
      </Card>

      {/* Botão para criar perfil */}
      <View style={styles.buttonContainer}>
        <Button 
          mode="contained" 
          onPress={handleCreateProfile}
          style={styles.createButton}
          icon="account-plus"
        >
          Criar Meu Perfil
        </Button>
      </View>

      {/* Informações sobre os campos obrigatórios */}
      <View style={styles.infoContainer}>
        <Title style={styles.infoTitle}>Campos Obrigatórios</Title>
        <Title style={styles.infoText}>* Nome, CPF, E-mail e Telefone são obrigatórios para criar seu perfil.</Title>
      </View>
    </ScrollView>
  );
};

// Estilos CSS para a tela de criação de perfil
const styles = StyleSheet.create({
  // Container principal com padding e cor de fundo
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  
  // Cabeçalho com avatar e informações básicas
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  
  // Avatar do usuário
  avatar: {
    backgroundColor: '#2196F3',
    marginBottom: 16,
  },
  
  // Título principal
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976D2',
    textAlign: 'center',
    marginBottom: 8,
  },
  
  // Subtítulo explicativo
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  
  // Card do formulário com elevação
  formCard: {
    marginBottom: 20,
    elevation: 4,
  },
  
  // Título das seções do formulário
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 12,
  },
  
  // Campos de entrada com margem inferior
  input: {
    marginBottom: 16,
  },
  
  // Divisor entre seções
  divider: {
    marginVertical: 16,
  },
  
  // Container dos botões
  buttonContainer: {
    marginBottom: 20,
  },
  
  // Botão de criar perfil com cor de fundo
  createButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
  },
  
  // Container das informações
  infoContainer: {
    backgroundColor: '#E3F2FD',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  
  // Título das informações
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 8,
  },
  
  // Texto das informações
  infoText: {
    fontSize: 14,
    color: '#1976D2',
    lineHeight: 20,
  },
});

export default CreateProfileScreen;
