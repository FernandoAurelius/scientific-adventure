<template>
  <div class="activity2">
    <!-- Cabeçalho da Atividade -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold text-blue-600">Atividade 2: Elaboração de Projeto</h2>
      <div class="bg-blue-100 rounded-full px-4 py-2 text-blue-800 font-bold">
        Pontos: {{ activity2Score }}
      </div>
    </div>

    <p class="mb-6">
      Nesta atividade, você escolherá um tema e construirá um mini-projeto de pesquisa, selecionando a abordagem mais
      adequada.
    </p>

    <!-- Parte ativa da atividade (quando não completada) -->
    <div v-if="!activity2Completed" class="mb-8">
      <!-- Seleção de tema -->
      <div class="mb-6">
        <h3 class="text-xl font-bold text-blue-600 mb-3">1. Escolha um tema de pesquisa:</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div v-for="(topic, index) in researchTopics" :key="index" @click="selectedTopic = topic"
            class="p-4 rounded-lg border-2 cursor-pointer transition-colors"
            :class="selectedTopic === topic ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'">
            <h4 class="font-bold mb-1">{{ topic.title }}</h4>
            <p class="text-sm text-gray-600">{{ topic.description }}</p>
          </div>
        </div>
      </div>

      <!-- Seleção de abordagem -->
      <div class="mb-6" v-if="selectedTopic">
        <h3 class="text-xl font-bold text-blue-600 mb-3">2. Escolha a abordagem mais adequada:</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div @click="selectedApproach = 'qualitative'"
            class="p-4 rounded-lg border-2 cursor-pointer transition-colors"
            :class="selectedApproach === 'qualitative' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'">
            <h4 class="font-bold text-blue-700 mb-2">Pesquisa Qualitativa</h4>
            <ul class="list-disc pl-5 text-sm">
              <li>Foco em experiências subjetivas</li>
              <li>Amostra pequena, porém profunda</li>
              <li>Dados em formato de texto ou observações</li>
              <li>Análise interpretativa</li>
            </ul>
          </div>
          <div @click="selectedApproach = 'quantitative'"
            class="p-4 rounded-lg border-2 cursor-pointer transition-colors"
            :class="selectedApproach === 'quantitative' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'">
            <h4 class="font-bold text-green-700 mb-2">Pesquisa Quantitativa</h4>
            <ul class="list-disc pl-5 text-sm">
              <li>Foco em medições e números</li>
              <li>Amostra grande e representativa</li>
              <li>Dados em formato numérico</li>
              <li>Análise estatística</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Seleção de métodos -->
      <div class="mb-6" v-if="selectedTopic && selectedApproach">
        <h3 class="text-xl font-bold text-blue-600 mb-3">3. Selecione até 3 métodos para sua pesquisa:</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div v-for="(method, index) in availableMethods[selectedApproach]" :key="index" @click="toggleMethod(method)"
            class="p-3 rounded-lg border text-sm cursor-pointer transition-colors" :class="selectedMethods.includes(method) ?
              (selectedApproach === 'qualitative' ? 'border-blue-500 bg-blue-50' : 'border-green-500 bg-green-50') :
              'border-gray-200 hover:bg-gray-50'">
            {{ method }}
          </div>
        </div>
        <p class="text-sm text-gray-600 mt-2">Métodos selecionados: {{ selectedMethods.length }}/3</p>
      </div>

      <!-- Seleção da justificativa -->
      <div class="mb-6" v-if="selectedTopic && selectedApproach && selectedMethods.length > 0">
        <h3 class="text-xl font-bold text-blue-600 mb-3">4. Por que essa abordagem é adequada para o tema?</h3>
        <div v-for="(justification, index) in availableJustifications[selectedApproach]" :key="index" class="mb-3">
          <label class="flex items-start space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input type="radio" :value="justification" v-model="selectedJustification" class="mt-1">
            <span>{{ justification }}</span>
          </label>
        </div>
      </div>

      <div class="text-center">
        <button @click="checkActivity2"
          class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
          :disabled="!canSubmitActivity2" :class="{ 'opacity-50 cursor-not-allowed': !canSubmitActivity2 }">
          Submeter Projeto
        </button>
      </div>
    </div>

    <!-- Resultado da Atividade -->
    <div v-else class="bg-green-50 border border-green-200 rounded-lg p-6">
      <h3 class="text-xl font-bold text-green-600 mb-3 text-center">Parabéns, {{ playerName }}!</h3>
      <p class="mb-4 text-center">Você completou a Atividade 2 e ganhou {{ activity2Score }} pontos!</p>

      <div class="bg-white rounded-lg shadow-md p-4 mb-6 max-w-3xl mx-auto">
        <h4 class="font-bold text-blue-600 mb-3">Seu Projeto de Pesquisa:</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <p class="font-bold text-gray-700">Tema:</p>
            <p>{{ projectResult?.topic.title }}</p>
          </div>
          <div>
            <p class="font-bold text-gray-700">Abordagem:</p>
            <p>Pesquisa {{ projectResult?.approach === 'qualitative' ? 'Qualitativa' : 'Quantitativa' }}</p>
          </div>
          <div>
            <p class="font-bold text-gray-700">Métodos Selecionados:</p>
            <ul class="list-disc pl-5">
              <li v-for="(method, index) in projectResult?.methods" :key="index">{{ method }}</li>
            </ul>
          </div>
          <div>
            <p class="font-bold text-gray-700">Justificativa:</p>
            <p class="text-sm">{{ projectResult?.justification }}</p>
          </div>
        </div>
        <div class="mt-4 pt-4 border-t">
          <p class="font-bold text-gray-700">Avaliação:</p>
          <p v-html="projectResult?.feedback"></p>
        </div>
      </div>

      <div class="text-center">
        <button @click="resetActivity2"
          class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300">
          Criar Novo Projeto
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type ResearchTopic from '@/interfaces/ResearchTopic';
import type ProjectResult from '@/interfaces/ProjectResult';
import { mapActions, mapMutations, mapState } from 'vuex';

