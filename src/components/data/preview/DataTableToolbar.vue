<template>
  <div class="table-toolbar">
    <div class="__left-side-actions ml-2">
      <div>Rows: {{ rowCount }}</div>
      <v-text-field
        v-model="searchKeyword"
        hide-details
        prepend-icon="mdi-magnify"
        single-line
        placeholder="Search in table"
        class="__search-box"
      />
    </div>
    <div class="__right-side-actions">
      <SvgLoader
        width="20"
        height="20"
        icon-name="Download"
        class="mr-4"
        @click.native="downloadTable"
      >
        <DownloadSvg />
      </SvgLoader>
    </div>
  </div>
</template>

<script>
import SvgLoader from "@/components/helpers/SvgLoader.vue";
import DownloadSvg from "@/components/svgs/DownloadSvg.vue";

export default {
  name: "DataTableToolbar",
  components: { SvgLoader, DownloadSvg },
  props: {
    rowCount: {
      type: Number,
      default: 0,
    },
  },
  data: function () {
    return {
      debounceTime: null,
      searchKeyword: "",
    };
  },
  watch: {
    searchKeyword: function () {
      this.debounce(this.handleSearchKeyword, 500);
    },
  },
  methods: {
    debounce: function (callback, delay) {
      if (isNaN(delay) || !delay) {
        callback();
      } else {
        clearTimeout(this.debounceTime);
        this.debounceTime = setTimeout(callback, delay);
      }
    },
    downloadTable: function () {
      this.emitEvent("download");
    },
    handleSearchKeyword: function () {
      this.emitEvent("search-in-table", { keyword: this.searchKeyword });
    },
  },
};
</script>

<style lang="scss" scoped>
.table-toolbar {
  display: flex;
  justify-content: space-between;
  padding-bottom: 8px;
  align-items: center;

  .__left-side-actions {
    display: flex;
    align-items: center;

    .__search-box {
      margin: 0 25px;
      border-radius: 4px;
      padding: 0 4px;
    }
  }
}
</style>
