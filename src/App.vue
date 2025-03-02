<template>
  <WelcomeScreen v-if="!playerName" @startGame="startGame" />

  <!-- Caso o jogador já tenha iniciado, mostra o restante da aplicação -->
  <div v-else>
    <HeaderComp :playerName="playerName" :totalScore="totalScore" />
    <Navigation :currentSection="currentSection" @changeSection="currentSection = $event" />
    <!-- Renderiza a seção atual -->
    <IntroSection v-if="currentSection === 'intro'" />
    <QualitativaSection v-if="currentSection === 'qualitativa'" />
    <QuantitativaSection v-if="currentSection === 'quantitativa'" />
    <ActivityOne v-if="currentSection === 'atividade1'" :playerName="playerName" />
    <ActivityTwo v-if="currentSection === 'atividade2'" :playerName="playerName" />
    <Ranking v-if="currentSection === 'ranking'" :playerName="playerName" :totalScore="totalScore"
      :activity1Score="activity1Score" :activity2Score="activity2Score" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import WelcomeScreen from './components/WelcomeScreen.vue';
import HeaderComp from './components/HeaderComp.vue';
import Navigation from './components/Navigation.vue';
import IntroSection from './components/IntroSection.vue';
import QualitativaSection from './components/QualitativaSection.vue';
import QuantitativaSection from './components/QuantitativaSection.vue';
import ActivityOne from './components/ActivityOne.vue';
import ActivityTwo from './components/ActivityTwo.vue';
import Ranking from './components/Ranking.vue';

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
  setup() {
    const playerName = ref<string>(''); // Vazio inicialmente
    const activity1Score = ref<number>(0);
    const activity2Score = ref<number>(0);
    const currentSection = ref<string>('intro');

    const totalScore = computed(() => activity1Score.value + activity2Score.value);

    // Função chamada pelo WelcomeScreen quando o jogador inicia o jogo
    function startGame(name: string) {
      playerName.value = name;
    }

    return {
      playerName,
      totalScore,
      currentSection,
      activity1Score,
      activity2Score,
      startGame
    };
  }
});
</script>
