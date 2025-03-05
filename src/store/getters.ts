import type Badge from "@/interfaces/Badge";
import type Player from "@/interfaces/Player";
import type State from "@/interfaces/State";

export default {
  totalScore: (state: State) => state.activity1Score + state.activity2Score,
  earnedBadges: (state: State) => {
    const badges: Badge[] = [];

    if (state.activity1Score > 0) {
      badges.push({
        emoji: "🔍",
        name: "Classificador",
        description: "Completou a atividade de classificação"
      })
    }

    if (state.activity2Score > 0) {
      badges.push({
        emoji: "📊",
        name: "Pesquisador",
        description: "Elaborou um projeto de pesquisa"
      });
    }

    if (state.totalScore >= 150) {
      badges.push({
        emoji: "🏆",
        name: "Cientista Master",
        description: "Alcançou pontuação alta"
      });
    }

    return badges;
  },
  // Agora sim, usando os dados do Firestore
  leaderboard: (state: State) => {
    return state.leaderboard.sort(
      (a: Player, b: Player) => b.totalScore - a.totalScore
    );
  }
}
