import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { 
  Card, 
  Title, 
  TextInput, 
  Button, 
  Avatar,
  List,
  Switch,
  Divider 
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Tela de perfil do usuário
 * Permite visualizar e editar informações pessoais e configurações
 */
const ProfileScreen = ({ navigation }) => {
  
  // Estados para gerenciar os dados do perfil
  const [isEditing, setIsEditing] = useState(false); // Controla se está em modo de edição
  const [hasProfile, setHasProfile] = useState(false); // Controla se o usuário já tem perfil
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    address: '',
    cpf: '',
    emergencyContact: ''
  }); // Dados do usuário

  // Estados para configurações do aplicativo
  const [notifications, setNotifications] = useState(true); // Notificações ativadas
  const [darkMode, setDarkMode] = useState(false); // Modo escuro desativado

  // Estados temporários para edição
  const [tempUserData, setTempUserData] = useState({ ...userData });

  // Efeito para carregar dados do perfil e configurações ao abrir a tela
  useEffect(() => {
    loadUserProfile();
    loadAppSettings();
  }, []);

  /**
   * Função para carregar o perfil do usuário do AsyncStorage
   * Verifica se já existe um perfil salvo
   */
  const loadUserProfile = async () => {
    try {
      const savedProfile = await AsyncStorage.getItem('userProfile');
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        setUserData(profile);
        setTempUserData(profile);
        setHasProfile(true);
      } else {
        setHasProfile(false);
      }
    } catch (error) {
      console.log('Erro ao carregar perfil:', error);
      setHasProfile(false);
    }
  };

  /**
   * Função para carregar configurações do aplicativo
   * Busca preferências salvas no AsyncStorage
   */
  const loadAppSettings = async () => {
    try {
      const savedNotifications = await AsyncStorage.getItem('notifications');
      const savedDarkMode = await AsyncStorage.getItem('darkMode');
      
      if (savedNotifications !== null) {
        setNotifications(JSON.parse(savedNotifications));
      }
      
      if (savedDarkMode !== null) {
        setDarkMode(JSON.parse(savedDarkMode));
      }
    } catch (error) {
      console.log('Erro ao carregar configurações:', error);
    }
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
   * Função para salvar configurações do aplicativo
   * Persiste preferências no AsyncStorage
   */
  const saveAppSettings = async (setting, value) => {
    try {
      await AsyncStorage.setItem(setting, JSON.stringify(value));
      return true;
    } catch (error) {
      console.log(`Erro ao salvar ${setting}:`, error);
      return false;
    }
  };

  /**
   * Função para ativar o modo de edição
   * Copia os dados atuais para campos temporários
   */
  const handleEditProfile = () => {
    setTempUserData({ ...userData });
    setIsEditing(true);
  };

  /**
   * Função para salvar as alterações do perfil
   * Valida os dados e atualiza o estado principal
   */
  const handleSaveProfile = async () => {
    // Validação básica dos campos obrigatórios
    if (!tempUserData.name || !tempUserData.email || !tempUserData.phone || !tempUserData.cpf) {
      Alert.alert(
        'Erro na Validação',
        'Por favor, preencha todos os campos obrigatórios (Nome, E-mail, Telefone e CPF).',
        [{ text: 'OK' }]
      );
      return;
    }

    // Salva o perfil no AsyncStorage
    const saved = await saveUserProfile(tempUserData);
    
    if (saved) {
      // Atualiza os dados do usuário
      setUserData({ ...tempUserData });
      setIsEditing(false);
      setHasProfile(true);
      
      // Exibe mensagem de sucesso
      Alert.alert(
        'Perfil Atualizado',
        'Suas informações foram salvas com sucesso!',
        [{ text: 'OK' }]
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
   * Função para cancelar a edição
   * Descarta as alterações e volta ao modo de visualização
   */
  const handleCancelEdit = () => {
    setTempUserData({ ...userData });
    setIsEditing(false);
  };

  /**
   * Função para atualizar dados temporários durante edição
   * Mantém os campos sincronizados com a entrada do usuário
   */
  const updateTempData = (field, value) => {
    setTempUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  /**
   * Função para criar perfil pela primeira vez
   * Navega para a tela de criação de perfil
   */
  const handleCreateProfile = () => {
    navigation.navigate('CreateProfile');
  };

  /**
   * Função para lidar com mudança de notificações
   * Salva a preferência no AsyncStorage
   */
  const handleNotificationsChange = async (value) => {
    setNotifications(value);
    await saveAppSettings('notifications', value);
  };

  /**
   * Função para lidar com mudança de modo escuro
   * Salva a preferência no AsyncStorage
   */
  const handleDarkModeChange = async (value) => {
    setDarkMode(value);
    await saveAppSettings('darkMode', value);
  };

  // Se não tem perfil, mostra opção de criar
  if (!hasProfile && !isEditing) {
    return (
      <View style={[styles.container, darkMode && styles.darkContainer]}>
        <View style={styles.noProfileContainer}>
          <Avatar.Text size={100} label="👤" style={styles.avatar} />
          <Title style={[styles.mainTitle, darkMode && styles.darkMainTitle]}>
            Nenhum Perfil Encontrado
          </Title>
          <Title style={[styles.subtitle, darkMode && styles.darkSubtitle]}>
            Para usar todas as funcionalidades do aplicativo, você precisa criar seu perfil primeiro.
          </Title>
          
          <Button 
            mode="contained" 
            onPress={handleCreateProfile}
            style={styles.createButton}
            icon="account-plus"
          >
            Criar Meu Perfil
          </Button>
        </View>
      </View>
    );
  }

  return (
    // Container principal com scroll para permitir rolagem
    <ScrollView style={[styles.container, darkMode && styles.darkContainer]}>
      
      {/* Cabeçalho do perfil com avatar e informações básicas */}
      <View style={styles.header}>
        <Avatar.Text size={80} label="JS" style={styles.avatar} />
        <Title style={[styles.userName, darkMode && styles.darkUserName]}>
          {userData.name || 'Usuário'}
        </Title>
        
        {/* Botão de edição do perfil */}
        {!isEditing && (
          <Button 
            mode="outlined" 
            onPress={handleEditProfile}
            style={[styles.editButton, darkMode && styles.darkEditButton]}
          >
            Editar Perfil
          </Button>
        )}
      </View>

      {/* Card com informações pessoais */}
      <Card style={[styles.infoCard, darkMode && styles.darkInfoCard]}>
        <Card.Content>
          <Title style={[styles.cardTitle, darkMode && styles.darkCardTitle]}>
            Informações Pessoais
          </Title>
          
          {isEditing ? (
            // Campos de edição
            <View>
              <TextInput
                label="Nome Completo *"
                value={tempUserData.name}
                onChangeText={(value) => updateTempData('name', value)}
                mode="outlined"
                style={styles.input}
                theme={darkMode ? { colors: { primary: '#90CAF9' } } : undefined}
              />
              
              <TextInput
                label="CPF *"
                value={tempUserData.cpf}
                onChangeText={(value) => updateTempData('cpf', value)}
                mode="outlined"
                style={styles.input}
                keyboardType="numeric"
                theme={darkMode ? { colors: { primary: '#90CAF9' } } : undefined}
              />
              
              <TextInput
                label="E-mail *"
                value={tempUserData.email}
                onChangeText={(value) => updateTempData('email', value)}
                mode="outlined"
                style={styles.input}
                keyboardType="email-address"
                theme={darkMode ? { colors: { primary: '#90CAF9' } } : undefined}
              />
              
              <TextInput
                label="Telefone *"
                value={tempUserData.phone}
                onChangeText={(value) => updateTempData('phone', value)}
                mode="outlined"
                style={styles.input}
                keyboardType="phone-pad"
                theme={darkMode ? { colors: { primary: '#90CAF9' } } : undefined}
              />
              
              <TextInput
                label="Data de Nascimento"
                value={tempUserData.birthDate}
                onChangeText={(value) => updateTempData('birthDate', value)}
                mode="outlined"
                style={styles.input}
                placeholder="DD/MM/AAAA"
                theme={darkMode ? { colors: { primary: '#90CAF9' } } : undefined}
              />
              
              <TextInput
                label="Endereço"
                value={tempUserData.address}
                onChangeText={(value) => updateTempData('address', value)}
                mode="outlined"
                style={styles.input}
                multiline
                numberOfLines={2}
                theme={darkMode ? { colors: { primary: '#90CAF9' } } : undefined}
              />

              <TextInput
                label="Contato de Emergência"
                value={tempUserData.emergencyContact}
                onChangeText={(value) => updateTempData('emergencyContact', value)}
                mode="outlined"
                style={styles.input}
                placeholder="Nome e telefone de contato"
                theme={darkMode ? { colors: { primary: '#90CAF9' } } : undefined}
              />
            </View>
          ) : (
            // Visualização das informações
            <View>
              <List.Item
                title="Nome"
                description={userData.name || 'Não informado'}
                left={(props) => <List.Icon {...props} icon="account" />}
                titleStyle={darkMode ? styles.darkListTitle : undefined}
                descriptionStyle={darkMode ? styles.darkListDescription : undefined}
              />
              <List.Item
                title="CPF"
                description={userData.cpf || 'Não informado'}
                left={(props) => <List.Icon {...props} icon="card-account-details" />}
                titleStyle={darkMode ? styles.darkListTitle : undefined}
                descriptionStyle={darkMode ? styles.darkListDescription : undefined}
              />
              <List.Item
                title="E-mail"
                description={userData.email || 'Não informado'}
                left={(props) => <List.Icon {...props} icon="email" />}
                titleStyle={darkMode ? styles.darkListTitle : undefined}
                descriptionStyle={darkMode ? styles.darkListDescription : undefined}
              />
              <List.Item
                title="Telefone"
                description={userData.phone || 'Não informado'}
                left={(props) => <List.Icon {...props} icon="phone" />}
                titleStyle={darkMode ? styles.darkListTitle : undefined}
                descriptionStyle={darkMode ? styles.darkListDescription : undefined}
              />
              <List.Item
                title="Data de Nascimento"
                description={userData.birthDate || 'Não informada'}
                left={(props) => <List.Icon {...props} icon="calendar" />}
                titleStyle={darkMode ? styles.darkListTitle : undefined}
                descriptionStyle={darkMode ? styles.darkListDescription : undefined}
              />
              <List.Item
                title="Endereço"
                description={userData.address || 'Não informado'}
                left={(props) => <List.Icon {...props} icon="map-marker" />}
                titleStyle={darkMode ? styles.darkListTitle : undefined}
                descriptionStyle={darkMode ? styles.darkListDescription : undefined}
              />
              <List.Item
                title="Contato de Emergência"
                description={userData.emergencyContact || 'Não informado'}
                left={(props) => <List.Icon {...props} icon="phone-alert" />}
                titleStyle={darkMode ? styles.darkListTitle : undefined}
                descriptionStyle={darkMode ? styles.darkListDescription : undefined}
              />
            </View>
          )}
        </Card.Content>
      </Card>

      {/* Botões de ação durante edição */}
      {isEditing && (
        <View style={styles.editActions}>
          <Button 
            mode="outlined" 
            onPress={handleCancelEdit}
            style={[styles.actionButton, styles.cancelButton, darkMode && styles.darkCancelButton]}
          >
            Cancelar
          </Button>
          <Button 
            mode="contained" 
            onPress={handleSaveProfile}
            style={[styles.actionButton, styles.saveButton]}
          >
            Salvar
          </Button>
        </View>
      )}

      {/* Card com configurações do aplicativo */}
      <Card style={[styles.settingsCard, darkMode && styles.darkSettingsCard]}>
        <Card.Content>
          <Title style={[styles.cardTitle, darkMode && styles.darkCardTitle]}>
            Configurações do App
          </Title>
          
          {/* Switch para notificações */}
          <List.Item
            title="Notificações"
            description="Receber lembretes de consultas"
            left={(props) => <List.Icon {...props} icon="bell" />}
            right={() => (
              <Switch
                value={notifications}
                onValueChange={handleNotificationsChange}
                color="#2196F3"
              />
            )}
            titleStyle={darkMode ? styles.darkListTitle : undefined}
            descriptionStyle={darkMode ? styles.darkListDescription : undefined}
          />
          
          <Divider style={darkMode ? styles.darkDivider : undefined} />
          
          {/* Switch para modo escuro */}
          <List.Item
            title="Modo Escuro"
            description="Tema escuro para o aplicativo"
            left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
            right={() => (
              <Switch
                value={darkMode}
                onValueChange={handleDarkModeChange}
                color="#90CAF9"
              />
            )}
            titleStyle={darkMode ? styles.darkListTitle : undefined}
            descriptionStyle={darkMode ? styles.darkListDescription : undefined}
          />
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

// Estilos CSS para a tela de perfil
const styles = StyleSheet.create({
  // Container principal com padding e cor de fundo
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  
  // Container modo escuro
  darkContainer: {
    backgroundColor: '#121212',
  },
  
  // Container quando não há perfil
  noProfileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
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
  
  // Nome do usuário
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976D2',
    textAlign: 'center',
    marginBottom: 16,
  },
  
  // Nome modo escuro
  darkUserName: {
    color: '#90CAF9',
  },
  
  // Título principal quando não há perfil
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976D2',
    textAlign: 'center',
    marginBottom: 16,
  },
  
  // Título modo escuro
  darkMainTitle: {
    color: '#90CAF9',
  },
  
  // Subtítulo quando não há perfil
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  
  // Subtítulo modo escuro
  darkSubtitle: {
    color: '#B0BEC5',
  },
  
  // Botão de criar perfil
  createButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  
  // Botão de edição
  editButton: {
    borderColor: '#2196F3',
    borderWidth: 2,
  },
  
  // Botão de edição modo escuro
  darkEditButton: {
    borderColor: '#90CAF9',
  },
  
  // Cards de informação
  infoCard: {
    marginBottom: 16,
    elevation: 4,
  },
  
  // Card modo escuro
  darkInfoCard: {
    backgroundColor: '#1E1E1E',
    elevation: 8,
  },
  
  // Título dos cards
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  
  // Título modo escuro
  darkCardTitle: {
    color: '#E0E0E0',
  },
  
  // Campos de entrada durante edição
  input: {
    marginBottom: 16,
  },
  
  // Container dos botões de ação durante edição
  editActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  
  // Botões de ação
  actionButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  
  // Botão de cancelar
  cancelButton: {
    borderColor: '#666',
  },
  
  // Botão de cancelar modo escuro
  darkCancelButton: {
    borderColor: '#B0BEC5',
  },
  
  // Botão de salvar
  saveButton: {
    backgroundColor: '#2196F3',
  },
  
  // Card de configurações
  settingsCard: {
    marginBottom: 20,
    elevation: 4,
  },
  
  // Card de configurações modo escuro
  darkSettingsCard: {
    backgroundColor: '#1E1E1E',
    elevation: 8,
  },
  
  // Títulos das listas modo escuro
  darkListTitle: {
    color: '#E0E0E0',
  },
  
  // Descrições das listas modo escuro
  darkListDescription: {
    color: '#B0BEC5',
  },
  
  // Divisor modo escuro
  darkDivider: {
    backgroundColor: '#424242',
  },
});

export default ProfileScreen;
