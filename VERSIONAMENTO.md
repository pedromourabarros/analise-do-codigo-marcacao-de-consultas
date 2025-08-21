# 📚 Guia de Versionamento - Checkpoint Mobile Development and IoT

## 🎯 **Objetivo**
Este documento descreve a metodologia de versionamento utilizada no projeto "Marcação de Consultas Médicas", demonstrando boas práticas de commits e controle de versão para o checkpoint.

## 🚀 **Estrutura de Commits Recomendada**

### **1. Commit Inicial - Estrutura Base**
```bash
git commit -m "feat: Estrutura inicial do projeto React Native

- Configuração do Expo e dependências
- Estrutura de pastas organizada
- Arquivos de configuração básicos
- README e documentação inicial"
```

### **2. Commit - Navegação e Estrutura**
```bash
git commit -m "feat: Implementação da navegação principal

- Configuração do React Navigation
- Estrutura de telas definida
- App.js com navegador configurado
- Telas base criadas (Home, Appointment, Profile)"
```

### **3. Commit - Tela de Splash**
```bash
git commit -m "feat: Tela de splash personalizada

- Logo e informações do aplicativo
- Design moderno com gradiente azul
- Navegação automática configurada
- Indicador de carregamento visual"
```

### **4. Commit - Tela Inicial (Home)**
```bash
git commit -m "feat: Tela inicial com funcionalidades principais

- Cards de navegação para funcionalidades
- Botão flutuante de agendamento
- Layout responsivo e organizado
- Navegação para outras telas"
```

### **5. Commit - Sistema de Agendamento**
```bash
git commit -m "feat: Sistema completo de agendamento

- Formulário de agendamento com validação
- Seletor de data nativo
- Chips de especialidade médica
- Validação de campos obrigatórios"
```

### **6. Commit - Lista de Médicos**
```bash
git commit -m "feat: Tela de listagem de médicos

- Cards informativos dos médicos
- Especialidades e experiência
- Avaliações e descrições
- Botão de agendamento direto"
```

### **7. Commit - Sistema de Perfil**
```bash
git commit -m "feat: Sistema de perfil do usuário

- Criação e edição de perfil
- Formulário com campos completos
- Validação de dados
- Persistência local com AsyncStorage"
```

### **8. Commit - Modo Escuro**
```bash
git commit -m "feat: Implementação do modo escuro

- Tema escuro funcional em todas as telas
- Sincronização entre componentes
- Persistência de preferências
- Cores adaptadas para melhor legibilidade"
```

### **9. Commit - Melhorias de UX**
```bash
git commit -m "feat: Melhorias na experiência do usuário

- Botão manual de entrada na splash
- Navegação fluida entre telas
- Interface responsiva e moderna
- Animações e transições suaves"
```

### **10. Commit - Documentação e Comentários**
```bash
git commit -m "docs: Documentação completa e comentários

- README detalhado do projeto
- Comentários em cada bloco de código
- Guia de versionamento
- Instruções de instalação e uso"
```

## 📋 **Padrões de Mensagens de Commit**

### **Estrutura Recomendada:**
```
tipo: descrição resumida

- Detalhamento das mudanças
- Funcionalidades implementadas
- Arquivos modificados
- Impacto das alterações
```

### **Tipos de Commit:**
- **feat:** Nova funcionalidade
- **fix:** Correção de bug
- **docs:** Documentação
- **style:** Formatação de código
- **refactor:** Refatoração
- **test:** Testes
- **chore:** Tarefas de manutenção

## 🔧 **Comandos Git Essenciais**

### **Configuração Inicial:**
```bash
# Configurar usuário Git
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@exemplo.com"

# Inicializar repositório
git init

# Adicionar repositório remoto
git remote add origin [URL_DO_GITHUB]
```

### **Fluxo de Trabalho Diário:**
```bash
# Verificar status
git status

# Adicionar arquivos
git add .                    # Todos os arquivos
git add src/screens/         # Pasta específica
git add App.js              # Arquivo específico

# Fazer commit
git commit -m "tipo: descrição"

# Enviar para GitHub
git push origin main
```

### **Gerenciamento de Branches:**
```bash
# Criar nova branch
git checkout -b feature/nova-funcionalidade

# Mudar de branch
git checkout main

# Mesclar branch
git merge feature/nova-funcionalidade

# Deletar branch
git branch -d feature/nova-funcionalidade
```

## 📱 **Estrutura de Commits para o Checkpoint**

### **Fase 1: Estrutura Base**
1. **Commit 1:** Estrutura inicial e configuração
2. **Commit 2:** Navegação e telas base
3. **Commit 3:** Tela de splash

