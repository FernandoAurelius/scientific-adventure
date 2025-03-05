import { playerService } from "@/services/PlayerService";
import type Player from "@/interfaces/Player";
import type State from "@/interfaces/State";
import type { Commit } from "vuex";
import type { Dispatch } from "vuex";

export default {
  async initializePlayer({ commit, dispatch }: { commit: Commit, dispatch: Dispatch }, playerName: string): Promise<void> {
    try {
      let player = await playerService.getPlayer(playerName);

      if (!player) {
        const newPlayer: Player = {
          name: playerName,
          totalScore: 0,
          activity1Score: 0,
          activity2Score: 0,
          activity1Completed: false,
          activity2Completed: false,
          earnedBadges: [],
          lastActive: new Date()
        };

        await playerService.savePlayer(newPlayer);
        player = newPlayer;
      }

      commit('SET_PLAYER_NAME', player.name);
      commit('UPDATE_ACTIVITY1_SCORE', player.activity1Score);
      commit('UPDATE_ACTIVITY2_SCORE', player.activity2Score);
      commit('SET_CURRENT_SECTION', 'intro');
      commit('UPDATE_EARNED_BADGES', player.earnedBadges);

      if (player.activity1Completed) {
        commit('COMPLETE_ACTIVITY1');
      }
      if (player.activity2Completed) {
        commit('COMPLETE_ACTIVITY2');
      }

      await dispatch('updatePlayerProgress', {});
    } catch (error) {
      console.error('Erro inicializando o player:', error);
    }
  },

  /* O payload do commit é um objeto com as propriedades do player que devem ser atualizadas, mas na definição de tipos do TypeScript,
  * não sabemos quais propriedades serão atualizadas.
  * ---
  * Para resolver isso, usamos o tipo Partial<Player> que indica que o payload é um objeto que pode ter algumas ou todas as propriedades de Player,
  * mas não necessariamente todas.
  * ---
  * Essa sintaxe { state, commit } é usada pois estamos desestruturando um objeto que tem essas propriedades
  * (objeto context, passado pelo Vuex para todas as actions ou mutations, tipo o "self" do Python).
  * ---
  * Depois de desestruturar o objeto, temos que tipar as propriedades que estamos usando, por isso { state, commit }: { state: State, commit: Commit }.
  * */
  async updatePlayerProgress(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { state, commit, getters, dispatch }: { state: State, commit: Commit, getters: any, dispatch: Dispatch },
    payload: Partial<Player>
  ): Promise<void> {
  try {
      if (state.playerName) {
        if (payload.activity1Score !== undefined) {
          commit('UPDATE_ACTIVITY1_SCORE', payload.activity1Score);
        }
        if (payload.activity2Score !== undefined) {
          commit('UPDATE_ACTIVITY2_SCORE', payload.activity2Score);
        }
        if (payload.activity1Completed !== undefined) {
          commit('COMPLETE_ACTIVITY1');
        }
        if (payload.activity2Completed !== undefined) {
          commit('COMPLETE_ACTIVITY2');
        }

        const earnedBadges = getters.earnedBadges;
        const updates = {
          ...payload,
          earnedBadges,
          lastActive: new Date()
        }

        await playerService.updateScore(state.playerName, updates);

        commit('UPDATE_EARNED_BADGES', earnedBadges);
        await dispatch('fetchLeaderboard');
      }
    } catch (error) {
      console.error('Erro atualizando o progresso do player:', error);
    }
  },

  async fetchLeaderboard({ commit }: { commit: Commit }) {
    try {
      const leaderboard = await playerService.getLeaderboard();
      commit('UPDATE_LEADERBOARD', leaderboard);
    } catch (error) {
      console.error('Erro buscando o leaderboard:', error);
    }
  }
}
