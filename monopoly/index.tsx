// Type Definitions
type PropertyGroup = 'Brown' | 'LightBlue' | 'Pink' | 'Orange' | 'Red' | 'Yellow' | 'Green' | 'DarkBlue' | 'Transport' | 'Utility';

interface Space {
  id: number;
  name: string;
  type: 'property' | 'transport' | 'utility' | 'opportunity' | 'community-fund' | 'tax' | 'go' | 'jail' | 'casino' | 'go-to-jail';
}

interface Property extends Space {
  type: 'property' | 'transport' | 'utility';
  price: number;
  group: PropertyGroup;
  rent: number[];
  owner?: number; // player index
  houses: number;
  houseCost: number;
  isMortgaged: boolean;
}

interface Card {
  text: string;
  action: (player: Player) => void;
}

interface Player {
  id: number;
  name: string;
  money: number;
  position: number;
  inJail: boolean;
  jailTurns: number;
  isAI: boolean;
  properties: number[]; // property IDs
  hasVisitedCasino: boolean;
  consecutiveDoubles: number;
  isBankrupt: boolean;
}

interface TradeOffer {
    fromPlayerId: number;
    toPlayerId: number;
    offer: {
        properties: number[];
        money: number;
    };
    request: {
        properties: number[];
        money: number;
    };
}


// Game Constants
const BOARD_DATA: (Property | Space)[] = [
  { id: 0, name: 'GO', type: 'go' },
  { id: 1, name: 'Cairo', type: 'property', price: 60, group: 'Brown', rent: [2, 10, 30, 90, 160, 250], houses: 0, houseCost: 50, isMortgaged: false },
  { id: 2, name: 'Community Fund', type: 'community-fund' },
  { id: 3, name: 'Lima', type: 'property', price: 60, group: 'Brown', rent: [4, 20, 60, 180, 320, 450], houses: 0, houseCost: 50, isMortgaged: false },
  { id: 4, name: 'Income Tax', type: 'tax' },
  { id: 5, name: 'Intl Airport', type: 'transport', price: 200, group: 'Transport', rent: [25, 50, 100, 200], houses: 0, houseCost: 0, isMortgaged: false },
  { id: 6, name: 'Athens', type: 'property', price: 100, group: 'LightBlue', rent: [6, 30, 90, 270, 400, 550], houses: 0, houseCost: 50, isMortgaged: false },
  { id: 7, name: 'Opportunity', type: 'opportunity' },
  { id: 8, name: 'Istanbul', type: 'property', price: 100, group: 'LightBlue', rent: [6, 30, 90, 270, 400, 550], houses: 0, houseCost: 50, isMortgaged: false },
  { id: 9, name: 'Kyiv', type: 'property', price: 120, group: 'LightBlue', rent: [8, 40, 100, 300, 450, 600], houses: 0, houseCost: 50, isMortgaged: false },
  { id: 10, name: 'Jail', type: 'jail' },
  { id: 11, name: 'Toronto', type: 'property', price: 140, group: 'Pink', rent: [10, 50, 150, 450, 625, 750], houses: 0, houseCost: 100, isMortgaged: false },
  { id: 12, name: 'Solar Power', type: 'utility', price: 150, group: 'Utility', rent: [], houses: 0, houseCost: 0, isMortgaged: false },
  { id: 13, name: 'Rome', type: 'property', price: 140, group: 'Pink', rent: [10, 50, 150, 450, 625, 750], houses: 0, houseCost: 100, isMortgaged: false },
  { id: 14, name: 'Shanghai', type: 'property', price: 160, group: 'Pink', rent: [12, 60, 180, 500, 700, 900], houses: 0, houseCost: 100, isMortgaged: false },
  { id: 15, name: 'High-Speed Rail', type: 'transport', price: 200, group: 'Transport', rent: [25, 50, 100, 200], houses: 0, houseCost: 0, isMortgaged: false },
  { id: 16, name: 'Dubai', type: 'property', price: 180, group: 'Orange', rent: [14, 70, 200, 550, 750, 950], houses: 0, houseCost: 100, isMortgaged: false },
  { id: 17, name: 'Community Fund', type: 'community-fund' },
  { id: 18, name: 'Mumbai', type: 'property', price: 180, group: 'Orange', rent: [14, 70, 200, 550, 750, 950], houses: 0, houseCost: 100, isMortgaged: false },
  { id: 19, name: 'Seoul', type: 'property', price: 200, group: 'Orange', rent: [16, 80, 220, 600, 800, 1000], houses: 0, houseCost: 100, isMortgaged: false },
  { id: 20, name: 'Casino', type: 'casino' },
  { id: 21, name: 'Sydney', type: 'property', price: 220, group: 'Red', rent: [18, 90, 250, 700, 875, 1050], houses: 0, houseCost: 150, isMortgaged: false },
  { id: 22, name: 'Opportunity', type: 'opportunity' },
  { id: 23, name: 'São Paulo', type: 'property', price: 220, group: 'Red', rent: [18, 90, 250, 700, 875, 1050], houses: 0, houseCost: 150, isMortgaged: false },
  { id: 24, name: 'Mexico City', type: 'property', price: 240, group: 'Red', rent: [20, 100, 300, 750, 925, 1100], houses: 0, houseCost: 150, isMortgaged: false },
  { id: 25, name: 'Maglev Line', type: 'transport', price: 200, group: 'Transport', rent: [25, 50, 100, 200], houses: 0, houseCost: 0, isMortgaged: false },
  { id: 26, name: 'Berlin', type: 'property', price: 260, group: 'Yellow', rent: [22, 110, 330, 800, 975, 1150], houses: 0, houseCost: 150, isMortgaged: false },
  { id: 27, name: 'Paris', type: 'property', price: 260, group: 'Yellow', rent: [22, 110, 330, 800, 975, 1150], houses: 0, houseCost: 150, isMortgaged: false },
  { id: 28, name: 'Global Internet', type: 'utility', price: 150, group: 'Utility', rent: [], houses: 0, houseCost: 0, isMortgaged: false },
  { id: 29, name: 'London', type: 'property', price: 280, group: 'Yellow', rent: [24, 120, 360, 850, 1025, 1200], houses: 0, houseCost: 150, isMortgaged: false },
  { id: 30, name: 'Go To Jail', type: 'go-to-jail' },
  { id: 31, name: 'Singapore', type: 'property', price: 300, group: 'Green', rent: [26, 130, 390, 900, 1100, 1275], houses: 0, houseCost: 200, isMortgaged: false },
  { id: 32, name: 'Hong Kong', type: 'property', price: 300, group: 'Green', rent: [26, 130, 390, 900, 1100, 1275], houses: 0, houseCost: 200, isMortgaged: false },
  { id: 33, name: 'Community Fund', type: 'community-fund' },
  { id: 34, name: 'New York', type: 'property', price: 320, group: 'Green', rent: [28, 150, 450, 1000, 1200, 1400], houses: 0, houseCost: 200, isMortgaged: false },
  { id: 35, name: 'Spaceport', type: 'transport', price: 200, group: 'Transport', rent: [25, 50, 100, 200], houses: 0, houseCost: 0, isMortgaged: false },
  { id: 36, name: 'Opportunity', type: 'opportunity' },
  { id: 37, name: 'Tokyo', type: 'property', price: 350, group: 'DarkBlue', rent: [35, 175, 500, 1100, 1300, 1500], houses: 0, houseCost: 200, isMortgaged: false },
  { id: 38, name: 'Super Tax', type: 'tax' },
  { id: 39, name: 'Geneva', type: 'property', price: 400, group: 'DarkBlue', rent: [50, 200, 600, 1400, 1700, 2000], houses: 0, houseCost: 200, isMortgaged: false },
];

const GROUP_COLORS: Record<PropertyGroup, string> = {
  Brown: '#955436', LightBlue: '#aae0fa', Pink: '#d93a96', Orange: '#f7921b',
  Red: '#ed1b24', Yellow: '#fff200', Green: '#1fb25a', DarkBlue: '#0072bb',
  Transport: '#555555', Utility: '#aaaaaa'
};
const PLAYER_COLORS = ['#ff4136', '#0074d9', '#2ecc40', '#ffdc00', '#b10dc9', '#ff851b'];

// Game State
let players: Player[] = [];
let currentPlayerIndex: number = 0;
let properties: Property[] = JSON.parse(JSON.stringify(BOARD_DATA.filter(s => s.type === 'property' || s.type === 'transport' || s.type === 'utility')));
let opportunityCards: Card[] = [];
let communityFundCards: Card[] = [];
let lastDiceRoll = 0;
let isClearingDebt = false;
let debtState: { debtor: Player, creditor: Player | 'bank', amount: number } | null = null;
let currentTradePartnerId: number | null = null;
let onCardModalOk: (() => void) | null = null;
let currentAiTradeOffer: TradeOffer | null = null;
let recentlyProposedTrades: Set<string> = new Set();


// Auction State
let isAuctionActive = false;
let auctionProperty: Property | null = null;
let auctionCurrentBid = 0;
let auctionHighestBidder: number | null = null;
let auctionTurnPlayerIndex = 0;
let auctionParticipants: boolean[] = [];

