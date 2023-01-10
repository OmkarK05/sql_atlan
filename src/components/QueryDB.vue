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

export default {
  name: "QueryDB",
  components: { SqlQueryInput, QueryResultCard, QuerySidebar },
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
  beforeMount() {
    this.filterData();
  },
  methods: {
    loadQueryResult: function (query) {
      try {
        this.selectedData = require(`./../assets/json/${query["dataName"]}`);
      } catch (error) {
        console.log(error);
      }
      this.getQueryCard(query);
    },
    getQueryCard: function (query, json) {
      console.log(query);
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
    getChartData: function (data, chartType = "line", columns) {
      let chart = {
        title: {
          text: "Stacked Line",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "Email",
            type: "line",
            stack: "Total",
            data: [120, 132, 101, 134, 90, 230, 210],
          },
        ],
      };

      let chartColumnMapping = {};

      let chartColumns = Object.keys(data[0]).map((key, index) => {
        if (columns["measures"].includes(key)) {
          return {
            name: key,
            type: chartType,
            stack: "total",
            data: [],
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
          };
        } else if (columns["dimensions"].includes(key)) {
          return { type: "category", boundaryGap: false, data: [], name: key };
        }
      });

      chartColumns.forEach((cell) => {
        if (cell) chartColumnMapping[cell["name"]] = cell;
      });
      console.log(chartColumnMapping);
      data.forEach((row) => {
        Object.entries(row).forEach(([key, value]) => {
          if (chartColumnMapping[key])
            chartColumnMapping[key]["data"].push(value);
        });
      });
      let series = Object.values(chartColumnMapping).filter((__series) =>
        columns["measures"].includes(__series["name"])
      );
      let metricAxis =
        Object.values(chartColumnMapping).filter((__series) =>
          columns["dimensions"].includes(__series["name"])
        )[0] || [];
      chart["series"] = series;
      chart["xAxis"] = metricAxis;
      chart["uuid"] = this.getUUID();
      return chart;
    },

    updateVisualization: function (visualization, columns) {
      this.queryCardData["data"]["table"] = this.getTableData(this.selectedData, columns);
      this.queryCardData["data"]["chart"] = this.getViualization(visualization['name'], columns);
    },

    changeVisualization: function (visualization, columns) {
      this.queryCardData["data"]["chart"] = this.getViualization(visualization['name'], columns);
      console.log(this.queryCardData["data"]["chart"])
    },

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

    getHorizontalBarChart: function (chart = null, data, columns) {
      let chartData = chart ? chart : this.getAxisBaseChart();
      chartData['series'] = this.getSeriesData(data, columns, 'bar');
      chartData['yAxis'] = this.getAxisData(data, columns);
      chartData['xAxis'] = { type: 'value' };
      chartData['legend']['data'] = chartData['series'].map((__series) => __series['name']);
      return chartData;
    },

    getBarChart: function (chart = null, data, columns) {
      let chartData = chart ? chart : this.getAxisBaseChart();
      chartData['series'] = this.getSeriesData(data, columns, 'bar');
      chartData['xAxis'] = this.getAxisData(data, columns);
      chartData['yAxis'] = { type: 'value' };
      chartData['legend']['data'] = chartData['series'].map((__series) => __series['name']);
      return chartData;
    },

    getLineChart: function (chart = null, data, columns) {
      let chartData = chart ? chart : this.getAxisBaseChart();
      chartData['series'] = this.getSeriesData(data, columns, 'line');
      chartData['xAxis'] = this.getAxisData(data, columns);
      chartData['yAxis'] = { type: 'value' };
      chartData['legend']['data'] = chartData['series'].map((__series) => __series['name']);
      return chartData;
    },

    getAxisBaseChart: function () {
      return {
        title: {
          text: "Stacked Line",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: [],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {},
        yAxis: {},
        series: [],
      };
    },

    getSeriesData: function (data, columns, chartType) {
      let seriesDataMapping = {};
      console.log(data, columns, chartType);
      // Populating seriesDataMapping with key as measure name and value as series object
      columns["measures"].forEach((measure) => {
        seriesDataMapping[measure] = {
          name: measure,
          type: chartType,
          stack: "total",
          data: [],
          label: {
            show: true,
          },
          emphasis: {
            focus: "series",
          },
        };
      });

      // Populating series data for each series
      data.forEach((row) => {
        Object.entries(row).forEach(([key, value]) => {
          if (seriesDataMapping[key])
            seriesDataMapping[key]["data"].push(value);
        });
      });

      return [...Object.values(seriesDataMapping)];
    },

    getAxisData: function (data, columns) {
      let dimensionAxis = {
          type: "category",
          boundaryGap: false,
          data: [],
          name: columns['dimensions'][0],
      };

      data.forEach((row) => dimensionAxis["data"].push(row[dimensionAxis["name"]]));

      return dimensionAxis;
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
