<template>
    <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8 mb-6">
        <h1 class="text-3xl font-bold text-center text-blue-600 mb-6">Mundo da Pesquisa Científica</h1>
        <p class="text-gray-700 mb-4">
            Bem-vindo ao nosso jogo educativo! Aqui você vai aprender sobre os diferentes tipos de pesquisa científica
            de um jeito divertido.
        </p>
        <div class="mb-4">
            <label for="playerName" class="block text-sm font-medium text-gray-700">Seu Nome:</label>
            <input 
                type="text" id="playerName" 
                v-model="playerNameInput"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Digite seu nome" />
        </div>
        <button 
            @click="onStartGame"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
            :disabled="!playerNameInput" 
            :class="{ 'opacity-50 cursor-not-allowed': !playerNameInput }">
            Começar Aventura
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'WelcomeScreen',
  data() {
    return {
      playerNameInput: '' as string
    }
  },
  methods: {
    onStartGame() {
      this.$emit('startGame', this.playerNameInput);
    }
  }
});
</script>


