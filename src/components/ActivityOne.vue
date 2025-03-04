<template>
  <div class="activity1">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold text-blue-600">Atividade 1: Classificação de Métodos</h2>
      <div class="bg-blue-100 rounded-full px-4 py-2 text-blue-800 font-bold">
        Pontos: {{ activity1Score }}
      </div>
    </div>

    <p class="mb-6">
      Arraste (ou clique) cada método de pesquisa para a categoria correta: Qualitativa ou Quantitativa.
    </p>

    <!-- Se a atividade não foi completada, exibe as áreas para classificar -->
    <div v-if="!activity1Completed" class="mb-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <!-- Área dos métodos para classificar -->
        <div class="md:col-span-1 bg-gray-100 p-4 rounded-lg">
          <h3 class="font-bold text-gray-700 mb-3">Métodos para Classificar</h3>
          <div class="space-y-3">
            <div v-for="(method, index) in methodsToClassify" :key="method.id" @click="classifyMethod(method.id)"
              class="bg-white p-3 rounded border border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors shadow-sm">
              {{ method.name }}
              <!-- De outro modo, o linter vai reclamar de estarmos declarando index no loop mas não utilizando ele -->
              <p class="hidden">{{ index }}</p>
            </div>
          </div>
        </div>

        <!-- Áreas de classificação -->
        <div class="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-blue-100 p-4 rounded-lg">
            <h3 class="font-bold text-blue-700 mb-3">Pesquisa Qualitativa</h3>
            <div class="min-h-32 space-y-3">
              <transition-group name="bounce">
                <div v-for="method in classifiedMethods.qualitative" :key="method.id"
                  class="bg-white p-3 rounded border border-blue-300 shadow-sm">
                  {{ method.name }}
                </div>
              </transition-group>
            </div>
          </div>
          <div class="bg-green-100 p-4 rounded-lg">
            <h3 class="font-bold text-green-700 mb-3">Pesquisa Quantitativa</h3>
            <div class="min-h-32 space-y-3">
              <transition-group name="bounce">
                <div v-for="method in classifiedMethods.quantitative" :key="method.id"
                  class="bg-white p-3 rounded border border-green-300 shadow-sm">
                  {{ method.name }}
                </div>
              </transition-group>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center">
        <button @click="checkActivity1"
          class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
          :disabled="methodsToClassify.length > 0"
          :class="{ 'opacity-50 cursor-not-allowed': methodsToClassify.length > 0 }">
          Verificar Respostas
        </button>
      </div>
    </div>

    <!-- Se a atividade foi completada, exibe o resultado -->
    <div v-else class="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
      <h3 class="text-xl font-bold text-green-600 mb-3">Parabéns, {{ playerName }}!</h3>
      <p class="mb-4">Você completou a Atividade 1 e ganhou {{ activity1Score }} pontos!</p>
      <div class="flex justify-center">
        <div class="bg-white rounded-lg shadow-md p-4 mb-4 max-w-md">
          <h4 class="font-bold text-gray-700 mb-2">Respostas Corretas:</h4>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <h5 class="font-bold text-blue-600">Qualitativas:</h5>
              <ul class="list-disc pl-5 text-left">
                <li>Entrevista em profundidade</li>
                <li>Grupo focal</li>
                <li>Observação participante</li>
                <li>Análise de discurso</li>
              </ul>
            </div>
            <div>
              <h5 class="font-bold text-green-600">Quantitativas:</h5>
              <ul class="list-disc pl-5 text-left">
                <li>Questionário de múltipla escolha</li>
                <li>Análise estatística</li>
                <li>Experimento controlado</li>
                <li>Survey em larga escala</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <button @click="resetActivity1"
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300">
        Jogar Novamente
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type Method from '@/interfaces/Method';
import { mapMutations, mapState } from 'vuex';

export default defineComponent({
  name: 'ActivityOne',
  props: {
    playerName: {
      type: String,
      required: true
    }
  },
  data() {
    const allMethods: Method[] = [
      { id: 1, name: "Entrevista em profundidade", type: "qualitative" },
      { id: 2, name: "Questionário de múltipla escolha", type: "quantitative" },
      { id: 3, name: "Grupo focal", type: "qualitative" },
      { id: 4, name: "Análise estatística", type: "quantitative" },
      { id: 5, name: "Observação participante", type: "qualitative" },
      { id: 6, name: "Experimento controlado", type: "quantitative" },
      { id: 7, name: "Análise de discurso", type: "qualitative" },
      { id: 8, name: "Survey em larga escala", type: "quantitative" }
    ];
    return {
      allMethods,
      methodsToClassify: [...allMethods] as Method[],
      classifiedMethods: {
        qualitative: [] as Method[],
        quantitative: [] as Method[]
      },
    };
  },
  computed: {
    ...mapState([
      'activity1Score',
      'activity1Completed'
    ]),
  },
  methods: {
    ...mapMutations([
      'UPDATE_ACTIVITY1_SCORE',
      'COMPLETE_ACTIVITY1',
      'RESET_ACTIVITY1'
    ]),
    classifyMethod(methodId: number) {
      const index = this.methodsToClassify.findIndex((m: Method) => m.id === methodId);
      if (index === -1) return;
      const method = this.methodsToClassify.splice(index, 1)[0];
      if (method.type === "qualitative") {
        this.classifiedMethods.qualitative.push(method);
      } else {
        this.classifiedMethods.quantitative.push(method);
      }
    },
    checkActivity1() {
      let correctCount = 0;
      // Verifica os métodos classificados como qualitativos
      this.classifiedMethods.qualitative.forEach((method: Method) => {
        if (method.type === "qualitative") {
          correctCount++;
        }
      });
      // Verifica os métodos classificados como quantitativos
      this.classifiedMethods.quantitative.forEach((method: Method) => {
        if (method.type === "quantitative") {
          correctCount++;
        }
      });
      // Cada acerto vale 10 pontos
      this.UPDATE_ACTIVITY1_SCORE(correctCount * 10);
      this.COMPLETE_ACTIVITY1();
    },
    resetActivity1() {
      this.methodsToClassify = [...this.allMethods];
      this.classifiedMethods = {
        qualitative: [],
        quantitative: []
      };
      this.RESET_ACTIVITY1();
    }
  }
});
</script>
