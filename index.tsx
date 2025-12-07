/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ============================================================================
// POKER GAME - CONSTANTS AND TYPES
// ============================================================================

const SUITS = ['♥', '♦', '♣', '♠'] as const;
const RANKS = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'T',
  'J',
  'Q',
  'K',
  'A',
] as const;

type Suit = (typeof SUITS)[number];
type Rank = (typeof RANKS)[number];

interface Card {
  suit: Suit;
  rank: Rank;
  value: number;
}

enum HandRank {
  HIGH_CARD,
  ONE_PAIR,
  TWO_PAIR,
  THREE_OF_A_KIND,
  STRAIGHT,
  FLUSH,
  FULL_HOUSE,
  FOUR_OF_A_KIND,
  STRAIGHT_FLUSH,
  ROYAL_FLUSH,
}

const HAND_RANK_NAMES: {[key in HandRank]: string} = {
  [HandRank.HIGH_CARD]: 'High Card',
  [HandRank.ONE_PAIR]: 'One Pair',
  [HandRank.TWO_PAIR]: 'Two Pair',
  [HandRank.THREE_OF_A_KIND]: 'Three of a Kind',
  [HandRank.STRAIGHT]: 'Straight',
  [HandRank.FLUSH]: 'Flush',
  [HandRank.FULL_HOUSE]: 'Full House',
  [HandRank.FOUR_OF_A_KIND]: 'Four of a Kind',
  [HandRank.STRAIGHT_FLUSH]: 'Straight Flush',
  [HandRank.ROYAL_FLUSH]: 'Royal Flush',
};

interface HandResult {
  rank: HandRank;
  values: number[]; // For kickers
  name: string;
}

interface Player {
  id: 'player' | 'ai';
  name: string;
  cards: Card[];
  stack: number;
  currentBet: number;
  hasActed: boolean;
  isAllIn: boolean;
  folded: boolean;
  isDealer: boolean;
  handResult?: HandResult;
}

type GameStage =
  | 'pre-deal'
  | 'pre-flop'
  | 'flop'
  | 'turn'
  | 'river'
  | 'showdown';

// ============================================================================
// POKER GAME CLASS
// ============================================================================

class PokerGame {
  // Game State
  private players: Player[];
  private deck: Card[] = [];
  private communityCards: Card[] = [];
  private pot = 0;
  private currentPlayerIndex = 0;
  private currentBet = 0;
  private smallBlind = 10;
  private bigBlind = 20;
  private dealerIndex = 0;
  private stage: GameStage = 'pre-deal';

  // DOM Elements
  private readonly playerArea: HTMLElement;
  private readonly aiArea: HTMLElement;
  private readonly communityCardArea: HTMLElement;
  private readonly potAmountEl: HTMLElement;
  private readonly messageEl: HTMLElement;
  private readonly foldBtn: HTMLButtonElement;
  private readonly checkCallBtn: HTMLButtonElement;
  private readonly betRaiseBtn: HTMLButtonElement;
  private readonly betSliderContainer: HTMLElement;
  private readonly betSlider: HTMLInputElement;
  private readonly betAmountDisplay: HTMLElement;
  private readonly confirmBetBtn: HTMLButtonElement;
  private readonly cancelBetBtn: HTMLButtonElement;

  constructor() {
    this.playerArea = document.getElementById('player-area')!;
    this.aiArea = document.getElementById('ai-area')!;
    this.communityCardArea = document.getElementById('community-cards')!;
    this.potAmountEl = document.querySelector('.pot-amount')!;
    this.messageEl = document.getElementById('message')!;

    // Controls
    this.foldBtn = document.getElementById('fold-btn') as HTMLButtonElement;
    this.checkCallBtn = document.getElementById(
      'check-call-btn',
    ) as HTMLButtonElement;
    this.betRaiseBtn = document.getElementById(
      'bet-raise-btn',
    ) as HTMLButtonElement;
    this.betSliderContainer = document.getElementById('bet-slider-container')!;
    this.betSlider = document.getElementById('bet-slider') as HTMLInputElement;
    this.betAmountDisplay = document.getElementById('bet-amount-display')!;
    this.confirmBetBtn = document.getElementById(
      'confirm-bet-btn',
    ) as HTMLButtonElement;
    this.cancelBetBtn = document.getElementById(
      'cancel-bet-btn',
    ) as HTMLButtonElement;

    // Initialize Players
    this.players = [
      {
        id: 'player',
        name: 'You',
        cards: [],
        stack: 1000,
        currentBet: 0,
        hasActed: false,
        isAllIn: false,
        folded: false,
        isDealer: true,
      },
      {
        id: 'ai',
        name: 'AI Bot',
        cards: [],
        stack: 1000,
        currentBet: 0,
        hasActed: false,
        isAllIn: false,
        folded: false,
        isDealer: false,
      },
    ];

    this.setupEventListeners();
  }

