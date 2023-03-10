<template>
  <div
    v-if="tableData"
    class="app-table"
  >
    <DataTableToolbar
      :row-count="table['body'].length"
      @event-emitted="handleToolbarEvent"
    />
    <div class="table-container">
      <table
        id="data-table"
        class="app-table"
      >
        <thead
          id="table-header"
          class="table-header"
        >
          <tr>
            <th
              v-for="(header, index) in tableData['headers']"
              :id="`table-header-${header['label']}`"
              :key="`table-header-${header['label']}`"
              class="__table-header-cell"
            >
              <div class="d-flex align-items-center">
                <div class="column-header">
                  <SvgLoader
                    width="20"
                    height="20"
                    :icon-name="columnDataTypeMapping[header['data_type']]"
                    class="__column-icon"
                  >
                    <component :is="columnIconMapping[header['data_type']]" />
                    />
                  </SvgLoader>
                  <p class="__title mb-0 font-medium">
                    {{ header["label"] }}
                  </p>
                </div>
                <div
                  id="app-table-sorting-icon"
                  class="table-column-sorting-icon"
                >
                  <SvgLoader
                    id="app-table-sort-ascending-icon"
                    class="__arrow-up"
                    icon-name="Sort Ascending"
                    color="#5F6F94"
                    width="20"
                    height="20"
                    @click.native="sortTable('ascending', index)"
                  >
                    <CaretUp />
                  </SvgLoader>
                  <SvgLoader
                    id="app-table-sort-descending-icon"
                    class="__arrow-down"
                    icon-name="Sort Descending"
                    color="#5F6F94"
                    width="20"
                    height="20"
                    @click.native="sortTable('descending', index)"
                  >
                    <CaretDown />
                  </SvgLoader>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody
          id="table-body"
          class="table-body"
        >
          <tr
            v-for="(row) in getRows"
            id="table-body-row"
            :key="row['id']"
            class="table-body-row"
            onClick="() => handleRowClick(row)"
          >
            <td
              v-for="(cell, cellIndex) in row['cells']"
              :id="`table-body-cell-${cell['name']}-${cellIndex}`"
              :key="cell['id']"
              class="__cell bg-tertiary font-medium"
            >
              {{ cell["value"] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import SvgLoader from "../../helpers/SvgLoader.vue";
import CaretUp from "../../svgs/CaretUp.vue";
import CaretDown from "../../svgs/CaretDown.vue";
import DownloadSvg from "../../svgs/DownloadSvg.vue";
import MeasureSvg from "../../svgs/MeasureSvg.vue";
import DimensionSvg from "../../svgs/DimensionSvg.vue";
import DataTableToolbar from "./DataTableToolbar.vue";

export default {
  name: "DataTable",
  components: {
    CaretDown,
    CaretUp,
    SvgLoader,
    DownloadSvg,
    MeasureSvg,
    DimensionSvg,
    DataTableToolbar,
  },
  props: {
    table: {
      type: Object,
      default: null,
    },
  },
  data: function () {
    return {
      tableData: null,
      currentPage: 1,
      columnIconMapping: {
        text: DimensionSvg,
        numeric: MeasureSvg,
      },
      columnDataTypeMapping: {
        text: "Dimension",
        numeric: "Measure",
      },
      searchKeyword: "",
    };
  },
  computed: {
    getRows: function () {
      return this.tableData["body"];
    },
  },
  watch: {
    table: function () {
      this.setupTable();
    },
  },
  beforeMount() {
    this.setupTable();
  },
  methods: {
    /**
     * This method deep copies table getting from props into tableData state and sets paginatedRow
     */
    setupTable: function () {
      this.tableData = this.deepCopy(this.table);
    },

    /**
     * This method sorts table in ascending or descending order
     * @param {String} sortBy - ascending / descending
     * @param {Number} headerIndex - index of header
     */
    sortTable: function (sortBy, headerIndex) {
      const updateTable = this.deepCopy(this.table.body).sort((row, __row) => {
        const firstCellValue = row["cells"][headerIndex]["value"];
        const secondCellValue = __row["cells"][headerIndex]["value"];

        if (sortBy === "ascending")
          return this.compareValues(firstCellValue, secondCellValue);
        if (sortBy === "descending")
          return this.compareValues(secondCellValue, firstCellValue);
      });

      this.tableData["body"] = this.deepCopy(updateTable);
    },

    compareValues: function (firstValue, secondValue) {
      if (typeof firstValue === "number" && typeof secondValue === "number") {
        return firstValue - secondValue;
      } else {
        return firstValue.localeCompare(secondValue);
      }
    },

    handleSearchKeyword: function ({ keyword }) {
      const filteredKeyword =
        keyword && keyword.toString().trim().toLowerCase();
      if (filteredKeyword) {
        this.tableData["body"] = this.deepCopy(
          this.table["body"].filter((row) =>
            row["cells"].some((cell) =>
              cell["value"].toString().toLowerCase().includes(filteredKeyword)
            )
          )
        );
      } else {
        this.tableData["body"] = this.deepCopy(this.table["body"]);
      }
    },

    /**
     * Method emits 'download' event to download table data as csv
     */
    downloadTable: function () {
      this.$emit("download");
    },

    /**
     * This method handles events emitted from table toolbar
     * @param {*} action - action to perform
     * @param {*} payload - action payload
     */
    handleToolbarEvent: function (action, payload) {
      const actionMapping = {
        'download': this.downloadTable,
        'search-in-table': this.handleSearchKeyword,
      };
      if (actionMapping[action]) actionMapping[action](payload);
    },
  },
};
</script>
<style lang="scss" scoped>
.table-container {
  max-height: calc(100% - 40px);
  overflow: auto;
}
.app-table {
  min-width: 100%;
  margin: 0 auto;
  table-layout: fixed;
  border-collapse: collapse;
  position: relative;
  height: 100%;

  table,
  th,
  td {
    border: 1px solid rgba(var(--secondary), 0.2);
  }

  .table-header {
    position: sticky;
    top: 0;
    .__table-header-cell {
      padding: 10px 8px;
      font-weight: normal;
      min-width: 150px;
      background-color: rgba(var(--tertiary));

      .column-header {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        width: calc(100% - 20px);

        .__title {
          padding: 0 5px;
        }
      }
    }
    .table-column-sorting-icon {
      width: 12px;
      height: 24px;
      display: flex;
      flex-direction: column;

      .__arrow-up,
      .__arrow-down {
        height: 12px;
        width: 12px;
        cursor: pointer;

        &:hover {
          opacity: 0.6;
        }
      }
    }
  }

  .table-body {
    .table-body-row {
      cursor: pointer;

      &:hover {
        .__cell {
          background-color: var(--secondary) !important;
        }
      }

      .__cell {
        padding: 8px;
        font-weight: normal;
      }
    }
  }

  .table-pagination {
    .__arrow-right,
    .__arrow-left {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  }

  .pagination-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .__prev-btn {
      transform: rotate(90deg);
    }
  }
}
</style>
<style lang="scss">
.app-table {
  .v-text-field {
    margin-top: 0;
    padding-top: 0;

    input {
      border: none;
      outline: none;
    }
  }
}
</style>
