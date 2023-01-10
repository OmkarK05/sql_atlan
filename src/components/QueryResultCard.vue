<template lang="">
  <div class="query-card">
    <div class="change-visualization-container">
      <div class="__columns">
        <v-select
          v-model="selectedDimensions"
          :items="data['query']['columns']['dimensions']"
          label="Select Dimensions"
          dense
          outlined
          multiple
          class="__select-dimension"
          @change="columnsUpdated"
        />
        <v-select
          v-model="selectedMeasures"
          :items="data['query']['columns']['measures']"
          label="Select Measures"
          dense
          outlined
          multiple
          class="__select-measure"
          @change="columnsUpdated"
        />
      </div>
      <div>
        <v-select
          v-model="activeVisualization"
          :items="visualizations"
          label="Change Visualization"
          item-text="label"
          item-value="name"
          dense
          outlined
          return-object
          single-line
          class="__select-visual"
          @change="updateVisualization"
        />
      </div>
    </div>
    <template
      v-if="activeVisualization['type'] === 'table' && data && data['data']"
    >
      <AppTable
        :table="data['data']['table']"
        @download="downloadTableData"
      />
    </template>

    <div v-show="activeVisualization['type'] === 'chart' && data && data['data']">
      <AppEcharts :chart-data="data['data']['chart']" />
    </div>
  </div>
</template>
<script>
import AppTable from "./helpers/AppTable.vue";
import { parse } from 'json2csv'

const AppEcharts = () => { 
  return import('./helpers/AppEcharts.vue').then((response) => {
    return Promise.resolve(response);
  })
};

export default {
  name: "QueryResultCard",
  components: { AppEcharts, AppTable },
  props: {
    data: {
      type: Object,
      default: null,
    },
    visualization: {
      type: Object,
      default: () => {}
    },
  },
  data: function () {
    return {
      visualizations: [
        { label: "Table", name: "table", type: "table" },
        { label: "Line Chart", name: "line", type: "chart" },
        { label: "Bar Chart", name: "bar", type: "chart" },
        { label: "Horizonal Bar Chart", name: "horizontal-bar", type: "chart" },
      ],
      selectedDimensions: [],
      selectedMeasures: [],
      activeVisualization: {},
    };
  },
  watch: {
    data: {
      immediate: true,
      handler: function (data) {
        if (data["query"]) {
          this.selectedDimensions = data["query"]["columns"]["dimensions"];
          this.selectedMeasures = data["query"]["columns"]["measures"];
        }
      },
    },
    visualization: {
      immediate: true,
      deep: true,
      handler: function () {
        this.activeVisualization = this.deepCopy(this.visualization);
      }
    }
  },
  beforeMount() {
    this.activeVisualization = this.deepCopy(this.visualization);
  },
  methods: {
    /**
     * Method is called when dimension / measure columns are changed.
     * This method emits "columns-updated" with columns {measures: [], dimensions: []} object
     */
    columnsUpdated: function () {
      this.$emit("columns-updated", this.activeVisualization, {
        dimensions: this.selectedDimensions,
        measures: this.selectedMeasures,
      });
    },
    
    /**
     * Method is called when visualization is changed.
     * This method emits "visualization-changed" with changed visualization and columns {measures: [], dimensions: []} object
     */
     updateVisualization: function () {
      // window.localStorage.setItem('getting-chart')
      console.log(AppEcharts);
      this.$emit("visualization-changed", this.activeVisualization, {
        dimensions: this.selectedDimensions,
        measures: this.selectedMeasures,
      });
    },

    /**
     * Method is called to download csv file of table data
     */
    downloadTableData: function () {
      let fields = [...this.selectedDimensions, ...this.selectedMeasures];
      const csv = parse(this.data['data']['json'], { fields });

      const blob = new Blob([csv], { type: 'text/csv' });
 
      // Creating an object for downloading url
      const url = window.URL.createObjectURL(blob)

      // Creating an anchor(a) tag of HTML
      const a = document.createElement('a')

      // Passing the blob downloading url
      a.setAttribute('href', url)

      // Setting the anchor tag attribute for downloading
      // and passing the download file name
      a.setAttribute('download', 'download.csv');

      // Performing a download with click
      a.click()
    }
  },
};
</script>
<style lang="scss" scoped>
.query-card {
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%),
    0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
  background: #ffffff;
  margin: 20px 0;
}

.change-visualization-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .__columns {
    display: flex;
  }

  .__select-visual {
    width: 150px;
    margin: 0 8px;
  }
  .__select-dimension,
  .__select-measure {
    width: 200px;
    margin: 0 8px;
  }
}
</style>
<style lang="scss">
.__columns {
  .v-select__selections {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    .v-select__selection--comma {
      overflow: visible;
    }
  }
}
</style>