  /**
   * Sets up all the necessary event listeners for player controls.
   */
  private setupEventListeners() {
    this.foldBtn.addEventListener('click', () => this.handlePlayerFold());
    this.checkCallBtn.addEventListener('click', () =>
      this.handlePlayerCheckCall(),
    );
    this.betRaiseBtn.addEventListener('click', () =>
      this.handlePlayerBetRaise(),
    );
    this.confirmBetBtn.addEventListener('click', () =>
      this.handlePlayerConfirmBet(),
    );
    this.cancelBetBtn.addEventListener('click', () =>
      this.hideBetSlider(),
    );
    this.betSlider.addEventListener('input', () => this.updateBetAmountDisplay());
  }

  // ==========================================================================
  // GAME FLOW
  // ==========================================================================

  /**
   * Starts a new game.
   */
  public startGame() {
    this.startNewHand();
  }

  /**
   * Resets the state and starts a new hand.
   */
  private startNewHand() {
    // Reset players and table
    this.communityCards = [];
    this.pot = 0;
    this.currentBet = 0;
    this.stage = 'pre-deal';

    // Alternate dealer position
    this.dealerIndex = (this.dealerIndex + 1) % this.players.length;

    this.players.forEach((player, index) => {
      player.cards = [];
      player.currentBet = 0;
      player.folded = false;
      player.isAllIn = false;
      player.hasActed = false;
      player.handResult = undefined;
      player.isDealer = index === this.dealerIndex;
      if (player.stack === 0) {
        // Reset stack if player busted
        player.stack = 1000;
      }
    });
    
    // UI Cleanup
    this.aiArea.classList.remove('winner');
    this.playerArea.classList.remove('winner');
    this.hideActionBubble('ai');


    this.updateAllUI();
    this.displayMessage('Starting new hand...');

    setTimeout(() => {
      this.deck = this.createDeck();
      this.shuffleDeck();
      this.postBlinds();
    }, 1500);
  }

  /**
   * Posts the small and big blinds.
   */
  private postBlinds() {
    const smallBlindIndex = (this.dealerIndex + 1) % this.players.length;
    const bigBlindIndex = (this.dealerIndex + 2) % this.players.length;

    const sbPlayer = this.players[smallBlindIndex];
    const bbPlayer = this.players[bigBlindIndex];

    this.displayMessage(`${sbPlayer.name} posts small blind.`);
    this.playerBet(sbPlayer, this.smallBlind);
    this.updatePlayerUI(sbPlayer);
    this.updatePotUI();

    setTimeout(() => {
      this.displayMessage(`${bbPlayer.name} posts big blind.`);
      this.playerBet(bbPlayer, this.bigBlind);
      this.currentBet = this.bigBlind;
      this.updatePlayerUI(bbPlayer);
      this.updatePotUI();
      
      this.currentPlayerIndex = (bigBlindIndex + 1) % this.players.length;

      setTimeout(() => this.dealHoleCards(), 1000);
    }, 1000);
  }

  /**
   * Deals two hole cards to each player.
   */
  private dealHoleCards() {
    this.stage = 'pre-flop';
    this.displayMessage('Dealing cards...');

    for (let i = 0; i < 2; i++) {
      for (const player of this.players) {
        const card = this.deck.pop();
        if (card) {
          player.cards.push(card);
        }
      }
    }

    this.updateAllUI();
    this.startBettingRound();
  }
  
  /**
   * Deals the flop (3 community cards).
   */
  private dealFlop() {
    this.stage = 'flop';
    this.displayMessage('Dealing the flop...');
    this.burnCard();
    for (let i = 0; i < 3; i++) {
      const card = this.deck.pop();
      if (card) this.communityCards.push(card);
    }
    this.startBettingRound();
  }

