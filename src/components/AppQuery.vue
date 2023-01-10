<template>
  <div class="query-db-container">
    <div class="__query-db-sidebar">
      <QuerySidebar
        :tabs="tabs"
        @switch-tab="switchTab"
      />
    </div>
    <div class="__query-content-container">
      <div class="__query-content">
        <SqlQueryInput
          id="sql-query-input-text-area"
          :queries="queries"
          class="__query-input"
          @run-query="loadQueryResult"
        />
        <template v-if="queryCardData">
          <QueryResultCard
            :card="queryCardData"
            :visualization="activeVisualization"
            :show-loading="showCardLoader.length"
            class="__query-card"
            @columns-updated="updateVisualization"
            @visualization-changed="updateVisualization"
          />
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import QueryResultCard from "./query-card/QueryResultCard.vue";
import QuerySidebar from "./QuerySidebar.vue";
import SqlQueryInput from "./query-input/SqlQueryInput.vue";
import DashboardSvg from "./svgs/DashboardSvg.vue";
import SearchSvg from "./svgs/SearchSvg.vue";
import { ChartMixin } from "@/mixins/chart/chartMixin";

export default {
  name: "AppQuery",
  components: { SqlQueryInput, QueryResultCard, QuerySidebar },
  mixins: [ChartMixin],
  data: function () {
    return {
      tabs: [
        { name: "query", label: "Query", icon: SearchSvg, active: true },
        {
          name: "dashboard",
          label: "Dashboard",
          icon: DashboardSvg,
          active: false,
        },
      ],
      queries: [
        {
          id: 1,
          query: "SELECT city, contactName, country FROM customers",
          label: "Get customers",
          dataName: "customers.json",
          columns: {
            dimensions: ["city", "customerID", "contactName", "country"],
            measures: [],
          },
        },
        {
          id: 2,
          query:
            "SELECT country, region, city, quantity, unitPrice  FROM orders",
          label: "Get Orders",
          dataName: "orders.json",
          columns: {
            dimensions: ["country", "region", "city"],
            measures: [
              "quantity",
              "unitPrice",
              "discount",
              "freight",
              "orderID",
            ],
          },
        },
        {
          id: 3,
          query: "SELECT name, unitsInStock, unitPrice FROM products",
          label: "Get Products",
          dataName: "products.json",
          columns: {
            dimensions: ["productID", "name"],
            measures: ["unitsInStock", "unitPrice"],
          },
        },
      ],
      queryCardData: null,
      selectedData: null,
      activeVisualization: { label: "Table", name: "table", type: "table" },
      showCardLoader: []
    };
  },
  computed: {
    getQueries: function () {
      return this.queries.map((query) => query["label"]);
    },
    getSelectedQueryCsv: function () {
      return this.queries.find(
        (query) => query["label"] === this.selectedQuery
      )["name"];
    },
  },
  methods: {
    /**
     * Method to get json data for selected query
     * @param {Object} query - selected query
     */
    loadQueryResult: function (query = null) {
      this.queryCardData = null;
      this.selectedData = this.getData(query['dataName']);
      this.getQueryCard(query);
    },

    /**
     * Getting json data using require from /assets/json/
     * @param {String} dataName - data file name
     */
    getData: function (dataName) {
      let data;
      try {
        data = require(`./../assets/json/${dataName}`);
      } catch (error) {
        console.log(error);
      }
      return data;
    },

    /**
     * Method to get query result standard card object
     * @param {Object} query - selected query
     */
    getQueryCard: function (query) {
      let card = {
        uuid: this.getUUID(),
        query: this.deepCopy(query),
        data: { chart: null, table: null, json: "" },
        filters: [],
      };

      card["data"]["json"] = this.selectedData;

      if ( this.activeVisualization['type'] === 'chart' ){
        card["data"]["chart"] = this.getChartData(this.activeVisualization['name'], query["columns"]);
      } else {
        card["data"]["table"] = this.getTableData(this.selectedData, query["columns"]);
      }

      this.queryCardData = this.deepCopy(card);
    },

    /**
     * This method converts data into table object and returns table object
     * @param {Array} data - json data
     * @param {Object} columns - columns object containing dimensions and measures {dimensions: [], measures: []}
     */
    getTableData: function (data, columns) {
      let mergedColumns = [...columns["dimensions"], ...columns["measures"]];

      let headers = Object.keys(data[0])
        .map((key, index) => ({ name: key, label: key, index }))
        .filter((cell) => mergedColumns.includes(cell["name"]));
      
      let body = data.map((row) => ({
        cells: Object.entries(row)
          .map(([key, value]) => ({ name: key, value: value, styles: {} }))
          .filter((cell) => mergedColumns.includes(cell["name"])),
      }));

      return {
        headers,
        body,
        uuid: this.getUUID(),
      };
    },

    /**
     * Method is called when visualization is changed
     * @param {Object} visualization - visualization object { label: "Table", name: "table", type: "table" }
     * @param {Object} columns - columns object containing dimensions and measures {dimensions: [], measures: []}
     */
    updateVisualization: function (visualization, columns) {
      this.showCardLoader.push(true);
      this.activeVisualization = this.deepCopy(visualization);
      if( visualization['type'] === 'chart' ){
        this.queryCardData["data"]["chart"] = this.getChartData(visualization['name'], columns);
      } else {
        this.queryCardData["data"]["table"] = this.getTableData(this.selectedData, columns);
      }
      setTimeout(() => this.showCardLoader.pop(), 1000)
    },

    /**
     * Method to get chart visualization bar/line/horizontal-bar chart
     * @param {String} chartType - bar, line, horizontal-bar
     * @param {Object} columns - columns object containing dimensions and measures {dimensions: [], measures: []}
     */
    getChartData: function (chartType, columns) {
      const visualizationMapping = {
        'bar': this.getBarChart,
        'line': this.getLineChart,
        'horizontal-bar': this.getHorizontalBarChart,
      }

      if(visualizationMapping[chartType]) {
        return visualizationMapping[chartType](this.getAxisBaseChart(), this.selectedData, columns)
      }
      return null;
    },

    switchTab: function (tab) {
      this.tabs.forEach(
        (__tab) => (__tab["active"] = __tab["name"] === tab["name"])
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.query-db-container {
  display: flex;
  flex-wrap: wrap;

  .__query-content-container {
    width: 84%;
    position: relative;
    height: 100vh;
    background-color: rgba(var(--background), 1);

    .__navbar {
      width: 100%;
      height: 40px;
      border-bottom: 1px solid #f6f6f6;
      padding: 0 20px;
    }
    .__query-content {
      width: 100%;
      padding: 20px;
      height: 100%;
      overflow-y: scroll;
      overflow-x: hidden;

      .__query-card {
        max-height: 100%;
      }
    }
  }

  .__query-db-sidebar {
    width: 16%;
    border-right: 1px solid #f6f6f6;
    height: 100vh;
    box-shadow: 0 -1px 7px 0px rgb(0 0 0 / 2%);
    position: relative;
    z-index: 9;
  }
}
</style>
