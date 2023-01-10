<template>
  <div class="query-db-container">
    <div
      class="__query-db-sidebar"
    >
      <QuerySidebar
        :tabs="tabs"
        @switch-tab="switchTab"
      />
    </div>
    <div
      class="__query-content-container"
    >
      <div class="__navbar">
        Navbar
      </div>
      <div class="__query-content">
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
            @visualization-changed="buildVisualization"
          />
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import QueryResultCard from './QueryResultCard.vue';
import QuerySidebar from './QuerySidebar.vue';
import SqlQueryInput from './SqlQueryInput.vue';
import DashboardSvg from './svgs/DashboardSvg.vue';
import SearchSvg from './svgs/SearchSvg.vue';

export default {
    name: "QueryDB",
    components: { SqlQueryInput, QueryResultCard, QuerySidebar },
    data: function(){
      return {
        tabs: [
            { name: 'query', label: 'Query', icon: SearchSvg, active: true },
            { name: 'dashboard', label: 'Dashboard', icon: DashboardSvg, active: false },
        ],
        queries: [
          {
            id: 1, 
            query: 'SELECT city, contactName, country FROM customers',
            label: 'Get customers',
            dataName: 'customers.json',
            columns: {
              'dimensions': ['city', 'customerID', 'contactName', 'country'],
              'measures': []
            }
          },
          {
            id: 2, 
            query: 'SELECT country, region, city, quantity, unitPrice  FROM customers',
            label: 'Get Orders',
            dataName: 'orders.json',
            columns: {
              'dimensions': ['country', 'region', 'city'],
              'measures': ['quantity', 'unitPrice', 'discount', 'freight', 'orderID']
            }
          },
          {
            id: 3, 
            query: 'SELECT name, unitsInStock, unitPrice FROM customers',
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
        card['data']['chart'] = this.getChartData(json, 'bar', query['columns']);
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
      getChartData: function (data, chartType = 'line', columns) {
        let chart = {
          title: {
            text: 'Stacked Line'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
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
              return (
                { 
                  name: key, 
                  type: chartType, 
                  stack: 'total', 
                  data: [],       
                  label: {
                    show: true
                  },
                  emphasis: {
                    focus: 'series'
                  }, 
                })
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
        let series = Object.values(chartColumnMapping).filter((__series) => columns['measures'].includes(__series['name']));
        let metricAxis = (Object.values(chartColumnMapping).filter((__series) => columns['dimensions'].includes(__series['name']))[0]) || [];
        chart['series'] = series;
        chart['xAxis'] = metricAxis;
        chart['uuid'] = this.getUUID();
        return chart;
      },

      updateVisualization: function (columns, chartType) {
        this.queryCardData['data']['table'] = this.getTableData(this.queryCardData['data']['json'], columns);
        this.queryCardData['data']['chart'] = this.getChartData(this.queryCardData['data']['json'], chartType, columns);
        console.log(this.queryCardData['data']['chart']);
      },

      buildVisualization: function (visualization) {
          if(visualization['name'] === 'bar'){
            this.queryCardData['data']['chart']['series'].forEach((series) => series['type'] = 'bar');
            if(this.queryCardData['data']['chart']['yAxis']['data']){
              let xAxis = this.deepCopy(this.queryCardData['data']['chart']['xAxis']);
              this.queryCardData['data']['chart']['xAxis'] = this.queryCardData['data']['chart']['yAxis'];
              this.queryCardData['data']['chart']['yAxis'] = xAxis;
            }
          } else if(visualization['name'] === 'line'){
            this.queryCardData['data']['chart']['series'].forEach((series) => series['type'] = 'line');
            if(this.queryCardData['data']['chart']['yAxis']['data']){
              let xAxis = this.deepCopy(this.queryCardData['data']['chart']['xAxis']);
              this.queryCardData['data']['chart']['xAxis'] = this.queryCardData['data']['chart']['yAxis'];
              this.queryCardData['data']['chart']['yAxis'] = xAxis;
            }
          } else if(visualization['name'] === 'horizontal-bar' && this.queryCardData['data']['chart']['xAxis']['data']) {
            this.queryCardData['data']['chart']['series'].forEach((series) => series['type'] = 'bar');
            let xAxis = this.deepCopy(this.queryCardData['data']['chart']['xAxis']);
            this.queryCardData['data']['chart']['xAxis'] = this.queryCardData['data']['chart']['yAxis'];
            this.queryCardData['data']['chart']['yAxis'] = xAxis;
          }

          console.log(this.queryCardData['data']['chart']);
      },
      switchTab: function (tab) {
        this.tabs.forEach(__tab => __tab['active'] = __tab['name'] === tab['name']);
      }
    }
}
</script>
<style lang="scss" scoped>
.query-db-container{
  display: flex;
  flex-wrap: wrap;

 .__query-content-container{
    width: 84%;
    position: relative;
    height: 100vh;
    background-color: rgba(var(--background), 1);

    .__navbar{
      width: 100%;
      height: 40px;
      border-bottom: 1px solid #F6F6F6;
      padding: 0 20px;
    }
    .__query-content{
      width: 100%;
      padding: 20px;
      height: 100%;

      .__query-card{
        max-height: calc(100vh - 260px);
      }
    }
  }
  
  .__query-db-sidebar{
    width: 16%;
    border-right: 1px solid #F6F6F6;
    height: 100vh;
    box-shadow: 0 -1px 7px 0px rgb(0 0 0 / 2%);
    position: relative;
    z-index: 9;
  }  
}
</style>