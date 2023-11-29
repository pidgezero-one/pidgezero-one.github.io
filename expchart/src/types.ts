export interface EnemyDefinition {
  name: string;
  switch_name?: string;
  exp: number;
}

export interface Enemy {
  defn: EnemyDefinition;
  special: boolean;
}

export interface ExpStarDefinition {
  name: string;
  exp: number;
}

export interface LevelThreshold {
  level: number;
  required: number;
}

export enum EventType {
  FIGHT = "Fight",
  STAR = "Star",
  PARTY = "New party member",
}

export enum Mode {
  SNES = "SNES",
  REMAKE = "Switch",
  BREEZY = "Switch (Breezy)",
}

export enum CharacterName {
  MARIO = "Mario",
  MALLOW = "Mallow",
  GENO = "Geno",
  BOWSER = "Bowser",
  PEACH = "Peach",
  NONE = "(nobody)",
}

export interface GameEvent {
  type: EventType;
  enemies?: Enemy[];
  star?: ExpStarDefinition;
  hits?: number;
  booster?: CharacterName;
}

export interface PartyState {
  [CharacterName.MARIO]: { exp: number; level: number };
  [CharacterName.MALLOW]: { exp: number; level: number };
  [CharacterName.GENO]: { exp: number; level: number };
  [CharacterName.BOWSER]: { exp: number; level: number };
  [CharacterName.PEACH]: { exp: number; level: number };
  partyCount: number;
  hitLevelups: CharacterName[][];
}

export const getFightExp = (
  event: GameEvent,
  mode: Mode,
  partyCount: number
) => {
  let exp =
    event.enemies?.reduce((accumulator: number, enemy: Enemy) => {
      let enemyExp = enemy.defn.exp;
      if (mode === Mode.BREEZY) {
        enemyExp = (enemyExp * 5) >> 2;
      }
      console.log(enemyExp);
      if (mode !== Mode.SNES && enemy.special) {
        enemyExp *= 2;
      }
      accumulator += enemyExp;
      return accumulator;
    }, 0) || 0;
  if (partyCount === 1) {
    return exp;
  } else if (partyCount === 2) {
    return Math.ceil(exp / 2);
  } else {
    return Math.ceil(exp / 3);
  }
};

export enum AppState {
  WORK = 0,
  EXPORT = 1,
  IMPORT = 2,
}