  /**
   * Deals the turn (1 community card).
   */
  private dealTurn() {
    this.stage = 'turn';
    this.displayMessage('Dealing the turn...');
    this.burnCard();
    const card = this.deck.pop();
    if (card) this.communityCards.push(card);
    this.startBettingRound();
  }
  
  /**
   * Deals the river (1 community card).
   */
  private dealRiver() {
    this.stage = 'river';
    this.displayMessage('Dealing the river...');
    this.burnCard();
    const card = this.deck.pop();
    if (card) this.communityCards.push(card);
    this.startBettingRound();
  }

  private burnCard() {
    this.deck.pop();
  }

  /**
   * Handles the showdown, evaluating hands and determining the winner.
   */
  private showdown() {
    this.stage = 'showdown';
    this.displayMessage('Showdown!');
    this.disableControls();
    
    const activePlayers = this.players.filter(p => !p.folded);

    // Reveal AI cards
    this.updatePlayerUI(this.players.find(p => p.id === 'ai')!, true);

    activePlayers.forEach(player => {
      const allCards = [...player.cards, ...this.communityCards];
      player.handResult = this.evaluateHand(allCards);
    });

    let winners = [activePlayers[0]];

    for (let i = 1; i < activePlayers.length; i++) {
      const comparison = this.compareHands(winners[0].handResult!, activePlayers[i].handResult!);
      if (comparison < 0) {
        winners = [activePlayers[i]];
      } else if (comparison === 0) {
        winners.push(activePlayers[i]);
      }
    }

    setTimeout(() => {
      if (winners.length > 1) {
          this.displayMessage(`Split pot! Both win with ${winners[0].handResult!.name}.`);
      } else {
          this.displayMessage(`${winners[0].name} wins with ${winners[0].handResult!.name}!`);
      }
      
      this.awardPot(winners);
      
      winners.forEach(winner => {
          const winnerArea = document.getElementById(`${winner.id}-area`);
          winnerArea?.classList.add('winner');
      });

      setTimeout(() => this.startNewHand(), 5000);
    }, 2000);
  }

  /**
   * Awards the pot to the winner(s).
   * @param winners An array of winning players.
   */
  private awardPot(winners: Player[]) {
    const amountWon = this.pot / winners.length;
    winners.forEach(winner => {
      winner.stack += amountWon;
    });
    this.pot = 0;
    this.updateAllUI();
  }


  // ==========================================================================
  // BETTING LOGIC
  // ==========================================================================

  /**
   * Starts a new betting round.
   */
  private startBettingRound() {
    // Reset player action status for the new round, unless they are all-in
    this.players.forEach(p => {
      if (!p.isAllIn) p.hasActed = false;
    });

    if (this.stage !== 'pre-flop') {
      this.currentPlayerIndex = (this.dealerIndex + 1) % this.players.length;
      this.currentBet = 0;
      this.players.forEach(p => p.currentBet = 0);
    }
    
    this.updateAllUI();
    this.promptNextPlayer();
  }

  /**
   * Checks if the betting round is over.
   */
  private isBettingRoundOver(): boolean {
    const activePlayers = this.players.filter(p => !p.folded && !p.isAllIn);
    if (activePlayers.length <= 1) return true;
    
    const allHaveActed = activePlayers.every(p => p.hasActed);
    const betsAreEqual = activePlayers.every(p => p.currentBet === activePlayers[0].currentBet);

    return allHaveActed && betsAreEqual;
  }
  
  /**
   * Collects bets from players and moves them to the pot.
   */
  private collectBets() {
      this.players.forEach(p => {
          this.pot += p.currentBet;
          p.currentBet = 0;
      });
      this.currentBet = 0;
  }

  /**
   * Moves to the next stage of the game after a betting round.
   */
  private nextStage() {
    this.collectBets();
    this.updatePotUI();
    this.updateAllPlayersUI();

    const activePlayers = this.players.filter(p => !p.folded);
    if (activePlayers.length === 1) {
      this.displayMessage(`${activePlayers[0].name} wins the pot!`);
      this.awardPot(activePlayers);
      setTimeout(() => this.startNewHand(), 3000);
      return;
    }

    setTimeout(() => {
      switch (this.stage) {
        case 'pre-flop': this.dealFlop(); break;
        case 'flop': this.dealTurn(); break;
        case 'turn': this.dealRiver(); break;
        case 'river': this.showdown(); break;
      }
    }, 1000);
  }

