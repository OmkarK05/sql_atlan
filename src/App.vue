<template>
  <v-app>
    <DataQuery />
  </v-app>
</template>

<script>
import DataQuery from './components/data/query/DataQuery.vue';

export default {
  name: 'App',

  components: {
    DataQuery
},

  data: () => ({
    //
  }),
};
</script>
