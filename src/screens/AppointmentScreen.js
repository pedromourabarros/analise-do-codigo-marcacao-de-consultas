import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, Platform } from 'react-native';
import { 
  Card, 
  Title, 
  TextInput, 
  Button, 
  Text,
  Divider,
  Chip,
  List 
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

/**
 * Tela de agendamento de consultas médicas
 * Permite ao usuário preencher formulário com dados da consulta
 */
const AppointmentScreen = ({ navigation }) => {
  
  // Estados para armazenar os dados do formulário
  const [patientName, setPatientName] = useState(''); // Nome do paciente
  const [patientAge, setPatientAge] = useState(''); // Idade do paciente
  const [phoneNumber, setPhoneNumber] = useState(''); // Número de telefone
  const [selectedSpecialty, setSelectedSpecialty] = useState(''); // Especialidade selecionada
  const [selectedDate, setSelectedDate] = useState(new Date()); // Data selecionada
  const [showDatePicker, setShowDatePicker] = useState(false); // Controla exibição do seletor de data
  const [symptoms, setSymptoms] = useState(''); // Sintomas descritos

  // Lista de especialidades médicas disponíveis
  const specialties = [
    'Clínico Geral',
    'Cardiologia',
    'Dermatologia',
    'Ginecologia',
    'Ortopedia',
    'Pediatria',
    'Psiquiatria',
    'Neurologia'
  ];

  /**
   * Função para lidar com a mudança de data
   * Atualiza a data selecionada e esconde o seletor
   */
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setSelectedDate(selectedDate);
    }
  };

  /**
   * Função para mostrar o seletor de data
   * Ativa a exibição do DateTimePicker
   */
  const showDateSelector = () => {
    setShowDatePicker(true);
  };

  /**
   * Função para formatar a data para exibição
   * Converte a data para formato brasileiro
   */
  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR');
  };

  /**
   * Função para validar se todos os campos obrigatórios foram preenchidos
   * Retorna true se todos os campos estiverem preenchidos, false caso contrário
   */
  const validateForm = () => {
    if (!patientName || !patientAge || !phoneNumber || !selectedSpecialty) {
      return false;
    }
    return true;
  };

  /**
   * Função para lidar com o envio do formulário
   * Valida os dados e exibe mensagem de sucesso ou erro
   */
  const handleSubmit = () => {
    if (!validateForm()) {
      // Exibe alerta de erro se campos obrigatórios não estiverem preenchidos
      Alert.alert(
        'Erro no Formulário',
        'Por favor, preencha todos os campos obrigatórios.',
        [{ text: 'OK' }]
      );
      return;
    }

    // Exibe mensagem de sucesso e navega de volta para a tela inicial
    Alert.alert(
      'Consulta Agendada!',
      `Sua consulta foi agendada com sucesso para ${formatDate(selectedDate)}. Você receberá uma confirmação por SMS.`,
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home')
        }
      ]
    );
  };

  return (
    // Container principal com scroll para permitir rolagem do formulário
    <ScrollView style={styles.container}>
      
      {/* Cabeçalho da tela */}
      <View style={styles.header}>
        <Title style={styles.title}>Agendar Consulta Médica</Title>
        <Text style={styles.subtitle}>
          Preencha os dados abaixo para agendar sua consulta
        </Text>
      </View>

      {/* Formulário principal em card */}
      <Card style={styles.formCard}>
        <Card.Content>
          
          {/* Seção de dados pessoais */}
          <Title style={styles.sectionTitle}>Dados Pessoais</Title>
          
          {/* Campo para nome do paciente */}
          <TextInput
            label="Nome Completo *"
            value={patientName}
            onChangeText={setPatientName}
            mode="outlined"
            style={styles.input}
            placeholder="Digite seu nome completo"
          />

          {/* Campo para idade do paciente */}
          <TextInput
            label="Idade *"
            value={patientAge}
            onChangeText={setPatientAge}
            mode="outlined"
            style={styles.input}
            keyboardType="numeric"
            placeholder="Digite sua idade"
          />

          {/* Campo para número de telefone */}
          <TextInput
            label="Telefone *"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            mode="outlined"
            style={styles.input}
            keyboardType="phone-pad"
            placeholder="(11) 99999-9999"
          />

          <Divider style={styles.divider} />

          {/* Seção de dados da consulta */}
          <Title style={styles.sectionTitle}>Dados da Consulta</Title>
          
          {/* Campo para especialidade com chips */}
          <Text style={styles.fieldLabel}>Especialidade *</Text>
          <View style={styles.chipContainer}>
            {specialties.map((specialty) => (
              <Chip
                key={specialty}
                selected={selectedSpecialty === specialty}
                onPress={() => setSelectedSpecialty(specialty)}
                style={[
                  styles.specialtyChip,
                  selectedSpecialty === specialty && styles.selectedChip
                ]}
                textStyle={[
                  styles.chipText,
                  selectedSpecialty === specialty && styles.selectedChipText
                ]}
              >
                {specialty}
              </Chip>
            ))}
          </View>

          {/* Campo para data da consulta com seletor */}
          <Text style={styles.fieldLabel}>Data da Consulta *</Text>
          <List.Item
            title={formatDate(selectedDate)}
            description="Toque para selecionar uma data"
            left={(props) => <List.Icon {...props} icon="calendar" />}
            onPress={showDateSelector}
            style={styles.dateSelector}
          />

          {/* Seletor de data nativo */}
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
              minimumDate={new Date()}
              style={styles.datePicker}
            />
          )}

          {/* Campo para descrição dos sintomas */}
          <TextInput
            label="Sintomas (opcional)"
            value={symptoms}
            onChangeText={setSymptoms}
            mode="outlined"
            style={styles.input}
            multiline
            numberOfLines={3}
            placeholder="Descreva seus sintomas..."
          />

        </Card.Content>
      </Card>

      {/* Botão para enviar formulário */}
      <View style={styles.buttonContainer}>
        <Button 
          mode="contained" 
          onPress={handleSubmit}
          style={styles.submitButton}
        >
          Agendar Consulta
        </Button>
      </View>
    </ScrollView>
  );
};

// Estilos CSS para a tela de agendamento
const styles = StyleSheet.create({
  // Container principal com padding e cor de fundo
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  
  // Cabeçalho com alinhamento central
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  
  // Título principal
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1976D2',
    textAlign: 'center',
  },
  
  // Subtítulo explicativo
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
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
  
  // Rótulo dos campos
  fieldLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  
  // Campos de entrada com margem inferior
  input: {
    marginBottom: 16,
  },
  
  // Divisor entre seções
  divider: {
    marginVertical: 16,
  },
  
  // Container dos chips de especialidade
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  
  // Chips de especialidade
  specialtyChip: {
    margin: 4,
    backgroundColor: '#f0f0f0',
  },
  
  // Chip selecionado
  selectedChip: {
    backgroundColor: '#2196F3',
  },
  
  // Texto dos chips
  chipText: {
    color: '#333',
  },
  
  // Texto do chip selecionado
  selectedChipText: {
    color: 'white',
  },
  
  // Seletor de data
  dateSelector: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 16,
  },
  
  // Seletor de data nativo
  datePicker: {
    marginBottom: 16,
  },
  
  // Container dos botões
  buttonContainer: {
    marginBottom: 20,
  },
  
  // Botão de enviar com cor de fundo
  submitButton: {
    backgroundColor: '#2196F3',
  },
});

export default AppointmentScreen;