  /**
   * Prompts the next player to act.
   */
  private promptNextPlayer() {
    if (this.isBettingRoundOver()) {
      this.nextStage();
      return;
    }
    
    const currentPlayer = this.players[this.currentPlayerIndex];
    if (currentPlayer.folded || currentPlayer.isAllIn) {
      this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
      this.promptNextPlayer();
      return;
    }

    if (currentPlayer.id === 'player') {
      this.enableControls();
      this.displayMessage("Your turn.");
    } else {
      this.disableControls();
      this.displayMessage("AI is thinking...");
      setTimeout(() => this.getAIAction(), 1500 + Math.random() * 1000);
    }
  }

  /**
   * Helper function for a player to make a bet.
   * @param player The player making the bet.
   * @param amount The amount to bet.
   */
  private playerBet(player: Player, amount: number) {
      const actualAmount = Math.min(amount, player.stack);
      player.stack -= actualAmount;
      player.currentBet += actualAmount;
      if (player.stack === 0) {
          player.isAllIn = true;
          this.displayMessage(`${player.name} is all-in!`);
      }
  }


  // ==========================================================================
  // PLAYER ACTIONS
  // ==========================================================================

  private handlePlayerFold() {
    const player = this.players.find(p => p.id === 'player')!;
    player.folded = true;
    this.displayMessage('You fold.');
    this.disableControls();
    this.endPlayerTurn();
  }

  private handlePlayerCheckCall() {
    const player = this.players.find(p => p.id === 'player')!;
    const callAmount = this.currentBet - player.currentBet;

    if (callAmount > 0) {
        this.displayMessage(`You call ${callAmount}.`);
        this.playerBet(player, callAmount);
    } else {
        this.displayMessage('You check.');
    }
    
    this.disableControls();
    this.endPlayerTurn();
  }

  private handlePlayerBetRaise() {
    const player = this.players.find(p => p.id === 'player')!;
    const minRaise = this.currentBet > 0 ? this.currentBet * 2 : this.bigBlind;
    const minBet = Math.max(this.bigBlind, minRaise - player.currentBet);
    
    if (player.stack <= minBet) { // Player must go all-in
      this.playerBet(player, player.stack);
      this.displayMessage(`You go all-in for ${player.currentBet}`);
      this.currentBet = Math.max(this.currentBet, player.currentBet);
      this.endPlayerTurn();
    } else {
      this.showBetSlider(minBet, player.stack + player.currentBet, minBet);
    }
  }
  
  private handlePlayerConfirmBet() {
      const player = this.players.find(p => p.id === 'player')!;
      const betAmount = parseInt(this.betSlider.value, 10);
      const isRaise = this.currentBet > 0;

      this.displayMessage(`You ${isRaise ? 'raise to' : 'bet'} ${betAmount}.`);
      
      const amountToPutIn = betAmount - player.currentBet;
      this.playerBet(player, amountToPutIn);
      this.currentBet = player.currentBet;

      this.hideBetSlider();
      this.disableControls();
      this.endPlayerTurn();
  }

  /**
   * Finalizes the player's turn and prompts the next player.
   */
  private endPlayerTurn() {
    const player = this.players[this.currentPlayerIndex];
    player.hasActed = true;
    this.updatePlayerUI(player);
    this.updatePotUI();

    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    setTimeout(() => this.promptNextPlayer(), 500);
  }

  // ==========================================================================
  // AI LOGIC
  // ==========================================================================
  
