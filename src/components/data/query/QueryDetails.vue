<template>
  <div
    class="query-block"
    :class="isQuerySelected ? '--active': ''"
  >
    <div class="__header">
      <p
        class="__title font-medium"
        :title="query['title']"
      >
        {{ query["title"] }}
      </p>
      <div class="__copy-icon">
        <SvgLoader
          width="14"
          height="14"
          icon-name="Copy"
          color="inherit"
          @click.native="copyQuery(query['query'])"
        >
          <CopySvg />
        </SvgLoader>
      </div>
    </div>
    <div class="__query font-small">
      {{ getFormattedQuery }}
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
    getFormattedQuery: function () {
      return this.query['query'] > 80 ?  this.query['query'].slice(0, 90)  + '...' : this.query['query'];
    }
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
    width: calc(100% - 16px);
    padding-right: 8px;
    margin-bottom: 6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgba(var(--secondary), 1);
  }

  .__query {
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
      fill: rgba(var(--secondary, 1));

      &:hover{
        fill: rgba(var(--primary, 1));
      }
    }
  }
  &.--active {
    background-color: rgba(var(--tertiary), 1) !important;
  }

  &:hover {
    background-color: rgb(239, 238, 238);
  }
}
</style>
