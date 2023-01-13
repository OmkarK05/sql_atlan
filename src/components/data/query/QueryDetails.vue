<template>
  <div
    class="query-block"
    :class="isQuerySelected ? '--active': ''"
  >
    <div class="__header">
      <p
        class="__title mb-1"
        :title="query['title']"
      >
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
</template>

<script>
import CopySvg from "@/components/svgs/CopySvg.vue";
import SvgLoader from "@/components/helpers/SvgLoader.vue";

export default {
  name: "QueryDetails",
  components: { SvgLoader, CopySvg },
  props: {
    query: {
      type: Object,
      default: null,
    },
    selectedQuery: {
      type: Object,
      default: null,
    },
  },
  computed: {
    isQuerySelected: function () {
      return (
        this.selectedQuery && this.query["id"] === this.selectedQuery["id"]
      );
    },
  },
  methods: {
    /**
     * Method copies query to clipboard
     * @param {String} query
     */
    copyQuery: function (query) {
      navigator.clipboard.writeText(query);
    },
  },
};
</script>

<style lang="scss" scoped>
.query-block {
  width: 100%;
  padding: 8px 8px;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  margin: 6px 0;

  .__title {
    font-size: 15px;
    width: calc(100% - 16px);
    padding-right: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .__query {
    font-size: 13px;
    color: rgb(103, 102, 102);
    text-align: left;
  }

  .__header {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;

    .__copy-icon {
      align-self: flex-start;
      padding-top: 2px;
    }
  }
  &.--active {
    background-color: rgba(var(--secondary), 0.2) !important;
  }

  &:hover {
    background-color: rgb(239, 238, 238);
  }
}
</style>
