<template>
  <v-row class="query-db-container">
    <v-col
      sm="3"
      class="__query-db-sidebar"
    >
      <QuerySidebar />
    </v-col>
    <v-col
      class="__query-content"
      sm="9"
    >
      <SqlQueryInput />
    </v-col>
  </v-row>
</template>
<script>
import QuerySidebar from './QuerySidebar.vue';
import SqlQueryInput from './SqlQueryInput.vue';

export default {
    name: "QueryDB",
    components: { SqlQueryInput, QuerySidebar }
}
</script>
<style lang="scss" scoped>
.query-db-container{
    .__query-content{
        padding: 20px;
    }
    .__query-db-sidebar{
        border-right: 1px solid #F6F6F6;
    }
}
</style>