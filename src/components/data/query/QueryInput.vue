<template>
  <div class="sql-input-container">
    <div>
      <textarea
        id="query-text-area-input"
        v-model="query"
        class="__text-area"
        placeholder="Enter your query here"
      />
      <v-btn
        id="query-input-run-query-button"
        color="primary"
        class="mt-1 ml-1"
        small
        :disabled="!!! selectedQuery"
        @click="runQuery"
      >
        <div class="__run-query-icon">
          <SvgLoader
            icon-name="Run Query"
            width="14"
            height="14"
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
import SvgLoader from '@/components/helpers/SvgLoader.vue';
import PlaySvg from '@/components/svgs/PlaySvg.vue';
import { EventBus } from '@/eventbus';


export default {
    name: "QueryInput",
    components: { SvgLoader, PlaySvg },
    data: function () {
        return {
            query: "",
            selectedQuery: null
        };
    },
    beforeMount: function () {
      EventBus.$on('query-selected', this.handleSelectedQuery)
    },
    beforeDestroy: function () {
      EventBus.$off('query-selected', this.handleSelectedQuery)
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
       handleSelectedQuery: function(query){
        this.query = query['query'];
        this.selectedQuery = query;
      },
    }
}
</script>
<style lang="scss" scoped>
    .sql-input-container {
      text-align: left;
      position: relative;
      .__text-area {
        width: 100%;
        min-height: 80px;
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