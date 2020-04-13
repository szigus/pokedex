<template>
  <div>
    <div v-if="!loading && !errorToShow">
      <v-btn to="/" small>back</v-btn>
      <v-row>

        <v-col cols="12">
          <div class="headline text-center font-weight-bold">{{ nameConvert(pokeData.name) }} #{{ pokeData.order }}</div>
        </v-col>

        <v-col cols="12" md="6">
          <v-card height="100%" :elevation="20" color="#deeddd">

            <v-card-title class="title">
              Type
            </v-card-title>

            <v-card-text>
              <span v-for="type in pokeData.types" :key="type.type.name">
                <v-chip 
                  :color="getTypeColor(type.type.name)"
                  dark
                  small
                  class="ml-1 mt-1"
                ><span class="font-weight-bold">{{ type.type.name }}</span></v-chip>
              </span>
            </v-card-text>

            <v-card-title class="title">
              Abilities
            </v-card-title>

            <v-card-text>
              <ul>
                <li v-for="(ability, i) in pokeData.abilities" :key="i">
                  {{ isHiddenAbility(ability.is_hidden, ability.ability.name) }}
                </li>
              </ul>
            </v-card-text>

            <v-card-title class="title">
              Stats
            </v-card-title>

            <v-card-text>
              <div 
                v-for="stat in pokeData.stats"
                :key="stat.stat.name">
                 {{ stat.stat.name }} <span class="font-italic">({{ stat.base_stat }})</span>
                <v-progress-linear
                  :color="getStatColor(stat.stat.name)"
                  height="10"
                  :value="stat.base_stat"
                  striped
                  class="mb-2"
                ></v-progress-linear>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card :elevation="20" color="#deeddd" height="100%">
            <v-card-text class="justify-center">
              <v-img 
                :src="pokeData.sprites.front_default || undefined"
                lazy-src="img/default-avatar.png"
                :alt="pokeData.name"
                max-height="350px"
                contain
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                    style="border: 1px solid grey;"
                  >
                    No image found
                  </v-row>
                </template>
              </v-img>
            </v-card-text>

            <v-card-title class="title">
              Forms
            </v-card-title>

            <v-card-text class="d-flex justify-space-around">
              <div v-for="(form, index) in pokeData.forms" :key="index">
                <span>{{ form.name }}</span><br>
                <v-avatar color="#ff6600" size="60" >
                  <span class="white--text headline">{{ index + 1 }}</span>
                </v-avatar>
              </div>                    
            </v-card-text>

          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card :elevation="20" color="#deeddd">
            <v-card-title class="title">
              Moves
            </v-card-title>
            <v-data-table
              :headers="movesHeaders"
              :items="pokeData.moves"
              :single-expand="true"
              item-key="move.name"
              show-expand
            >
              <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length" class="move__expansion">
                  <v-simple-table dense>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th>Version group</th>
                          <th>Learn method</th>
                          <th>XP</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(detail, j) in item.version_group_details" :key="j">
                          <td>{{ detail.version_group.name }}</td>
                          <td>{{ detail.move_learn_method.name }}</td>
                          <td>{{ detail.level_learned_at }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </td>
              </template>
            </v-data-table>
          </v-card>

        </v-col>

      </v-row>
    </div>

    <div v-else-if="errorToShow" class="text-center">
      <error-handler
        :receivedError="error"
      ></error-handler>
    </div>

    <div v-else class="text-center">
      <loading-component />
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import axios, { AxiosResponse, AxiosError } from 'axios';
  import router from '../router';
  import {
    IPokemonColor,
    IPokemonStatColor,
    IPokemonDetailsData,
    IPokeData,
    IPokemonDetailsMethods } from '../interfaces';
  import { POKEMON_TYPE_COLOR, POKEMON_STAT_COLOR } from '../enums';
  import ErrorHandler from '../components/errorHandler.vue';
  import LoadingComponent from '../components/loadingComponent.vue';

  export default Vue.extend<
    IPokemonDetailsData,
    IPokemonDetailsMethods,
    {}
  >({
    name: 'PokemonDetails',
    components: { ErrorHandler, LoadingComponent },
    data(): IPokemonDetailsData {
      return {
        loading: true,
        errorToShow: false,
        error: {
          msg: '',
          code: 0,
        },
        pokeData: {
          order: 1,
          name:	'bulbasaur',
          sprites: {
            back_default: null,
            back_female: null,
            back_shiny: null,
            back_shiny_female: null,
            front_default: null,
            front_female: null,
            front_shiny: null,
            front_shiny_female: null,
          },
          abilities: [
            {
              ability: {
                name: 'chlorophyll',
                url: 'https://pokeapi.co/api/v2/ability/34/',
              },
              is_hidden: true,
              slot: 3,
            },
            {
              ability: {
                name: 'overgrow',
                url: 'https://pokeapi.co/api/v2/ability/65/',
              },
              is_hidden: false,
              slot: 1,
            },
          ],
          types: [
            {
              slot:	2,
              type: {
                name:	'poison',
                url:	'https://pokeapi.co/api/v2/type/4/',
              },
            },
            {
              slot: 1,
              type: {
                name:	'grass',
                url:	'https://pokeapi.co/api/v2/type/12/',
              },
            },
            {
              slot: 1,
              type: {
                name:	'fire',
                url:	'https://pokeapi.co/api/v2/type/12/',
              },
            },
            {
              slot: 1,
              type: {
                name:	'water',
                url:	'https://pokeapi.co/api/v2/type/12/',
              },
            },
            {
              slot: 1,
              type: {
                name:	'electric',
                url:	'https://pokeapi.co/api/v2/type/12/',
              },
            },
            {
              slot: 1,
              type: {
                name:	'ice',
                url:	'https://pokeapi.co/api/v2/type/12/',
              },
            },
            {
              slot: 1,
              type: {
                name:	'fighting',
                url:	'https://pokeapi.co/api/v2/type/12/',
              },
            },
            {
              slot: 1,
              type: {
                name:	'ground',
                url:	'https://pokeapi.co/api/v2/type/12/',
              },
            },
            {
              slot: 1,
              type: {
                name:	'flying',
                url:	'https://pokeapi.co/api/v2/type/12/',
              },
            },
            {
              slot: 1,
              type: {
                name:	'psychic',
                url:	'https://pokeapi.co/api/v2/type/12/',
              },
            },
            {
              slot: 1,
              type: {
                name:	'bug',
                url:	'https://pokeapi.co/api/v2/type/12/',
              },
            },
            {
              slot: 1,
              type: {
                name:	'rock',
                url:	'https://pokeapi.co/api/v2/type/12/',
              },
            },
            {
              slot: 1,
              type: {
                name:	'ghost',
                url:	'https://pokeapi.co/api/v2/type/12/',
              },
            },
            {
              slot: 1,
              type: {
                name:	'dragon',
                url:	'https://pokeapi.co/api/v2/type/12/',
              },
            },
            {
              slot: 1,
              type: {
                name:	'dark',
                url:	'https://pokeapi.co/api/v2/type/12/',
              },
            },
            {
              slot: 1,
              type: {
                name:	'steel',
                url:	'https://pokeapi.co/api/v2/type/12/',
              },
            },
            {
              slot: 1,
              type: {
                name:	'fiary',
                url:	'https://pokeapi.co/api/v2/type/12/',
              },
            },
            {
              slot: 1,
              type: {
                name:	'rare',
                url:	'https://pokeapi.co/api/v2/type/12/',
              },
            },
          ],
          stats: [
            {
              base_stat: 45,
              effort:	0,
              stat: {
                name:	'speed',
                url:	'https://pokeapi.co/api/v2/stat/6/',
              },
            },
            {
              base_stat:	65,
              effort:	0,
              stat: {
                name:	'special-defense',
                url:	'https://pokeapi.co/api/v2/stat/5/',
              },
            },
            {
              base_stat:	65,
              effort:	0,
              stat: {
                name:	'special-attack',
                url:	'https://pokeapi.co/api/v2/stat/5/',
              },
            },
            {
              base_stat:	49,
              effort:	0,
              stat: {
                name:	'defence',
                url:	'https://pokeapi.co/api/v2/stat/5/',
              },
            },
            {
              base_stat:	49,
              effort:	0,
              stat: {
                name:	'attack',
                url:	'https://pokeapi.co/api/v2/stat/5/',
              },
            },
            {
              base_stat:	45,
              effort:	0,
              stat: {
                name:	'hp',
                url:	'https://pokeapi.co/api/v2/stat/5/',
              },
            },
          ],
          moves: [
            {
              move: {
                name: 'razor-wind',
                url: '',
              },
              version_group_details: [
                {
                  level_learned_at:	0,
                  move_learn_method: {
                    name:	'egg',
                    url: 'https://pokeapi.co/api/v2/move-learn-method/2/',
                  },
                  version_group: {
                    name: 'crystal',
                    url: 'https://pokeapi.co/api/v2/version-group/4/',
                  },
                },
              ],
            },
            {
              move: {
                name: 'swords-dance',
                url: '',
              },
              version_group_details: [
                {
                  level_learned_at:	0,
                  move_learn_method: {
                    name:	'egg',
                    url: 'https://pokeapi.co/api/v2/move-learn-method/2/',
                  },
                  version_group: {
                    name: 'crystal',
                    url: 'https://pokeapi.co/api/v2/version-group/4/',
                  },
                },
                {
                  level_learned_at:	0,
                  move_learn_method: {
                    name:	'egg',
                    url: 'https://pokeapi.co/api/v2/move-learn-method/2/',
                  },
                  version_group: {
                    name: 'gold-silver',
                    url: 'https://pokeapi.co/api/v2/version-group/4/',
                  },
                },
              ],
            },
          ],
          forms: [
            {
              name: 'bulbasaur',
              url: 'https://pokeapi.co/api/v2/pokemon-form/1/',
            },
            {
              name: 'ivysaur',
              url: 'https://pokeapi.co/api/v2/pokemon-form/1/',
            },
            {
              name: 'venusaur',
              url: 'https://pokeapi.co/api/v2/pokemon-form/1/',
            },
          ],
        },
        movesHeaders: [
          {
            text: '',
            align: 'left',
            sortable: false,
            value: 'move.name',
          },
        ],
      };
    },
    methods: {
      fetchData(): void {
        axios.get('https://pokeapi.co/api/v2/pokemon/' + this.$route.params.name)
        .then((response: AxiosResponse<IPokeData>): void => {
          /* this.pokeData = null; */
          this.pokeData = response.data;
          this.loading = false;
        })
        .catch((error: AxiosError | undefined): void => {
          this.loading = false;
          if (error && error.response) {
            if (error.response.status === 404) {
              router.replace('/404');
            }

            this.errorToShow = true;
            this.error.msg = error.response.data;
            this.error.code = error.response.status;
          }
        });
      },
      getTypeColor(val: POKEMON_TYPE_COLOR): string {

        const color: IPokemonColor = {
          normal: '#e5d8zz',
          fire: '#e6290c',
          water: '#0badd5',
          electric: '#e8e012',
          grass: '#36ba11',
          ice: '#2ce6db',
          fighting: '#e6662c',
          poison: '#e62ce4',
          ground: '#f1e91d',
          flying: '#54b9ed',
          psychic: '#ec81d6',
          bug: '#81ecac',
          rock: '#f5db86',
          ghost: '#aebcf2',
          dragon: '#8199f7',
          dark: '#4d4f58',
          steel: '#818389',
          fiary: '#c591cf',
        };

        return color[val] || 'primary';
      },
      getStatColor(val: POKEMON_STAT_COLOR): string {
        const color: IPokemonStatColor = {
          'speed': 'lime',
          'special-attack': 'light-green darken-4',
          'special-defense': 'light-blue darken-4',
          'defense': 'light-blue darken-1',
          'attack': 'light-green darken-1',
          'hp': 'deep-orange',
        };

        return color[val] || 'primary';
      },
      isHiddenAbility(hidden: boolean, name: string): string {
        return hidden ? `${name} (hidden ability)` : name;
      },
      nameConvert(name: string): string {
        return name.toUpperCase();
      },
    },
    mounted() {
      this.loading = true;
    },
    created() {
      this.fetchData();
    },
  });
</script>

<style scoped>

.poke__arrow {
  font-size: 3rem;
  vertical-align: middle;
}

.move__expansion {
  padding: 32px 32px !important;
}

.theme--light.v-data-table {
	background-color: #deeddd !important;
}

</style>