import type Badge from "./Badge";
import type Player from "./Player";
import type ProjectResult from "./ProjectResult";

export default interface State {
  playerName: string,
  totalScore: number,
  activity1Score: number,
  activity2Score: number,
  currentSection: string,
  earnedBadges: Badge[],
  leaderboard: Player[],
  activity1Completed: boolean,
  activity2Completed: boolean,
  projectResult: ProjectResult | null
}
