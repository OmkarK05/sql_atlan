<template>
  <v-app>
    <QueryDB />
  </v-app>
</template>

<script>
import QueryDB from './components/QueryDB.vue';

export default {
  name: 'App',

  components: {
    QueryDB
},

  data: () => ({
    //
  }),
};
</script>
