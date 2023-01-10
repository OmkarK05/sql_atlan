<template>
  <div class="query-db-container">
    <div class="__query-db-sidebar">
      <QuerySidebar
        :tabs="tabs"
        @switch-tab="switchTab"
      />
    </div>
    <div class="__query-content-container">
      <div class="__navbar">
        Navbar
      </div>
      <div class="__query-content">
        <SqlQueryInput
          :queries="queries"
          class="__query-input"
          @run-query="loadQueryResult"
        />
        <template v-if="queryCardData">
          <QueryResultCard
            :data="queryCardData"
            class="__query-card"
            @columns-updated="updateVisualization"
            @visualization-changed="changeVisualization"
          />
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import QueryResultCard from "./QueryResultCard.vue";
import QuerySidebar from "./QuerySidebar.vue";
import SqlQueryInput from "./SqlQueryInput.vue";
import DashboardSvg from "./svgs/DashboardSvg.vue";
import SearchSvg from "./svgs/SearchSvg.vue";
import { ChartMixin } from "@/mixins/chart/chartMixin";

export default {
  name: "QueryDB",
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
          selectedColumns: {
            dimensions: ["city", "customerID", "contactName", "country"],
            measures: [],
          }
        },
        {
          id: 2,
          query:
            "SELECT country, region, city, quantity, unitPrice  FROM customers",
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
          selectedColumns: {
            dimensions: ["country", "region", "city"],
            measures: [
              "quantity",
              "unitPrice",
              "discount",
              "freight",
              "orderID",
            ],
          }
        },
        {
          id: 3,
          query: "SELECT name, unitsInStock, unitPrice FROM customers",
          label: "Get Products",
          dataName: "products.json",
          columns: {
            dimensions: ["productID", "name"],
            measures: ["unitsInStock", "unitPrice"],
          },
          selectedColumns: {
            dimensions: ["productID", "name"],
            measures: ["unitsInStock", "unitPrice"],
          }
        },
      ],
      queryCardData: null,
      savedQueries: [null],
      selectedData: null,
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
      this.getData(query['dataName']).then((response) => {
        this.selectedData = response;
        this.getQueryCard(query);
      });
    },

    /**
     * Getting json data using require from /assets/json/
     * @param {String} dataName - data file name
     */
    getData: async function (dataName) {
      try {
        const data = await require(`./../assets/json/${dataName}`);
        Promise.resolve(data);
      } catch (error) {
        console.log(error);
        Promise.reject(error);
      }
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
      card["data"]["chart"] = this.getViualization("bar", query["columns"]);
      card["data"]["table"] = this.getTableData(this.selectedData, query["columns"]);

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
     * Method is used to update chart and table when dimensions / measures are changed from card
     * @param {Object} visualization - visualization object { label: "Table", name: "table", type: "table" }
     * @param {Object} columns - columns object containing dimensions and measures {dimensions: [], measures: []}
     */
    updateVisualization: function (visualization, columns) {
      this.queryCardData["data"]["table"] = this.getTableData(this.selectedData, columns);
      this.queryCardData["data"]["chart"] = this.getViualization(visualization['name'], columns);
    },

    /**
     * Method is called when visualization is changed
     * @param {Object} visualization - visualization object { label: "Table", name: "table", type: "table" }
     * @param {Object} columns - columns object containing dimensions and measures {dimensions: [], measures: []}
     */
    changeVisualization: function (visualization, columns) {
      this.queryCardData["data"]["chart"] = this.getViualization(visualization['name'], columns);
    },

    /**
     * Method to get chart visualization bar/line/horizontal-bar chart
     * @param {String} chartType - bar, line, horizontal-bar
     * @param {Object} columns - columns object containing dimensions and measures {dimensions: [], measures: []}
     */
    getViualization: function (chartType, columns) {
      const visualizationMapping = {
        'bar': this.getBarChart,
        'line': this.getLineChart,
        'horizontal-bar': this.getHorizontalBarChart
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

      .__query-card {
        max-height: calc(100vh - 260px);
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
