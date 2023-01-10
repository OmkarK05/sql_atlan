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
          v-model="currentVisualization"
          :items="visualizations"
          label="Change Visualization"
          item-text="label"
          item-value="name"
          dense
          outlined
          return-object
          single-line
          class="__select-visual"
          @change="getVisualization"
        />
      </div>
    </div>
    <template
      v-if="currentVisualization['type'] === 'table' && data && data['data']"
    >
      <AppTable :table="data['data']['table']" />
    </template>
    <template v-else>
      <AppEcharts :chart-data="data['data']['chart']" />
    </template>
  </div>
</template>
<script>
import AppEcharts from "./AppEcharts.vue";
import AppTable from "./AppTable.vue";
export default {
  name: "QueryResultCard",
  components: { AppEcharts, AppTable },
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  data: function () {
    return {
      currentVisualization: { label: "Table", name: "table", type: "table" },
      visualizations: [
        { label: "Table", name: "table", type: "table" },
        { label: "Line Chart", name: "line", type: "chart" },
        { label: "Bar Chart", name: "bar", type: "chart" },
        { label: "Horizonal Bar Chart", name: "horizontal-bar", type: "chart" },
      ],
      selectedDimensions: [],
      selectedMeasures: [],
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
  },
  methods: {
    columnsUpdated: function () {
      this.$emit("columns-updated", this.currentVisualization, {
        dimensions: this.selectedDimensions,
        measures: this.selectedMeasures,
      });
    },
    
    getVisualization: function () {
      console.log(this.currentVisualization);
      this.$emit("visualization-changed", this.currentVisualization, {
        dimensions: this.selectedDimensions,
        measures: this.selectedMeasures,
      });
    },
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
