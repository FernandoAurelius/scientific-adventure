import type Badge from "@/interfaces/Badge";
import type Player from "@/interfaces/Player";
import type State from "@/interfaces/State";

export default {
  SET_PLAYER_NAME(state: State, name: string) {
    state.playerName = name;
  },
  UPDATE_ACTIVITY1_SCORE(state: State, score: number) {
    state.activity1Score = score;
    state.totalScore = state.activity1Score + state.activity2Score;
  },
  UPDATE_ACTIVITY2_SCORE(state: State, score: number) {
    state.activity2Score = score;
    state.totalScore = state.activity1Score + state.activity2Score;
  },
  COMPLETE_ACTIVITY1(state: State) {
    state.activity1Completed = true;
  },
  COMPLETE_ACTIVITY2(state: State) {
    state.activity2Completed = true;
  },
  RESET_ACTIVITY1(state: State) {
    state.activity1Completed = false;
    state.activity1Score = 0;
    state.totalScore = state.activity1Score + state.activity2Score;
  },
  RESET_ACTIVITY2(state: State) {
    state.activity2Completed = false;
    state.activity2Score = 0;
    state.totalScore = state.activity1Score + state.activity2Score;
  },
  SET_CURRENT_SECTION(state: State, section: string) {
    state.currentSection = section;
  },
  UPDATE_EARNED_BADGES(state: State, badges: Badge[]) {
    state.earnedBadges = badges;
  },
  UPDATE_LEADERBOARD(state: State, leaderboard: Player[]) {
    state.leaderboard = leaderboard;
  }
}
