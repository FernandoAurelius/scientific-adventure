import type State from "@/interfaces/State";
import { createStore } from "vuex";
import mutations from "./mutations";
import getters from "./getters";

export default createStore<State>({
  state: {
    playerName: '',
    totalScore: 0,
    activity1Score: 0,
    activity2Score: 0,
    currentSection: 'intro',
    earnedBadges: [],
    leaderboard: [],
    activity1Completed: false,
    activity2Completed: false,
    projectResult: null
  },
  mutations,
  getters
})
