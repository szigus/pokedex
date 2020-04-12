import { PokmeonStatColor, PokemonColors, Nullable } from './types';

// tslint:disable no-empty-interface
export interface IPokemonColor extends PokemonColors {}
// tslint:disable no-empty-interface
export interface IPokemonStatColor extends PokmeonStatColor {}

interface IDataTableHeader {
  text: string;
  align: string;
  value: string;
}

interface INameUrl {
  name: string;
  url: string;
}

export interface IDashboardData {
  loading: boolean;
  search: string;
  headers: IDataTableHeader[];
  pokemons: INameUrl[];
}

export interface IPokeData {
  order: number;
  name: string;
  sprites: {
    back_default: Nullable<string>;
    back_female: Nullable<string>;
    back_shiny: Nullable<string>;
    back_shiny_female: Nullable<string>;
    front_default: Nullable<string>;
    front_female: Nullable<string>;
    front_shiny: Nullable<string>;
    front_shiny_female: Nullable<string>;
  };
  abilities: Array<{
    ability: INameUrl;
    is_hidden: boolean;
    slot: number;
  }>;
  types: Array<{
    slot: number;
    type: INameUrl;
  }>;
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: INameUrl;
  }>;
  moves: Array<{
    move: INameUrl;
    version_group_details: Array<{
      level_learned_at: number;
      move_learn_method: INameUrl;
      version_group: INameUrl;
    }>;
  }>;
  forms: INameUrl[];
}

export interface IPokemonDetailsData {
  loading: boolean;
  movesHeaders: IDataTableHeader[];
  pokeData: Nullable<IPokeData>;
}