// DOM Elements
const board = document.getElementById('game-board')!;
const messageLog = document.getElementById('message-log')!;
const rollDiceBtn = document.getElementById('roll-dice-btn') as HTMLButtonElement;
const endTurnBtn = document.getElementById('end-turn-btn') as HTMLButtonElement;
const managePropertiesBtn = document.getElementById('manage-properties-btn') as HTMLButtonElement;
const proposeTradeBtn = document.getElementById('propose-trade-btn') as HTMLButtonElement;
const dice1El = document.getElementById('dice1')!;
const dice2El = document.getElementById('dice2')!;
const modalBackdrop = document.getElementById('modal-backdrop')!;
const propertyModal = document.getElementById('property-modal')!;
const cardModal = document.getElementById('card-modal')!;
const gameOverModal = document.getElementById('game-over-modal')!;
const managePropertiesModal = document.getElementById('manage-properties-modal')!;
const auctionModal = document.getElementById('auction-modal') as HTMLDivElement;
const tradeModal = document.getElementById('trade-modal') as HTMLDivElement;
const tradeReviewModal = document.getElementById('trade-review-modal') as HTMLDivElement;
const casinoModal = document.getElementById('casino-modal') as HTMLDivElement;
const buyPropertyBtn = document.getElementById('buy-property-btn') as HTMLButtonElement;
const auctionPropertyBtn = document.getElementById('auction-property-btn') as HTMLButtonElement;
const cardModalOkBtn = document.getElementById('card-modal-ok-btn') as HTMLButtonElement;
const restartGameBtn = document.getElementById('restart-game-btn') as HTMLButtonElement;
const closeManageModalBtn = document.getElementById('close-manage-modal-btn') as HTMLButtonElement;
const declareBankruptcyBtn = document.getElementById('declare-bankruptcy-btn') as HTMLButtonElement;
const placeBidBtn = document.getElementById('place-bid-btn') as HTMLButtonElement;
const passAuctionBtn = document.getElementById('pass-auction-btn') as HTMLButtonElement;
const bidAmountInput = document.getElementById('bid-amount') as HTMLInputElement;
const sendTradeOfferBtn = document.getElementById('send-trade-offer-btn') as HTMLButtonElement;
const cancelTradeBtn = document.getElementById('cancel-trade-btn') as HTMLButtonElement;
const tradeReviewOkBtn = document.getElementById('trade-review-ok-btn') as HTMLButtonElement;
const casinoBetInput = document.getElementById('casino-bet-amount') as HTMLInputElement;
const placeCasinoBetBtn = document.getElementById('place-casino-bet-btn') as HTMLButtonElement;
const casinoResultDiv = document.getElementById('casino-result') as HTMLDivElement;
const closeCasinoModalBtn = document.getElementById('close-casino-modal-btn') as HTMLButtonElement;
const casinoGameControls = document.getElementById('casino-game-controls') as HTMLDivElement;
const reel1 = document.getElementById('reel1') as HTMLDivElement;
const reel2 = document.getElementById('reel2') as HTMLDivElement;
const reel3 = document.getElementById('reel3') as HTMLDivElement;
const reels = [reel1, reel2, reel3];
const aiTradeProposalModal = document.getElementById('ai-trade-proposal-modal') as HTMLDivElement;
const acceptAiTradeBtn = document.getElementById('accept-ai-trade-btn') as HTMLButtonElement;
const rejectAiTradeBtn = document.getElementById('reject-ai-trade-btn') as HTMLButtonElement;


// New Setup and Trade Partner elements
const setupModal = document.getElementById('setup-modal') as HTMLDivElement;
const gameWrapper = document.getElementById('game-wrapper') as HTMLDivElement;
const startGameBtn = document.getElementById('start-game-btn') as HTMLButtonElement;
const aiPlayersSelect = document.getElementById('ai-players-select') as HTMLInputElement;
const selectTradePartnerModal = document.getElementById('select-trade-partner-modal') as HTMLDivElement;
const tradePartnerList = document.getElementById('trade-partner-list')!;
const cancelTradePartnerSelectBtn = document.getElementById('cancel-trade-partner-select-btn') as HTMLButtonElement;

// Utility Functions
function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5);
}

function getPropertyById(id: number): Property | undefined {
    return properties.find(p => p.id === id);
}

// Card Deck Setup
function setupCardDecks() {
    opportunityCards = shuffleArray([
        { text: 'Advance to GO. Collect $200.', action: p => { p.position = 0; updatePlayerMoney(p, 200); logMessage(`${p.name} advanced to GO and collected $200.`); } },
        { text: 'Bank pays you dividend of $50.', action: p => updatePlayerMoney(p, 50) },
        { text: 'Go to Jail. Do not pass GO, do not collect $200.', action: p => goToJail(p) },
        { text: 'You have won a crossword competition. Collect $100.', action: p => updatePlayerMoney(p, 100) },
        { text: 'Your building loan matures. Collect $150.', action: p => updatePlayerMoney(p, 150) }
    ]);
    communityFundCards = shuffleArray([
        { text: 'Bank error in your favor. Collect $200.', action: p => updatePlayerMoney(p, 200) },
        { text: 'Doctor’s fee. Pay $50.', action: p => handlePayment(p, 50, 'bank') },
        { text: 'From sale of stock you get $50.', action: p => updatePlayerMoney(p, 50) },
        { text: 'Holiday fund matures. Receive $100.', action: p => updatePlayerMoney(p, 100) },
        { text: 'Pay hospital fees of $100.', action: p => handlePayment(p, 100, 'bank') },
    ]);
}


// Render Functions
function renderBoard() {
    BOARD_DATA.forEach(spaceData => {
      let extraClasses: string[] = [];
      if (spaceData.id > 0 && spaceData.id < 10) { extraClasses.push('row-bottom'); } 
      else if (spaceData.id > 10 && spaceData.id < 20) { extraClasses.push('row-left'); } 
      else if (spaceData.id > 20 && spaceData.id < 30) { extraClasses.push('row-top'); } 
      else if (spaceData.id > 30 && spaceData.id < 40) { extraClasses.push('row-right'); }
  
      if ([0, 10, 20, 30].includes(spaceData.id)) { extraClasses.push('corner'); }
      
      const spaceEl = createSpaceElement(spaceData, ...extraClasses);
      board.appendChild(spaceEl);
    });
  }

function createSpaceElement(spaceData: Space, ...extraClasses: string[]) {
    const el = document.createElement('div');
    el.className = `space ${spaceData.type} ${extraClasses.join(' ')}`;
    el.dataset.id = String(spaceData.id);

    const nameEl = document.createElement('div');
    nameEl.className = 'name';
    nameEl.textContent = spaceData.name;

    if (spaceData.type === 'property' || spaceData.type === 'transport' || spaceData.type === 'utility') {
        const prop = spaceData as Property;
        const colorBar = document.createElement('div');
        colorBar.className = 'color-bar';
        colorBar.style.backgroundColor = GROUP_COLORS[prop.group];
        const improvementContainer = document.createElement('div');
        improvementContainer.className = 'improvement-container';
        colorBar.appendChild(improvementContainer);
        el.appendChild(colorBar);

        const priceEl = document.createElement('div');
        priceEl.className = 'price';
        priceEl.textContent = `$${prop.price}`;
        el.appendChild(nameEl);
        el.appendChild(priceEl);
    } else {
        el.appendChild(nameEl);
    }
    return el;
}

function renderPropertyImprovements(propertyId: number) {
    const property = getPropertyById(propertyId)!;
    const spaceEl = document.querySelector(`.space[data-id='${property.id}']`)!;
    const container = spaceEl.querySelector('.improvement-container')!;
    container.innerHTML = '';
  
    if (property.houses === 5) { // Hotel
      const hotelEl = document.createElement('div');
      hotelEl.className = 'hotel-indicator';
      container.appendChild(hotelEl);
    } else { // Houses
      for (let i = 0; i < property.houses; i++) {
        const houseEl = document.createElement('div');
        houseEl.className = 'house-indicator';
        container.appendChild(houseEl);
      }
    }
  }

function updatePlayerTokens() {
    players.forEach(player => {
        if (player.isBankrupt) return;
        let token = document.getElementById(`player-${player.id}-token`);
        if (!token) {
            token = document.createElement('div');
            token.id = `player-${player.id}-token`;
            token.className = 'player-token';
            token.style.backgroundColor = PLAYER_COLORS[player.id];
            board.appendChild(token);
        }

        const spaceEl = document.querySelector(`.space[data-id='${player.position}']`) as HTMLElement;
        const boardRect = board.getBoundingClientRect();
        const spaceRect = spaceEl.getBoundingClientRect();

        const offset = (player.id * (token.offsetWidth + 2));
        token.style.top = `${spaceRect.top - boardRect.top + offset}px`;
        token.style.left = `${spaceRect.left - boardRect.left + 5}px`;
    });
}

function renderPropertyOwnership() {
    properties.forEach(prop => {
        const spaceEl = document.querySelector(`.space[data-id='${prop.id}']`)!;
        let ownerIndicator = spaceEl.querySelector('.owner-indicator');
        if (prop.owner !== undefined) {
            if (!ownerIndicator) {
                ownerIndicator = document.createElement('div');
                ownerIndicator.className = 'owner-indicator';
                spaceEl.appendChild(ownerIndicator);
            }
            (ownerIndicator as HTMLElement).style.backgroundColor = PLAYER_COLORS[prop.owner];
            ownerIndicator.classList.toggle('mortgaged', prop.isMortgaged);
        } else {
            ownerIndicator?.remove();
        }
    });
}

function updateUI() {
    players.forEach(player => {
        const panel = document.getElementById(`player-${player.id}-panel`)!;
        if (!panel) return;
        
        if (player.isBankrupt) { // Bankrupt
            panel.classList.add('bankrupt');
            panel.querySelector('.player-money')!.textContent = `BANKRUPT`;
            panel.querySelector('.player-properties')!.innerHTML = '';
            const token = document.getElementById(`player-${player.id}-token`);
            if(token) token.remove();
            return;
        }

        panel.querySelector('.player-money')!.textContent = `Money: $${player.money}`;
        panel.classList.toggle('active', player.id === currentPlayerIndex);
        
        const propsContainer = panel.querySelector('.player-properties')!;
        propsContainer.innerHTML = '';
        player.properties.forEach(propId => {
            const prop = getPropertyById(propId)!;
            const chip = document.createElement('div');
            chip.className = 'player-property-chip';
            chip.style.backgroundColor = GROUP_COLORS[prop.group];
            if(prop.isMortgaged) chip.style.border = '2px solid #333';
            chip.title = `${prop.name}${prop.isMortgaged ? ' (Mortgaged)' : ''}`;
            propsContainer.appendChild(chip);
        });
    });
    renderPropertyOwnership();
    rollDiceBtn.style.display = 'block';
    endTurnBtn.style.display = 'none';
    managePropertiesBtn.style.display = 'none';
    proposeTradeBtn.style.display = 'none';
    rollDiceBtn.disabled = players[currentPlayerIndex]?.isAI || isClearingDebt;
}

