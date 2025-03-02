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
      Nesta atividade, você escolherá um tema e construirá um mini-projeto de pesquisa, selecionando a abordagem mais adequada.
    </p>

    <!-- Parte ativa da atividade (quando não completada) -->
    <div v-if="!activity2Completed" class="mb-8">
      <!-- Seleção de tema -->
      <div class="mb-6">
        <h3 class="text-xl font-bold text-blue-600 mb-3">1. Escolha um tema de pesquisa:</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            v-for="(topic, index) in researchTopics"
            :key="index"
            @click="selectedTopic = topic"
            class="p-4 rounded-lg border-2 cursor-pointer transition-colors"
            :class="selectedTopic === topic ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'"
          >
            <h4 class="font-bold mb-1">{{ topic.title }}</h4>
            <p class="text-sm text-gray-600">{{ topic.description }}</p>
          </div>
        </div>
      </div>

      <!-- Seleção de abordagem -->
      <div class="mb-6" v-if="selectedTopic">
        <h3 class="text-xl font-bold text-blue-600 mb-3">2. Escolha a abordagem mais adequada:</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            @click="selectedApproach = 'qualitative'"
            class="p-4 rounded-lg border-2 cursor-pointer transition-colors"
            :class="selectedApproach === 'qualitative' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'"
          >
            <h4 class="font-bold text-blue-700 mb-2">Pesquisa Qualitativa</h4>
            <ul class="list-disc pl-5 text-sm">
              <li>Foco em experiências subjetivas</li>
              <li>Amostra pequena, porém profunda</li>
              <li>Dados em formato de texto ou observações</li>
              <li>Análise interpretativa</li>
            </ul>
          </div>
          <div
            @click="selectedApproach = 'quantitative'"
            class="p-4 rounded-lg border-2 cursor-pointer transition-colors"
            :class="selectedApproach === 'quantitative' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'"
          >
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
          <div
            v-for="(method, index) in availableMethods[selectedApproach]"
            :key="index"
            @click="toggleMethod(method)"
            class="p-3 rounded-lg border text-sm cursor-pointer transition-colors"
            :class="selectedMethods.includes(method) ?
              (selectedApproach === 'qualitative' ? 'border-blue-500 bg-blue-50' : 'border-green-500 bg-green-50') :
              'border-gray-200 hover:bg-gray-50'"
          >
            {{ method }}
          </div>
        </div>
        <p class="text-sm text-gray-600 mt-2">Métodos selecionados: {{ selectedMethods.length }}/3</p>
      </div>

      <!-- Seleção da justificativa -->
      <div class="mb-6" v-if="selectedTopic && selectedApproach && selectedMethods.length > 0">
        <h3 class="text-xl font-bold text-blue-600 mb-3">4. Por que essa abordagem é adequada para o tema?</h3>
        <div
          v-for="(justification, index) in availableJustifications[selectedApproach]"
          :key="index"
          class="mb-3"
        >
          <label class="flex items-start space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input type="radio" :value="justification" v-model="selectedJustification" class="mt-1">
            <span>{{ justification }}</span>
          </label>
        </div>
      </div>

      <div class="text-center">
        <button
          @click="checkActivity2"
          class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
          :disabled="!canSubmitActivity2"
          :class="{'opacity-50 cursor-not-allowed': !canSubmitActivity2}"
        >
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
        <button
          @click="resetActivity2"
          class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
        >
          Criar Novo Projeto
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import type ResearchTopic from '@/interfaces/ResearchTopic';
import type ProjectResult from '@/interfaces/ProjectResult';

