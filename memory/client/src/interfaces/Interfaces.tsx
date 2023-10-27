export interface ICardBack {
  name: string;
  url: string;
  _id: string;
}
interface IAbilities {
  name: string;
  text: string;
  type: string;
}
interface IAttack {
  name: string;
  cost: string[];
  convertedEndergyCost: number;
  damage: string;
  text: string;
}
interface IWeakness {
  type: string;
  value: string;
}
interface ILegalities {
  unlimited: string;
}
interface IImages {
  small: string;
  large: string;
}
interface ITcgPlayer {
  url: string;
  updatedAt: string;
  prices: IQuality;
}
interface IQuality {
  normal?: IPrices;
  holofoil: IPrices;
  reverseHolofoil: IPrices;
  "1stEditionHolofoil": IPrices;
  "1stEditionNormal": IPrices;
}
interface IPrices {
  low?: number;
  mid?: number;
  high?: number;
  market?: number;
  directLow?: number;
}
interface ICardMarketPrices {
  averageSellPrice?: number;
  lowPrice?: number;
  trendPrice?: number;
  germanProLow?: number;
  suggestedPrice?: number;
  reverseHoloSell?: number;
  reverseHoloLow?: number;
  reverseHoloTrend?: number;
  lowPriceExPlus?: number;
  avg1?: number;
  avg7?: number;
  avg30?: number;
  reverseHoloAvg1?: number;
  reverseHoloAvg7?: number;
  reverseHoloAvg30?: number;
}
interface ICardMarket {
  url: string;
  updatedAt: string;
  prices: ICardMarketPrices;
}
export interface ICard {
  _id?: string;
  id: string;
  name: string;
  subtypes: string[];
  level: string;
  types: string[];
  evolvesFrom: string;
  abilities: IAbilities[];
  attacks: IAttack[];
  weaknesses: IWeakness[];
  retreatCost: string[];
  convertedRetreatCost: number;
  number: string;
  artist: string;
  rarity: string;
  flavorText: string;
  nationalPokedexNumbers: number[];
  legalities: ILegalities;
  images: IImages;
  tcgplayer?: ITcgPlayer;
  cardMarket?: ICardMarket;
}
