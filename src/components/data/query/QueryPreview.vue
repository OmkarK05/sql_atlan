<template>
  <div
    id="query-card"
    class="query-card"
  >
    <AppLoader
      v-if="showLoading"
      message="Building Data"
    />
    <div class="change-visualization-container">
      <div class="__columns">
        <v-select
          id="query-card-measures-select-input"
          v-model="selectedDimensions"
          :items="getDimensions"
          label="Select Dimensions"
          item-text="label"
          item-value="name"
          dense
          outlined
          return-object
          multiple
          class="__select-dimension"
          @change="columnsUpdated"
        />
        <v-select
          id="query-card-dimensions-select-input"
          v-model="selectedMeasures"
          :items="getMeasures"
          label="Select Measures"
          item-text="label"
          item-value="name"
          dense
          outlined
          return-object
          multiple
          class="__select-measure"
          @change="columnsUpdated"
        />
      </div>
      <div>
        <v-select
          id="query-card-visualization-select-input"
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
    <div class="preview-content-container">
      <component
        :is="getVisualization[activeVisualization['type']]"
        v-bind="getProps"
        @download="downloadTableData"
      />
    </div>
  </div>
</template>
<script>
import DataTable from "../preview/DataTable.vue";
import { parse } from 'json2csv'
import AppLoader from "../../helpers/AppLoader.vue";

const AppEcharts = () => import('../../helpers/AppEcharts.vue');

export default {
  name: "QueryCard",
  components: { AppEcharts, DataTable, AppLoader },
  props: {
    card: {
      type: Object,
      default: null,
    },
    visualization: {
      type: Object,
      default: () => {}
    },
    showLoading: {
      type: Boolean,
      default: false
    },
    selectedDataset: {
      type: Object,
      default: null
    }
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
      showLoader: [],
      getVisualization: {
        'chart': AppEcharts,
        'table': DataTable
      },
    };
  },
  computed: {
    getDimensions: function () {
      return this.selectedDataset && this.selectedDataset['columns']['dimensions']
    },
    getMeasures: function (){
      return this.selectedDataset && this.selectedDataset['columns']['measures']
    },
    showTable: function () {
      return activeVisualization['type'] === 'table' && card && card['data']
    },
    getProps: function () {
      return {
        'chart': this.card['data']['chart'],
        'table': this.card['data']['table']
      }
    },
  },
  watch: {
    visualization: {
      immediate: true,
      deep: true,
      handler: function () {
        this.activeVisualization = this.deepCopy(this.visualization);
      }
    },
    selectedDataset: {
      deep: true,
      immediate: true,
      handler: function () {
        this.selectedDimensions = this.deepCopy(this.getDimensions);
        this.selectedMeasures = this.deepCopy(this.getMeasures);
      }
    }
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
      this.$emit("visualization-changed", this.activeVisualization, {
        dimensions: this.selectedDimensions,
        measures: this.selectedMeasures,
      });
    },

    /**
     * Method is called to download csv file of table data
     */
    downloadTableData: function () {
      let fields = [...this.selectedDimensions, ...this.selectedMeasures].map((column) => column['name']);
      const csv = parse(this.card['data']['json'], { fields });

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
  padding: 12px;
  border-radius: 8px;
  width: 100%;
  box-shadow: 0px 2px 8px -3px #b6b6b9;
  background: #ffffff;
  margin-top: 24px;
  border: 1px solid #e1e1e1;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
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
.preview-content-container{
  height: calc(100% - 66px);
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
