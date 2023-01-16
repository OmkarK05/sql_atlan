<template>
  <div>
    <div class="__title font-medium pb-2">
      Columns
    </div>
    <div class="columns-container scrollbar">
      <div
        v-for="columnSection in getColumnSections"
        :key="columnSection['name']"
        class="column-section-container scrollbar px-2"
      >
        <div class="font-medium">
          {{ columnSection["label"] }}
        </div>
        <div class="columns">
          <div
            v-for="column in columnSection['columns']"
            :key="column['id']"
            class="column-block font-medium"
          >
            <SvgLoader
              width="20"
              height="20"
              :icon-name="column['data_type']"
              class="__column-icon mr-1"
              color="#676666"
            >
              <component :is="columnIconMapping[column['data_type']]" />
              />
            </SvgLoader>
            {{ column["label"] }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SvgLoader from "@/components/helpers/SvgLoader.vue";
import { mapGetters } from "vuex";
import DimensionSvg from "@/components/svgs/DimensionSvg.vue";
import MeasureSvg from "@/components/svgs/MeasureSvg.vue";

export default {
  name: "ColumnsList",
  components: { SvgLoader },
  data: function () {
    return {
      columnIconMapping: {
        text: DimensionSvg,
        numeric: MeasureSvg,
      },
    };
  },
  computed: {
    ...mapGetters({
      selectedData: "data/getSelectedData",
    }),
    getColumnSections: function () {
      return [
        {
          name: "dimensions",
          label: "Dimensions",
          columns: this.selectedData["columns"]["dimensions"],
        },
        {
          name: "measures",
          label: "Measures",
          columns: this.selectedData["columns"]["measures"],
        },
      ];
    },
  },
};
</script>d

<style lang="scss" scoped>
.__title {
  font-weight: bold;
}

.columns-container {
    max-height: 30vh;
    overflow-y: auto;
  .column-section-container {

    .column-block {
      display: flex;
      align-items: center;
      padding: 4px 8px;
      color: #676666;
    }
  }
}
</style>
