<template>
  <div
    v-if="selectedData"
    class="data-toolbar-container"
  >
    <SvgLoader
      id="data-toolbar-table-icon"
      width="30"
      height="30"
      color="#ao8986"
      class="__table-icon"
    >
      <TableSvg />
    </SvgLoader>
    <div class="data-details-container">
      <div class="data-details">
        <div
          id="data-toolbar-table-name"
          class="font-larger pr-4"
        >
          {{ selectedData["name"] }}
        </div>
        <div
          id="data-toolbar-last-update-time"
          class="font-regular"
        >
          last updated on {{ getFormattedDate(selectedData['modified']) }}
        </div>
      </div>
      <div class="data-details">
        <div class="font-regular">
          Table
        </div>
        <div
          id="data-toolbar-data-source"
          class="font-regular __data-source"
        >
          <SvgLoader
            width="14"
            height="auto"
            class="__icon"
          >
            <component :is="dataSourceIconsMapping['snowflake']" />
          </SvgLoader>
          {{ selectedData['data_source']['source'] }}
        </div>
        <div
          id="data-toolbar-data-base"
          class="font-regular __db-name"
        >
          <SvgLoader
            width="14"
            height="14"
            class="__icon"
          >
            <DatabaseSvg />
          </SvgLoader>
          {{ selectedData['data_source']['name'] }}
        </div>
        <div
          id="data-row-count"
          class="font-regular"
        >
          {{ selectedData['row_count'] }} rows
        </div>
        <div
          id="data-column-count"
          class="font-regular"
        >
          {{ selectedData['column_count'] }} columns
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SvgLoader from "@/components/helpers/SvgLoader.vue";
import { mapGetters } from "vuex";
import TableSvg from "@/components/svgs/TableSvg.vue";
import SnowflakeSvg from "@/components/svgs/SnowflakeSvg.vue";
import DatabaseSvg from "@/components/svgs/DatabaseSvg.vue";

export default {
  name: "DataToolbar",
  components: { SvgLoader, TableSvg, SnowflakeSvg, DatabaseSvg },
  data: function () {
    return {
        dataSourceIconsMapping: {
            'snowflake': SnowflakeSvg
        }
    }
  },
  computed: {
    ...mapGetters({
      selectedData: "data/getSelectedData",
    }),
  },
  methods: {
    getFormattedDate: function(date) {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const newDate = new Date(date)
        return newDate.getDate() + ' ' + months[newDate.getMonth()] + ' ' + newDate.getFullYear() + ' ' + newDate.getHours() + ':' + newDate.getMinutes() + ':' + newDate.getSeconds();
    }
  }
};
</script>

<style lang="scss" scoped>
.data-toolbar-container{
    padding: 5px 8px;
    border: 1px solid #e1e1e1;
    border-radius: 4px;
    .__table-icon{
        margin-right: 16px;
    }
    display: flex;
    align-items: center;
    .data-details-container{
        width: calc(100% - 40px);

        .data-details{
            display: flex;
            align-items: center;

            div{
                padding-right: 16px;
            }
            
            .__name{
                color: rgb(var(--primary));
            }

            .__data-source, .__db-name{
                display: flex;
                align-items: center;

                .__icon{
                    margin-right: 2px;
                }
            }

            .__data-source{
                .__icon{
                    margin-top: 2px;
                }
            }
        }
    }
}
</style>