export default defineComponent({
  name: 'ActivityTwo',
  props: {
    playerName: {
      type: String,
      required: true
    }
  },
  setup() {
    // Temas de pesquisa
    const researchTopics: ResearchTopic[] = [
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

    // Métodos disponíveis para cada abordagem
    const availableMethods: { [key in 'qualitative' | 'quantitative']: string[] } = {
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

    // Justificativas disponíveis para cada abordagem
    const availableJustifications: { [key in 'qualitative' | 'quantitative']: string[] } = {
      qualitative: [
        "Permite compreender as experiências subjetivas e perspectivas pessoais dos participantes.",
        "Possibilita a exploração em profundidade de um fenômeno complexo e multifacetado.",
        "Oferece flexibilidade para adaptar a investigação conforme novos insights emergem.",
        "É ideal para capturar nuances culturais e contextuais que influenciam o comportamento."
      ],
      quantitative: [
        "Permite coletar dados de uma grande amostra e fazer generalizações estatísticas.",
        "Possibilita a medição precisa de variáveis e o teste de relações de causa e efeito.",
        "Oferece resultados objetivos que podem ser verificados e replicados por outros pesquisadores.",
        "É ideal para identificar padrões, tendências e correlações em grandes conjuntos de dados."
      ]
    };

    // Estados da atividade
    const selectedTopic = ref<ResearchTopic | null>(null);
    const selectedApproach = ref<'qualitative' | 'quantitative' | null>(null);
    const selectedMethods = ref<string[]>([]);
    const selectedJustification = ref<string | null>(null);
    const projectResult = ref<ProjectResult | null>(null);
    const activity2Completed = ref<boolean>(false);
    const activity2Score = ref<number>(0);

    // Computed: verificar se pode submeter o projeto
    const canSubmitActivity2 = computed(() => {
      return selectedTopic.value !== null &&
             selectedApproach.value !== null &&
             selectedMethods.value.length > 0 &&
             selectedJustification.value !== null;
    });

    // Função para alternar método na seleção (max. 3 métodos)
    function toggleMethod(method: string) {
      const index = selectedMethods.value.indexOf(method);
      if (index === -1) {
        if (selectedMethods.value.length < 3) {
          selectedMethods.value.push(method);
        }
      } else {
        selectedMethods.value.splice(index, 1);
      }
    }

    // Função para verificar a atividade
    function checkActivity2() {
      let score = 0;
      let feedback = "";
      if (!selectedTopic.value || !selectedApproach.value || !selectedJustification.value) return;

      const topicBestApproach = selectedTopic.value.bestApproach;
      if (topicBestApproach === selectedApproach.value || topicBestApproach === "mixed") {
        score += 50;
        feedback += "<span class='text-green-600 font-bold'>✓ Excelente escolha de abordagem!</span> ";
        if (topicBestApproach === "mixed") {
          feedback += `Tanto a abordagem qualitativa quanto a quantitativa são válidas para este tema, e você escolheu a ${selectedApproach.value === 'qualitative' ? 'qualitativa' : 'quantitativa'}. `;
        } else {
          feedback += `A abordagem ${selectedApproach.value === 'qualitative' ? 'qualitativa' : 'quantitativa'} é realmente a mais adequada para este tema. `;
        }
      } else {
        score += 20;
        feedback += "<span class='text-yellow-600 font-bold'>⚠ Sua escolha de abordagem poderia ser reconsiderada.</span> ";
        feedback += `Para o tema "${selectedTopic.value.title}", a abordagem ${topicBestApproach === 'qualitative' ? 'qualitativa' : 'quantitativa'} talvez fosse mais apropriada. `;
      }

      // Avaliação da seleção de métodos
      if (selectedMethods.value.length >= 2) {
        score += 30;
        feedback += "<span class='text-green-600 font-bold'>✓ Boa seleção de métodos!</span> ";
        feedback += "A combinação de diferentes métodos fortalece sua pesquisa. ";
      } else {
        score += 15;
        feedback += "<span class='text-yellow-600'>⚠ Considere usar mais de um método</span> para triangular seus dados e obter resultados mais robustos. ";
      }

      projectResult.value = {
        topic: selectedTopic.value,
        approach: selectedApproach.value,
        methods: [...selectedMethods.value],
        justification: selectedJustification.value,
        feedback,
        score
      };
      activity2Score.value = score;
      activity2Completed.value = true;
    }

    // Função para resetar a atividade
    function resetActivity2() {
      selectedTopic.value = null;
      selectedApproach.value = null;
      selectedMethods.value = [];
      selectedJustification.value = null;
      projectResult.value = null;
      activity2Completed.value = false;
      activity2Score.value = 0;
    }

    return {
      researchTopics,
      availableMethods,
      availableJustifications,
      selectedTopic,
      selectedApproach,
      selectedMethods,
      selectedJustification,
      projectResult,
      activity2Completed,
      activity2Score,
      canSubmitActivity2,
      toggleMethod,
      checkActivity2,
      resetActivity2
    };
  }
});
</script>
