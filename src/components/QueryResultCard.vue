<template lang="">
  <div class="query-card">
    <template v-if="data && data['data']">
      <AppTable :table="data['data']['table']" />
    </template>
    <AppEcharts />
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
        currentVisualization: 'table',
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
</style>