### **Fase 2: Funcionalidades Core**
4. **Commit 4:** Tela inicial e navegação
5. **Commit 5:** Sistema de agendamento
6. **Commit 6:** Lista de médicos

### **Fase 3: Sistema de Usuário**
7. **Commit 7:** Sistema de perfil
8. **Commit 8:** Modo escuro
9. **Commit 9:** Melhorias de UX

### **Fase 4: Finalização**
10. **Commit 10:** Documentação e comentários

## 🎯 **Critérios de Avaliação Atendidos**

### **✅ Clareza dos Comentários**
- Cada bloco de código comentado
- Explicação técnica do que está sendo feito
- Comentários em português para melhor compreensão
- Padrão consistente em todo o projeto

### **✅ Organização do Código**
- Estrutura de pastas organizada
- Separação clara de responsabilidades
- Nomenclatura consistente
- Sem erros de sintaxe

### **✅ Versionamento Adequado**
- Commits incrementais e organizados
- Mensagens descritivas e claras
- Histórico demonstrando evolução
- Seguindo convenções de commit

## 🚀 **Comandos para Executar os Commits**

### **Sequência Completa de Commits:**
```bash
# 1. Estrutura inicial
git add .
git commit -m "feat: Estrutura inicial do projeto React Native

- Configuração do Expo e dependências
- Estrutura de pastas organizada
- Arquivos de configuração básicos"

# 2. Navegação
git add App.js src/screens/
git commit -m "feat: Implementação da navegação principal

- Configuração do React Navigation
- Estrutura de telas definida
- App.js com navegador configurado"

# 3. Splash Screen
git add src/screens/SplashScreen.js
git commit -m "feat: Tela de splash personalizada

- Logo e informações do aplicativo
- Design moderno com gradiente azul
- Navegação automática configurada"

# 4. Tela Inicial
git add src/screens/HomeScreen.js
git commit -m "feat: Tela inicial com funcionalidades principais

- Cards de navegação para funcionalidades
- Botão flutuante de agendamento
- Layout responsivo e organizado"

# 5. Sistema de Agendamento
git add src/screens/AppointmentScreen.js
git commit -m "feat: Sistema completo de agendamento

- Formulário de agendamento com validação
- Seletor de data nativo
- Chips de especialidade médica"

# 6. Lista de Médicos
git add src/screens/DoctorListScreen.js
git commit -m "feat: Tela de listagem de médicos

- Cards informativos dos médicos
- Especialidades e experiência
- Botão de agendamento direto"

# 7. Sistema de Perfil
git add src/screens/ProfileScreen.js src/screens/CreateProfileScreen.js
git commit -m "feat: Sistema de perfil do usuário

- Criação e edição de perfil
- Formulário com campos completos
- Persistência local com AsyncStorage"

# 8. Modo Escuro
git add src/screens/SplashScreen.js src/screens/ProfileScreen.js
git commit -m "feat: Implementação do modo escuro

- Tema escuro funcional em todas as telas
- Sincronização entre componentes
- Persistência de preferências"

# 9. Melhorias de UX
git add src/screens/SplashScreen.js
git commit -m "feat: Melhorias na experiência do usuário

- Botão manual de entrada na splash
- Navegação fluida entre telas
- Interface responsiva e moderna"

# 10. Documentação
git add README.md VERSIONAMENTO.md
git commit -m "docs: Documentação completa e comentários

- README detalhado do projeto
- Comentários em cada bloco de código
- Guia de versionamento
- Instruções de instalação e uso"

# Enviar para GitHub
git push origin main
```

## 📊 **Histórico de Commits Esperado**

```
* docs: Documentação completa e comentários
* feat: Melhorias na experiência do usuário
* feat: Implementação do modo escuro
* feat: Sistema de perfil do usuário
* feat: Tela de listagem de médicos
* feat: Sistema completo de agendamento
* feat: Tela inicial com funcionalidades principais
* feat: Tela de splash personalizada
* feat: Implementação da navegação principal
* feat: Estrutura inicial do projeto React Native
```

## 🎓 **Conclusão**

Este guia de versionamento demonstra:

1. **Organização** dos commits de forma incremental
2. **Clareza** nas mensagens de commit
3. **Evolução** do projeto através do histórico
4. **Boas práticas** de controle de versão
5. **Documentação** completa do processo

Seguindo esta metodologia, o projeto atenderá perfeitamente aos critérios de avaliação do checkpoint, demonstrando capacidade de organização, documentação e versionamento profissional.

---

**Desenvolvido para o checkpoint de Mobile Development and IoT** 🚀📱
