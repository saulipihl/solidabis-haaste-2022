import { Component, ElementRef, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { randomInt } from 'src/app/common/functions';
import { FoodData } from 'src/app/models/food-data';
import { EventService } from 'src/app/services/event.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';
import { BattleState, CharacterIdentity, CharacterState } from './battle-models';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss'],
  animations: getFightAnimations(),
})
export class BattleComponent implements OnInit, OnDestroy {
  @Input() foodData: FoodData[] = [];
  @ViewChildren('logEntry') logEntries: QueryList<ElementRef<HTMLDivElement>> = new QueryList<ElementRef<HTMLDivElement>>();
  selectedFighter: FoodData | undefined;
  fighterConfirmedSubscription: Subscription | undefined;
  enemyFighter: FoodData | undefined;
  battleInterval: NodeJS.Timer | undefined;
  battleState: BattleState | undefined;
  battleOngoing: boolean = false;

  constructor(
    private _eventService: EventService,
  ) { }

  ngOnInit(): void {
    this.fighterConfirmedSubscription = this._eventService.onFighterConfirmed.subscribe((fighter: FoodData) => {
      this.selectedFighter = fighter;
      this.chooseRandomEnemy();
    });
  }

  ngOnDestroy(): void {
    this.fighterConfirmedSubscription?.unsubscribe();
  }

  onStopTheBattleClicked(): void {
    this.stopTheBattle();
  }

  onStartFightClicked(): void {
    this.changeBattleState(true);

    this.setInitialBattleState();
    this.showLatestLogEntry();

    const intervalStep: number = 25; // How often the UI is updated
    this.battleInterval = setInterval(() => {
      this.handleBattleLoop(intervalStep);
    }, intervalStep);
  }

  /**
   * Update this component's state and inform other components about battle state.
   */
  private changeBattleState(battleOngoing: boolean): void {
    this.battleOngoing = battleOngoing;
    this._eventService.fightStateChanged(battleOngoing);
  }

  private handleBattleLoop(intervalStep: number): void {
    if (!this.battleState || !this.enemyFighter || !this.selectedFighter) {
      return;
    }

    this.battleState.time += intervalStep;
    
    if (this.isTimeToAttack(this.selectedFighter)) {
      this.attack('player');
    } else {
      this.updateProgressBar(intervalStep, 'player');
    }

    if (this.isTimeToAttack(this.enemyFighter)) {
      this.attack('enemy');
    } else {
      this.updateProgressBar(intervalStep, 'enemy');
    }
    
    this.checkIfBattleIsOver();
  }

  private attack(character: CharacterIdentity): void {
    if (!this.battleState || !this.selectedFighter || !this.enemyFighter) {
      return;
    }

    if (character === 'enemy') {
      const states = this.handleAttack(this.enemyFighter, this.battleState.enemy, this.selectedFighter, this.battleState.player, this.battleState.time);
      this.updateCharacterStatesAfterAttack(states.defenderState, states.attackerState, character);
    } else {
      const states = this.handleAttack(this.selectedFighter, this.battleState.player, this.enemyFighter, this.battleState.enemy, this.battleState.time);
      this.updateCharacterStatesAfterAttack(states.attackerState, states.defenderState, character);
    }
  }

  updateCharacterStatesAfterAttack(playerState: CharacterState, enemyState: CharacterState, character: CharacterIdentity): void {
    if (!this.battleState) {
      return;
    }

    this.battleState.player = playerState;
    this.battleState.enemy = enemyState;

    setTimeout(() => { // Need to wait for the attack animation to be over
      if (this.battleState)
        (character === 'enemy' ? this.battleState.enemy : this.battleState.player).attacking = false;
    }, 500);
  }

  private handleAttack(attacker: FoodData, attackerState: CharacterState, defender: FoodData, defenderState: CharacterState, currentTime: number): { attackerState: CharacterState; defenderState: CharacterState; } {
    const attackDamage = this.calculateDamage(attacker, defender);
    defenderState.health -= attackDamage;
    attackerState.attackProgressBarProgress = 0;
    attackerState.attacking = true;
    this.addBattleLogEntry(currentTime, attackDamage, attacker.foodNameTranslationId, defenderState.health, defender.foodNameTranslationId);
    return { attackerState, defenderState };
  }

  private updateProgressBar(intervalStep: number, character: CharacterIdentity): void {
    if (!this.battleState) {
      return;
    }
    if (character === 'enemy') {
      this.battleState.enemy.attackProgressBarProgress = getProgressBarProgress(this.battleState.enemy.attackProgressBarProgress);
      return;
    }
    this.battleState.player.attackProgressBarProgress = getProgressBarProgress(this.battleState.player.attackProgressBarProgress);

    function getProgressBarProgress(progressBar: number): number {
      return progressBar += intervalStep / 1000;
    }
  }

