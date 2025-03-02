# Aventura Científica

Uma aplicação educativa baseada em Vue 3 que ensina os diferentes tipos de pesquisa científica de forma interativa. O jogo propõe atividades que desafiam o usuário a classificar métodos, elaborar projetos de pesquisa e acompanhar a sua pontuação em um ranking, promovendo aprendizado de forma lúdica.

## Sumário

- [Propósito](#propósito)
- [Requisitos](#requisitos)
- [Configuração do Ambiente de Desenvolvimento](#configuração-do-ambiente-de-desenvolvimento)
- [Fluxo da Aplicação](#fluxo-da-aplicação)
- [Melhorias e Refatorações Propostas](#melhorias-e-refatorações-propostas)
- [Licença](#licença)

## Propósito

O projeto **Aventura Científica** visa oferecer uma experiência educativa e interativa, onde os usuários aprendem sobre pesquisa científica por meio de atividades práticas e desafios. O jogo apresenta conteúdos teóricos, atividades de classificação e elaboração de projetos, além de um sistema de pontuação e ranking para incentivar o engajamento dos jogadores.

## Requisitos

- **Node.js** (versão 14 ou superior)
- **NPM** ou **Yarn**
- **Vite** (já configurado no projeto)
- **Vue 3**
- **Tailwind CSS**
- **Vuex** (para gerenciamento de estado global)
- **Firebase** (para persistência de usuários e pontuações)

## Configuração do Ambiente de Desenvolvimento

Siga os passos abaixo para configurar o ambiente localmente:

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/aventura-cientifica.git
   cd aventura-cientifica
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Rode o servidor de desenvolvimento**

   ```bash
   npm run dev
   ```

## Fluxo da Aplicação

A aplicação é estruturada em componentes modulares que representam as diferentes seções do jogo. O fluxo principal é o seguinte:

    ```mermaid
    flowchart TD
    A[WelcomeScreen] -->|Usuário insere o nome| B[Header & Navigation]
    B --> C{currentSection}
    C -->|intro| D[IntroSection]
    C -->|qualitativa| E[QualitativaSection]
    C -->|quantitativa| F[QuantitativaSection]
    C -->|atividade1| G[Activity1]
    C -->|atividade2| H[Activity2]
    C -->|ranking| I[Ranking]
    ```

- WelcomeScreen: Tela inicial onde o usuário informa seu nome.
- Header & Navigation: Exibição do título, nome do jogador, pontuação total e navegação entre seções.
- IntroSection, QualitativaSection e QuantitativaSection: Seções com conteúdos teóricos.
- Activity1 e Activity2: Atividades interativas para testar os conhecimentos.
- Ranking: Exibição do ranking dos jogadores.

## Melhorias e Refatorações Propostas

Este projeto possui um estado inicial bem definido, mas há oportunidades para melhorias:

- Melhoria na Atividade 1 (Classificação de Métodos):
Atualmente, a atividade utiliza apenas cliques para mover os métodos para a categoria correta. Uma melhoria seria implementar um sistema de drag and drop para que o usuário possa arrastar os métodos para as áreas de classificação, tornando a experiência mais dinâmica e intuitiva.

- Gerenciamento de Estado Global com Vuex:
Refatorar a aplicação para utilizar o Vuex. Em vez de emitir eventos diretamente entre componentes, centralize a lógica de estado (por exemplo, pontuação, dados do usuário e progresso nas atividades) em um store do Vuex. Utilize mutations para atualizar os estados de forma previsível.

- Utilizar Options API de Forma Centralizada:
Atualmente, a aplicação pode estar utilizando a Composition API via setup(). Para manter um melhor controle dos estados locais, migre a lógica para a Options API, utilizando data para estados, methods para funções e computed para valores derivados.

- Refatoração da Lógica de Pontuação e Players:
Melhore o sistema de pontuação e criação de jogadores para integrá-los com um banco de dados do Firebase. Essa integração permitirá armazenar os dados dos usuários e pontuações de forma persistente e adequada, possibilitando recursos como rankings dinâmicos e recuperação dos dados do usuário em diferentes sessões.

## Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/license/mit).
