<template>
	<v-row align="center" justify="center">
		<v-col v-if="!loading" cols="12" md="7">
  		<v-card color="#deeddd" :elevation="20">
  		  <v-card-title>
					<v-text-field
  		      v-model="search"
						clearable
  		      append-icon="mdi-magnify"
  		      label="Search"
  		      single-line
  		      hide-details
  		    ></v-text-field>
  		  </v-card-title>
  		  <v-data-table
					:elevation="20"
					hide-default-header
  		    :headers="headers"
  		    :items="pokemons"
					:search="search"
  		  >
				<template v-slot:item.name="{ item }">
					<a :href="`/pokemon/${item.name}`">{{ item.name }}</a>
  		  </template>
				</v-data-table>
  		</v-card>
		</v-col>
		<v-col v-else cols="12" class="text-center">
			<v-progress-circular
        indeterminate
        color="primary"
        :width="10"
        :size="100"
      ></v-progress-circular>
		</v-col>
	</v-row>
</template>

<script lang="ts">
  import Vue from 'vue';
  import axios, { AxiosResponse, AxiosError } from 'axios';
  import router from '../router';
  import { IDashboardData } from '../interfaces';


  export default Vue.extend({
    name: 'Dashboard',

    data(): IDashboardData {
      return {
        loading: true,
        search: '',
        headers: [
          {
            text: '',
            align: 'center',
            value: 'name',
          },
        ],
        pokemons: [
          {
            name: 'bulbasaur',
            url: 'https://pokeapi.co/api/v2/pokemon/1/',
          },
          {
            name: 'ivysaur',
            url: 'https://pokeapi.co/api/v2/pokemon/2/',
          },
          {
            name: 'venusaur',
            url: 'https://pokeapi.co/api/v2/pokemon/3/',
          },
          {
            name: 'charmander',
            url: 'https://pokeapi.co/api/v2/pokemon/4/',
          },
          {
            name: 'charmeleon',
            url: 'https://pokeapi.co/api/v2/pokemon/5/',
          },
          {
            name: 'charizard',
            url: 'https://pokeapi.co/api/v2/pokemon/6/',
          },
          {
            name: 'squirtle',
            url: 'https://pokeapi.co/api/v2/pokemon/7/',
          },
          {
            name: 'wartortle',
            url: 'https://pokeapi.co/api/v2/pokemon/8/',
          },
          {
            name: 'blastoise',
            url: 'https://pokeapi.co/api/v2/pokemon/9/',
          },
          {
            name: 'caterpie',
            url: 'https://pokeapi.co/api/v2/pokemon/10/',
          },
          {
            name: 'metapod',
            url: 'https://pokeapi.co/api/v2/pokemon/11/',
          },
          {
            name: 'butterfree',
            url: 'https://pokeapi.co/api/v2/pokemon/12/',
          },
          {
            name: 'weedle',
            url: 'https://pokeapi.co/api/v2/pokemon/13/',
          },
          {
            name: 'weedle',
            url: 'https://pokeapi.co/api/v2/pokemon/13/',
          },
          {
            name: 'weedle',
            url: 'https://pokeapi.co/api/v2/pokemon/13/',
          },
          {
            name: 'weedle',
            url: 'https://pokeapi.co/api/v2/pokemon/13/',
          },
          {
            name: 'weedle',
            url: 'https://pokeapi.co/api/v2/pokemon/13/',
          },
          {
            name: 'weedle',
            url: 'https://pokeapi.co/api/v2/pokemon/13/',
          },
          {
            name: 'weedle',
            url: 'https://pokeapi.co/api/v2/pokemon/13/',
          },
          {
            name: 'weedle',
            url: 'https://pokeapi.co/api/v2/pokemon/13/',
          },
        ],
      };
    },
    methods: {
      fetchData() {
        axios.get('https://pokeapi.co/api/v2/pokemon/?limit=964')
        .then((response: AxiosResponse): void => {
          this.pokemons = response.data.results;
          this.loading = false;
        })
        .catch((error: AxiosError | undefined): void => {
          if (error && error.response && error.response.status === 404) {
            router.replace('/404');
          }
        });
      },
    },
    mounted() {
      // this.loading = true;
      this.loading = false;
    },
    created() {
      // this.fetchData();
    },
  });
</script>

<style scoped>

a {
	text-decoration: none;
	color:black !important;
}

a:hover, 
a:active {
	text-decoration: bold;
	font-size: 1.5rem;
}

.theme--light.v-data-table {
	background-color: #deeddd !important;
}

</style>