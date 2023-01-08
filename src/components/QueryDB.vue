<template>
  <v-row class="query-db-container">
    <v-col
      sm="2"
      class="__query-db-sidebar"
    >
      <QuerySidebar />
    </v-col>
    <v-col
      class="__query-content"
      sm="10"
    >
      <SqlQueryInput
        :queries="queries"
        @run-query="loadQueryResult"
      />
      <QueryResultCard :data="queryCardData" />
    </v-col>
  </v-row>
</template>
<script>
import QueryResultCard from './QueryResultCard.vue';
import QuerySidebar from './QuerySidebar.vue';
import SqlQueryInput from './SqlQueryInput.vue';

export default {
    name: "QueryDB",
    components: { SqlQueryInput, QuerySidebar, QueryResultCard },
    data: function(){
      return {
        queryDataMapping: {

        },
        queries: [
          {
            id: 1, 
            query: 'SELECT COUNT(category.name) as count_of_categories FROM film_category LEFT JOIN film ON film_category.film_id = film.film_id LEFT JOIN category ON film_category.category_id = category.category_id WHERE film.release_year = 2018',
            label: 'Get customers',
            dataName: 'customers.json'
          },
          {
            id: 2, 
            query: 'SELECT COUNT(category.name) as count_of_categories FROM film_category LEFT JOIN film ON film_category.film_id = film.film_id LEFT JOIN category ON film_category.category_id = category.category_id WHERE film.release_year = 2018',
            label: 'Get Orders',
            dataName: 'orders.json'
          },
          {
            id: 3, 
            query: 'SELECT COUNT(category.name) as count_of_categories FROM film_category LEFT JOIN film ON film_category.film_id = film.film_id LEFT JOIN category ON film_category.category_id = category.category_id WHERE film.release_year = 2018',
            label: 'Get Products',
            dataName: 'products.json'
          },
        ],
        queryCardData: {
          uuid: '',
          query: {},
          data: {chart: null, table: null, json: ''},
          filters: [{}],
        },
        savedQueries: [{
          uuid: '',
          query: '',
          data: {chart: null, table: null, json: ''},
          filters: [{}],
        }],

      }
    },
    computed: {
        getQueries: function () {
            return this.queries.map(query => query['label'])
        },
        getSelectedQueryCsv: function() {
          return this.queries.find((query) => query['label'] === this.selectedQuery)['name'];
        }
    },
    methods: {
      loadQueryResult: function (query) {
        let jsonData;
        try{
          jsonData = require(`./../assets/json/${query['dataName']}`);
        }catch (error){
          console.log(error);
        } 
        this.getQueryCard(query, jsonData);     
      },
      getQueryCard: function (query, json) {
        let card =  {
          uuid: this.getUUID(),
          query: this.deepCopy(query),
          data: {chart: null, table: null, json: ''},
          filters: [],
        }

        card['data']['json'] = json;
        card['data']['chart'] = this.getChartData(json);
        card['data']['table'] = this.getTableData(json);

        this.queryCardData = this.deepCopy(card);
      },
      getTableData: function (data) {
        let headers = Object.keys(data[0]).map((key, index) => ({ name: key, 'label': key, index }))
        let body = data.map((row) => ({
          cells: Object.entries(data[0]).map(([key, value]) => ({ name: key, value: value, styles: {}}))
        }))

        return {
          headers,
          body,
          uuid: this.getUUID()
        }
      },
      getChartData: function (data) {

      },
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