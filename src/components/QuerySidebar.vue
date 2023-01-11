<template lang="">
  <div class="px-3 py-3">
    <div class="__title primary--text">
      Atlan
    </div>
    <div class="queries-container">
      <v-select
        id="data-selection"
        v-model="selectedDataset"
        :items="dataSets"
        label="Select Dataset"
        item-text="label"
        item-value="name"
        dense
        outlined
        return-object
        single-line
        class="__select-dataset"
        @change="datasetChanged"
      />
      <div
        v-for="query in getQueries"
        :key="query['id']"
        class="__query-block"
        :class="selectedQuery && selectedQuery['id'] === query['id'] ? 'active' : ''"
        @click="selectQuery(query)"
      >
        <div class="__header">
          <p class="__title mb-1">
            {{ query["title"] }}
          </p>
          <div class="__copy-icon">
            <SvgLoader
              width="14"
              height="14"
              icon-name="Copy"
              @click.native="copyQuery(query['query'])"
            >
              <CopySvg />
            </SvgLoader>
          </div>
        </div>
        <div class="__query">
          {{ query["query"] }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SvgLoader from "./helpers/SvgLoader.vue";
import { mapActions } from 'vuex';
import CopySvg from "./svgs/CopySvg.vue";

export default {
  name: "QuerySidebar",
  components: { SvgLoader, CopySvg },
  props: {
    tabs: {
      type: Array,
      default: () => [],
    },
    dataSets: {
      type: Array,
      default: () => []
    },
    queries: {
      type: Object,
      default: () => {}
    }
  },
  data: function () {
    return {
      selectedDataset: null,
      selectedQuery: null
    };
  },
  computed: {
    getQueries: function () {
      if(this.selectedDataset) return this.queries[this.selectedDataset['id']]['queries'];
      return []
    }
  },
  methods: {
    ...mapActions({
      setSelectedData: 'data/setSelectedData',
    }),
    /**
     * Method is called after switching between dashboard/query tabs
     * @param {Object} tab
     */
    switchTab: function (tab) {
      if(tab['disabled']) return;
      this.$emit("switch-tab", tab);
    },

    /**
     * Method sets selected data in store
     */
    datasetChanged: function () {
      this.setSelectedData(this.selectedData);
    },

    /**
     * Method copies query to clipboard
     * @param {String} query 
     */
    copyQuery: function (query) {
      navigator.clipboard.writeText(query)
    },

    selectQuery: function (query){
      this.selectedQuery = query;
    }
  },
};
</script>
<style lang="scss" scoped>
.__title {
  font-size: 24px;
  color: rgba(var(--secondary), 1);
  text-align: left;
  margin-bottom: 20px;
}
.queries-container {
  .__query-block {
    width: 100%;
    padding: 8px 8px;
    cursor: pointer;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 6px 0;

    .__title{
      font-size: 16px;
      width: calc(100% - 16px);
      padding-right: 8px;
    }

    .__query{
      font-size: 14px;
      color: rgb(103, 102, 102);
    }

    .__header{
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;

      .__copy-icon{
        align-self: flex-start;
        padding-top: 2px;
      }
    }

    &.active {
      color: #ffffff;
      background-color: rgba(var(--secondary), 0.2) !important;
    }

    &:hover {
      background-color: rgb(239, 238, 238);
    }
  }
}
</style>