  /**
   * Determines and executes the AI's action.
   */
  private getAIAction() {
    const ai = this.players.find(p => p.id === 'ai')!;
    const callAmount = this.currentBet - ai.currentBet;
    
    // Basic hand strength evaluation (0-1 scale)
    const handStrength = this.evaluateAIHandStrength(ai);

    // Decision making
    if (callAmount === 0) { // AI can check or bet
        if (handStrength > 0.8 && Math.random() < 0.8) { // Strong hand, likely to bet
            const betAmount = this.calculateBetSize(ai, handStrength);
            this.aiBet(ai, betAmount);
        } else if (handStrength > 0.5 && Math.random() < 0.6) { // Decent hand, might bet
            const betAmount = this.calculateBetSize(ai, handStrength);
            this.aiBet(ai, betAmount);
        } else {
            this.aiCheck(ai);
        }
    } else { // AI must fold, call, or raise
        const potOdds = callAmount / (this.pot + callAmount);
        
        if (handStrength > potOdds) {
            if (handStrength > 0.85 && Math.random() < 0.7) { // Very strong hand, likely raise
                const raiseAmount = this.calculateBetSize(ai, handStrength, true);
                this.aiRaise(ai, raiseAmount);
            } else { // Good enough to call
                this.aiCall(ai, callAmount);
            }
        } else {
            // Bluffing logic
            if (this.stage === 'river' && Math.random() < 0.1) {
                const raiseAmount = this.calculateBetSize(ai, handStrength, true);
                this.aiRaise(ai, raiseAmount);
            } else {
                this.aiFold(ai);
            }
        }
    }
  }

  private aiFold(ai: Player) {
      ai.folded = true;
      this.displayMessage("AI folds.");
      this.showActionBubble('ai', 'Fold');
      this.endPlayerTurn();
  }

  private aiCheck(ai: Player) {
      this.displayMessage("AI checks.");
      this.showActionBubble('ai', 'Check');
      this.endPlayerTurn();
  }

  private aiCall(ai: Player, callAmount: number) {
      this.displayMessage(`AI calls ${callAmount}.`);
      this.showActionBubble('ai', `Call ${callAmount}`);
      this.playerBet(ai, callAmount);
      this.endPlayerTurn();
  }

  private aiBet(ai: Player, amount: number) {
      this.displayMessage(`AI bets ${amount}.`);
      this.showActionBubble('ai', `Bet ${amount}`);
      this.playerBet(ai, amount);
      this.currentBet = ai.currentBet;
      this.endPlayerTurn();
  }

  private aiRaise(ai: Player, amount: number) {
      this.displayMessage(`AI raises to ${amount}.`);
      this.showActionBubble('ai', `Raise to ${amount}`);
      const amountToPutIn = amount - ai.currentBet;
      this.playerBet(ai, amountToPutIn);
      this.currentBet = ai.currentBet;
      this.endPlayerTurn();
  }

  /**
   * Calculates a reasonable bet size for the AI.
   */
  private calculateBetSize(ai: Player, strength: number, isRaise = false): number {
      let betRatio = 0.5; // Default 1/2 pot
      if (strength > 0.9) betRatio = 1; // Pot size bet
      else if (strength > 0.7) betRatio = 0.75; // 3/4 pot
      
      let betAmount = Math.floor(this.pot * betRatio);

      if (isRaise) {
          const minRaise = this.currentBet > 0 ? this.currentBet * 2 : this.bigBlind;
          betAmount = Math.max(minRaise, betAmount);
      } else {
          betAmount = Math.max(this.bigBlind, betAmount);
      }

      return Math.min(ai.stack + ai.currentBet, betAmount);
  }

  /**
   * Very basic AI hand strength evaluation. Returns a value between 0 and 1.
   */
  private evaluateAIHandStrength(ai: Player): number {
    const combinedCards = [...ai.cards, ...this.communityCards];
    
    if (combinedCards.length < 2) return 0;

    const result = this.evaluateHand(combinedCards);
    let strength = result.rank / HandRank.ROYAL_FLUSH; // Base strength from hand rank

    // Add value for high cards/kickers
    strength += (result.values[0] / 13) * 0.05;

    // TODO: Add logic for draws on flop/turn
    
    return Math.min(strength, 1);
  }

  // ==========================================================================
  // DECK AND CARD UTILITIES
  // ==========================================================================

  /**
   * Creates a standard 52-card deck.
   * @returns An array of Card objects.
   */
  private createDeck(): Card[] {
    const deck: Card[] = [];
    SUITS.forEach((suit) => {
      RANKS.forEach((rank, index) => {
        deck.push({suit, rank, value: index + 2});
      });
    });
    return deck;
  }

  /**
   * Shuffles the deck using the Fisher-Yates algorithm.
   */
  private shuffleDeck() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  // ==========================================================================
  // HAND EVALUATION LOGIC
  // ==========================================================================

