import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Title, Paragraph, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Tela de splash do aplicativo
 * Exibe logo e informações iniciais com design moderno
 */
const SplashScreen = ({ navigation }) => {
  
  // Estados para modo escuro e entrada manual
  const [darkMode, setDarkMode] = useState(false);
  const [showManualButton, setShowManualButton] = useState(false);
  
  // Efeito para carregar configurações e mostrar botão manual após 2 segundos
  useEffect(() => {
    loadDarkModePreference();
    
    // Mostra botão manual após 2 segundos
    const buttonTimer = setTimeout(() => {
      setShowManualButton(true);
    }, 2000);

    // Navegação automática após 5 segundos
    const autoNavTimer = setTimeout(() => {
      if (!showManualButton) {
        navigation.replace('Home');
      }
    }, 5000);

    return () => {
      clearTimeout(buttonTimer);
      clearTimeout(autoNavTimer);
    };
  }, [navigation, showManualButton]);

  /**
   * Função para carregar preferência de modo escuro
   * Busca configuração salva no AsyncStorage
   */
  const loadDarkModePreference = async () => {
    try {
      const savedDarkMode = await AsyncStorage.getItem('darkMode');
      if (savedDarkMode !== null) {
        setDarkMode(JSON.parse(savedDarkMode));
      }
    } catch (error) {
      console.log('Erro ao carregar modo escuro:', error);
    }
  };

  /**
   * Função para entrar no aplicativo manualmente
   * Navega para a tela inicial
   */
  const handleEnterApp = () => {
    navigation.replace('Home');
  };

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      {/* Gradiente de fundo simulado */}
      <View style={[styles.gradientBackground, darkMode && styles.darkGradientBackground]} />
      
      {/* Conteúdo central */}
      <View style={styles.content}>
        {/* Logo do aplicativo */}
        <View style={styles.logoContainer}>
          <View style={[styles.logoCircle, darkMode && styles.darkLogoCircle]}>
            <Title style={styles.logoText}>🏥</Title>
          </View>
        </View>
        
        {/* Título principal */}
        <Title style={[styles.mainTitle, darkMode && styles.darkMainTitle]}>
          Marcação de Consultas
        </Title>
        
        {/* Subtítulo */}
        <Paragraph style={[styles.subtitle, darkMode && styles.darkSubtitle]}>
          Agende sua consulta médica de forma rápida e segura
        </Paragraph>
        
        {/* Informações adicionais */}
        <View style={styles.infoContainer}>
          <Paragraph style={[styles.infoText, darkMode && styles.darkInfoText]}>
            ✓ Fácil de usar
          </Paragraph>
          <Paragraph style={[styles.infoText, darkMode && styles.darkInfoText]}>
            ✓ Agendamento rápido
          </Paragraph>
          <Paragraph style={[styles.infoText, darkMode && styles.darkInfoText]}>
            ✓ Médicos qualificados
          </Paragraph>
        </View>

        {/* Botão para entrar no app manualmente */}
        {showManualButton && (
          <View style={styles.buttonContainer}>
            <Button 
              mode="contained" 
              onPress={handleEnterApp}
              style={[styles.enterButton, darkMode && styles.darkEnterButton]}
              labelStyle={styles.enterButtonLabel}
              icon="arrow-right"
            >
              Marque sua consulta
            </Button>
          </View>
        )}
      </View>
      
      {/* Indicador de carregamento */}
      <View style={styles.loadingContainer}>
        <View style={[styles.loadingDot, darkMode && styles.darkLoadingDot]} />
        <View style={[styles.loadingDot, darkMode && styles.darkLoadingDot]} />
        <View style={[styles.loadingDot, darkMode && styles.darkLoadingDot]} />
      </View>
    </View>
  );
};

// Obter dimensões da tela
const { width, height } = Dimensions.get('window');

// Estilos CSS para a tela de splash
const styles = StyleSheet.create({
  // Container principal
  container: {
    flex: 1,
    backgroundColor: '#1976D2',
  },
  
  // Container modo escuro
  darkContainer: {
    backgroundColor: '#0D47A1',
  },
  
  // Gradiente de fundo simulado
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#1976D2',
    opacity: 0.9,
  },
  
  // Gradiente modo escuro
  darkGradientBackground: {
    backgroundColor: '#0D47A1',
    opacity: 0.95,
  },
  
  // Conteúdo central
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  
  // Container do logo
  logoContainer: {
    marginBottom: 32,
  },
  
  // Círculo do logo
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  
  // Logo modo escuro
  darkLogoCircle: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  
  // Texto do logo (emoji)
  logoText: {
    fontSize: 60,
  },
  
  // Título principal
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  
  // Título modo escuro
  darkMainTitle: {
    color: '#E3F2FD',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
  },
  
  // Subtítulo
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  
  // Subtítulo modo escuro
  darkSubtitle: {
    color: 'rgba(227, 242, 253, 0.9)',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
  },
  
  // Container das informações
  infoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  
  // Texto das informações
  infoText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  
  // Texto modo escuro
  darkInfoText: {
    color: 'rgba(227, 242, 253, 0.8)',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
  },
  
  // Container do botão
  buttonContainer: {
    marginBottom: 32,
    width: '100%',
  },
  
  // Botão de entrar no app
  enterButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  
  // Botão modo escuro
  darkEnterButton: {
    backgroundColor: '#66BB6A',
    elevation: 8,
  },
  
  // Texto do botão
  enterButtonLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  
  // Container do indicador de carregamento
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 60,
  },
  
  // Pontos de carregamento
  loadingDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    marginHorizontal: 6,
  },
  
  // Pontos modo escuro
  darkLoadingDot: {
    backgroundColor: 'rgba(227, 242, 253, 0.6)',
  },
});

export default SplashScreen;
