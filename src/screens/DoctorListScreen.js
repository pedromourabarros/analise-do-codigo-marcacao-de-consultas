import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { 
  Card, 
  Title, 
  Paragraph, 
  Button, 
  Chip 
} from 'react-native-paper';

/**
 * Tela de lista de médicos disponíveis
 * Permite visualizar todos os médicos e filtrar por especialidade
 */
const DoctorListScreen = ({ navigation }) => {
  
  // Lista de médicos disponíveis
  const doctors = [
    {
      id: '1',
      name: 'Dr. João Silva',
      specialty: 'Clínico Geral',
      experience: '15 anos',
      rating: '4.8',
      description: 'Médico clínico geral com vasta experiência em atendimento primário.'
    },
    {
      id: '2',
      name: 'Dra. Maria Santos',
      specialty: 'Cardiologia',
      experience: '12 anos',
      rating: '4.9',
      description: 'Cardiologista especializada em prevenção e tratamento de doenças cardíacas.'
    },
    {
      id: '3',
      name: 'Dr. Carlos Oliveira',
      specialty: 'Dermatologia',
      experience: '18 anos',
      rating: '4.7',
      description: 'Dermatologista com expertise em cirurgia dermatológica e estética.'
    }
  ];

  /**
   * Função para navegar para a tela de agendamento
   * Passa os dados do médico selecionado
   */
  const handleBookAppointment = (doctor) => {
    navigation.navigate('Appointment');
  };

  return (
    <View style={styles.container}>
      {/* Lista de médicos */}
      <ScrollView style={styles.scrollView}>
        {doctors.map((doctor) => (
          <Card key={doctor.id} style={styles.doctorCard}>
            <Card.Content>
              <Title style={styles.doctorName}>{doctor.name}</Title>
              <Chip style={styles.specialtyChip}>{doctor.specialty}</Chip>
              <Paragraph style={styles.experience}>
                Experiência: {doctor.experience} | Avaliação: ⭐ {doctor.rating}
              </Paragraph>
              <Paragraph style={styles.description}>{doctor.description}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button 
                mode="contained" 
                onPress={() => handleBookAppointment(doctor)}
                style={styles.bookButton}
              >
                Agendar Consulta
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    padding: 16,
  },
  doctorCard: {
    marginBottom: 16,
    elevation: 4,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  specialtyChip: {
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  experience: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  bookButton: {
    backgroundColor: '#2196F3',
  },
});

export default DoctorListScreen;