  /**
   * Evaluates a given set of cards and returns the best 5-card hand.
   * @param cards An array of 5 to 7 cards.
   * @returns A HandResult object.
   */
  private evaluateHand(cards: Card[]): HandResult {
    const combos = this.getCombinations(cards, 5);
    let bestHandResult: HandResult = { rank: HandRank.HIGH_CARD, values: [0], name: '' };

    for (const combo of combos) {
      const result = this.getHandRank(combo);
      if (this.compareHands(bestHandResult, result) < 0) {
          bestHandResult = result;
      }
    }
    bestHandResult.name = HAND_RANK_NAMES[bestHandResult.rank];
    return bestHandResult;
  }

  /**
   * Gets all combinations of a certain size from an array.
   */
  private getCombinations<T>(arr: T[], size: number): T[][] {
    const result: T[][] = [];
    function combo(index: number, currentCombo: T[]) {
      if (currentCombo.length === size) {
        result.push(currentCombo);
        return;
      }
      if (index === arr.length) return;
      combo(index + 1, [...currentCombo, arr[index]]);
      combo(index + 1, currentCombo);
    }
    combo(0, []);
    return result;
  }

  /**
   * Compares two hand results.
   * @returns > 0 if hand1 wins, < 0 if hand2 wins, 0 for a tie.
   */
  private compareHands(hand1: HandResult, hand2: HandResult): number {
    if (hand1.rank !== hand2.rank) {
      return hand1.rank - hand2.rank;
    }
    for (let i = 0; i < hand1.values.length; i++) {
      if (hand1.values[i] !== hand2.values[i]) {
        return hand1.values[i] - hand2.values[i];
      }
    }
    return 0;
  }
  
  /**
   * Determines the rank of a 5-card hand.
   */
  private getHandRank(hand: Card[]): HandResult {
    const sortedHand = [...hand].sort((a, b) => b.value - a.value);
    const values = sortedHand.map(c => c.value);
    const suits = sortedHand.map(c => c.suit);
    const isFlush = suits.every(s => s === suits[0]);
    const isStraight = values.every((v, i) => i === 0 || v === values[i-1] - 1);
    const isAceLowStraight = JSON.stringify(values) === JSON.stringify([14, 5, 4, 3, 2]);

    if (isStraight && isFlush) {
        if (values[0] === 14) return { rank: HandRank.ROYAL_FLUSH, values: [], name: HAND_RANK_NAMES[HandRank.ROYAL_FLUSH] };
        return { rank: HandRank.STRAIGHT_FLUSH, values, name: HAND_RANK_NAMES[HandRank.STRAIGHT_FLUSH] };
    }

    const valueCounts: {[key: number]: number} = {};
    values.forEach(v => valueCounts[v] = (valueCounts[v] || 0) + 1);
    const counts = Object.values(valueCounts).sort((a,b) => b-a);
    const pairValues = values.filter((v, i) => values.indexOf(v) !== i);

    if (counts[0] === 4) {
        const four = Object.keys(valueCounts).find(k => valueCounts[parseInt(k)] === 4)!;
        const kicker = Object.keys(valueCounts).find(k => valueCounts[parseInt(k)] === 1)!;
        return { rank: HandRank.FOUR_OF_A_KIND, values: [parseInt(four), parseInt(kicker)], name: HAND_RANK_NAMES[HandRank.FOUR_OF_A_KIND] };
    }

    if (counts[0] === 3 && counts[1] === 2) {
        const three = Object.keys(valueCounts).find(k => valueCounts[parseInt(k)] === 3)!;
        const pair = Object.keys(valueCounts).find(k => valueCounts[parseInt(k)] === 2)!;
        return { rank: HandRank.FULL_HOUSE, values: [parseInt(three), parseInt(pair)], name: HAND_RANK_NAMES[HandRank.FULL_HOUSE] };
    }

    if (isFlush) return { rank: HandRank.FLUSH, values, name: HAND_RANK_NAMES[HandRank.FLUSH] };
    
    if (isStraight) return { rank: HandRank.STRAIGHT, values, name: HAND_RANK_NAMES[HandRank.STRAIGHT] };
    if (isAceLowStraight) return { rank: HandRank.STRAIGHT, values: [5,4,3,2,1], name: HAND_RANK_NAMES[HandRank.STRAIGHT] };


    if (counts[0] === 3) {
        const three = Object.keys(valueCounts).find(k => valueCounts[parseInt(k)] === 3)!;
        const kickers = values.filter(v => v !== parseInt(three));
        return { rank: HandRank.THREE_OF_A_KIND, values: [parseInt(three), ...kickers], name: HAND_RANK_NAMES[HandRank.THREE_OF_A_KIND] };
    }
    
    if (counts[0] === 2 && counts[1] === 2) {
        const pairs = Object.keys(valueCounts).filter(k => valueCounts[parseInt(k)] === 2).map(p => parseInt(p)).sort((a,b) => b-a);
        const kicker = values.find(v => !pairs.includes(v));
        return { rank: HandRank.TWO_PAIR, values: [...pairs, kicker!], name: HAND_RANK_NAMES[HandRank.TWO_PAIR] };
    }

    if (counts[0] === 2) {
        const pair = Object.keys(valueCounts).find(k => valueCounts[parseInt(k)] === 2)!;
        const kickers = values.filter(v => v !== parseInt(pair));
        return { rank: HandRank.ONE_PAIR, values: [parseInt(pair), ...kickers], name: HAND_RANK_NAMES[HandRank.ONE_PAIR] };
    }

    return { rank: HandRank.HIGH_CARD, values, name: HAND_RANK_NAMES[HandRank.HIGH_CARD] };
  }


