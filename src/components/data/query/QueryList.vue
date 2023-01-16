<template>
  <div class="queries-container">
    <div
      id="query-list-title"
      class="__title"
    >
      Suggested Queries
    </div>
    <div class="query-list-container scrollbar">
      <div
        v-for="query in queries"
        :id="`query-${query['id']}`"
        :key="query['id']"
        @click="selectQuery(query)"
      >
        <QueryDetails
          :query="query"
          :selected-query="selectedQuery"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from "@/eventbus";
import QueryDetails from "./QueryDetails.vue";
export default {
  name: "QueryList",
  components: { QueryDetails },
  props: {
    queries: {
      type: Array,
      default: () => [],
    },
  },
  data: function () {
    return {
      selectedQuery: null,
    };
  },
  methods: {
    selectQuery: function (query) {
      this.selectedQuery = query;
      EventBus.$emit("query-selected", this.selectedQuery);
    },
  },
};
</script>

<style lang="scss" scoped>
.__title {
  font-size: 16px;
  font-weight: bold;
}

.query-list-container {
  max-height: 30vh;
  overflow-y: auto;
}
</style>
