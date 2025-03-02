<template>
    <div class="bg-white rounded-xl shadow-md p-4 mb-6 flex justify-between items-center">
        <div>
            <h1 class="text-2xl font-bold text-blue-600">Mundo da Pesquisa Científica</h1>
            <p class="text-gray-600">Jogador: {{ playerName }}</p>
        </div>
        <div class="text-right">
            <p class="text-sm text-gray-600">Pontuação Total</p>
            <p class="text-3xl font-bold text-blue-600">{{ totalScore }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'HeaderComp',
    props: {
        playerName: {
            type: String,
            required: true
        },
        totalScore: {
            type: Number,
            required: true
        }
    }
});
</script>