  // ==========================================================================
  // UI RENDERING AND CONTROLS
  // ==========================================================================

  /**
   * Creates the HTML element for a single card.
   * @param card The card object.
   * @param isFaceUp Whether the card should be rendered face up.
   * @returns An HTMLElement representing the card.
   */
  private createCardElement(card: Card, isFaceUp: boolean): HTMLElement {
    const cardEl = document.createElement('div');
    cardEl.classList.add('card');
    
    if (isFaceUp) {
      const isRed = card.suit === '♥' || card.suit === '♦';
      cardEl.classList.add(isRed ? 'red' : 'black');
      
      const rankEl = document.createElement('span');
      rankEl.classList.add('rank');
      rankEl.textContent = card.rank;
      
      const suitEl = document.createElement('span');
      suitEl.classList.add('suit');
      suitEl.textContent = card.suit;

      const suitCornerEl = document.createElement('span');
      suitCornerEl.classList.add('suit-corner');
      suitCornerEl.textContent = card.suit;
      
      cardEl.appendChild(rankEl);
      cardEl.appendChild(suitEl);
      cardEl.appendChild(suitCornerEl);
    } else {
      cardEl.classList.add('back');
    }
    return cardEl;
  }

  /**
   * Updates the UI for a single player.
   */
  private updatePlayerUI(player: Player, showCards = false) {
    const area = player.id === 'player' ? this.playerArea : this.aiArea;
    const stackEl = area.querySelector('.stack')!;
    const cardsEl = area.querySelector('.cards')!;
    const betEl = area.querySelector('.bet-amount')!;
    const dealerChip = area.querySelector('.dealer-chip') as HTMLElement;

    stackEl.textContent = player.stack.toString();
    betEl.textContent = player.currentBet > 0 ? player.currentBet.toString() : '';
    dealerChip.style.display = player.isDealer ? 'flex' : 'none';

    cardsEl.innerHTML = '';
    player.cards.forEach((card, index) => {
      const isFaceUp = player.id === 'player' || showCards;
      const cardEl = this.createCardElement(card, isFaceUp);
      cardEl.classList.add('deal-card');
      cardEl.style.animationDelay = `${index * 100}ms`;
      cardsEl.appendChild(cardEl);
    });
  }

  private updateAllPlayersUI(showdown = false) {
      this.players.forEach(p => this.updatePlayerUI(p, showdown));
  }

  /**
   * Updates the community cards on the table.
   */
  private updateCommunityCardsUI() {
    this.communityCardArea.innerHTML = '';
    this.communityCards.forEach((card, index) => {
        const cardEl = this.createCardElement(card, true);
        cardEl.classList.add('deal-card');
        cardEl.style.animationDelay = `${index * 100}ms`;
        this.communityCardArea.appendChild(cardEl);
    });
  }

  /**
   * Updates the pot display.
   */
  private updatePotUI() {
      let totalPot = this.pot;
      this.players.forEach(p => totalPot += p.currentBet);
      this.potAmountEl.textContent = totalPot.toString();
  }
  