function logMessage(msg: string) {
    messageLog.textContent = msg;
    console.log(msg);
}

// Modal Functions
function showPropertyModal(property: Property) {
    document.getElementById('modal-property-name')!.textContent = property.name;
    const colorBar = document.getElementById('modal-property-color-bar')!;
    colorBar.style.backgroundColor = GROUP_COLORS[property.group];
    document.getElementById('modal-property-price')!.textContent = `$${property.price}`;
    document.getElementById('modal-property-rent')!.textContent = `$${property.rent[0]}`;
    const owner = property.owner !== undefined ? players[property.owner].name : 'None';
    document.getElementById('modal-property-owner')!.textContent = owner;
    
    buyPropertyBtn.style.display = property.owner === undefined ? 'block' : 'none';
    buyPropertyBtn.disabled = players[currentPlayerIndex].money < property.price;
    auctionPropertyBtn.style.display = property.owner === undefined ? 'block' : 'none';

    modalBackdrop.classList.remove('hidden');
    propertyModal.classList.remove('hidden');
}

function showCardModal(title: string, text: string) {
    document.getElementById('card-modal-title')!.textContent = title;
    document.getElementById('card-modal-text')!.textContent = text;
    modalBackdrop.classList.remove('hidden');
    cardModal.classList.remove('hidden');
}

function showGameOverModal(winner: Player) {
    document.getElementById('game-over-title')!.textContent = 'Game Over!';
    document.getElementById('game-over-text')!.textContent = `${winner.name} is the winner!`;
    modalBackdrop.classList.remove('hidden');
    gameOverModal.classList.remove('hidden');
}

function hideModals() {
    modalBackdrop.classList.add('hidden');
    propertyModal.classList.add('hidden');
    cardModal.classList.add('hidden');
    auctionModal.classList.add('hidden');
    tradeModal.classList.add('hidden');
    tradeReviewModal.classList.add('hidden');
    selectTradePartnerModal.classList.add('hidden');
    casinoModal.classList.add('hidden');
    aiTradeProposalModal.classList.add('hidden');
    if (!isClearingDebt) {
        managePropertiesModal.classList.add('hidden');
    }
}

// Game Logic
function startGame(numAIPlayers: number) {
    const totalPlayers = numAIPlayers + 1;
    if (totalPlayers > PLAYER_COLORS.length || totalPlayers < 2) {
        alert(`Number of players must be between 2 and ${PLAYER_COLORS.length}.`);
        return;
    }

    players = [{ id: 0, name: 'Player 1 (You)', money: 1500, position: 0, inJail: false, jailTurns: 0, isAI: false, properties: [], hasVisitedCasino: false, consecutiveDoubles: 0, isBankrupt: false }];
    for (let i = 1; i <= numAIPlayers; i++) {
        players.push({ id: i, name: `Player ${i + 1} (AI)`, money: 1500, position: 0, inJail: false, jailTurns: 0, isAI: true, properties: [], hasVisitedCasino: false, consecutiveDoubles: 0, isBankrupt: false });
    }

    const uiContainer = document.getElementById('ui-container')!;
    uiContainer.innerHTML = '';
    players.forEach(player => {
        const panel = document.createElement('div');
        panel.className = 'player-info-panel';
        panel.id = `player-${player.id}-panel`;
        panel.innerHTML = `
            <h2 class="player-name">${player.name}</h2>
            <p class="player-money">Money: $1500</p>
            <div class="player-properties"></div>
        `;
        const header = panel.querySelector('.player-name') as HTMLElement;
        header.style.borderLeft = `5px solid ${PLAYER_COLORS[player.id]}`;
        header.style.paddingLeft = '5px';
        uiContainer.appendChild(panel);
    });

    currentPlayerIndex = 0;
    properties = JSON.parse(JSON.stringify(BOARD_DATA.filter(s => s.type === 'property' || s.type === 'transport' || s.type === 'utility')));
    recentlyProposedTrades.clear();
    setupCardDecks();
    renderBoard();
    updatePlayerTokens();
    updateUI();
    logMessage(`Welcome! ${players[0].name}, roll the dice to start.`);
    gameWrapper.classList.remove('hidden');
    setupModal.classList.add('hidden');
    startTurn();
}

function startTurn() {
    const player = players[currentPlayerIndex];
    logMessage(`${player.name}'s turn.`);
    updateUI();
    rollDiceBtn.disabled = player.isAI;
    rollDiceBtn.style.display = 'block';
    endTurnBtn.style.display = 'none';
    managePropertiesBtn.style.display = 'block';
    proposeTradeBtn.style.display = 'block';

    if (player.isAI) {
        setTimeout(handleAITurn, 1000);
    }
}

async function handleAITurn() {
    await handleAIPropertyManagement(); // AI considers building houses first.

    const tradeProposedToHuman = await considerProposingTrade();
    if (tradeProposedToHuman) {
        // AI's turn is paused, waiting for human response.
        return;
    }
    // Basic AI: just roll the dice.
    rollDice();
}

function updatePlayerMoney(player: Player, amount: number) {
    player.money += amount;
    updateUI();
}

function handlePayment(player: Player, amount: number, creditor: Player | 'bank'): boolean {
    if (player.money >= amount) {
        updatePlayerMoney(player, -amount);
        if (creditor !== 'bank') {
            updatePlayerMoney(creditor, amount);
        }
        logMessage(`${player.name} paid $${amount}.`);
        return true; // Payment successful
    } else {
        logMessage(`${player.name} cannot afford to pay $${amount}. They must raise funds.`);
        isClearingDebt = true;
        debtState = { debtor: player, creditor, amount };

        rollDiceBtn.style.display = 'none';
        endTurnBtn.style.display = 'none';
        
        if (player.isAI) {
            handleAIDebtResolution();
        } else {
             showManagePropertiesModal();
        }
        return false; // Payment failed, entered debt resolution
    }
}

function goToJail(player: Player) {
    player.position = 10;
    player.inJail = true;
    player.jailTurns = 0;
    logMessage(`${player.name} has been sent to jail!`);
    updatePlayerTokens();
    endTurn();
}

function drawCard(deckType: 'opportunity' | 'community-fund') {
    const player = players[currentPlayerIndex];
    const deck = deckType === 'opportunity' ? opportunityCards : communityFundCards;
    const title = deckType === 'opportunity' ? 'Opportunity' : 'Community Fund';

    let card = deck.shift();
    if (!card) {
        console.error(`${title} deck is empty! Reshuffling.`);
        setupCardDecks();
        const newDeck = deckType === 'opportunity' ? opportunityCards : communityFundCards;
        card = newDeck.shift()!;
    }
    deck.push(card);

    logMessage(`${player.name} drew: ${card.text}`);
    
    if (player.isAI) {
        const wasInJailBeforeAction = player.inJail;
        card.action(player);
        if (isClearingDebt) { return; } // AI has to resolve debt
        if (player.inJail && !wasInJailBeforeAction) { return; }
        completeAITurnAction();
    } else {
        onCardModalOk = () => {
            const wasInJailBeforeAction = player.inJail;
            card!.action(player);
            hideModals();
            if (isClearingDebt) { return; }
            if (player.inJail && !wasInJailBeforeAction) { return; }
            enableEndTurn();
        };
        showCardModal(title, card.text);
    }
}

function completeAITurnAction() {
    setTimeout(() => {
        if (!isAuctionActive) {
            endTurn();
        }
    }, 1000); // Delay to make AI moves readable
}

function enableEndTurn() {
    const player = players[currentPlayerIndex];
    if (player.isBankrupt || isClearingDebt) return;

    const lastRollWasDouble = player.consecutiveDoubles > 0;

    if (lastRollWasDouble) {
        logMessage(`${player.name} rolled doubles! They can roll again.`);
        rollDiceBtn.style.display = 'block';
        endTurnBtn.style.display = 'none';
        rollDiceBtn.disabled = player.isAI;
        if(player.isAI) {
            setTimeout(handleAITurn, 1000);
        }
    } else {
        if (player.isAI) {
            completeAITurnAction();
            return;
        }
        rollDiceBtn.style.display = 'none';
        endTurnBtn.style.display = 'block';
        endTurnBtn.disabled = false;
    }
}

function rollDice() {
    rollDiceBtn.disabled = true;
    const d1 = getRandomInt(1, 6);
    const d2 = getRandomInt(1, 6);

    dice1El.textContent = String(d1);
    dice2El.textContent = String(d2);
    dice1El.classList.add('rolling');
    dice2El.classList.add('rolling');
    
    setTimeout(() => {
        dice1El.classList.remove('rolling');
        dice2El.classList.remove('rolling');
    }, 1000);
    
    lastDiceRoll = d1 + d2;
    const player = players[currentPlayerIndex];
    const isDouble = d1 === d2;

    logMessage(`${player.name} rolled a ${lastDiceRoll} (${d1} + ${d2}).`);

    if (isDouble) {
        player.consecutiveDoubles++;
        if (player.consecutiveDoubles === 3) {
            logMessage(`${player.name} rolled doubles 3 times in a row! Go to jail.`);
            goToJail(player); // This calls endTurn, which resets the counter.
            return;
        }
    } else {
        player.consecutiveDoubles = 0;
    }
    
    movePlayer(lastDiceRoll);
}

