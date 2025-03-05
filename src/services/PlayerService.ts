import { db } from "@/config/firebase";

import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  query,
  orderBy,
  limit,
  getDocs
} from "firebase/firestore";

import type Player from "@/interfaces/Player";

export const playerService = {
  async savePlayer(player: Player): Promise<void> {
    const playerRef = doc(db, "players", player.name);
    await setDoc(playerRef, {
      ...player,
      lastActive: new Date()
    });
  },

  async getPlayer(playerName: string): Promise<Player | null> {
    const playerRef = doc(db, "players", playerName);
    const playerSnap = await getDoc(playerRef);

    if (playerSnap.exists()) {
      return playerSnap.data() as Player;
    }
    return null;
  },

  async updateScore(playerName: string, updates: Partial<Player>): Promise<void> {
    const playerRef = doc(db, "players", playerName);
    await updateDoc(playerRef, {
      ...updates,
      lastActive: new Date()
    });
  },

  async getLeaderboard(limitCount: number = 10): Promise<Player[]> {
    // Equivalente a: SELECT * FROM table ORDER BY column DESC LIMIT 10;
    try {
      const q = query(
        collection(db, "players"),
        orderBy('totalScore', 'desc'),
        limit(limitCount)
      );

      const snapshot = await getDocs(q);

      return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          lastActive: data.lastActive?.toDate(),
          earnedBadges: data.earnedBadges || []
        } as Player
      });
    } catch (error) {
      console.error('Erro ao buscar o leaderboard:', error);
      return [];
    }
  }
}
