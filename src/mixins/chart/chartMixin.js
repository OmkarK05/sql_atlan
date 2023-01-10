export const ChartMixin = {
  methods: {
    /**
     * Method to get horizontal bar chart
     * @param {Object} chart - base chart object
     * @param {Array} data - data objects
     * @param {Object} columns - columns object containing dimensions and measures {dimensions: [], measures: []}
     * @returns
     */
    getHorizontalBarChart: function (chart = null, data, columns) {
      let chartData = chart ? chart : this.getAxisBaseChart();
      chartData["series"] = this.getSeriesData(data, columns, "bar");
      chartData["yAxis"] = this.getAxisData(data, columns);
      chartData["xAxis"] = { type: "value" };
      chartData["legend"]["data"] = chartData["series"].map(
        (__series) => __series["name"]
      );
      return chartData;
    },

    /**
     * Method to get bar chart, it builds and returns bar chart from base chart
     * @param {Object} chart
     * @param {Array} data
     * @param {Object} columns
     * @returns
     */
    getBarChart: function (chart = null, data, columns) {
      let chartData = chart ? chart : this.getAxisBaseChart();
      chartData["series"] = this.getSeriesData(data, columns, "bar");
      chartData["xAxis"] = this.getAxisData(data, columns);
      chartData["yAxis"] = { type: "value" };
      chartData["legend"]["data"] = chartData["series"].map(
        (__series) => __series["name"]
      );
      return chartData;
    },

    /**
     * Method to get line chart, it builds and returns line chart from base chart
     * @param {Object} chart
     * @param {Array} data
     * @param {Object} columns
     * @returns
     */
    getLineChart: function (chart = null, data, columns) {
      let chartData = chart ? chart : this.getAxisBaseChart();
      chartData["series"] = this.getSeriesData(data, columns, "line");
      chartData["xAxis"] = this.getAxisData(data, columns);
      chartData["yAxis"] = { type: "value" };
      chartData["legend"]["data"] = chartData["series"].map(
        (__series) => __series["name"]
      );
      return chartData;
    },

    /**
     * Method to get base axis chart line/bar
     * @returns - base axis chart
     */
    getAxisBaseChart: function () {
      return {
        title: {
          text: "",
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

    /**
     * Method to get chart series array from columns
     * @param {*} data
     * @param {*} columns
     * @param {String} chartType - type of chart 'line' or 'bar'
     * @returns
     */
    getSeriesData: function (data, columns, chartType) {
      let seriesDataMapping = {};
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

    /**
     * Method to get chart dimension axis data
     * @param {*} data
     * @param {*} columns
     * @returns
     */
    getAxisData: function (data, columns) {
      let dimensionAxis = {
        type: "category",
        boundaryGap: false,
        data: [],
        name: columns["dimensions"][0],
      };

      data.forEach((row) =>
        dimensionAxis["data"].push(row[dimensionAxis["name"]])
      );

      return dimensionAxis;
    },
  },
};
