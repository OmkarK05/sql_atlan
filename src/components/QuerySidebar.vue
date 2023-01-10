<template lang="">
  <div class="px-3 py-3">
    <div class="__title primary--text">
      Analytics
    </div>
    <div class="tabs-container">
      <div
        v-for="tab in tabs"
        :key="tab['name']"
        class="__tab"
        :class="tab['active'] ? 'active' : ''"
        @click="switchTab(tab)"
      >
        <SvgLoader
          width="18"
          height="18"
          :icon-name="tab['label']"
          :color="tab['active'] ? '#ffffff' : '#6c00ff'"
          class="mr-2"
        >
          <component :is="tab['icon']" />
        </SvgLoader>
        {{ tab["label"] }}
      </div>
    </div>
  </div>
</template>
<script>
import SvgLoader from "./helpers/SvgLoader.vue";

export default {
  name: "QuerySidebar",
  components: { SvgLoader },
  props: {
    tabs: {
      type: Array,
      default: () => [],
    },
  },
  data: function () {
    return {};
  },
  methods: {
    /**
     * Method is called after switching between dashboard/query tabs
     * @param {Object} tab
     */
    switchTab: function (tab) {
      this.$emit("switch-tab", tab);
    },
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
.tabs-container {
  .__tab {
    width: 100%;
    padding: 8px 8px;
    cursor: pointer;
    border-radius: 4px;
    display: flex;
    align-items: center;
    margin: 4px 0;

    &.active {
      color: #ffffff;
      background-color: rgba(var(--primary), 1) !important;
    }

    &:hover {
      background-color: rgba(var(--secondary), 0.2);
    }
  }
}
</style>
