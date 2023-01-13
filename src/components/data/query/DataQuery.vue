<template>
  <div class="query-db-container">
    <div class="__query-db-sidebar">
      <DataLeftSidebar
        :queries="queries"
        :data-sets="dataSets"
      />
    </div>
    <div class="__query-content-container">
      <div class="__query-content">
        <QueryInput
          id="sql-query-input-text-area"
          :queries="queries"
          class="__query-input"
          @run-query="loadQueryResult"
        />
        <template v-if="queryCardData">
          <QueryPreview
            :card="queryCardData"
            :visualization="activeVisualization"
            :show-loading="!! showCardLoader.length"
            :selected-dataset="selectedDataset"
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
import DataLeftSidebar from "../sidebar/DataLeftSidebar.vue";
import QueryInput from "./QueryInput.vue";
import { ChartMixin } from "@/mixins/chart/chartMixin";
import { mapGetters } from "vuex";
const QueryPreview = () => import('./QueryPreview.vue');

export default {
  name: "AppQuery",
  components: { QueryInput, QueryPreview, DataLeftSidebar },
  mixins: [ChartMixin],
  data: function () {
    return {
      queries: {
        10: {
          queries: [
            {
              query: "SELECT * FROM orders Where country='USA'",
              id: 1,
              title: "Orders from USA",
              data_id: 10,
            },
            {
              query: "SELECT * FROM orders Where quantity > 50",
              id: 2,
              title: "Quantity greater than 50",
              data_id: 10,
            },
            {
              query: "SELECT * FROM orders Where unitPrice > 100",
              id: 3,
              title: "Unit Price greater than 100",
              data_id: 10,
            },
          ],
        },
        11: {
          queries: [
            {
              query: "SELECT * FROM products",
              id: 4,
              title: "All Products",
              data_id: 11,
            },
            {
              query: "SELECT * FROM orders Where unitPrics > 25",
              id: 5,
              title: "Products with unit price greater than 25",
              data_id: 11,
            },
          ],
        }
      },
      queryCardData: null,
      selectedData: null,
      activeVisualization: { label: "Table", name: "table", type: "table" },
      showCardLoader: [],
      dataSets: [
        {
          name: "orders",
          label: "Orders",
          id: 10,
          columns: {
            measures: [
              {
                name: "orderID",
                column_id: 1,
                label: "orderID",
                data_type: "numeric",
              },
              {
                name: "freight",
                column_id: 2,
                label: "freight",
                data_type: "numeric",
              },
              {
                name: "unitPrice",
                column_id: 3,
                label: "unitPrice",
                data_type: "numeric",
              },
              {
                name: "quantity",
                column_id: 4,
                label: "quantity",
                data_type: "numeric",
              },
              {
                name: "discount",
                column_id: 5,
                label: "discount",
                data_type: "numeric",
              },
            ],
            dimensions: [
              {
                name: "city",
                column_id: 6,
                label: "city",
                data_type: "text",
              },
              {
                name: "city",
                column_id: 7,
                label: "city",
                data_type: "text",
              },
              {
                name: "country",
                column_id: 8,
                label: "country",
                data_type: "text",
              },
            ],
            date: [],
          },
          format: "json",
          description: "This table contains data related to food orders",
          rows: 830,
        },
        {
          name: "products",
          label: "Products",
          id: 11,
          columns: {
            measures: [
              {
                name: "productID",
                column_id: 1,
                label: "productID",
                data_type: "numeric",
              },
              {
                name: "unitPrice",
                column_id: 2,
                label: "unitPrice",
                data_type: "numeric",
              },
              {
                name: "unitsInStock",
                column_id: 3,
                label: "unitsInStock",
                data_type: "numeric",
              },
            ],
            dimensions: [
              {
                name: "name",
                column_id: 6,
                label: "name",
                data_type: "text",
              },
            ],
            date: [],
          },
          format: "json",
          description: "This table contains data related to food products available",
          rows: 830,
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      selectedDataset: 'data/getSelectedData'
    }),
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
      this.showCardLoader.push(true);
      this.queryCardData = null;
      this.selectedData = this.getData(query);
      this.getQueryCard(query);
      setTimeout(() => this.showCardLoader.pop(), 1000);
    },

    /**
     * Getting json data using require from /assets/json/
     * @param {String} dataName - data file name
     */
    getData: function (query) {
      let queryData;
      try {
        let data = require(`../../../assets/json/queryResult.json`);
        queryData = data[query['data_id']]['queries'].find((__query) => __query["id"] === query["id"])['data'];
      } catch (error) {
        console.log(error);
      }
      console.log(queryData);
      return queryData;
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

      if (this.activeVisualization["type"] === "chart") {
        card["data"]["chart"] = this.getChartData(
          this.activeVisualization["name"],
          this.selectedDataset['columns']
        );
      } else {
        card["data"]["table"] = this.getTableData(this.selectedDataset['columns']);
      }

      this.queryCardData = this.deepCopy(card);
    },

    /**
     * This method converts data into table object and returns table object
     * @param {Array} data - json data
     * @param {Object} columns - columns object containing dimensions and measures {dimensions: [], measures: []}
     */
    getTableData: function (columns) {

      let headers = [...columns["dimensions"], ...columns['measures']];
      
      let body = this.selectedData.map((row) => ({
        cells: headers.map((header) => ({ name: header['name'], value: row[header['name']], styles: {} }))
      }))

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
      if (visualization["type"] === "chart") {
        this.queryCardData["data"]["chart"] = this.getChartData(
          visualization["name"],
          columns
        );
      } else {
        this.queryCardData["data"]["table"] = this.getTableData(columns);
      }
      setTimeout(() => this.showCardLoader.pop(), 1000);
    },

    /**
     * Method to get chart visualization bar/line/horizontal-bar chart
     * @param {String} chartType - bar, line, horizontal-bar
     * @param {Object} columns - columns object containing dimensions and measures {dimensions: [], measures: []}
     */
    getChartData: function (chartType, columns) {
      const visualizationMapping = {
        bar: this.getBarChart,
        line: this.getLineChart,
        "horizontal-bar": this.getHorizontalBarChart,
      };

      if (visualizationMapping[chartType]) {
        return visualizationMapping[chartType](
          this.getAxisBaseChart(),
          this.selectedData,
          columns
        );
      }
      return null;
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
      padding: 20px 12px;
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