<template>
  <v-row class="query-db-container">
    <v-col
      sm="3"
      class="__query-db-sidebar"
    >
      <QuerySidebar />
    </v-col>
    <v-col
      class="__query-content"
      sm="9"
    >
      <SqlQueryInput :queries="queries" />
      <AppEcharts :chart="chart" />
    </v-col>
  </v-row>
</template>
<script>
import AppEcharts from './AppEcharts.vue';
import QuerySidebar from './QuerySidebar.vue';
import SqlQueryInput from './SqlQueryInput.vue';

export default {
    name: "QueryDB",
    components: { SqlQueryInput, QuerySidebar, AppEcharts },
    data: function(){
      return {
        queryDataMapping: {

        },
        queries: [
          {
            id: 1, 
            query: 'SELECT COUNT(category.name) as count_of_categories FROM film_category LEFT JOIN film ON film_category.film_id = film.film_id LEFT JOIN category ON film_category.category_id = category.category_id WHERE film.release_year = 2018',
            label: 'Get customers'
          },
          {
            id: 2, 
            query: 'SELECT COUNT(category.name) as count_of_categories FROM film_category LEFT JOIN film ON film_category.film_id = film.film_id LEFT JOIN category ON film_category.category_id = category.category_id WHERE film.release_year = 2018',
            label: 'Get Orders'

          },
          {
            id: 3, 
            query: 'SELECT COUNT(category.name) as count_of_categories FROM film_category LEFT JOIN film ON film_category.film_id = film.film_id LEFT JOIN category ON film_category.category_id = category.category_id WHERE film.release_year = 2018',
            label: 'Get Products'
          },
        ],
      }
    }
}
</script>
<style lang="scss" scoped>
.query-db-container{
    .__query-content{
        padding: 20px;
    }
    .__query-db-sidebar{
        border-right: 1px solid #F6F6F6;
    }
}
</style>