function movePlayer(steps: number) {
    const player = players[currentPlayerIndex];
    const oldPosition = player.position;
    const newPosition = (player.position + steps) % BOARD_DATA.length;

    // Animate move
    let currentPos = player.position;
    const moveInterval = setInterval(() => {
        currentPos = (currentPos + 1) % BOARD_DATA.length;
        player.position = currentPos;
        updatePlayerTokens();
        if (currentPos === newPosition) {
            clearInterval(moveInterval);
            // Handle passing GO
            if (newPosition < oldPosition) { // Passed GO
                logMessage(`${player.name} passed GO and collected $200.`);
                updatePlayerMoney(player, 200);
            }
            handleLandOnSpace();
        }
    }, 200);
}

function handleLandOnSpace() {
    const player = players[currentPlayerIndex];
    const space = BOARD_DATA[player.position];
    logMessage(`${player.name} landed on ${space.name}.`);

    switch (space.type) {
        case 'property':
        case 'transport':
        case 'utility':
            const property = getPropertyById(space.id)!;
            if (property.owner === undefined) {
                if (player.isAI) { // Simple AI Decision
                    if (player.money > property.price * 1.2) { 
                        buyProperty(); 
                    } else { 
                        startAuction(property);
                    }
                } else {
                    showPropertyModal(property);
                }
            } else if (property.owner !== player.id && !property.isMortgaged) {
                const owner = players[property.owner];
                let rent = 0;
                if (property.type === 'property') {
                    const groupProperties = properties.filter(p => p.group === property.group);
                    const ownerOwnsAll = groupProperties.every(p => p.owner === owner.id);
                    rent = property.rent[property.houses];
                    if (ownerOwnsAll && property.houses === 0) {
                        rent *= 2; // Double rent on unimproved monopolies
                    }
                } else if (property.type === 'transport') {
                    const ownedCount = owner.properties.filter(pId => getPropertyById(pId)?.group === 'Transport').length;
                    rent = property.rent[ownedCount - 1];
                } else { // Utility
                    const ownedCount = owner.properties.filter(pId => getPropertyById(pId)?.group === 'Utility').length;
                    rent = (ownedCount === 1 ? 4 : 10) * lastDiceRoll;
                }
                logMessage(`${player.name} pays $${rent} in rent to ${owner.name}.`);
                if(handlePayment(player, rent, owner)) {
                    enableEndTurn();
                }
            } else {
                enableEndTurn();
            }
            break;
        case 'go-to-jail':
            goToJail(player);
            break;
        case 'community-fund':
            drawCard('community-fund');
            break;
        case 'opportunity':
            drawCard('opportunity');
            break;
        case 'tax':
            const taxAmount = space.name === 'Income Tax' ? 200 : 100;
            logMessage(`${player.name} paid $${taxAmount} in taxes.`);
            if(handlePayment(player, taxAmount, 'bank')) {
                enableEndTurn();
            }
            break;
        case 'casino':
            if (player.isAI) {
                handleAICasino();
            } else {
                showCasinoModal();
            }
            break;
        default:
            enableEndTurn();
            break;
    }
}

function buyProperty() {
    const player = players[currentPlayerIndex];
    const prop = getPropertyById(player.position)!;
    if (player.money >= prop.price) {
        updatePlayerMoney(player, -prop.price);
        prop.owner = player.id;
        player.properties.push(prop.id);
        logMessage(`${player.name} bought ${prop.name}.`);
        updateUI();
    }
    hideModals();
    enableEndTurn();
}

function showCasinoModal() {
    const player = players[currentPlayerIndex];
    logMessage(`${player.name} enters the Casino! Place your bets.`);
    casinoBetInput.max = String(player.money);
    casinoBetInput.value = String(Math.min(10, player.money));
    
    casinoResultDiv.classList.add('hidden');
    closeCasinoModalBtn.classList.remove('hidden');
    casinoGameControls.style.visibility = 'visible';
    placeCasinoBetBtn.disabled = false;
    
    modalBackdrop.classList.remove('hidden');
    casinoModal.classList.remove('hidden');
}

const casinoSymbols = [
    { symbol: '💎', payout2: 10, payout3: 100 },
    { symbol: 'BAR', payout2: 5, payout3: 50 },
    { symbol: '🔔', payout2: 4, payout3: 40 },
    { symbol: '🍋', payout2: 2, payout3: 20 },
    { symbol: '🍒', payout2: 1, payout3: 10 },
];

function handleAICasino() {
    const player = players[currentPlayerIndex];
    // AI decides on a bet, e.g., 5% of their money, capped at $100.
    const betAmount = Math.min(player.money, Math.min(100, Math.max(10, Math.floor(player.money * 0.05))));

    if (betAmount <= 0) {
        logMessage(`${player.name} decides not to play at the casino.`);
        completeAITurnAction();
        return;
    }

    logMessage(`${player.name} bets $${betAmount} at the casino.`);
    updatePlayerMoney(player, -betAmount);

    const winChance = 0.75;
    let winnings = 0;
    const chosenSymbols = [...casinoSymbols].sort(() => 0.5 - Math.random());

    if (Math.random() < winChance) { // WIN
        const threeMatchChance = 0.20;
        const winningSymbol = chosenSymbols[0];
        if (Math.random() < threeMatchChance) { // 3-MATCH
            winnings = betAmount * winningSymbol.payout3;
        } else { // 2-MATCH
            winnings = betAmount * winningSymbol.payout2;
        }
    } // No else, if it's not a win, winnings remain 0.

    if (winnings > 0) {
        logMessage(`${player.name} won $${winnings} at the casino!`);
        updatePlayerMoney(player, winnings);
    } else {
        logMessage(`${player.name} lost their bet at the casino.`);
    }
    
    completeAITurnAction();
}

async function playCasinoGame() {
    const player = players[currentPlayerIndex];
    const betAmount = parseInt(casinoBetInput.value);

    if (isNaN(betAmount) || betAmount <= 0) {
        casinoResultDiv.innerHTML = '<p>Please enter a valid bet amount.</p>';
        casinoResultDiv.classList.remove('hidden');
        return;
    }
    if (player.money < betAmount) {
        casinoResultDiv.innerHTML = '<p>You cannot afford this bet.</p>';
        casinoResultDiv.classList.remove('hidden');
        return;
    }

    placeCasinoBetBtn.disabled = true;
    casinoGameControls.style.visibility = 'hidden';
    casinoResultDiv.classList.add('hidden');

    updatePlayerMoney(player, -betAmount);

    // Spin animation
    const spinDuration = 2000;
    const spinInterval = 100;
    reels.forEach(reel => reel.classList.add('spinning'));
    
    const spinAnimation = setInterval(() => {
        reels.forEach(reel => {
            reel.textContent = casinoSymbols[getRandomInt(0, casinoSymbols.length - 1)].symbol;
        });
    }, spinInterval);

    await new Promise(resolve => setTimeout(resolve, spinDuration));
    
    clearInterval(spinAnimation);
    reels.forEach(reel => reel.classList.remove('spinning'));

    // Determine outcome with a high chance of winning
    const winChance = 0.75; // 75% chance to win!
    let finalReels: string[] = [];
    let winnings = 0;
    let resultMessage = '';

    const chosenSymbols = [...casinoSymbols].sort(() => 0.5 - Math.random());

    if (Math.random() < winChance) { // WIN
        const threeMatchChance = 0.20; // 20% of wins are a 3-match
        
        if (Math.random() < threeMatchChance) { // 3-MATCH WIN
            const winningSymbol = chosenSymbols[0];
            finalReels = [winningSymbol.symbol, winningSymbol.symbol, winningSymbol.symbol];
            winnings = betAmount * winningSymbol.payout3;
            resultMessage = `JACKPOT! You matched three ${winningSymbol.symbol} and won <strong>$${winnings}</strong>!`;
        } else { // 2-MATCH WIN
            const winningSymbol = chosenSymbols[0];
            const otherSymbol = chosenSymbols[1];
            finalReels = [winningSymbol.symbol, winningSymbol.symbol, otherSymbol.symbol].sort(() => 0.5 - Math.random());
            winnings = betAmount * winningSymbol.payout2;
            resultMessage = `You matched two ${winningSymbol.symbol} and won $${winnings}!`;
        }
    } else { // LOSS
        finalReels = [chosenSymbols[0].symbol, chosenSymbols[1].symbol, chosenSymbols[2].symbol];
        winnings = 0;
        resultMessage = 'So close! Better luck next time.';
    }

    // Display final result
    reels.forEach((reel, index) => {
        reel.textContent = finalReels[index];
    });

    if (winnings > 0) {
        updatePlayerMoney(player, winnings);
    }
    
    casinoResultDiv.innerHTML = `<p>${resultMessage}</p><p>Your balance is now $${player.money}.</p>`;
    casinoResultDiv.classList.remove('hidden');

    placeCasinoBetBtn.disabled = false;
    casinoGameControls.style.visibility = 'visible';
    casinoBetInput.max = String(player.money);
}


function endTurn() {
    const activePlayers = players.filter(p => !p.isBankrupt);
    if (activePlayers.length === 1) {
        showGameOverModal(activePlayers[0]);
        return;
    }

    players[currentPlayerIndex].consecutiveDoubles = 0;

    do {
      currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    } while (players[currentPlayerIndex].isBankrupt); // Skip bankrupt players

    hideModals();
    startTurn();
}

// Property Management
function playerHasMonopoly(player: Player, group: PropertyGroup): boolean {
    const groupProperties = properties.filter(p => p.group === group);
    if (groupProperties.length === 0) return false;
    const ownedGroupProperties = player.properties.filter(pId => {
        const prop = getPropertyById(pId);
        return prop && prop.group === group;
    });
    return groupProperties.length === ownedGroupProperties.length;
}

