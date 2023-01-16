<template>
  <div class="px-3 py-3 sidebar-container">
    <div class="__title primary--text">
      Atlan
    </div>
    <div class="queries-container">
      <div class="__title font-medium mb-2">
        Select Table
      </div>
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
      <template v-if="!! selectedDataset">
        <QueryList
          :queries="getQueries"
          class="py-3 __query-list"
        />
        <ColumnsList
          class="py-3 __columns-list"
        />
      </template>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import ColumnsList from "../common/ColumnsList.vue";
import QueryList from "../query/QueryList.vue";

export default {
  name: "QuerySidebar",
  components: { QueryList, ColumnsList },
  props: {
    tabs: {
      type: Array,
      default: () => [],
    },
    dataSets: {
      type: Array,
      default: () => [],
    },
    queries: {
      type: Object,
      default: () => {},
    },
  },
  data: function () {
    return {
      selectedDataset: null,
      selectedQuery: null,
    };
  },
  computed: {
    getQueries: function () {
      if (this.selectedDataset)
        return this.queries[this.selectedDataset["id"]]["queries"];
      return [];
    },
  },
  methods: {
    ...mapActions({
      setSelectedData: "data/setSelectedData",
    }),
    /**
     * Method is called after switching between dashboard/query tabs
     * @param {Object} tab
     */
    switchTab: function (tab) {
      if (tab["disabled"]) return;
      this.$emit("switch-tab", tab);
    },

    /**
     * Method sets selected data in store
     */
    datasetChanged: function () {
      this.setSelectedData(this.selectedDataset);
    },
  },
};
</script>
<style lang="scss" scoped>
.sidebar-container {
  .__title {
    font-size: 24px;
    color: rgba(var(--secondary), 1);
    text-align: left;
    margin-bottom: 20px;
  }

  .queries-container{
    .__title{
      font-size: 16px;
      font-weight: bold;
    }
  }

  .__query-list, .__columns-list{
    border-top: 1px solid #e1e1e1;
  }
}
</style>
