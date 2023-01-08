<template>
  <div class="query-db-container">
    <div
      class="__query-db-sidebar"
    >
      <QuerySidebar />
    </div>
    <div
      class="__query-content"
    >
      <SqlQueryInput
        :queries="queries"
        class="__query-input"
        @run-query="loadQueryResult"
      />
      <template
        v-if="queryCardData"
      >
        <QueryResultCard
          :data="queryCardData"
          class="__query-card"
          @columns-updated="updateVisualization"
        />
      </template>
    </div>
  </div>
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
            dataName: 'customers.json',
            columns: {
              'dimensions': ['city', 'customerID', 'contactName', 'country'],
              'measures': []
            }
          },
          {
            id: 2, 
            query: 'SELECT COUNT(category.name) as count_of_categories FROM film_category LEFT JOIN film ON film_category.film_id = film.film_id LEFT JOIN category ON film_category.category_id = category.category_id WHERE film.release_year = 2018',
            label: 'Get Orders',
            dataName: 'orders.json',
            columns: {
              'dimensions': ['country', 'region', 'city'],
              'measures': ['quantity', 'unitPrice', 'discount', 'freight', 'orderID']
            }
          },
          {
            id: 3, 
            query: 'SELECT COUNT(category.name) as count_of_categories FROM film_category LEFT JOIN film ON film_category.film_id = film.film_id LEFT JOIN category ON film_category.category_id = category.category_id WHERE film.release_year = 2018',
            label: 'Get Products',
            dataName: 'products.json',
            columns: {
              dimensions: ['productID', 'name'],
              measures: ['unitsInStock', 'unitPrice']
            }
          },
        ],
        queryCardData: null,
        savedQueries: [null],
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
    beforeMount() {
      this.filterData();
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
        card['data']['chart'] = this.getChartData(json, query['columns']);
        card['data']['table'] = this.getTableData(json, query['columns']);

        this.queryCardData = this.deepCopy(card);
      },
      getTableData: function (data, columns) {
        let mergedColumns = [...columns['dimensions'], ...columns['measures']];
        let headers = Object.keys(data[0]).map((key, index) => ({ name: key, 'label': key, index })).filter((cell) => mergedColumns.includes(cell['name']))
        let body = data.map((row) => ({
          cells: Object.entries(row).map(([key, value]) => ({ name: key, value: value, styles: {}})).filter((cell) => mergedColumns.includes(cell['name']))
        }))
 
        return {
          headers,
          body,
          uuid: this.getUUID()
        }
      },
      getChartData: function (data, columns) {
        let chart = {
          title: {
            text: 'Stacked Line'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: 'Email',
              type: 'line',
              stack: 'Total',
              data: [120, 132, 101, 134, 90, 230, 210]
            },
          ]
        };

        let chartColumnMapping = {};

        let chartColumns = Object.keys(data[0]).map((key, index) => { 
            if( columns['measures'].includes(key) ){
              return ({ name: key, type: 'line', stack: 'Total', data: [] })
            } else if (columns['dimensions'].includes(key)) {
              return ({ type: 'category', boundaryGap: false, data: [], name: key })
            }
          })

        chartColumns.forEach((cell) => { if(cell) chartColumnMapping[cell['name']] = cell });
        console.log(chartColumnMapping);
        data.forEach((row) => {
          Object.entries(row).forEach(([key, value]) => { 
            if(chartColumnMapping[key]) chartColumnMapping[key]['data'].push(value)
          });
        })
        chart['series'] = Object.values(chartColumnMapping).filter((__series) => columns['measures'].includes(__series['name']));
        chart['xAxis'] = (Object.values(chartColumnMapping).filter((__series) => columns['dimensions'].includes(__series['name']))[0]) || [];
        chart['uuid'] = this.getUUID();
        return chart;
      },

      updateVisualization: function (columns) {
        this.queryCardData['data']['table'] = this.getTableData(this.queryCardData['data']['json'], columns);
        this.queryCardData['data']['chart'] = this.getChartData(this.queryCardData['data']['json'], columns);
        console.log(this.queryCardData['data']['chart']);
      }
    }
}
</script>
<style lang="scss" scoped>
.query-db-container{
  display: flex;
    .__query-content{
      width: 84%;
      padding: 20px;

      .__query-card{
        max-height: calc(100vh - 200px);
      }
    }
    .__query-db-sidebar{
      width: 16%;
      border-right: 1px solid #F6F6F6;
    }
}
</style>