function isBuildEven(player: Player, propertyToBuildOn: Property): boolean {
    if (propertyToBuildOn.houses >= 5) return false; // Already a hotel
    const groupProperties = properties.filter(p => p.group === propertyToBuildOn.group && p.owner === player.id);
    const minHousesInGroup = Math.min(...groupProperties.map(p => p.houses));
    return propertyToBuildOn.houses === minHousesInGroup;
}

function isSellEven(player: Player, propertyToSellFrom: Property): boolean {
    if (propertyToSellFrom.houses <= 0) return false; // No houses to sell
    const groupProperties = properties.filter(p => p.group === propertyToSellFrom.group && p.owner === player.id);
    const maxHousesInGroup = Math.max(...groupProperties.map(p => p.houses));
    return propertyToSellFrom.houses === maxHousesInGroup;
}

function buildHouse(propertyId: number) {
    const player = players[currentPlayerIndex];
    const prop = getPropertyById(propertyId)!;
    if (player.money >= prop.houseCost) {
        updatePlayerMoney(player, -prop.houseCost);
        prop.houses++;
        logMessage(`${player.name} built a house on ${prop.name}.`);
        renderPropertyImprovements(propertyId);
        checkDebtResolved() || (!player.isAI && showManagePropertiesModal()); // Refresh modal
    } else {
        logMessage(`Not enough money to build on ${prop.name}.`);
    }
}

function sellHouse(propertyId: number) {
    const player = players[currentPlayerIndex];
    const prop = getPropertyById(propertyId)!;
    const salePrice = prop.houseCost / 2;
    updatePlayerMoney(player, salePrice);
    prop.houses--;
    logMessage(`${player.name} sold a house on ${prop.name} for $${salePrice}.`);
    renderPropertyImprovements(propertyId);
    checkDebtResolved() || (!player.isAI && showManagePropertiesModal()); // Refresh modal
}

function mortgageProperty(propertyId: number) {
    const player = players[currentPlayerIndex];
    const prop = getPropertyById(propertyId)!;
    const mortgageValue = prop.price / 2;
    updatePlayerMoney(player, mortgageValue);
    prop.isMortgaged = true;
    logMessage(`${player.name} mortgaged ${prop.name} for $${mortgageValue}.`);
    updateUI();
    checkDebtResolved() || (!player.isAI && showManagePropertiesModal()); // Refresh modal
}

function unmortgageProperty(propertyId: number) {
    const player = players[currentPlayerIndex];
    const prop = getPropertyById(propertyId)!;
    const cost = Math.ceil((prop.price / 2) * 1.1);
    if (player.money >= cost) {
        updatePlayerMoney(player, -cost);
        prop.isMortgaged = false;
        logMessage(`${player.name} unmortgaged ${prop.name} for $${cost}.`);
        updateUI();
        checkDebtResolved() || (!player.isAI && showManagePropertiesModal()); // Refresh modal
    } else {
        logMessage(`Not enough money to unmortgage ${prop.name}.`);
    }
}

function showManagePropertiesModal() {
    const player = players[isClearingDebt ? debtState!.debtor.id : currentPlayerIndex];
    
    const debtInfo = document.getElementById('debt-resolution-info') as HTMLDivElement;
    const bankruptcyBtn = document.getElementById('declare-bankruptcy-btn') as HTMLButtonElement;
    const closeModalBtn = document.getElementById('close-manage-modal-btn') as HTMLButtonElement;

    if (isClearingDebt && debtState) {
        debtInfo.classList.remove('hidden');
        document.getElementById('debt-amount')!.textContent = `$${debtState.amount}`;
        const creditorName = debtState.creditor === 'bank' ? 'the Bank' : debtState.creditor.name;
        document.getElementById('debt-creditor')!.textContent = creditorName;
        
        bankruptcyBtn.classList.remove('hidden');
        closeModalBtn.classList.add('hidden');
    } else {
        debtInfo.classList.add('hidden');
        bankruptcyBtn.classList.add('hidden');
        closeModalBtn.classList.remove('hidden');
    }

    document.getElementById('manage-modal-money')!.textContent = `$${player.money}`;
    const listEl = document.getElementById('manage-properties-list')!;
    listEl.innerHTML = '';

    const groupedProperties = new Map<PropertyGroup, Property[]>();
    player.properties.sort((a,b) => a-b).forEach(pId => {
        const prop = getPropertyById(pId)!;
        if (!groupedProperties.has(prop.group)) {
            groupedProperties.set(prop.group, []);
        }
        groupedProperties.get(prop.group)!.push(prop);
    });

    groupedProperties.forEach((propsInGroup, group) => {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'property-management-group';
        
        const header = document.createElement('div');
        header.className = 'property-management-group-header';
        const colorBar = document.createElement('div');
        colorBar.className = 'color-bar-sm';
        colorBar.style.backgroundColor = GROUP_COLORS[group];
        header.appendChild(colorBar);
        header.append(group);
        groupDiv.appendChild(header);

        const hasMonopoly = (group !== 'Transport' && group !== 'Utility') ? playerHasMonopoly(player, group) : false;
        const isAnyPropertyInGroupMortgaged = propsInGroup.some(p => p.isMortgaged);

        propsInGroup.forEach(prop => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'property-management-item';
            if(prop.isMortgaged) itemDiv.classList.add('mortgaged');

            let improvementText = prop.isMortgaged ? ' (Mortgaged)' : '';
            if (prop.houses > 0) {
                improvementText = prop.houses === 5 ? ' (Hotel)' : ` (${prop.houses} house${prop.houses > 1 ? 's' : ''})`;
            }

            itemDiv.innerHTML = `<span>${prop.name}${improvementText}</span>`;
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'property-management-actions';

            if (prop.type === 'property') {
                const buildBtn = document.createElement('button');
                buildBtn.textContent = `Build ($${prop.houseCost})`;
                buildBtn.disabled = !hasMonopoly || isAnyPropertyInGroupMortgaged || prop.houses >= 5 || !isBuildEven(player, prop) || player.money < prop.houseCost;
                buildBtn.onclick = () => buildHouse(prop.id);
                actionsDiv.appendChild(buildBtn);

                const sellBtn = document.createElement('button');
                sellBtn.className = 'sell-btn';
                sellBtn.textContent = `Sell ($${prop.houseCost / 2})`;
                sellBtn.disabled = prop.houses === 0 || !isSellEven(player, prop);
                sellBtn.onclick = () => sellHouse(prop.id);
                actionsDiv.appendChild(sellBtn);
            }

            const mortgageBtn = document.createElement('button');
            mortgageBtn.className = 'mortgage-btn';
            mortgageBtn.textContent = `Mortgage ($${prop.price / 2})`;
            mortgageBtn.disabled = prop.isMortgaged || prop.houses > 0;
            mortgageBtn.onclick = () => mortgageProperty(prop.id);
            actionsDiv.appendChild(mortgageBtn);
            
            const unmortgageBtn = document.createElement('button');
            unmortgageBtn.className = 'unmortgage-btn';
            const unmortgageCost = Math.ceil((prop.price / 2) * 1.1);
            unmortgageBtn.textContent = `Unmortgage ($${unmortgageCost})`;
            unmortgageBtn.disabled = !prop.isMortgaged || player.money < unmortgageCost;
            unmortgageBtn.onclick = () => unmortgageProperty(prop.id);
            actionsDiv.appendChild(unmortgageBtn);

            itemDiv.appendChild(actionsDiv);
            groupDiv.appendChild(itemDiv);
        });
        listEl.appendChild(groupDiv);
    });

    modalBackdrop.classList.remove('hidden');
    managePropertiesModal.classList.remove('hidden');
}

// Trade Logic
function showSelectTradePartnerModal() {
    tradePartnerList.innerHTML = '';
    players.forEach(p => {
        if (p.id !== currentPlayerIndex && !p.isBankrupt) { // Can't trade with self or bankrupt players
            const partnerBtn = document.createElement('button');
            partnerBtn.textContent = p.name;
            partnerBtn.style.color = 'white';
            partnerBtn.style.backgroundColor = PLAYER_COLORS[p.id];
            partnerBtn.onclick = () => {
                currentTradePartnerId = p.id;
                showTradeModal(p.id);
            };
            tradePartnerList.appendChild(partnerBtn);
        }
    });
    modalBackdrop.classList.remove('hidden');
    selectTradePartnerModal.classList.remove('hidden');
}

function showTradeModal(partnerId: number) {
    const player = players[currentPlayerIndex];
    const partner = players[partnerId];

    document.querySelector('#trade-offer-panel h3')!.textContent = `${player.name}'s Offer`;
    document.querySelector('#trade-request-panel h3')!.textContent = `${partner.name}'s Properties`;

    const offerMoneyInput = document.getElementById('offer-money') as HTMLInputElement;
    offerMoneyInput.value = '0';
    offerMoneyInput.max = String(player.money);
    const requestMoneyInput = document.getElementById('request-money') as HTMLInputElement;
    requestMoneyInput.value = '0';
    requestMoneyInput.max = String(partner.money);
    
    populateTradeList('offer-properties-list', player);
    populateTradeList('request-properties-list', partner);

    selectTradePartnerModal.classList.add('hidden');
    tradeModal.classList.remove('hidden');
}

