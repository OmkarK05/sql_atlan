<template lang="">
  <div class="query-card">
    <div class="change-visualization-container">
      <v-select
        v-model="currentVisualization"
        :items="visualizations"
        label="Change Visualization"
        dense
        outlined
        class="__select-visual"
      />
    </div>
    <template v-if="currentVisualization === 'Table' && data && data['data']">
      <AppTable :table="data['data']['table']" />
    </template>
    <template v-else>
      <AppEcharts />
    </template>
  </div>
</template>
<script>
import AppEcharts from './AppEcharts.vue';
import AppTable from './AppTable.vue';
export default {
    name: 'QueryResultCard',
    components: {AppEcharts, AppTable},
    props: {
      data: {
        type: Object,
        default: null,
      }
    },
    data: function () {
      return{
        currentVisualization: 'Table',
        visualizations: ['Table', 'Chart']
      }
    }
}
</script>
<style lang="scss" scoped>
    .query-card{
      padding: 20px;
      border-radius: 8px;
      width: 100%;
      box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
      background: #ffffff;    
      margin: 20px 0;
    }

    .change-visualization-container{
      width: 100%;

      .__select-visual{
        width: 150px;
        margin-left: auto;
      }
    }
</style>