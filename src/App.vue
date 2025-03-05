<template>
  <WelcomeScreen v-if="!playerName" @startGame="startGame" />

  <!-- Caso o jogador já tenha iniciado, mostra o restante da aplicação -->
  <div v-else>
    <HeaderComp :playerName="playerName" :totalScore="totalScore" />
    <Navigation :currentSection="currentSection" />
    <!-- Renderiza a seção atual -->
    <IntroSection v-if="currentSection === 'intro'" />
    <QualitativaSection v-if="currentSection === 'qualitativa'" />
    <QuantitativaSection v-if="currentSection === 'quantitativa'" />
    <ActivityOne v-if="currentSection === 'atividade1'" :playerName="playerName" />
    <ActivityTwo v-if="currentSection === 'atividade2'" :playerName="playerName" />
    <Ranking v-if="currentSection === 'ranking'" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WelcomeScreen from './components/WelcomeScreen.vue';
import HeaderComp from './components/HeaderComp.vue';
import Navigation from './components/Navigation.vue';
import IntroSection from './components/IntroSection.vue';
import QualitativaSection from './components/QualitativaSection.vue';
import QuantitativaSection from './components/QuantitativaSection.vue';
import ActivityOne from './components/ActivityOne.vue';
import ActivityTwo from './components/ActivityTwo.vue';
import Ranking from './components/Ranking.vue';
import { mapActions, mapMutations, mapState } from 'vuex';

export default defineComponent({
  name: 'App',
  components: {
    WelcomeScreen,
    HeaderComp,
    Navigation,
    IntroSection,
    QualitativaSection,
    QuantitativaSection,
    ActivityOne,
    ActivityTwo,
    Ranking
  },
  computed: {
    ...mapState([
      'playerName',
      'totalScore',
      'currentSection',
      'activity1Score',
      'activity2Score'
    ])
  },
  methods: {
    ...mapMutations([
      'SET_CURRENT_SECTION'
    ]),
    ...mapActions([
      'initializePlayer',
      'fetchLeaderboard'
    ]),
    async startGame(playerName: string) {
      await this.initializePlayer(playerName);
      localStorage.setItem('playerName', playerName);
    }
  },
  created() {
    const savedPlayerName = localStorage.getItem('playerName');
    if (savedPlayerName) {
      this.initializePlayer(savedPlayerName);
    }
    this.fetchLeaderboard();
  }
});
</script>