function populateTradeList(listId: string, player: Player) {
    const listEl = document.getElementById(listId)!;
    listEl.innerHTML = '';
    player.properties.forEach(propId => {
        const prop = getPropertyById(propId)!;
        const itemEl = document.createElement('div');
        itemEl.className = 'trade-property-item';
        itemEl.dataset.propertyId = String(prop.id);
        
        const colorBar = document.createElement('div');
        colorBar.className = 'color-bar-sm';
        colorBar.style.backgroundColor = GROUP_COLORS[prop.group];
        
        const nameSpan = document.createElement('span');
        nameSpan.textContent = prop.name;
        
        itemEl.appendChild(colorBar);
        itemEl.appendChild(nameSpan);

        if (prop.houses > 0) {
            itemEl.classList.add('disabled');
            itemEl.title = "Cannot trade properties with improvements.";
        } else {
            itemEl.onclick = () => itemEl.classList.toggle('selected');
        }
        
        listEl.appendChild(itemEl);
    });
}

function handleTradeOffer() {
    const fromPlayer = players[currentPlayerIndex];
    const toPlayer = players[currentTradePartnerId!];

    const offerMoney = parseInt((document.getElementById('offer-money') as HTMLInputElement).value) || 0;
    const requestMoney = parseInt((document.getElementById('request-money') as HTMLInputElement).value) || 0;
    
    if (offerMoney > fromPlayer.money || requestMoney > toPlayer.money) {
        logMessage("Invalid trade: A player does not have enough money for this offer.");
        return;
    }

    const offerProperties = Array.from(document.querySelectorAll('#offer-properties-list .selected')).map(el => parseInt((el as HTMLElement).dataset.propertyId!));
    const requestProperties = Array.from(document.querySelectorAll('#request-properties-list .selected')).map(el => parseInt((el as HTMLElement).dataset.propertyId!));

    const tradeOffer: TradeOffer = {
        fromPlayerId: fromPlayer.id,
        toPlayerId: toPlayer.id,
        offer: { money: offerMoney, properties: offerProperties },
        request: { money: requestMoney, properties: requestProperties }
    };

    if (toPlayer.isAI) {
        const decision = evaluateTradeOfferByAI(tradeOffer);
        if (decision) {
            executeTrade(tradeOffer);
            showTradeReviewModal(tradeOffer, 'accepted');
        } else {
            showTradeReviewModal(tradeOffer, 'rejected');
        }
    }
}

/**
 * Calculates a player's "board state score" based on their assets.
 * This is used by the AI to evaluate the outcome of a trade.
 */
function calculateBoardStateScore(propertyIds: number[], money: number): number {
    let score = money;

    const propObjects = propertyIds.map(id => getPropertyById(id)!);

    // Add base value of properties, devaluing non-developable ones.
    score += propObjects.reduce((sum, prop) => sum + prop.price * (prop.type === 'property' ? 1.0 : 0.8), 0);
    
    // Calculate monopoly bonuses, which are the main drivers of value.
    const groups = new Map<PropertyGroup, number[]>();
    propObjects.forEach(prop => {
        if (prop.group !== 'Transport' && prop.group !== 'Utility') {
            if (!groups.has(prop.group)) groups.set(prop.group, []);
            groups.get(prop.group)!.push(prop.id);
        }
    });

    for (const [group, ownedProps] of groups.entries()) {
        const allGroupProps = properties.filter(p => p.group === group);
        if (allGroupProps.length === 0) continue;

        if (ownedProps.length === allGroupProps.length) {
            // Full monopoly bonus: a base amount plus the total value of the properties in it.
            score += 500 + allGroupProps.reduce((sum, p) => sum + p.price, 0); 
        } else if (ownedProps.length === allGroupProps.length - 1) {
            // Almost a monopoly bonus: significant value in being one property away.
            score += 250;
        }
    }
    return score;
}

function evaluateTradeOfferByAI(offer: TradeOffer): boolean {
    const aiPlayer = players[offer.toPlayerId];
    const fromPlayer = players[offer.fromPlayerId];

    // Calculate scores before the trade
    const aiPreTradeScore = calculateBoardStateScore(aiPlayer.properties, aiPlayer.money);
    const opponentPreTradeScore = calculateBoardStateScore(fromPlayer.properties, fromPlayer.money);

    // Determine what each player's assets would be after the trade
    const aiPostTradeProps = aiPlayer.properties.filter(p => !offer.request.properties.includes(p));
    aiPostTradeProps.push(...offer.offer.properties);
    const aiPostTradeMoney = aiPlayer.money + offer.offer.money - offer.request.money;

    const opponentPostTradeProps = fromPlayer.properties.filter(p => !offer.offer.properties.includes(p));
    opponentPostTradeProps.push(...offer.request.properties);
    const opponentPostTradeMoney = fromPlayer.money + offer.request.money - offer.offer.money;
    
    // Calculate scores after the trade
    const aiPostTradeScore = calculateBoardStateScore(aiPostTradeProps, aiPostTradeMoney);
    const opponentPostTradeScore = calculateBoardStateScore(opponentPostTradeProps, opponentPostTradeMoney);

    // Calculate the net gain for each player
    const aiGain = aiPostTradeScore - aiPreTradeScore;
    const opponentGain = opponentPostTradeScore - opponentPreTradeScore;

    // Add a bonus for receiving more properties than giving away
    const quantityDiff = offer.offer.properties.length - offer.request.properties.length;
    const quantityBonus = quantityDiff * 150; // Each extra property is worth a flat bonus
    
    const finalAiGain = aiGain + quantityBonus;

    logMessage(`AI Evaluation: AI Gain: ${Math.round(finalAiGain)}, Opponent Gain: ${Math.round(opponentGain)}`);

    // AI will never accept a trade that results in a net loss for itself.
    if (finalAiGain <= 0) {
        logMessage("AI rejects: The trade does not improve its position.");
        return false;
    }

    // If the opponent gets a massive gain (likely a monopoly), the AI becomes very cautious.
    // It will only accept if its own gain is also very high, making the trade mutually powerful.
    if (opponentGain > 600) { 
        logMessage("AI notes: Opponent gains a potential monopoly.");
        return finalAiGain > opponentGain * 0.7; // AI must gain at least 70% of what the opponent gains.
    }

    // In a more standard trade, the AI is more lenient.
    // It will accept if its gain is at least half of the opponent's gain.
    logMessage("AI notes: Evaluating a standard trade.");
    return finalAiGain > opponentGain * 0.5;
}


function executeTrade(offer: TradeOffer) {
    const fromPlayer = players[offer.fromPlayerId];
    const toPlayer = players[offer.toPlayerId];

    // Exchange money
    updatePlayerMoney(fromPlayer, offer.request.money - offer.offer.money);
    updatePlayerMoney(toPlayer, offer.offer.money - offer.request.money);

    // Exchange properties
    offer.offer.properties.forEach(pId => {
        fromPlayer.properties = fromPlayer.properties.filter(id => id !== pId);
        toPlayer.properties.push(pId);
        getPropertyById(pId)!.owner = toPlayer.id;
    });
    offer.request.properties.forEach(pId => {
        toPlayer.properties = toPlayer.properties.filter(id => id !== pId);
        fromPlayer.properties.push(pId);
        getPropertyById(pId)!.owner = fromPlayer.id;
    });

    logMessage(`Trade between ${fromPlayer.name} and ${toPlayer.name} was successful.`);
    updateUI();
    checkDebtResolved();
}

function showTradeReviewModal(offer: TradeOffer, decision: 'accepted' | 'rejected') {
    const fromPlayer = players[offer.fromPlayerId];
    const toPlayer = players[offer.toPlayerId];
    
    const formatItems = (money: number, propIds: number[]) => {
        let items = [];
        if (money > 0) items.push(`$${money}`);
        propIds.forEach(id => items.push(getPropertyById(id)!.name));
        return items.length > 0 ? `<ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>` : '<p>Nothing</p>';
    };

    const summaryEl = document.getElementById('trade-review-summary')!;
    summaryEl.innerHTML = `
        <p>${fromPlayer.name} offered:</p>
        ${formatItems(offer.offer.money, offer.offer.properties)}
        <p>and requested:</p>
        ${formatItems(offer.request.money, offer.request.properties)}
    `;

    document.getElementById('trade-review-title')!.textContent = `Trade with ${toPlayer.name}`;
    const decisionEl = document.getElementById('trade-review-decision')!;
    if (decision === 'accepted') {
        decisionEl.textContent = 'Trade Accepted!';
        decisionEl.style.color = 'green';
    } else {
        decisionEl.textContent = 'Trade Rejected!';
        decisionEl.style.color = 'red';
    }
    
    hideModals();
    modalBackdrop.classList.remove('hidden');
    tradeReviewModal.classList.remove('hidden');
}


// Auction Logic
function startAuction(property: Property) {
    hideModals();
    logMessage(`Auction started for ${property.name}!`);
    isAuctionActive = true;
    auctionProperty = property;
    auctionCurrentBid = 0;
    auctionHighestBidder = null;
    auctionParticipants = players.map(p => !p.isBankrupt); // All non-bankrupt players can participate
    auctionTurnPlayerIndex = currentPlayerIndex;
    
    showAuctionModal();
    nextAuctionTurn();
}

function showAuctionModal() {
    document.getElementById('auction-property-name')!.textContent = auctionProperty!.name;
    document.getElementById('auction-current-bid')!.textContent = `$${auctionCurrentBid}`;
    const bidderName = auctionHighestBidder !== null ? players[auctionHighestBidder].name : 'None';
    document.getElementById('auction-highest-bidder')!.textContent = bidderName;
    
    modalBackdrop.classList.remove('hidden');
    auctionModal.classList.remove('hidden');
}

