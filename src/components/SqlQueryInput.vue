<template>
  <div class="sql-input-container">
    <div>
      <textarea
        v-model="query"
        v-click-outside="hideRecommendations"
        class="__text-area"
        placeholder="Enter your query here"
        @focus="showRecommendations"
      />
      <SqlQueryRecommendations
        v-show="showQueryRecommendations"
        :recommendations="queries"
        @select="querySelected"
      />
      <v-btn
        color="primary"
        @click="runQuery"
      >
        Run Query
      </v-btn>
    </div>
  </div>
</template>
<script>
import SqlQueryRecommendations from './SqlQueryRecommendations.vue';


export default {
    name: "SqlQueryInput",
    components: { SqlQueryRecommendations },
    props: {
      queries: {
        type: Array,
        default: () => []
      }
    },
    data: function () {
        return {
            query: "",
            showQueryRecommendations: false,
            selectedQuery: null
        };
    },
    methods: {
      runQuery: function () {
        this.$emit('run-query', this.selectedQuery);
      },
      querySelected: function(query){
        this.query = query['query'];
        this.selectedQuery = query;
      },
      showRecommendations: function() {
        console.log('show recommendation')
        this.showQueryRecommendations = true
      },
      hideRecommendations: function () {
        this.showQueryRecommendations = false
      }
    }
}
</script>
<style lang="scss" scoped>
    .sql-input-container {
      text-align: right;
      position: relative;
      .__text-area {
        width: 100%;
        min-height: 100px;
        border: 1px solid;
        border-radius: 4px;
        padding: 5px;
      }
    }
</style>