  private isTimeToAttack(fighter: FoodData): boolean {
    if (!this.battleState) {
      return false;
    }
    return this.battleState.time % (fighter.delay * 1000) === 0;
  }

  private setInitialBattleState(): void {
    this.battleState = {
      player: {
        attacking: false,
        attackProgressBarProgress: 0,
        dead: false,
        health: this.selectedFighter?.health || 0,
      },
      enemy: {
        attacking: false,
        attackProgressBarProgress: 0,
        dead: false,
        health: this.enemyFighter?.health || 0,
      },
      time: 0,
      log: [{
        time_s: 0,
        messageTranslationId: 'Log.MatchStarted',
      }],
    };
  }

  private checkIfBattleIsOver(): void {
    if (!this.battleState || !this.enemyFighter || !this.selectedFighter || (this.battleState.enemy.health > 0 && this.battleState.player.health > 0)) {
      return;
    }

    this.battleState.player.dead = this.battleState.player.health <= 0;
    this.battleState.enemy.dead = this.battleState.enemy.health <= 0;

    const tie = this.battleState.player.dead && this.battleState.enemy.dead;
    this.battleState.log.push({
      time_s: this.battleState.time / 1000,
      messageTranslationId: tie ? 'Log.BattleHasEndedWithTie' : 'Log.BattleHasEndedWithWinner',
      winnerNameTranslationId: tie
        ? ''
        : this.battleState.player.dead
          ? this.enemyFighter.foodNameTranslationId
          : this.selectedFighter.foodNameTranslationId,
    });
    this.showLatestLogEntry();
    this.stopTheBattle();
  }

  private stopTheBattle(): void {
    clearInterval(this.battleInterval);
    this.changeBattleState(false);
  }

  private addBattleLogEntry(time_ms: number, playerAttackDamage: number, attackerTranslationId: string, defenderHealth: number, defenderTranslationId: string): void {
    this.battleState?.log.push({
      time_s: time_ms / 1000,
      attackerDamage: playerAttackDamage,
      attackerTranslationId: attackerTranslationId,
      defenderHealth: defenderHealth,
      defenderTranslationId: defenderTranslationId,
    });
    this.showLatestLogEntry();
  }

  private showLatestLogEntry(): void {
    requestAnimationFrame(() => {
      this.logEntries.last.nativeElement.scrollIntoView({ behavior: 'smooth' });
    });
  }

  calculateDamage(attacker: FoodData, defender: FoodData): number {
    return attacker.attack - attacker.attack * (defender.defence / 100);
  }

  /**
   * Choose a new enemy randomly.
   * Only not random thing is that the enemy can't be the same as the previous enemy or the same as the player's character.
   */
  chooseRandomEnemy(): void {
    const availableFighters = this.foodData.filter(food => food.foodNameTranslationId !== this.enemyFighter?.foodNameTranslationId && food.foodNameTranslationId !== this.selectedFighter?.foodNameTranslationId);
    const randomIndex: number = randomInt(0, availableFighters.length - 1);
    this.enemyFighter = availableFighters[randomIndex];
  }
}

function getFightAnimations(): any[] | undefined {
  return [
    trigger('battle', [
      state('loading', style({})),
      state('player-attack', style({})),
      state('enemy-attack', style({})),
      state('player-defeated', style({
        transform: 'rotate(-90deg)'
      })),
      state('enemy-defeated', style({
        transform: 'rotate(90deg)'
      })),
      transition('loading => player-attack', [
        animate('0.5s', keyframes([
          style({ transform: 'rotate(0)', offset: 0 }),
          style({ transform: 'rotate(-8deg)', offset: 0.25 }),
          style({ transform: 'rotate(35deg)', offset: 0.75 }),
          style({ transform: 'rotate(0)', offset: 1.0 }),
        ]))
      ]),
      transition('loading => enemy-attack', [
        animate('0.5s', keyframes([
          style({ transform: 'rotate(0)', offset: 0 }),
          style({ transform: 'rotate(8deg)', offset: 0.25 }),
          style({ transform: 'rotate(-35deg)', offset: 0.75 }),
          style({ transform: 'rotate(0)', offset: 1.0 }),
        ]))
      ]),
      transition('* => player-defeated', animate('0.5s')),
      transition('* => enemy-defeated', animate('0.5s'))
    ]),
  ];
}