function nextAuctionTurn() {
    const activeParticipants = auctionParticipants.filter(p => p).length;
    if (activeParticipants <= 1) {
        endAuction();
        return;
    }

    do {
        auctionTurnPlayerIndex = (auctionTurnPlayerIndex + 1) % players.length;
    } while (!auctionParticipants[auctionTurnPlayerIndex]);

    const currentPlayer = players[auctionTurnPlayerIndex];
    document.getElementById('auction-turn-msg')!.textContent = `It's ${currentPlayer.name}'s turn to bid.`;
    document.getElementById('auction-message')!.textContent = '';

    if (currentPlayer.isAI) {
        placeBidBtn.disabled = true;
        passAuctionBtn.disabled = true;
        setTimeout(handleAIAuctionTurn, 1000);
    } else {
        placeBidBtn.disabled = false;
        passAuctionBtn.disabled = false;
        bidAmountInput.min = String(auctionCurrentBid + 1);
        bidAmountInput.value = String(auctionCurrentBid + 10);
    }
}

function handlePlaceBid() {
    const player = players[auctionTurnPlayerIndex];
    const bidAmount = parseInt(bidAmountInput.value);

    const errorMsgEl = document.getElementById('auction-message')!;
    if (isNaN(bidAmount) || bidAmount <= auctionCurrentBid) {
        errorMsgEl.textContent = 'Your bid must be higher than the current bid.';
        return;
    }
    if (bidAmount > player.money) {
        errorMsgEl.textContent = 'You cannot afford this bid.';
        return;
    }

    auctionCurrentBid = bidAmount;
    auctionHighestBidder = player.id;
    logMessage(`${player.name} bids $${auctionCurrentBid}.`);
    showAuctionModal();
    nextAuctionTurn();
}

function handlePassAuction() {
    const player = players[auctionTurnPlayerIndex];
    auctionParticipants[player.id] = false;
    logMessage(`${player.name} passes.`);
    nextAuctionTurn();
}

function handleAIAuctionTurn() {
    const aiPlayer = players[auctionTurnPlayerIndex];
    const property = auctionProperty!;
    
    // Simple AI logic: Bid up to 120% of face value if they can afford it
    const bidThreshold = property.price * 1.2;
    const nextBid = auctionCurrentBid + getRandomInt(5, 20);

    if (auctionCurrentBid < bidThreshold && aiPlayer.money > nextBid) {
        // AI decides to bid
        auctionCurrentBid = nextBid;
        auctionHighestBidder = aiPlayer.id;
        logMessage(`${aiPlayer.name} bids $${auctionCurrentBid}.`);
        showAuctionModal();
    } else {
        // AI decides to pass
        auctionParticipants[aiPlayer.id] = false;
        logMessage(`${aiPlayer.name} passes.`);
    }
    nextAuctionTurn();
}

function endAuction() {
    isAuctionActive = false;
    hideModals();

    if (auctionHighestBidder !== null) {
        const winner = players[auctionHighestBidder];
        const property = auctionProperty!;
        logMessage(`${winner.name} won the auction for ${property.name} with a bid of $${auctionCurrentBid}!`);
        
        updatePlayerMoney(winner, -auctionCurrentBid);
        property.owner = winner.id;
        winner.properties.push(property.id);
        updateUI();
    } else {
        logMessage(`No one bid on ${auctionProperty!.name}. It remains unowned.`);
    }

    // Reset auction state
    auctionProperty = null;
    enableEndTurn();
}

// Bankruptcy Logic
function checkDebtResolved(): boolean {
    if (!isClearingDebt || !debtState) return false;

    const debtor = debtState.debtor;
    if (debtor.money >= debtState.amount) {
        logMessage(`${debtor.name} has raised enough money to clear their debt.`);
        // Make the payment
        updatePlayerMoney(debtor, -debtState.amount);
        if (debtState.creditor !== 'bank') {
            updatePlayerMoney(debtState.creditor, debtState.amount);
        }
        
        // Reset state
        isClearingDebt = false;
        debtState = null;
        
        hideModals();
        logMessage('Debt cleared. The turn can now continue.');
        enableEndTurn();
        return true;
    } else {
        if (!debtor.isAI) showManagePropertiesModal(); // Refresh modal for human player
        return false;
    }
}

function declareBankruptcy() {
    if (!isClearingDebt || !debtState) return;

    const { debtor, creditor } = debtState;

    logMessage(`${debtor.name} is bankrupt!`);
    debtor.isBankrupt = true;

    if (creditor === 'bank') {
        logMessage("All assets are forfeited to the bank.");
        debtor.properties.forEach(pId => {
            const prop = getPropertyById(pId)!;
            prop.owner = undefined;
            prop.houses = 0;
            prop.isMortgaged = false;
        });
    } else {
        logMessage(`All assets are transferred to ${creditor.name}.`);
        updatePlayerMoney(creditor, debtor.money);
        
        debtor.properties.forEach(pId => {
            const prop = getPropertyById(pId)!;
            prop.owner = creditor.id;
            creditor.properties.push(pId);
        });
    }
    
    debtor.money = 0;
    debtor.properties = [];

    isClearingDebt = false;
    debtState = null;
    updateUI();
    hideModals();
    endTurn();
}

function handleAIDebtResolution() {
    const { debtor, amount } = debtState!;
    logMessage(`${debtor.name} is trying to resolve a debt of $${amount}.`);
    
    const sellableHouses = debtor.properties
        .map(pId => getPropertyById(pId)!)
        .filter(p => p.houses > 0)
        .sort((a, b) => (b.houseCost / 2) - (a.houseCost / 2)); 

    for (const prop of sellableHouses) {
        if (debtor.money >= amount) break;
        const housesToSell = prop.houses;
        for (let i = 0; i < housesToSell; i++) {
            updatePlayerMoney(debtor, prop.houseCost / 2);
            prop.houses--;
        }
    }
    
    if (debtor.money >= amount) {
        checkDebtResolved();
        return;
    }

    const mortgagableProperties = debtor.properties
        .map(pId => getPropertyById(pId)!)
        .filter(p => !p.isMortgaged && p.houses === 0)
        .sort((a,b) => (a.price / 2) - (b.price / 2)); // Mortgage cheapest first

    for (const prop of mortgagableProperties) {
        if (debtor.money >= amount) break;
        updatePlayerMoney(debtor, prop.price / 2);
        prop.isMortgaged = true;
    }
    
    if (checkDebtResolved()) {
        if (isAuctionActive) { /* do nothing */ } 
        else if (players[currentPlayerIndex].consecutiveDoubles > 0) { handleAITurn(); }
        else { completeAITurnAction(); }
    } else {
        declareBankruptcy();
    }
}

// AI Trading & Property Management Logic

async function handleAIPropertyManagement() {
    const player = players[currentPlayerIndex];

    // Only manage properties if AI has a decent amount of cash
    if (player.money < 400) return;

    await considerBuildingHouses(player);
    // Future logic like unmortgaging can be added here
}

async function considerBuildingHouses(player: Player) {
    // Defines the priority of which color group to build on first.
    const MONOPOLY_BUILD_ORDER: PropertyGroup[] = [
        'Red', 'Yellow', 'Green', 'DarkBlue', 'Orange', 'Pink', 'LightBlue', 'Brown'
    ];

    let housesBuiltThisTurn = false;

    // Keep trying to build as long as it's a good idea and we can afford it.
    while (true) {
        let bestBuildOption: { property: Property } | null = null;
        
        // Find the best monopoly to build on based on a predefined priority list.
        for (const group of MONOPOLY_BUILD_ORDER) {
            if (playerHasMonopoly(player, group)) {
                const groupProperties = properties.filter(p => p.group === group && p.owner === player.id);
                
                // Can't build on a monopoly if any property in it is mortgaged.
                if (groupProperties.some(p => p.isMortgaged)) continue;
                
                // Find properties where we can build, respecting the 'even build' rule.
                const buildableProps = groupProperties.filter(p => isBuildEven(player, p));

                if (buildableProps.length > 0) {
                    // From the properties we can build on, pick the one that's cheapest to improve.
                    buildableProps.sort((a, b) => a.houseCost - b.houseCost);
                    const propToBuildOn = buildableProps[0];
                    
                    // AI keeps a cash reserve to avoid bankruptcy.
                    if (player.money >= propToBuildOn.houseCost + 200) { 
                        bestBuildOption = { property: propToBuildOn };
                        break; // Found the best group to build on for this iteration.
                    }
                }
            }
        }
        
        if (bestBuildOption) {
            const prop = bestBuildOption.property;
            buildHouse(prop.id); // This function handles money, state update, and logging.
            housesBuiltThisTurn = true;
            
            // Short delay to make the AI's actions observable.
            await new Promise(resolve => setTimeout(resolve, 500));
        } else {
            // No more viable or affordable building options found.
            break;
        }
    }
    
    if (housesBuiltThisTurn) {
        logMessage(`${player.name} finished developing properties.`);
    }
}

function getTradeOfferKey(offer: TradeOffer): string {
    const from = offer.fromPlayerId;
    const to = offer.toPlayerId;
    const offerProps = [...offer.offer.properties].sort((a, b) => a - b).join(',');
    const offerMoney = offer.offer.money;
    const requestProps = [...offer.request.properties].sort((a, b) => a - b).join(',');
    const requestMoney = offer.request.money;

    return `${from}>${to}|oP:${offerProps}|oM:${offerMoney}|rP:${requestProps}|rM:${requestMoney}`;
}

