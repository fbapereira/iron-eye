
/**
 * Game
 */
export interface Game {
  /**
   * Game identifier
   */
  gameId: number;

  /**
   * game name
   */
  name: string;

  /**
   * game image
   */
  thumbnail: string;

  /**
   * Minimum age required to play
   */
  ageRestriction: number;
}