export default defineComponent({
  name: 'ActivityTwo',
  props: {
    playerName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      researchTopics: [] as ResearchTopic[],
      availableMethods: {
        qualitative: [] as string[],
        quantitative: [] as string[]
      },
      availableJustifications: {
        qualitative: [] as string[],
        quantitative: [] as string[]
      },
      selectedTopic: null as ResearchTopic | null,
      selectedApproach: null as 'qualitative' | 'quantitative' | null,
      selectedMethods: [] as string[],
      selectedJustification: null as string | null,
      projectResult: null as ProjectResult | null,
    }
  },
  created() {
    this.researchTopics = [
      {
        title: "Uso de tecnologia na educação",
        description: "Investigar como recursos tecnológicos impactam o aprendizado dos estudantes",
        bestApproach: "mixed"
      },
      {
        title: "Hábitos alimentares de adolescentes",
        description: "Estudar padrões de alimentação entre jovens de 12 a 18 anos",
        bestApproach: "quantitative"
      },
      {
        title: "Experiências de bullying nas escolas",
        description: "Compreender as vivências de estudantes que sofreram bullying",
        bestApproach: "qualitative"
      }
    ];

    this.availableMethods = {
      qualitative: [
        "Entrevistas em profundidade",
        "Grupos focais",
        "Observação participante",
        "Histórias de vida",
        "Análise de diários",
        "Estudos de caso"
      ],
      quantitative: [
        "Questionários estruturados",
        "Surveys online",
        "Análise estatística",
        "Experimentos controlados",
        "Coleta de dados biométricos",
        "Análise de séries temporais"
      ]
    };

    this.availableJustifications.qualitative = [
      "Permite compreender as experiências subjetivas e perspectivas pessoais dos participantes.",
      "Possibilita a exploração em profundidade de um fenômeno complexo e multifacetado.",
      "Oferece flexibilidade para adaptar a investigação conforme novos insights emergem.",
      "É ideal para capturar nuances culturais e contextuais que influenciam o comportamento."
    ];

    this.availableJustifications.quantitative = [
      "Permite coletar dados de uma grande amostra e fazer generalizações estatísticas.",
      "Possibilita a medição precisa de variáveis e o teste de relações de causa e efeito.",
      "Oferece resultados objetivos que podem ser verificados e replicados por outros pesquisadores.",
      "É ideal para identificar padrões, tendências e correlações em grandes conjuntos de dados."
    ];
  },
  computed: {
    ...mapState([
      'activity2Completed',
      'activity2Score',
      'activity1Score'
    ]),
    canSubmitActivity2(): boolean {
      return this.selectedTopic !== null &&
        this.selectedApproach !== null &&
        this.selectedMethods.length > 0 &&
        this.selectedJustification !== null;
    }
  },
  methods: {
    ...mapMutations([
      'COMPLETE_ACTIVITY2',
      'RESET_ACTIVITY2'
    ]),
    ...mapActions([
      'updatePlayerProgress'
    ]),
    toggleMethod(method: string): void {
      const index = this.selectedMethods.indexOf(method);
      if (index === -1) {
        if (this.selectedMethods.length < 3) {
          this.selectedMethods.push(method);
        }
      } else {
        this.selectedMethods.splice(index, 1);
      }
    },
    checkActivity2() {
      let score = 0;
      let feedback = "";
      if (!this.selectedTopic || !this.selectedApproach || !this.selectedJustification) return;

      const topicBestApproach = this.selectedTopic.bestApproach;
      if (topicBestApproach === this.selectedApproach || topicBestApproach === "mixed") {
        score += 50;
        feedback += "<span class='text-green-600 font-bold'>✓ Excelente escolha de abordagem!</span> ";
        if (topicBestApproach === "mixed") {
          feedback += `Tanto a abordagem qualitativa quanto a quantitativa são válidas para este tema, e você escolheu a ${this.selectedApproach === 'qualitative' ? 'qualitativa' : 'quantitativa'}. `;
        } else {
          feedback += `A abordagem ${this.selectedApproach === 'qualitative' ? 'qualitativa' : 'quantitativa'} é realmente a mais adequada para este tema. `;
        }
      } else {
        score += 20;
        feedback += "<span class='text-yellow-600 font-bold'>⚠ Sua escolha de abordagem poderia ser reconsiderada.</span> ";
        feedback += `Para o tema "${this.selectedTopic.title}", a abordagem ${topicBestApproach === 'qualitative' ? 'qualitativa' : 'quantitativa'} talvez fosse mais apropriada. `;
      }

      // Avaliação da seleção de métodos
      if (this.selectedMethods.length >= 2) {
        score += 30;
        feedback += "<span class='text-green-600 font-bold'>✓ Boa seleção de métodos!</span> ";
        feedback += "A combinação de diferentes métodos fortalece sua pesquisa. ";
      } else {
        score += 15;
        feedback += "<span class='text-yellow-600'>⚠ Considere usar mais de um método</span> para triangular seus dados e obter resultados mais robustos. ";
      }

      this.projectResult = {
        topic: this.selectedTopic,
        approach: this.selectedApproach,
        methods: [...this.selectedMethods],
        justification: this.selectedJustification,
        feedback,
        score
      };
      this.updatePlayerProgress({
        activity2Score: score,
        activity2Completed: true,
        totalScore: score + this.activity1Score
      });
      this.COMPLETE_ACTIVITY2();
    },
    resetActivity2() {
      this.selectedTopic = null;
      this.selectedApproach = null;
      this.selectedMethods = [];
      this.selectedJustification = null;
      this.projectResult = null;
      this.RESET_ACTIVITY2();
      this.updatePlayerProgress({
        activity2Score: 0,
        activity2Completed: false,
        totalScore: this.activity1Score
      });
    }
  }
});
</script>