async function considerProposingTrade(): Promise<boolean> {
    const aiPlayer = players[currentPlayerIndex];

    // AI will only consider trading if it's mid-game and has enough cash.
    if (aiPlayer.money < 500 || players.flatMap(p => p.properties).length < 8) {
        return false;
    }

    let bestTrade: TradeOffer | null = null;
    let bestTradeScore = -Infinity;

    for (const targetPlayer of players) {
        if (targetPlayer.id === aiPlayer.id || targetPlayer.isBankrupt) continue;

        const tradeOffer = findBestTradeForAI(aiPlayer, targetPlayer);
        if (tradeOffer) {
            const score = evaluateAIOfferValue(tradeOffer);
            if (score > bestTradeScore) {
                bestTrade = tradeOffer;
                bestTradeScore = score;
            }
        }
    }

    // If no trade found to complete a monopoly, consider selling singletons to others
    if (!bestTrade) {
        for (const propId of aiPlayer.properties) {
            const propToSell = getPropertyById(propId)!;
            
            const groupProps = properties.filter(p => p.group === propToSell.group);
            const aiOwnedInGroup = groupProps.filter(p => aiPlayer.properties.includes(p.id)).length;
            if ((aiOwnedInGroup / groupProps.length) > 0.5 || propToSell.houses > 0) continue;

            for (const targetPlayer of players) {
                if (targetPlayer.id === aiPlayer.id || targetPlayer.isBankrupt) continue;

                const targetOwnedInGroup = groupProps.filter(p => targetPlayer.properties.includes(p.id)).length;
                if (targetOwnedInGroup === groupProps.length - 1) {
                    const askingPrice = Math.round(propToSell.price * (targetPlayer.isAI ? 1.8 : 1.9));
                    if (targetPlayer.money > askingPrice) {
                        const tradeOffer = {
                            fromPlayerId: aiPlayer.id, toPlayerId: targetPlayer.id,
                            offer: { money: 0, properties: [propToSell.id] },
                            request: { money: askingPrice, properties: [] }
                        };
                        const score = askingPrice - propToSell.price;
                        if (score > bestTradeScore) {
                            bestTrade = tradeOffer;
                            bestTradeScore = score;
                        }
                    }
                }
            }
        }
    }

    if (bestTrade) {
        const tradeKey = getTradeOfferKey(bestTrade);
        if (recentlyProposedTrades.has(tradeKey)) {
            logMessage(`${aiPlayer.name} considered a trade but decided not to repeat the offer.`);
            return false;
        }
        recentlyProposedTrades.add(tradeKey);

        const targetPlayer = players[bestTrade.toPlayerId];
        logMessage(`${aiPlayer.name} is proposing a trade to ${targetPlayer.name}.`);

        if (targetPlayer.isAI) {
            const decision = evaluateTradeOfferByAI(bestTrade);
            if (decision) {
                logMessage(`${targetPlayer.name} accepted the trade!`);
                executeTrade(bestTrade);
                showTradeReviewModal(bestTrade, 'accepted');
                await new Promise(resolve => setTimeout(resolve, 2000));
            } else {
                logMessage(`${targetPlayer.name} rejected the trade.`);
            }
            return false;
        } else {
            currentAiTradeOffer = bestTrade;
            showAITradeProposalModal(bestTrade);
            return true; // Pause AI turn
        }
    }

    return false;
}

function findBestTradeForAI(aiPlayer: Player, targetPlayer: Player): TradeOffer | null {
    const potentialMonopolies = new Map<PropertyGroup, number[]>();

    // Identify all property groups where the AI has properties
    aiPlayer.properties.forEach(pId => {
        const prop = getPropertyById(pId)!;
        if (!potentialMonopolies.has(prop.group)) {
            potentialMonopolies.set(prop.group, []);
        }
        potentialMonopolies.get(prop.group)!.push(pId);
    });
    
    for (const [group, ownedProps] of potentialMonopolies.entries()) {
        const allGroupProps = properties.filter(p => p.group === group);
        const groupSize = allGroupProps.length;

        if (ownedProps.length === groupSize) continue; // AI already has this monopoly

        // Only pursue monopolies where the AI has a strong position.
        if (groupSize >= 3 && ownedProps.length < 2) {
            continue;
        }

        const missingProps = allGroupProps.filter(p => !ownedProps.some(op => op === p.id));
        const targetHasMissingProps = missingProps.filter(p => targetPlayer.properties.includes(p.id));

        if (targetHasMissingProps.length > 0) {
            // AI found a property it needs that the target player has.
            const requestedProp = targetHasMissingProps[0]; // Request the first one found
            const aiOfferedProps = findPropsToOffer(aiPlayer, requestedProp);
            const requestValue = requestedProp.price * 1.2; // Value the needed prop highly
            const offerPropsValue = aiOfferedProps.reduce((sum, p) => sum + p.price, 0);
            let offerMoney = Math.round(requestValue - offerPropsValue);
            
            if (offerMoney < 0) offerMoney = 0;
            if (aiPlayer.money < offerMoney || aiOfferedProps.some(p => p.houses > 0)) continue;

            // Found a viable trade
            return {
                fromPlayerId: aiPlayer.id,
                toPlayerId: targetPlayer.id,
                offer: { money: offerMoney, properties: aiOfferedProps.map(p => p.id) },
                request: { money: 0, properties: [requestedProp.id] }
            };
        }
    }

    return null; // No suitable trade found with this player
}

function findPropsToOffer(aiPlayer: Player, requestedProp: Property): Property[] {
    const offered: Property[] = [];
    // The AI will offer any property that isn't part of another potential monopoly.
    const aiProps = aiPlayer.properties.map(id => getPropertyById(id)!).filter(p => p.houses === 0 && p.type === 'property');

    for (const prop of aiProps) {
        // Avoid offering properties from a group where the AI is close to a monopoly
        const groupProps = properties.filter(p => p.group === prop.group);
        const aiOwnedInGroup = groupProps.filter(p => aiPlayer.properties.includes(p.id)).length;
        if (aiOwnedInGroup / groupProps.length > 0.5) continue;

        const totalValue = offered.reduce((sum, p) => sum + p.price, 0) + prop.price;
        // AI is willing to overpay significantly in raw value to complete a monopoly.
        if (totalValue <= requestedProp.price * 2.5) {
            offered.push(prop);
        }
    }
    return offered;
}

function evaluateAIOfferValue(offer: TradeOffer): number {
    const aiPlayer = players[offer.fromPlayerId];
    let score = 0;
    
    offer.request.properties.forEach(pId => {
        const prop = getPropertyById(pId)!;
        const otherPropsInGroup = properties.filter(p => p.group === prop.group && p.id !== pId);
        const aiWouldHaveAll = otherPropsInGroup.every(p => aiPlayer.properties.includes(p.id));
        if (aiWouldHaveAll) {
            // Highly value completing a monopoly
            score += 500 + prop.price;
        }
    });

    const offerValue = offer.offer.money + offer.offer.properties.reduce((sum, id) => sum + getPropertyById(id)!.price, 0);
    score -= offerValue;

    return score;
}

function showAITradeProposalModal(offer: TradeOffer) {
    const fromPlayer = players[offer.fromPlayerId];
    
    const formatItems = (money: number, propIds: number[]) => {
        let items = [];
        if (money > 0) items.push(`$${money}`);
        propIds.forEach(id => items.push(getPropertyById(id)!.name));
        return items.length > 0 ? `<ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>` : '<p>Nothing</p>';
    };

    const summaryEl = document.getElementById('ai-trade-proposal-summary')!;
    summaryEl.innerHTML = `
        <p>${fromPlayer.name} offers you:</p>
        ${formatItems(offer.offer.money, offer.offer.properties)}
        <p>in exchange for:</p>
        ${formatItems(offer.request.money, offer.request.properties)}
    `;

    document.getElementById('ai-trade-proposal-title')!.textContent = `Trade Proposal from ${fromPlayer.name}`;
    
    hideModals();
    modalBackdrop.classList.remove('hidden');
    aiTradeProposalModal.classList.remove('hidden');
}


// Event Listeners
startGameBtn.addEventListener('click', () => {
    const numAI = parseInt(aiPlayersSelect.value);
    startGame(numAI);
});

rollDiceBtn.addEventListener('click', rollDice);
endTurnBtn.addEventListener('click', endTurn);

buyPropertyBtn.addEventListener('click', buyProperty);
auctionPropertyBtn.addEventListener('click', () => {
    const property = getPropertyById(players[currentPlayerIndex].position)!;
    startAuction(property);
});

cardModalOkBtn.addEventListener('click', () => {
    if (onCardModalOk) {
        onCardModalOk();
        onCardModalOk = null;
    } else {
        hideModals();
        enableEndTurn();
    }
});
closeCasinoModalBtn.addEventListener('click', () => {
    hideModals();
    enableEndTurn();
});
placeCasinoBetBtn.addEventListener('click', playCasinoGame);
restartGameBtn.addEventListener('click', () => location.reload());

managePropertiesBtn.addEventListener('click', showManagePropertiesModal);
closeManageModalBtn.addEventListener('click', hideModals);
declareBankruptcyBtn.addEventListener('click', declareBankruptcy);

proposeTradeBtn.addEventListener('click', showSelectTradePartnerModal);
cancelTradePartnerSelectBtn.addEventListener('click', hideModals);
cancelTradeBtn.addEventListener('click', hideModals);
sendTradeOfferBtn.addEventListener('click', handleTradeOffer);
tradeReviewOkBtn.addEventListener('click', () => {
    hideModals();
    if (!isClearingDebt) {
        rollDiceBtn.style.display = 'none';
        endTurnBtn.style.display = 'block';
    }
});

placeBidBtn.addEventListener('click', handlePlaceBid);
passAuctionBtn.addEventListener('click', handlePassAuction);

acceptAiTradeBtn.addEventListener('click', () => {
    if (currentAiTradeOffer) {
        logMessage(`You accepted the trade from ${players[currentAiTradeOffer.fromPlayerId].name}.`);
        executeTrade(currentAiTradeOffer);
        currentAiTradeOffer = null;
        hideModals();
        completeAITurnAction();
    }
});

rejectAiTradeBtn.addEventListener('click', () => {
    if (currentAiTradeOffer) {
        logMessage(`You rejected the trade from ${players[currentAiTradeOffer.fromPlayerId].name}.`);
        currentAiTradeOffer = null;
        hideModals();
        completeAITurnAction();
    }
});
