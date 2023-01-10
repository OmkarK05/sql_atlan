export const ChartMixin = {
  methods: {
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
        name: columns["dimensions"][0],
      };

      data.forEach((row) =>
        dimensionAxis["data"].push(row[dimensionAxis["name"]])
      );

      return dimensionAxis;
    },
  },
};
