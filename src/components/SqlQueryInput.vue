<template>
  <div class="sql-input-container">
    <textarea
      v-model="query"
      class="__text-area"
      placeholder="Enter your query here"
    />
    <v-btn
      color="primary"
      @click="runQuery"
    >
      Run Query
    </v-btn>
  </div>
</template>
<script>

export default {
    name: "SqlQueryInput",
    components: {},
    data: function () {
        return {
            query: ""
        };
    },
    methods: {
      runQuery: function () {

      }
    }
}
</script>
<style lang="scss" scoped>
    .sql-input-container {
      text-align: right;
      .__text-area {
        width: 100%;
        min-height: 50px;
        max-height: 250px;
        border: 1px solid;
        border-radius: 4px;
        padding: 5px;
      }
    }
</style>