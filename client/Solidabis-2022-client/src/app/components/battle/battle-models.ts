export interface BattleState {
  player: CharacterState;
  enemy: CharacterState;
  time: number;
  log: BattleLogEntry[];
}

export interface CharacterState {
  health: number;
  dead: boolean;
  attacking: boolean;
  attackProgressBarProgress: number;
}

interface BattleLogEntry {
  time_s: number;
  messageTranslationId?: string;
  winnerNameTranslationId?: string;
  attackerTranslationId?: string;
  attackerDamage?: number;
  defenderTranslationId?: string;
  defenderHealth?: number;
}

export type CharacterIdentity = 'player' | 'enemy';
