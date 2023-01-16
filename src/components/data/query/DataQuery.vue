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
        <DataToolbar class="mb-4" />
        <div class="font-large mb-2 __header ml-1">
          <SvgLoader
            width="20"
            height="20"
            icon-name="Query"
            class="mr-1"
          >
            <CodeSvg />
          </SvgLoader>
          Query
        </div>
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
            :show-loading="!!showCardLoader.length"
            :selected-dataset="selectedData"
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
import DataToolbar from "../preview/DataToolbar.vue";
import SvgLoader from "@/components/helpers/SvgLoader.vue";
import CodeSvg from "../../svgs/CodeSvg.vue";
const QueryPreview = () => import("./QueryPreview.vue");

export default {
  name: "AppQuery",
  components: {
    QueryInput,
    QueryPreview,
    DataLeftSidebar,
    DataToolbar,
    SvgLoader,
    CodeSvg,
  },
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
        },
      },
      queryCardData: null,
      selectedQueryData: null,
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
                name: "region",
                column_id: 7,
                label: "region",
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
          row_count: 830,
          column_count: 8,
          created: "Sat Jan 7 2023 10:38:20",
          modified: "Tue Jan 10 2023 11:38:20",
          data_source: {
            name: "Sample Food Data",
            id: 1,
            source: "snowflake",
            owner: {
              name: "Omkar Kesarkhane",
              id: 2,
              email: "omkesarkhane@gmail.com",
            },
          },
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
          description:
            "This table contains data related to food products available",
          row_count: 420,
          column_count: 4,
          created: "Sun Jan 7 2023 17:38:20",
          modified: "Sun Jan 8 2023 17:38:20",
          data_source: {
            name: "Sample Food Data",
            id: 1,
            source: "snowflake",
            owner: {
              name: "Omkar Kesarkhane",
              id: 2,
              email: "omkesarkhane@gmail.com",
            },
          },
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      selectedData: "data/getSelectedData",
    }),
  },

  methods: {
    /**
     * Method to get json data for selected query
     * @param {Object} query - selected query
     */
    loadQueryResult: function (query = null) {
      this.showCardLoader.push(true);
      this.queryCardData = null;
      this.selectedQueryData = this.getQueryData(query);
      this.setQueryCard(query);
      setTimeout(() => this.showCardLoader.pop(), 500);
    },

    /**
     * Getting json data using require from /assets/json/
     * @param {String} dataName - data file name
     */
     getQueryData: function (query) {
      let queryData;
      try {
        let data = require(`../../../assets/json/queryResult.json`);
        queryData = data[query["data_id"]]["queries"].find(
          (__query) => __query["id"] === query["id"]
        )["data"];
      } catch (error) {
        console.log(error);
      }
      return queryData;
    },

    /**
     * Method to set query result standard card object
     * @param {Object} query - selected query
     */
    setQueryCard: function (query) {
      let card = this.getDefaultQueryCard(query);

      this.setCardVisualizations({
        card,
        chartType: this.activeVisualization["name"],
        visualization: this.activeVisualization["type"],
        columns: this.selectedData["columns"],
      });

      this.queryCardData = this.deepCopy(card);
    },

    /**
     * This method converts data into table object and returns table object
     * @param {Array} data - json data
     * @param {Object} columns - columns object containing dimensions and measures {dimensions: [], measures: []}
     */
    getTableData: function (columns) {
      const data = this.deepCopy(this.selectedQueryData);
      const table = {
        headers: [],
        body: [],
        uuid: this.getUUID(),
      };

      table["headers"] = [...columns["dimensions"], ...columns["measures"]];

      table["body"] = this.getTableBody(data, table["headers"]);

      return table;
    },

    /**
     * This method returns table body array
     * @param {Array} data - selected data
     */
    getTableBody: function (data, headers) {
      const body = data.map(() => ({
        cells: [],
      }));

      body.forEach((row, index) => {
        headers.forEach((header) => {
          row["cells"].push(this.getTableCell(data[index], header));
        });
      });

      return body;
    },

    /**
     * This method returns table cell structure object
     * @param {Object} cellData - data row
     * @param {Object} header - table header
     */
    getTableCell: function (cellData, header) {
      return {
        name: header["name"],
        value: cellData[header["name"]],
        style: {},
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

      this.setCardVisualizations({
        card: this.queryCardData,
        chartType: this.activeVisualization["name"],
        visualization: this.activeVisualization["type"],
        columns,
      });

      setTimeout(() => this.showCardLoader.pop(), 500);
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
        'horizontal-bar': this.getHorizontalBarChart,
      };

      if (visualizationMapping[chartType]) {
        return visualizationMapping[chartType]({
          chart: this.getAxisBaseChart(),
          data: this.selectedQueryData,
          columns,
        });
      }
      return null;
    },

    /**
     * Method to get default query card
     * @param {Object} query 
     */
    getDefaultQueryCard: function (query = null) {
      return {
        uuid: this.getUUID(),
        query: this.deepCopy(query),
        data: { chart: null, table: null },
        filters: [],
      };
    },

    /**
     * This method sets chart and table in card that is sent in params
     * @param {Object} card 
     * @param {Object} chartType
     * @param {Object} columns
     * @param {Object} visualization
     */
    setCardVisualizations: function ({
      card,
      chartType,
      columns,
      visualization,
    }) {
      switch (visualization) {
        case "chart":
          card["data"]["chart"] = this.getChartData(chartType, columns);
        case "table":
          card["data"]["table"] = this.getTableData(columns);
      }
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
    .__query-content {
      width: 100%;
      padding: 12px;
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;

      .__header {
        display: flex;
        align-items: center;
      }

      .__query-card {
        height: calc(
          100vh - 285px
        ); // 100vh minus (query Input height  + data toolbar height)
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
