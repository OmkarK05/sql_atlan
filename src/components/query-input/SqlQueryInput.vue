<template>
  <div class="sql-input-container">
    <div>
      <textarea
        id="query-text-area-input"
        v-model="query"
        v-click-outside="hideRecommendations"
        class="__text-area"
        placeholder="Enter your query here"
        @focus="showRecommendations"
      />
      <SqlQueryRecommendations
        v-show="showQueryRecommendations"
        id="query-input-options-container"
        :recommendations="queries"
        @select="querySelected"
      />
      <v-btn
        id="query-input-run-query-button"
        color="primary"
        class="mt-2"
        @click="runQuery"
      >
        <div class="__run-query-icon">
          <SvgLoader
            icon-name="Run Query"
            width="18"
            height="18"
            color="#ffffff"
            class="mr-1"
          >
            <PlaySvg />
          </SvgLoader>
        </div>
        Run Query
      </v-btn>
    </div>
  </div>
</template>
<script>
import SvgLoader from '../helpers/SvgLoader.vue';
import SqlQueryRecommendations from '../SqlQueryRecommendations.vue';
import PlaySvg from '../svgs/PlaySvg.vue';


export default {
    name: "SqlQueryInput",
    components: { SqlQueryRecommendations, SvgLoader, PlaySvg },
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
      /**
       * Method is called to run query.
       * Method emits event "run-query" with the selected query
       */
      runQuery: function () {
        this.$emit('run-query', this.selectedQuery);
      },

      /**
       * Method is called when query is selected.
       * @params {Object} query - query object
       */
      querySelected: function(query){
        this.query = query['query'];
        this.selectedQuery = query;
      },

      /**
       * Methot to display query recommendations popup
       */
      showRecommendations: function() {
        this.showQueryRecommendations = true
      },

      /**
       * Methot to hide recommendations popup
       */
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
        border: 1px solid rgba(var(--primary), 0.1);
        border-radius: 4px;
        padding: 8px 10px;
        background-color: #ffffff;
        box-shadow: 0px 2px 8px -3px #b6b6b9;
      }

      .__run-query-icon{
        display: flex;
        align-items: center;
        padding-top: 2px;
      }
    }
</style>