  /**
   * Updates all UI elements to reflect the current game state.
   */
  private updateAllUI() {
    this.updateAllPlayersUI(this.stage === 'showdown');
    this.updateCommunityCardsUI();
    this.updatePotUI();
    this.updateControls();
  }
  
  /**
   * Updates the player control buttons based on the game state.
   */
  private updateControls() {
    const player = this.players.find(p => p.id === 'player')!;
    const callAmount = this.currentBet - player.currentBet;

    // Check/Call button
    if (callAmount > 0) {
      this.checkCallBtn.textContent = `Call ${callAmount}`;
    } else {
      this.checkCallBtn.textContent = 'Check';
    }

    // Bet/Raise button
    if (this.currentBet > 0) {
      this.betRaiseBtn.textContent = 'Raise';
    } else {
      this.betRaiseBtn.textContent = 'Bet';
    }
  }

  /**
   * Enables player controls.
   */
  private enableControls() {
    this.foldBtn.disabled = false;
    this.checkCallBtn.disabled = false;
    this.betRaiseBtn.disabled = false;
  }

  /**
   * Disables player controls.
   */
  private disableControls() {
    this.foldBtn.disabled = true;
    this.checkCallBtn.disabled = true;
    this.betRaiseBtn.disabled = true;
  }

  /**
   * Displays a message in the message box.
   */
  private displayMessage(msg: string) {
    this.messageEl.textContent = msg;
    this.messageEl.classList.remove('slide-in');
    void this.messageEl.offsetWidth; // Trigger reflow
    this.messageEl.classList.add('slide-in');
  }

  /**
   * Shows the bet slider for the player.
   */
  private showBetSlider(min: number, max: number, defaultValue: number) {
    (document.querySelector('.actions') as HTMLElement).style.display = 'none';
    this.betSliderContainer.style.display = 'block';
    
    this.betSlider.min = min.toString();
    this.betSlider.max = max.toString();
    this.betSlider.value = defaultValue.toString();
    this.updateBetAmountDisplay();
  }

  /**
   * Hides the bet slider.
   */
  private hideBetSlider() {
    (document.querySelector('.actions') as HTMLElement).style.display = 'flex';
    this.betSliderContainer.style.display = 'none';
  }

  /**
   * Updates the bet amount display based on the slider value.
   */
  private updateBetAmountDisplay() {
    this.betAmountDisplay.textContent = this.betSlider.value;
  }

  private showActionBubble(playerId: 'ai' | 'player', text: string) {
      const area = document.getElementById(`${playerId}-area`);
      if (!area) return;
      const bubble = area.querySelector('.action-bubble') as HTMLElement;
      if (!bubble) return;

      bubble.textContent = text;
      bubble.style.display = 'block';
      setTimeout(() => {
          bubble.style.display = 'none';
      }, 2000);
  }

  private hideActionBubble(playerId: 'ai' | 'player') {
      const area = document.getElementById(`${playerId}-area`);
      if (!area) return;
      const bubble = area.querySelector('.action-bubble') as HTMLElement;
      if (bubble) bubble.style.display = 'none';
  }
}

// ============================================================================
// CASINO APP INITIALIZATION
// ============================================================================

class CasinoApp {
  private lobbyView: HTMLElement;
  private pokerGameView: HTMLElement;
  private playPokerBtn: HTMLElement;
  private backToLobbyBtn: HTMLElement;

  private pokerGame: PokerGame | null = null;

  constructor() {
    this.lobbyView = document.getElementById('casino-lobby-view')!;
    this.pokerGameView = document.getElementById('poker-game-view')!;
    this.playPokerBtn = document.getElementById('play-poker-btn')!;
    this.backToLobbyBtn = document.getElementById('back-to-lobby-btn')!;

    this.setupEventListeners();
    this.showLobby();
  }

  private setupEventListeners() {
    this.playPokerBtn.addEventListener('click', () => this.startPoker());
    this.backToLobbyBtn.addEventListener('click', () => this.showLobby());
  }

  private startPoker() {
    this.lobbyView.style.display = 'none';
    this.pokerGameView.style.display = 'flex';
    this.pokerGame = new PokerGame();
    this.pokerGame.startGame();
  }

  private showLobby() {
    this.pokerGameView.style.display = 'none';
    this.lobbyView.style.display = 'flex';
    this.pokerGame = null; // Discard the old game instance
  }
}

new CasinoApp();

export {};
