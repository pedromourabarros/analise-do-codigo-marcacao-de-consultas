import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { 
  Card, 
  Title, 
  Paragraph, 
  Button, 
  FAB,
  IconButton 
} from 'react-native-paper';

/**
 * Tela inicial do aplicativo
 * Apresenta as funcionalidades principais e permite navegação para outras telas
 */
const HomeScreen = ({ navigation }) => {
  
  /**
   * Função para navegar para a tela de agendamento
   * É chamada quando o usuário toca no botão "Agendar Consulta"
   */
  const handleNavigateToAppointment = () => {
    navigation.navigate('Appointment');
  };

  /**
   * Função para navegar para a lista de médicos
   * Permite ao usuário ver todos os médicos disponíveis
   */
  const handleNavigateToDoctors = () => {
    navigation.navigate('DoctorList');
  };

  /**
   * Função para navegar para o perfil do usuário
   * Acesso às informações pessoais e configurações
   */
  const handleNavigateToProfile = () => {
    navigation.navigate('Profile'); // Volta para o perfil normal
  };

  return (
    // Container principal com scroll para permitir rolagem do conteúdo
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        
        {/* Cabeçalho com título principal */}
        <View style={styles.header}>
          <Title style={styles.mainTitle}>
            Marcação de Consultas Médicas
          </Title>
          <Paragraph style={styles.subtitle}>
            Agende sua consulta de forma rápida e segura
          </Paragraph>
        </View>

        {/* Card principal com botão de agendamento */}
        <Card style={styles.mainCard}>
          <Card.Content>
            <Title>Agendar Nova Consulta</Title>
            <Paragraph>
              Clique no botão abaixo para agendar sua consulta médica
            </Paragraph>
          </Card.Content>
          <Card.Actions>
            {/* Botão principal que leva ao agendamento */}
            <Button 
              mode="contained" 
              onPress={handleNavigateToAppointment}
              style={styles.primaryButton}
            >
              Agendar Consulta
            </Button>
          </Card.Actions>
        </Card>

        {/* Grid de funcionalidades rápidas */}
        <View style={styles.quickActions}>
          
          {/* Card para visualizar médicos */}
          <Card style={styles.quickCard} onPress={handleNavigateToDoctors}>
            <Card.Content style={styles.quickCardContent}>
              <IconButton
                icon="doctor"
                size={40}
                iconColor="#2196F3"
              />
              <Title style={styles.quickCardTitle}>Ver Médicos</Title>
              <Paragraph>Lista de médicos disponíveis</Paragraph>
            </Card.Content>
          </Card>

          {/* Card para acessar perfil */}
          <Card style={styles.quickCard} onPress={handleNavigateToProfile}>
            <Card.Content style={styles.quickCardContent}>
              <IconButton
                icon="account"
                size={40}
                iconColor="#4CAF50"
              />
              <Title style={styles.quickCardTitle}>Meu Perfil</Title>
              <Paragraph>Configurações e informações</Paragraph>
            </Card.Content>
          </Card>
        </View>

        {/* Espaço extra para evitar que o FAB tampe o conteúdo */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Botão flutuante de ação para agendamento rápido */}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={handleNavigateToAppointment}
        label="Agendar"
      />
    </View>
  );
};

// Estilos CSS para a tela inicial
const styles = StyleSheet.create({
  // Container principal
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  
  // Scroll view principal
  scrollView: {
    flex: 1,
  },
  
  // Conteúdo do scroll
  scrollContent: {
    padding: 16,
    paddingBottom: 100, // Espaço extra para o FAB
  },
  
  // Estilo do cabeçalho com alinhamento central
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  
  // Título principal com cor e tamanho específicos
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976D2',
    textAlign: 'center',
  },
  
  // Subtítulo com cor mais suave
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  
  // Card principal com margem e elevação
  mainCard: {
    marginBottom: 20,
    elevation: 4,
  },
  
  // Botão principal com cor e margem
  primaryButton: {
    backgroundColor: '#2196F3',
    marginTop: 8,
  },
  
  // Container para ações rápidas em grid
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  
  // Cards de ação rápida com largura específica
  quickCard: {
    width: '48%',
    elevation: 2,
  },
  
  // Conteúdo dos cards rápidos com alinhamento central
  quickCardContent: {
    alignItems: 'center',
    padding: 16,
  },
  
  // Título dos cards rápidos
  quickCardTitle: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
  },
  
  // Espaçador inferior para evitar sobreposição com FAB
  bottomSpacer: {
    height: 20,
  },
  
  // Botão flutuante de ação com posicionamento fixo
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#2196F3',
  },
});

export default HomeScreen;
