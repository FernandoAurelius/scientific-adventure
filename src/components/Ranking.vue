<template>
  <div class="ranking">
    <h2 class="text-2xl font-bold text-blue-600 mb-6">Ranking de Jogadores</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <!-- Sua Pontuação -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="bg-blue-600 text-white py-3 px-4">
          <h3 class="text-lg font-bold">Sua Pontuação</h3>
        </div>
        <div class="p-4">
          <div class="flex justify-between items-center mb-3">
            <div class="font-bold text-lg">{{ playerName }}</div>
            <div class="text-3xl font-bold text-blue-600">{{ totalScore }}</div>
          </div>
          <div class="grid grid-cols-2 gap-3 text-center">
            <div class="bg-blue-50 rounded p-2">
              <div class="text-sm text-gray-600">Atividade 1</div>
              <div class="font-bold text-blue-600">{{ activity1Score }}</div>
            </div>
            <div class="bg-blue-50 rounded p-2">
              <div class="text-sm text-gray-600">Atividade 2</div>
              <div class="font-bold text-blue-600">{{ activity2Score }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Medalhas Conquistadas -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="bg-indigo-600 text-white py-3 px-4">
          <h3 class="text-lg font-bold">Medalhas Conquistadas</h3>
        </div>
        <div class="p-4">
          <div class="grid grid-cols-3 gap-3">
            <div
              v-for="(badge, index) in earnedBadges"
              :key="index"
              class="text-center bg-gray-50 rounded-lg p-3"
            >
              <div class="text-2xl mb-1">{{ badge.emoji }}</div>
              <div class="font-bold text-sm">{{ badge.name }}</div>
              <div class="text-xs text-gray-600">{{ badge.description }}</div>
            </div>
            <div v-if="earnedBadges.length === 0" class="col-span-3 text-center py-4 text-gray-500">
              Complete as atividades para ganhar medalhas!
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Classificação Geral -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="bg-purple-600 text-white py-3 px-4">
        <h3 class="text-lg font-bold">Classificação Geral</h3>
      </div>
      <div class="p-4">
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead>
              <tr class="border-b">
                <th class="py-2 px-3 text-left">Posição</th>
                <th class="py-2 px-3 text-left">Jogador</th>
                <th class="py-2 px-3 text-right">Pontuação</th>
                <th class="py-2 px-3 text-center">Medalhas</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(player, index) in leaderboard"
                :key="index"
                class="border-b hover:bg-gray-50"
                :class="{'bg-blue-50': player.name === playerName}"
              >
                <td class="py-3 px-3">
                  <span class="font-bold" :class="{
                    'text-yellow-500': index === 0,
                    'text-gray-400': index === 1,
                    'text-amber-600': index === 2
                  }">
                    {{ index + 1 }}
                  </span>
                </td>
                <td class="py-3 px-3 font-medium">{{ player.name }}</td>
                <td class="py-3 px-3 text-right font-bold">{{ player.score }}</td>
                <td class="py-3 px-3 text-center">
                  <div class="flex justify-center space-x-1">
                    <span v-for="(badge, bIndex) in player.badges" :key="bIndex">{{ badge }}</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type Player from '@/interfaces/Player';
import type Badge from '@/interfaces/Badge';

export default defineComponent({
  name: 'Ranking',
  props: {
    playerName: {
      type: String,
      required: true
    },
    totalScore: {
      type: Number,
      required: true
    },
    activity1Score: {
      type: Number,
      required: true
    },
    activity2Score: {
      type: Number,
      required: true
    },
  },
  data() {
    return {
      earnedBadges: [] as Badge[],
      leaderboard: [] as Player[]
    }
  },
  computed: {
      getEarnedBadges() {
        const badges: Badge[] = [];

        if (this.activity1Score > 0) {
          badges.push({
            emoji: "🔍",
            name: "Classificador",
            description: "Completou a atividade de classificação"
          });
        }

        if (this.activity2Score > 0) {
          badges.push({
            emoji: "📊",
            name: "Pesquisador",
            description: "Elaborou um projeto de pesquisa"
          });
        }

        if (this.totalScore >= 150) {
          badges.push({
            emoji: "🏆",
            name: "Cientista Master",
            description: "Alcançou pontuação alta"
          });
        }

        return badges;
      },
      loadLeaderboard() {
        const otherPlayers: Player[] = [
          { name: "Ana Silva", score: 190, badges: ["🔍", "📊", "🏆"] },
          { name: "Pedro Santos", score: 165, badges: ["🔍", "📊", "🏆"] },
          { name: "Júlia Oliveira", score: 145, badges: ["🔍", "📊"] },
          { name: "Carlos Mendes", score: 120, badges: ["🔍", "📊"] },
          { name: "Mariana Costa", score: 100, badges: ["🔍"] },
          { name: "Rafael Souza", score: 85, badges: ["🔍"] }
        ];

        const players: Player[] = [...otherPlayers];
        if (this.playerName) {
          players.push({
            name: this.playerName,
            score: this.totalScore,
            badges: this.getEarnedBadges.map((badge: Badge) => badge.emoji)
          });
        }

        return players.sort((a: Player, b: Player) => b.score - a.score);
      },
  },
  created() {
    this.earnedBadges = this.getEarnedBadges;
    this.leaderboard = this.loadLeaderboard;
  }
});
</script>
