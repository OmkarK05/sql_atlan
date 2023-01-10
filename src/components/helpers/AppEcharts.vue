<template lang="">
  <div>
    <Chart
      ref="echarts"
      :options="chartData"
      autoresize
    />
  </div>
</template>
<script>
import Chart from 'vue-echarts'
import 'echarts';

export default {
    name: "AppEcharts",
    components: { Chart },
    props: {
      chartData: {
        type: Object,
        default: () => {}
      }
    },
    data: function () {
      return {}
    },
}
</script>
<style lang="scss" scoped>
    .echarts {
        width: 100%;
        height: 400px
    }

    .__chart-error{
      color: rgba(var(--primary), 1);
      display: flex;
      text-align: center;
      justify-content: center;
    }
</style>