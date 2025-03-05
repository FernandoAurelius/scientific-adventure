import Badge from "./Badge";

export default interface Player {
  name: string;
  totalScore: number;
  activity1Score: number;
  activity2Score: number;
  activity1Completed: boolean;
  activity2Completed: boolean;
  earnedBadges: Badge[];
  lastActive: Date;
}
